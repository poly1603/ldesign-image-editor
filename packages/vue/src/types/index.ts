/**
 * Vue wrapper type definitions
 * Requirements: 9.1, 9.2, 9.3, 9.4
 */

import type {
  EditorOptions,
  PluginConstructor,
  ExportOptions,
  EditorEvents,
} from '@ldesign/image-editor';
import type { Editor } from '@ldesign/image-editor';
import type { Ref, InjectionKey } from 'vue';

// ============================================================================
// Toolbar Types
// ============================================================================

/**
 * Toolbar theme type
 */
export type ToolbarTheme = 'light' | 'dark' | 'auto';

/**
 * Toolbar configuration options
 */
export type ToolbarLayout = 'expanded' | 'compact';

export interface ToolbarOptions {
  /** Theme: 'light' | 'dark' | 'auto' */
  theme?: ToolbarTheme;
  /** Show zoom controls */
  zoom?: boolean;
  /** Show tool buttons */
  tools?: boolean;
  /** Show history buttons */
  history?: boolean;
  /** Show export button */
  export?: boolean;
  /** Primary color */
  primaryColor?: string;
  /** Disabled tools list */
  disabledTools?: string[];
  /** Auto hide when no image */
  autoHide?: boolean;
  /** Placeholder main text */
  placeholderText?: string;
  /** Placeholder sub text */
  placeholderSubText?: string;
  /** Default tool to select when image is loaded (e.g., 'pen', 'mosaic', 'rect') */
  defaultTool?: string;
  /** Toolbar layout mode: 'expanded' (all tools visible) or 'compact' (grouped in dropdowns) */
  layout?: ToolbarLayout;
}

// ============================================================================
// Component Props Types
// ============================================================================

/**
 * ImageEditor component props
 * Requirements: 9.2
 */
export interface ImageEditorProps {
  /** Image source URL or HTMLImageElement */
  image?: string;
  /** Canvas width */
  width?: number;
  /** Canvas height */
  height?: number;
  /** Plugins to enable */
  plugins?: PluginConstructor[];
  /** Additional editor options */
  options?: Partial<Omit<EditorOptions, 'container' | 'image' | 'width' | 'height' | 'plugins'>>;
  /** Toolbar theme (shortcut) */
  theme?: ToolbarTheme;
  /** Primary color (shortcut) */
  primaryColor?: string;
  /** Disabled tools (shortcut) */
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
  /** Toolbar layout mode (shortcut): 'expanded' or 'compact' */
  toolbarLayout?: ToolbarLayout;
}

// ============================================================================
// Component Emits Types
// ============================================================================

/**
 * ImageEditor component emits
 * Requirements: 9.3
 */
export interface ImageEditorEmits {
  /** Editor is ready */
  (e: 'ready', payload: EditorEvents['ready']): void;
  /** Error occurred */
  (e: 'error', payload: EditorEvents['error']): void;
  /** Tool changed */
  (e: 'tool-change', payload: EditorEvents['tool-change']): void;
  /** History changed */
  (e: 'history-change', payload: EditorEvents['history-change']): void;
  /** Image loaded */
  (e: 'image-loaded', payload: EditorEvents['image-loaded']): void;
  /** Before export */
  (e: 'before-export', payload: EditorEvents['before-export']): void;
  /** After export */
  (e: 'after-export', payload: EditorEvents['after-export']): void;
  /** Editor destroyed */
  (e: 'destroy'): void;
  /** Image data changed (for v-model:image) */
  (e: 'update:image', value: string | undefined): void;
  /** Transform applied */
  (e: 'transform', payload: { type: string; [key: string]: unknown }): void;
}

// ============================================================================
// Component Expose Types
// ============================================================================

/**
 * ImageEditor component exposed methods and state
 * Requirements: 9.4
 */
export interface ImageEditorExpose {
  // ============ Core State ============
  /** Editor instance */
  editor: Ref<Editor | null>;
  /** Whether editor is ready */
  isReady: Ref<boolean>;
  /** Whether editor is loading */
  isLoading: Ref<boolean>;
  /** Current error */
  error: Ref<Error | null>;
  /** Current tool name */
  currentTool: Ref<string | null>;
  /** Whether can undo */
  canUndo: Ref<boolean>;
  /** Whether can redo */
  canRedo: Ref<boolean>;
  /** Canvas width */
  width: Ref<number>;
  /** Canvas height */
  height: Ref<number>;
  
  // ============ Core Methods ============
  /** Load image */
  loadImage: (source: string) => Promise<void>;
  /** Export image */
  export: (options?: ExportOptions) => Promise<string | Blob | File | ArrayBuffer>;
  /** Undo operation */
  undo: () => void;
  /** Redo operation */
  redo: () => void;
  /** Set current tool */
  setTool: (tool: string) => void;
  
