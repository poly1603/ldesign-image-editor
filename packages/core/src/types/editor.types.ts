/**
 * Editor type definitions for the image editor
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5
 */

import type { PluginConstructor, Plugin } from './plugin.types';
import type { ExportOptions, DeviceType } from './config.types';
import type { EventHandler, EventListenerOptions, EditorEvents } from './event.types';

/** Available tool names */
export type ToolName = 'move' | 'pen' | 'rect' | 'circle' | 'arrow' | 'text' | 'mosaic';

/**
 * Toolbar options
 */
export interface ToolbarConfig {
  /** Show zoom controls */
  zoom?: boolean;
  /** Show tool buttons (brush, text) */
  tools?: boolean;
  /** Show history buttons (undo, redo) */
  history?: boolean;
  /** Show export button */
  export?: boolean;
  /** Theme: 'light' | 'dark' | 'auto' */
  theme?: 'light' | 'dark' | 'auto';
  /** Primary color for buttons and accents */
  primaryColor?: string;
  /** List of tools to disable */
  disabledTools?: ToolName[];
  /** Auto hide toolbar when no image loaded (default: true) */
  autoHide?: boolean;
  /** Placeholder main text */
  placeholderText?: string;
  /** Placeholder sub text */
  placeholderSubText?: string;
}

/**
 * Editor initialization options
 * Requirements: 1.1, 1.3
 */
export interface EditorOptions {
  /** Container element or selector */
  container: HTMLElement | string;
  /** Image source */
  image?: string | HTMLImageElement;
  /** Canvas width */
  width?: number;
  /** Canvas height */
  height?: number;
  /** Background color */
  backgroundColor?: string;
  /** Enabled plugins list */
  plugins?: PluginConstructor[];
  /** History record limit */
  historyLimit?: number;
  /** Whether responsive */
  responsive?: boolean;
  /** Device type */
  deviceType?: DeviceType;
  /** Enable built-in toolbar (default: true) */
  toolbar?: boolean | ToolbarConfig;
}

/**
 * History state structure
 * Requirements: 6.1, 6.2, 6.3, 6.5
 */
export interface HistoryState {
  /** State ID */
  id: string;
  /** Timestamp */
  timestamp: number;
  /** Image data */
  imageData: ImageData;
  /** Tool name */
  toolName: string;
  /** Operation description */
  description?: string;
}


/**
 * History manager interface
 * Requirements: 6.1, 6.2, 6.3, 6.5
 */
export interface HistoryManagerInterface {
  /** History states */
  states: HistoryState[];
  /** Current index */
  currentIndex: number;
  /** Limit */
  limit: number;

  /** Push a new state */
  push(state: Omit<HistoryState, 'id' | 'timestamp'>): void;
  /** Undo to previous state */
  undo(): HistoryState | null;
  /** Redo to next state */
  redo(): HistoryState | null;
  /** Check if can undo */
  canUndo(): boolean;
  /** Check if can redo */
  canRedo(): boolean;
  /** Clear history */
  clear(): void;
}

/**
 * Editor interface
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5
 */
export interface EditorInterface {
  /** Canvas element */
  readonly canvas: HTMLCanvasElement;
  /** Canvas 2D context */
  readonly ctx: CanvasRenderingContext2D;
  /** Canvas width */
  readonly width: number;
  /** Canvas height */
  readonly height: number;
  /** Current tool name */
  readonly currentTool: string | null;

  /** Load image */
  loadImage(source: string | HTMLImageElement): Promise<void>;
  /** Destroy editor */
  destroy(): void;

  /** Register plugin */
  use(plugin: PluginConstructor): EditorInterface;
  /** Set current tool */
  setTool(toolName: string): void;
  /** Get tool by name */
  getTool(toolName: string): Plugin | undefined;

  /** Undo */
  undo(): void;
  /** Redo */
  redo(): void;
  /** Check if can undo */
  canUndo(): boolean;
  /** Check if can redo */
  canRedo(): boolean;

  /** Export image */
  export(options?: ExportOptions): Promise<string | Blob | File>;

  /** Subscribe to event */
  on<K extends keyof EditorEvents>(
    event: K,
    handler: EventHandler<EditorEvents[K]>,
    options?: EventListenerOptions
  ): void;
  /** Unsubscribe from event */
  off<K extends keyof EditorEvents>(
    event: K,
    handler: EventHandler<EditorEvents[K]>
  ): void;
  /** Emit event */
  emit<K extends keyof EditorEvents>(event: K, data: EditorEvents[K]): void;
}
