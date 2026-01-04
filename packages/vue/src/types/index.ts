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
}

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
}

/**
 * ImageEditor component exposed methods
 * Requirements: 9.4
 */
export interface ImageEditorExpose {
  /** Editor instance */
  editor: Editor | null;
  /** Load image */
  loadImage: (source: string) => Promise<void>;
  /** Export image */
  export: (options?: ExportOptions) => Promise<string | Blob | File>;
  /** Undo operation */
  undo: () => void;
  /** Redo operation */
  redo: () => void;
  /** Set current tool */
  setTool: (tool: string) => void;
  /** Check if can undo */
  canUndo: () => boolean;
  /** Check if can redo */
  canRedo: () => boolean;
}

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
  editor: Editor | null;
  /** Whether editor is ready */
  isReady: boolean;
  /** Whether editor is loading */
  isLoading: boolean;
  /** Current error */
  error: Error | null;
  /** Current tool name */
  currentTool: string | null;
  /** Whether can undo */
  canUndo: boolean;
  /** Whether can redo */
  canRedo: boolean;
  /** Canvas width */
  width: number;
  /** Canvas height */
  height: number;
  /** Initialize editor */
  init: (container: HTMLElement) => void;
  /** Load image */
  loadImage: (source: string) => Promise<void>;
  /** Export image */
  exportImage: (options?: ExportOptions) => Promise<string | Blob | File>;
  /** Undo operation */
  undo: () => void;
  /** Redo operation */
  redo: () => void;
  /** Set current tool */
  setTool: (tool: string) => void;
  /** Destroy editor */
  destroy: () => void;
}
