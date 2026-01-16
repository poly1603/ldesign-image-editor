<script setup lang="ts">
/**
 * ImageEditor Vue Component
 * Requirements: 9.1, 9.2, 9.3, 9.4
 * 
 * Enhanced with:
 * - v-model support for image data
 * - provide/inject context for child components
 * - More slots for customization
 * - Transform methods exposed
 * - Toolbar configuration props
 */

import { ref, watch, onMounted, onUnmounted, provide, computed } from 'vue';
import type { PluginConstructor, ExportOptions } from '@ldesign/image-editor';
import { useImageEditor } from '../../composables/useImageEditor';
import { useEditorEvents } from '../../composables/useEditorEvents';
import { useEditorToolbar } from '../../composables/useEditorToolbar';
import { useEditorTransform } from '../../composables/useEditorTransform';
import { useEditorExport } from '../../composables/useEditorExport';
import { EditorInjectionKey } from '../../types';
import type { ToolbarTheme, ToolbarOptions } from '../../types';

/**
 * Additional editor options type (excluding props that are passed separately)
 */
interface AdditionalEditorOptions {
  backgroundColor?: string;
  historyLimit?: number;
  responsive?: boolean;
  deviceType?: 'auto' | 'pc' | 'mobile';
  toolbar?: ToolbarOptions | false;
}

/**
 * Component props
 * Requirements: 9.2
 */
const props = withDefaults(defineProps<{
  /** Image source URL (supports v-model:image) */
  image?: string;
  /** Canvas width */
  width?: number;
  /** Canvas height */
  height?: number;
  /** Plugins to enable */
  plugins?: PluginConstructor[];
  /** Additional editor options */
  options?: AdditionalEditorOptions;
  /** Toolbar theme (shortcut for options.toolbar.theme) */
  theme?: ToolbarTheme;
  /** Primary color (shortcut for options.toolbar.primaryColor) */
  primaryColor?: string;
  /** Disabled tools (shortcut for options.toolbar.disabledTools) */
  disabledTools?: string[];
  /** Whether toolbar is disabled */
  toolbarDisabled?: boolean;
  /** History limit */
  historyLimit?: number;
  /** Background color */
  backgroundColor?: string;
  /** Whether responsive */
  responsive?: boolean;
  /** Default tool to select when image is loaded (e.g., 'pen', 'mosaic', 'rect') */
  defaultTool?: string;
}>(), {
  image: undefined,
  width: undefined,
  height: undefined,
  plugins: () => [],
  options: () => ({}),
  theme: undefined,
  primaryColor: undefined,
  disabledTools: undefined,
  toolbarDisabled: false,
  historyLimit: undefined,
  backgroundColor: undefined,
  responsive: undefined,
  defaultTool: undefined,
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
  /** Image data changed (for v-model:image) */
  (e: 'update:image', value: string | undefined): void;
  /** Transform applied */
  (e: 'transform', payload: { type: string; [key: string]: unknown }): void;
}>();

// Container element ref
const containerRef = ref<HTMLDivElement>();

// Compute merged options from props
const mergedOptions = computed(() => {
  const toolbarConfig = props.toolbarDisabled ? false : {
    ...(typeof props.options?.toolbar === 'object' ? props.options.toolbar : {}),
    ...(props.theme && { theme: props.theme }),
    ...(props.primaryColor && { primaryColor: props.primaryColor }),
    ...(props.disabledTools && { disabledTools: props.disabledTools }),
    ...(props.defaultTool && { defaultTool: props.defaultTool }),
  };

  return {
    ...props.options,
    ...(props.historyLimit !== undefined && { historyLimit: props.historyLimit }),
    ...(props.backgroundColor !== undefined && { backgroundColor: props.backgroundColor }),
    ...(props.responsive !== undefined && { responsive: props.responsive }),
    toolbar: toolbarConfig,
  };
});

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
  options: mergedOptions.value,
});