  // ============ Toolbar Control ============
  /** Current toolbar theme */
  toolbarTheme: Ref<ToolbarTheme>;
  /** Current toolbar primary color */
  toolbarPrimaryColor: Ref<string>;
  /** Current disabled tools */
  toolbarDisabledTools: Ref<string[]>;
  /** Set toolbar theme */
  setTheme: (theme: ToolbarTheme) => void;
  /** Set toolbar primary color */
  setPrimaryColor: (color: string) => void;
  /** Set disabled tools */
  setDisabledTools: (tools: string[]) => void;
  /** Toggle tool enabled state */
  toggleTool: (toolName: string) => void;
  /** Enable a tool */
  enableTool: (toolName: string) => void;
  /** Disable a tool */
  disableTool: (toolName: string) => void;
  
  // ============ Transform Methods ============
  /** Rotate image by degrees */
  rotate: (degrees: number) => void;
  /** Rotate 90° left */
  rotateLeft: () => void;
  /** Rotate 90° right */
  rotateRight: () => void;
  /** Rotate 180° */
  rotate180: () => void;
  /** Flip horizontally */
  flipHorizontal: () => void;
  /** Flip vertically */
  flipVertical: () => void;
  /** Crop to region */
  crop: (x: number, y: number, width: number, height: number) => void;
  /** Resize image */
  resize: (width: number, height: number, maintainAspectRatio?: boolean) => void;
  /** Scale by factor */
  scale: (factor: number) => void;
  /** Fit to dimensions */
  fit: (maxWidth: number, maxHeight: number) => void;
  /** Reset to original */
  reset: () => void;
  /** Clear canvas */
  clear: () => void;
  
  // ============ Export Methods ============
  /** Export to PNG */
  toPNG: () => string | undefined;
  /** Export to JPEG */
  toJPEG: (quality?: number) => string | undefined;
  /** Export to WebP */
  toWebP: (quality?: number) => string | undefined;
  /** Export to base64 */
  toBase64: (format?: 'png' | 'jpeg' | 'jpg' | 'webp', quality?: number) => string | undefined;
  /** Export to Blob */
  toBlob: (type?: string, quality?: number) => Promise<Blob | null | undefined>;
  /** Download image */
  download: (filename?: string, options?: ExportOptions) => Promise<void>;
  /** Copy to clipboard */
  copyToClipboard: () => Promise<void>;
  /** Get image info */
  getImageInfo: () => { width: number; height: number; aspectRatio: number } | undefined;
}

// ============================================================================
// Composable Types
// ============================================================================

/**
 * useImageEditor options
 */
export interface UseImageEditorOptions {
  /** Initial image source */
  image?: string;
  /** Canvas width */
  width?: number;
  /** Canvas height */
  height?: number;
  /** Plugins to enable */
  plugins?: PluginConstructor[];
  /** Additional editor options */
  options?: Partial<Omit<EditorOptions, 'container' | 'image' | 'width' | 'height' | 'plugins'>>;
}

/**
 * useImageEditor return type
 */
export interface UseImageEditorReturn {
  /** Editor instance ref */
  editor: Ref<Editor | null>;
  /** Whether editor is ready */
  isReady: Ref<boolean>;
  /** Whether editor is loading */
  isLoading: Ref<boolean>;
  /** Current error */
  error: Ref<Error | null>;
  /** Current tool name */
  currentTool: Ref<string | null>;
  /** Whether can undo */
  canUndo: Ref<boolean>;
  /** Whether can redo */
  canRedo: Ref<boolean>;
  /** Canvas width */
  width: Ref<number>;
  /** Canvas height */
  height: Ref<number>;
  /** Initialize editor */
  init: (container: HTMLElement) => void;
  /** Load image */
  loadImage: (source: string) => Promise<void>;
  /** Export image */
  exportImage: (options?: ExportOptions) => Promise<string | Blob | File | ArrayBuffer>;
  /** Undo operation */
  undo: () => void;
  /** Redo operation */
  redo: () => void;
  /** Set current tool */
  setTool: (tool: string) => void;
  /** Destroy editor */
  destroy: () => void;
}

// ============================================================================
// Slot Props Types
// ============================================================================

/**
 * Default slot props
 */
export interface DefaultSlotProps {
  editor: Ref<Editor | null>;
  isReady: Ref<boolean>;
  isLoading: Ref<boolean>;
  error: Ref<Error | null>;
}

/**
 * Loading slot props
 */
export interface LoadingSlotProps {
  isLoading: Ref<boolean>;
}

/**
 * Error slot props
 */
export interface ErrorSlotProps {
  error: Error;
}

/**
 * Toolbar slot props
 */
export interface ToolbarSlotProps {
  currentTool: Ref<string | null>;
  canUndo: Ref<boolean>;
  canRedo: Ref<boolean>;
  setTool: (tool: string) => void;
  undo: () => void;
  redo: () => void;
  isReady: Ref<boolean>;
}

/**
 * Actions slot props
 */
export interface ActionsSlotProps {
  exportImage: (options?: ExportOptions) => Promise<string | Blob | File | ArrayBuffer>;
  download: (filename?: string, options?: ExportOptions) => Promise<void>;
  copyToClipboard: () => Promise<void>;
  isReady: Ref<boolean>;
}

// ============================================================================
// Injection Key
// ============================================================================

/**
 * Editor injection key for provide/inject
 */
export const EditorInjectionKey: InjectionKey<Ref<Editor | null>> = Symbol('ImageEditor');
