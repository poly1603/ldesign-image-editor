<script setup lang="ts">
/**
 * ImageEditor Vue Component
 * Requirements: 9.1, 9.2, 9.3, 9.4
 */

import { ref, watch, onMounted, onUnmounted } from 'vue';
import type { PluginConstructor, ExportOptions } from '@ldesign/image-editor';
import { useImageEditor } from '../../composables/useImageEditor';
import { useEditorEvents } from '../../composables/useEditorEvents';

/**
 * Additional editor options type (excluding props that are passed separately)
 */
interface AdditionalEditorOptions {
  backgroundColor?: string;
  historyLimit?: number;
  responsive?: boolean;
  deviceType?: 'auto' | 'pc' | 'mobile';
  toolbar?: {
    theme?: 'light' | 'dark' | 'auto';
    zoom?: boolean;
    tools?: boolean;
    history?: boolean;
    export?: boolean;
    primaryColor?: string;
    disabledTools?: string[];
    autoHide?: boolean;
    placeholderText?: string;
    placeholderSubText?: string;
  } | false;
}

/**
 * Component props
 * Requirements: 9.2
 */
const props = withDefaults(defineProps<{
  /** Image source URL */
  image?: string;
  /** Canvas width */
  width?: number;
  /** Canvas height */
  height?: number;
  /** Plugins to enable */
  plugins?: PluginConstructor[];
  /** Additional editor options */
  options?: AdditionalEditorOptions;
}>(), {
  image: undefined,
  width: undefined,
  height: undefined,
  plugins: () => [],
  options: () => ({}),
});

/**
 * Component emits
 * Requirements: 9.3
 */
const emit = defineEmits<{
  /** Editor is ready */
  (e: 'ready', payload: { width: number; height: number }): void;
  /** Error occurred */
  (e: 'error', payload: { error: Error }): void;
  /** Tool changed */
  (e: 'tool-change', payload: { tool: string; prevTool: string | null }): void;
  /** History changed */
  (e: 'history-change', payload: { canUndo: boolean; canRedo: boolean }): void;
  /** Image loaded */
  (e: 'image-loaded', payload: { width: number; height: number }): void;
  /** Before export */
  (e: 'before-export', payload: { options: ExportOptions }): void;
  /** After export */
  (e: 'after-export', payload: { data: string | Blob | File }): void;
  /** Editor destroyed */
  (e: 'destroy'): void;
}>();

// Container element ref
const containerRef = ref<HTMLDivElement>();

// Initialize useImageEditor composable
const {
  editor,
  isReady,
  isLoading,
  error,
  currentTool,
  canUndo,
  canRedo,
  width: editorWidth,
  height: editorHeight,
  init,
  loadImage,
  exportImage,
  undo,
  redo,
  setTool,
  destroy,
} = useImageEditor({
  image: props.image,
  width: props.width,
  height: props.height,
  plugins: props.plugins,
  options: props.options,
});

// Setup event forwarding
const {
  onReady,
  onError,
  onImageLoaded,
  onToolChange,
  onHistoryChange,
  onBeforeExport,
  onAfterExport,
  onDestroy,
} = useEditorEvents(editor);

// Forward events to parent component
onReady((data) => emit('ready', data));
onError((data) => emit('error', data));
onImageLoaded((data) => emit('image-loaded', data));
onToolChange((data) => emit('tool-change', data));
onHistoryChange((data) => emit('history-change', data));
onBeforeExport((data) => emit('before-export', data));
onAfterExport((data) => emit('after-export', data));
onDestroy(() => emit('destroy'));

// Initialize editor on mount
onMounted(() => {
  if (containerRef.value) {
    init(containerRef.value);
  }
});

// Watch for image prop changes
watch(
  () => props.image,
  async (newImage) => {
    if (newImage && editor.value) {
      try {
        await loadImage(newImage);
      } catch (err) {
        // Error is already emitted via event
      }
    }
  }
);

// Cleanup on unmount
onUnmounted(() => {
  destroy();
});

/**
 * Exposed methods for parent component access via ref
 * Requirements: 9.4
 */
defineExpose({
  /** Editor instance */
  editor,
  /** Whether editor is ready */
  isReady,
  /** Whether editor is loading */
  isLoading,
  /** Current error */
  error,
  /** Current tool name */
  currentTool,
  /** Whether can undo */
  canUndo,
  /** Whether can redo */
  canRedo,
  /** Canvas width */
  width: editorWidth,
  /** Canvas height */
  height: editorHeight,
  /** Load image */
  loadImage,
  /** Export image */
  export: exportImage,
  /** Undo operation */
  undo,
  /** Redo operation */
  redo,
  /** Set current tool */
  setTool,
});
</script>

<template>
  <div ref="containerRef" class="image-editor-container">
    <slot name="loading" v-if="isLoading">
      <div class="image-editor-loading">Loading...</div>
    </slot>
    <slot name="error" v-if="error" :error="error">
      <div class="image-editor-error">{{ error.message }}</div>
    </slot>
  </div>
</template>

<style scoped>
.image-editor-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.image-editor-loading,
.image-editor-error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px;
  border-radius: 4px;
  font-size: 14px;
}

.image-editor-loading {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}

.image-editor-error {
  background-color: rgba(255, 0, 0, 0.1);
  color: #d32f2f;
  border: 1px solid #d32f2f;
}
</style>
