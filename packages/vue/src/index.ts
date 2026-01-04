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
 * import { useImageEditor, useEditorEvents } from '@ldesign/image-editor-vue';
 * ```
 */

// ============================================================================
// Components
// ============================================================================
export { ImageEditor } from './components';

// ============================================================================
// Composables
// ============================================================================
export { useImageEditor, useEditorEvents } from './composables';
export type { UseEditorEventsReturn } from './composables';

// ============================================================================
// Types
// ============================================================================
export type {
  ImageEditorProps,
  ImageEditorEmits,
  ImageEditorExpose,
  UseImageEditorOptions,
  UseImageEditorReturn,
} from './types';

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
} from '@ldesign/image-editor';

// ============================================================================
// Version information
// ============================================================================
export const VERSION = '0.2.0';
