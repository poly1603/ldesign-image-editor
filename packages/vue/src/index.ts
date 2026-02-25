/**
 * @ldesign/image-editor-vue
 * Vue wrapper components and composables for image editor
 * 
 * @packageDocumentation
 * @module @ldesign/image-editor-vue
 * 
 * @example
 * Using the ImageEditor component:
 * ```typescript
 * import { ImageEditor } from '@ldesign/image-editor-vue';
 * import { MosaicPlugin, TextPlugin } from '@ldesign/image-editor';
 * ```
 * 
 * @example
 * Using the composables:
 * ```typescript
 * import { 
 *   useImageEditor, 
 *   useEditorEvents, 
 *   useEditorToolbar,
 *   useEditorTransform,
 *   useEditorExport 
 * } from '@ldesign/image-editor-vue';
 * ```
 * 
 * @example
 * Using provide/inject to access editor in child components:
 * ```typescript
 * import { inject } from 'vue';
 * import { EditorInjectionKey } from '@ldesign/image-editor-vue';
 * 
 * const editor = inject(EditorInjectionKey);
 * ```
 */

// ============================================================================
// Components
// ============================================================================
export { ImageEditor } from './components';

// ============================================================================
// Composables
// ============================================================================
export { 
  useImageEditor, 
  useEditorEvents,
  useEditorToolbar,
  useEditorTransform,
  useEditorExport,
} from './composables';

export type { 
  UseEditorEventsReturn,
  UseEditorToolbarReturn,
  UseEditorToolbarOptions,
  ToolbarTheme,
  UseEditorTransformReturn,
  UseEditorExportReturn,
  ExportFormat,
} from './composables';

// ============================================================================
// Types
// ============================================================================
export type {
  // Component types
  ImageEditorProps,
  ImageEditorEmits,
  ImageEditorExpose,
  // Composable types
  UseImageEditorOptions,
  UseImageEditorReturn,
  // Toolbar types
  ToolbarOptions,
  ToolbarLayout,
  // Slot props types
  DefaultSlotProps,
  LoadingSlotProps,
  ErrorSlotProps,
  ToolbarSlotProps,
  ActionsSlotProps,
} from './types';

// Export injection key
export { EditorInjectionKey } from './types';

// ============================================================================
// Re-export core types for convenience
// ============================================================================
export type {
  EditorOptions,
  ExportOptions,
  PluginConstructor,
  Plugin,
  EditorEvents,
  MosaicConfig,
  TextConfig,
  FilterConfig,
  ToolName,
} from '@ldesign/image-editor';

// ============================================================================
// Version information
// ============================================================================
export const VERSION = '0.3.0';
