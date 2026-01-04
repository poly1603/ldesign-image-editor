/**
 * Event type definitions for the image editor
 * Requirements: 1.2, 1.4 - Event system
 */

import type { ExportOptions } from './config.types';

/**
 * Editor event map
 * Requirements: 1.2, 1.4
 */
export interface EditorEvents {
  /** Editor is ready */
  ready: { width: number; height: number };
  /** Error occurred */
  error: { error: Error };
  /** Image loaded */
  'image-loaded': { width: number; height: number };
  /** Tool changed */
  'tool-change': { tool: string; prevTool: string | null };
  /** History changed */
  'history-change': { canUndo: boolean; canRedo: boolean };
  /** Before export */
  'before-export': { options: ExportOptions };
  /** After export */
  'after-export': { data: string | Blob | File };
  /** Editor destroyed */
  destroy: void;
}

/**
 * Event handler type
 */
export type EventHandler<T = unknown> = (data: T) => void;

/**
 * Event listener options
 */
export interface EventListenerOptions {
  /** Only trigger once */
  once?: boolean;
}

/**
 * Unified pointer event for touch/mouse
 * Requirements: 8.1, 8.5
 */
export interface PointerEventData {
  /** Event type */
  type: 'start' | 'move' | 'end';
  /** X coordinate relative to canvas */
  x: number;
  /** Y coordinate relative to canvas */
  y: number;
  /** Pressure value (touch) */
  pressure?: number;
  /** Is primary pointer */
  isPrimary: boolean;
  /** Pointer ID */
  pointerId: number;
}


/**
 * Gesture event for pinch/pan
 * Requirements: 8.3, 8.4
 */
export interface GestureEventData {
  /** Gesture type */
  type: 'pinch' | 'pan';
  /** Scale ratio */
  scale?: number;
  /** X direction displacement */
  deltaX?: number;
  /** Y direction displacement */
  deltaY?: number;
  /** Center point */
  center?: { x: number; y: number };
}

/**
 * Event emitter interface
 */
export interface EventEmitter {
  /** Subscribe to an event */
  on<K extends keyof EditorEvents>(
    event: K,
    handler: EventHandler<EditorEvents[K]>,
    options?: EventListenerOptions
  ): void;
  /** Unsubscribe from an event */
  off<K extends keyof EditorEvents>(
    event: K,
    handler: EventHandler<EditorEvents[K]>
  ): void;
  /** Emit an event */
  emit<K extends keyof EditorEvents>(event: K, data: EditorEvents[K]): void;
  /** Subscribe to an event once */
  once<K extends keyof EditorEvents>(
    event: K,
    handler: EventHandler<EditorEvents[K]>
  ): void;
}
