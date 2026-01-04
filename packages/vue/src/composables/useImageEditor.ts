/**
 * useImageEditor composable - Manages Editor instance lifecycle
 * Requirements: 9.1, 9.4
 * 
 * @example
 * ```vue
 * <script setup>
 * import { useImageEditor } from '@ldesign/image-editor-vue';
 * import { MosaicPlugin } from '@ldesign/image-editor';
 * 
 * const containerRef = ref<HTMLElement>();
 * const { editor, isReady, loadImage, undo, redo } = useImageEditor({
 *   plugins: [MosaicPlugin],
 * });
 * 
 * onMounted(() => {
 *   if (containerRef.value) {
 *     init(containerRef.value);
 *   }
 * });
 * </script>
 * ```
 */

import { ref, shallowRef, onUnmounted, type Ref } from 'vue';
import { Editor, type EditorOptions, type ExportOptions } from '@ldesign/image-editor';
import type { UseImageEditorOptions } from '../types';

/**
 * Composable for managing image editor instance
 * Requirements: 9.1, 9.4
 * 
 * @param options - Editor options
 * @returns Editor state and methods
 */
export function useImageEditor(options: UseImageEditorOptions = {}): {
  editor: Ref<Editor | null>;
  isReady: Ref<boolean>;
  isLoading: Ref<boolean>;
  error: Ref<Error | null>;
  currentTool: Ref<string | null>;
  canUndo: Ref<boolean>;
  canRedo: Ref<boolean>;
  width: Ref<number>;
  height: Ref<number>;
  init: (container: HTMLElement) => void;
  loadImage: (source: string) => Promise<void>;
  exportImage: (exportOptions?: ExportOptions) => Promise<string | Blob | File>;
  undo: () => void;
  redo: () => void;
  setTool: (tool: string) => void;
  destroy: () => void;
} {
  // Reactive state
  const editor = shallowRef<Editor | null>(null);
  const isReady = ref(false);
  const isLoading = ref(false);
  const error = ref<Error | null>(null);
  const currentTool = ref<string | null>(null);
  const canUndo = ref(false);
  const canRedo = ref(false);
  const width = ref(0);
  const height = ref(0);

  /**
   * Initialize the editor with a container element
   * @param container - Container element
   */
  function init(container: HTMLElement): void {
    // Destroy existing editor if any
    if (editor.value) {
      destroy();
    }

    try {
      // Build editor options - spread all options including toolbar config
      const editorOptions: EditorOptions = {
        container,
        width: options.width,
        height: options.height,
        plugins: options.plugins,
        image: options.image,
        ...options.options,
      };

      // Create editor instance
      const editorInstance = new Editor(editorOptions);
      editor.value = editorInstance;

      // Setup event listeners for reactive state
      setupEventListeners(editorInstance);

      // Update initial dimensions
      width.value = editorInstance.width;
      height.value = editorInstance.height;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err));
      throw err;
    }
  }

  /**
   * Setup event listeners for reactive state updates
   * @param editorInstance - Editor instance
   */
  function setupEventListeners(editorInstance: Editor): void {
    editorInstance.on('ready', (data) => {
      isReady.value = true;
      isLoading.value = false;
      width.value = data.width;
      height.value = data.height;
    });

    editorInstance.on('error', (data) => {
      error.value = data.error;
      isLoading.value = false;
    });

    editorInstance.on('tool-change', (data) => {
      currentTool.value = data.tool || null;
    });

    editorInstance.on('history-change', (data) => {
      canUndo.value = data.canUndo;
      canRedo.value = data.canRedo;
    });

    editorInstance.on('image-loaded', (data) => {
      width.value = data.width;
      height.value = data.height;
    });
  }

  /**
   * Load an image into the editor
   * @param source - Image source URL
   */
  async function loadImage(source: string): Promise<void> {
    if (!editor.value) {
      throw new Error('Editor not initialized');
    }

    isLoading.value = true;
    error.value = null;

    try {
      await editor.value.loadImage(source);
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err));
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Export the edited image
   * @param exportOptions - Export options
   * @returns Exported image data
   */
  async function exportImage(exportOptions?: ExportOptions): Promise<string | Blob | File> {
    if (!editor.value) {
      throw new Error('Editor not initialized');
    }

    return editor.value.export(exportOptions);
  }

  /**
   * Undo the last operation
   */
  function undo(): void {
    if (editor.value) {
      editor.value.undo();
    }
  }

  /**
   * Redo the last undone operation
   */
  function redo(): void {
    if (editor.value) {
      editor.value.redo();
    }
  }

  /**
   * Set the current tool
   * @param tool - Tool name
   */
  function setTool(tool: string): void {
    if (editor.value) {
      editor.value.setTool(tool);
    }
  }

  /**
   * Destroy the editor and clean up resources
   */
  function destroy(): void {
    if (editor.value) {
      editor.value.destroy();
      editor.value = null;
      isReady.value = false;
      isLoading.value = false;
      error.value = null;
      currentTool.value = null;
      canUndo.value = false;
      canRedo.value = false;
      width.value = 0;
      height.value = 0;
    }
  }

  // Auto cleanup on unmount
  onUnmounted(() => {
    destroy();
  });

  return {
    editor,
    isReady,
    isLoading,
    error,
    currentTool,
    canUndo,
    canRedo,
    width,
    height,
    init,
    loadImage,
    exportImage,
    undo,
    redo,
    setTool,
    destroy,
  };
}