// Initialize toolbar composable
const {
  theme: toolbarTheme,
  primaryColor: toolbarPrimaryColor,
  disabledTools: toolbarDisabledTools,
  setTheme,
  setPrimaryColor,
  setDisabledTools,
  toggleTool,
  enableTool,
  disableTool,
} = useEditorToolbar(editor, {
  theme: props.theme || (props.options?.toolbar && typeof props.options.toolbar === 'object' ? props.options.toolbar.theme : undefined) || 'dark',
  primaryColor: props.primaryColor || (props.options?.toolbar && typeof props.options.toolbar === 'object' ? props.options.toolbar.primaryColor : undefined),
  disabledTools: props.disabledTools || (props.options?.toolbar && typeof props.options.toolbar === 'object' ? props.options.toolbar.disabledTools : undefined),
});

// Initialize transform composable
const {
  rotate,
  rotateLeft,
  rotateRight,
  rotate180,
  flipHorizontal,
  flipVertical,
  crop,
  resize,
  scale,
  fit,
  reset,
  clear,
} = useEditorTransform(editor);

// Initialize export composable
const {
  toPNG,
  toJPEG,
  toWebP,
  toBase64,
  toBlob,
  download,
  copyToClipboard,
  getImageInfo,
} = useEditorExport(editor);

// Provide editor instance for child components
provide(EditorInjectionKey, editor);

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

// Watch for toolbar props changes
watch(
  () => props.theme,
  (newTheme) => {
    if (newTheme) setTheme(newTheme);
  }
);

watch(
  () => props.primaryColor,
  (newColor) => {
    if (newColor) setPrimaryColor(newColor);
  }
);

watch(
  () => props.disabledTools,
  (newTools) => {
    if (newTools) setDisabledTools(newTools);
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
  // ============ Core State ============
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
  
  // ============ Core Methods ============
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
  
  // ============ Toolbar Control ============
  /** Current toolbar theme */
  toolbarTheme,
  /** Current toolbar primary color */
  toolbarPrimaryColor,
  /** Current disabled tools */
  toolbarDisabledTools,
  /** Set toolbar theme */
  setTheme,
  /** Set toolbar primary color */
  setPrimaryColor,
  /** Set disabled tools */
  setDisabledTools,
  /** Toggle tool enabled state */
  toggleTool,
  /** Enable a tool */
  enableTool,
  /** Disable a tool */
  disableTool,
  
  // ============ Transform Methods ============
  /** Rotate image by degrees */
  rotate,
  /** Rotate 90° left */
  rotateLeft,
  /** Rotate 90° right */
  rotateRight,
  /** Rotate 180° */
  rotate180,
  /** Flip horizontally */
  flipHorizontal,
  /** Flip vertically */
  flipVertical,
  /** Crop to region */
  crop,
  /** Resize image */
  resize,
  /** Scale by factor */
  scale,
  /** Fit to dimensions */
  fit,
  /** Reset to original */
  reset,
  /** Clear canvas */
  clear,
  
  // ============ Export Methods ============
  /** Export to PNG */
  toPNG,
  /** Export to JPEG */
  toJPEG,
  /** Export to WebP */
  toWebP,
  /** Export to base64 */
  toBase64,
  /** Export to Blob */
  toBlob,
  /** Download image */
  download,
  /** Copy to clipboard */
  copyToClipboard,
  /** Get image info */
  getImageInfo,
});
</script>

<template>
  <div ref="containerRef" class="image-editor-container">
    <!-- Default slot for custom content -->
    <slot :editor="editor" :isReady="isReady" :isLoading="isLoading" :error="error" />
    
    <!-- Loading slot -->
    <slot name="loading" v-if="isLoading" :isLoading="isLoading">
      <div class="image-editor-loading">Loading...</div>
    </slot>
    
    <!-- Error slot -->
    <slot name="error" v-if="error" :error="error">
      <div class="image-editor-error">{{ error.message }}</div>
    </slot>
    
    <!-- Toolbar slot - for custom toolbar -->
    <slot 
      name="toolbar" 
      :currentTool="currentTool" 
      :canUndo="canUndo" 
      :canRedo="canRedo" 
      :setTool="setTool" 
      :undo="undo" 
      :redo="redo"
      :isReady="isReady"
    />
    
    <!-- Actions slot - for custom action buttons -->
    <slot 
      name="actions" 
      :exportImage="exportImage" 
      :download="download"
      :copyToClipboard="copyToClipboard"
      :isReady="isReady"
    />
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
