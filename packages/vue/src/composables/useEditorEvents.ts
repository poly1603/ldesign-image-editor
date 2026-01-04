/**
 * useEditorEvents composable - Manages editor event subscriptions
 * Requirements: 9.3
 * 
 * @example
 * ```vue
 * <script setup>
 * import { useEditorEvents } from '@image-editor/vue';
 * 
 * const { onReady, onError, onToolChange } = useEditorEvents(editor);
 * 
 * onReady(({ width, height }) => {
 *   console.log(`Editor ready: ${width}x${height}`);
 * });
 * 
 * onError(({ error }) => {
 *   console.error('Editor error:', error);
 * });
 * </script>
 * ```
 */

import { watch, onUnmounted, type Ref } from 'vue';
import type { Editor, EditorEvents, EventHandler } from '@ldesign/image-editor';

/**
 * Event cleanup function type
 */
type CleanupFn = () => void;

/**
 * Event handler registration function type
 */
type EventRegistration<T> = (handler: EventHandler<T>) => CleanupFn;

/**
 * useEditorEvents return type
 */
export interface UseEditorEventsReturn {
  /** Subscribe to ready event */
  onReady: EventRegistration<EditorEvents['ready']>;
  /** Subscribe to error event */
  onError: EventRegistration<EditorEvents['error']>;
  /** Subscribe to image-loaded event */
  onImageLoaded: EventRegistration<EditorEvents['image-loaded']>;
  /** Subscribe to tool-change event */
  onToolChange: EventRegistration<EditorEvents['tool-change']>;
  /** Subscribe to history-change event */
  onHistoryChange: EventRegistration<EditorEvents['history-change']>;
  /** Subscribe to before-export event */
  onBeforeExport: EventRegistration<EditorEvents['before-export']>;
  /** Subscribe to after-export event */
  onAfterExport: EventRegistration<EditorEvents['after-export']>;
  /** Subscribe to destroy event */
  onDestroy: EventRegistration<void>;
  /** Subscribe to any event */
  on: <K extends keyof EditorEvents>(event: K, handler: EventHandler<EditorEvents[K]>) => CleanupFn;
  /** Unsubscribe from any event */
  off: <K extends keyof EditorEvents>(event: K, handler: EventHandler<EditorEvents[K]>) => void;
  /** Remove all event listeners */
  removeAllListeners: () => void;
}

/**
 * Composable for managing editor event subscriptions with automatic cleanup
 * Requirements: 9.3
 * 
 * @param editorRef - Ref to Editor instance
 * @returns Event subscription methods
 */
export function useEditorEvents(editorRef: Ref<Editor | null>): UseEditorEventsReturn {
  // Track all registered handlers for cleanup
  const registeredHandlers: Array<{
    event: keyof EditorEvents;
    handler: EventHandler<unknown>;
  }> = [];

  /**
   * Create an event registration function for a specific event
   * @param event - Event name
   * @returns Event registration function
   */
  function createEventRegistration<K extends keyof EditorEvents>(
    event: K
  ): EventRegistration<EditorEvents[K]> {
    return (handler: EventHandler<EditorEvents[K]>): CleanupFn => {
      return on(event, handler);
    };
  }

  /**
   * Subscribe to an editor event
   * @param event - Event name
   * @param handler - Event handler
   * @returns Cleanup function
   */
  function on<K extends keyof EditorEvents>(
    event: K,
    handler: EventHandler<EditorEvents[K]>
  ): CleanupFn {
    // Register handler if editor exists
    if (editorRef.value) {
      editorRef.value.on(event, handler);
    }

    // Track handler for cleanup and re-registration
    registeredHandlers.push({
      event,
      handler: handler as EventHandler<unknown>,
    });

    // Watch for editor changes to re-register handlers
    const stopWatch = watch(
      () => editorRef.value,
      (newEditor, oldEditor) => {
        // Unregister from old editor
        if (oldEditor) {
          oldEditor.off(event, handler);
        }
        // Register to new editor
        if (newEditor) {
          newEditor.on(event, handler);
        }
      }
    );

    // Return cleanup function
    return () => {
      stopWatch();
      if (editorRef.value) {
        editorRef.value.off(event, handler);
      }
      // Remove from tracked handlers
      const index = registeredHandlers.findIndex(
        (h) => h.event === event && h.handler === handler
      );
      if (index !== -1) {
        registeredHandlers.splice(index, 1);
      }
    };
  }

  /**
   * Unsubscribe from an editor event
   * @param event - Event name
   * @param handler - Event handler
   */
  function off<K extends keyof EditorEvents>(
    event: K,
    handler: EventHandler<EditorEvents[K]>
  ): void {
    if (editorRef.value) {
      editorRef.value.off(event, handler);
    }
    // Remove from tracked handlers
    const index = registeredHandlers.findIndex(
      (h) => h.event === event && h.handler === handler
    );
    if (index !== -1) {
      registeredHandlers.splice(index, 1);
    }
  }

  /**
   * Remove all registered event listeners
   */
  function removeAllListeners(): void {
    if (editorRef.value) {
      for (const { event, handler } of registeredHandlers) {
        editorRef.value.off(event, handler as EventHandler<EditorEvents[typeof event]>);
      }
    }
    registeredHandlers.length = 0;
  }

  // Auto cleanup on unmount
  onUnmounted(() => {
    removeAllListeners();
  });

  return {
    onReady: createEventRegistration('ready'),
    onError: createEventRegistration('error'),
    onImageLoaded: createEventRegistration('image-loaded'),
    onToolChange: createEventRegistration('tool-change'),
    onHistoryChange: createEventRegistration('history-change'),
    onBeforeExport: createEventRegistration('before-export'),
    onAfterExport: createEventRegistration('after-export'),
    onDestroy: createEventRegistration('destroy') as EventRegistration<void>,
    on,
    off,
    removeAllListeners,
  };
}
