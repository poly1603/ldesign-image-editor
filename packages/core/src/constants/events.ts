/**
 * Event name constants
 * Requirements: 1.2, 1.4 - Event system
 */

/**
 * Editor event names
 */
export const EDITOR_EVENTS = {
  /** Editor is ready */
  READY: 'ready',
  /** Error occurred */
  ERROR: 'error',
  /** Image loaded */
  IMAGE_LOADED: 'image-loaded',
  /** Tool changed */
  TOOL_CHANGE: 'tool-change',
  /** History changed */
  HISTORY_CHANGE: 'history-change',
  /** Before export */
  BEFORE_EXPORT: 'before-export',
  /** After export */
  AFTER_EXPORT: 'after-export',
  /** Editor destroyed */
  DESTROY: 'destroy',
} as const;

/**
 * Plugin event names
 */
export const PLUGIN_EVENTS = {
  /** Plugin installed */
  INSTALLED: 'plugin-installed',
  /** Plugin activated */
  ACTIVATED: 'plugin-activated',
  /** Plugin deactivated */
  DEACTIVATED: 'plugin-deactivated',
  /** Plugin error */
  ERROR: 'plugin-error',
} as const;

/**
 * Canvas event names
 */
export const CANVAS_EVENTS = {
  /** Pointer down */
  POINTER_DOWN: 'pointer-down',
  /** Pointer move */
  POINTER_MOVE: 'pointer-move',
  /** Pointer up */
  POINTER_UP: 'pointer-up',
  /** Pinch gesture */
  PINCH: 'pinch',
  /** Pan gesture */
  PAN: 'pan',
  /** Canvas resized */
  RESIZE: 'resize',
} as const;

/**
 * All event name types
 */
export type EditorEventName = (typeof EDITOR_EVENTS)[keyof typeof EDITOR_EVENTS];
export type PluginEventName = (typeof PLUGIN_EVENTS)[keyof typeof PLUGIN_EVENTS];
export type CanvasEventName = (typeof CANVAS_EVENTS)[keyof typeof CANVAS_EVENTS];
