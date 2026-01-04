/**
 * Event Manager - Handles event subscription, emission, and cleanup
 * Requirements: 1.2, 1.4 - Event system
 */

import type {
  EventHandler,
  EventListenerOptions,
  EditorEvents,
} from '../types/event.types';

/**
 * Internal listener structure
 */
interface Listener<T = unknown> {
  handler: EventHandler<T>;
  once: boolean;
}

/**
 * EventManager class - Manages event subscriptions and emissions
 * Requirements: 1.2, 1.4
 */
export class EventManager {
  private listeners: Map<string, Set<Listener>> = new Map();

  /**
   * Subscribe to an event
   * @param event - Event name
   * @param handler - Event handler function
   * @param options - Listener options
   */
  on<K extends keyof EditorEvents>(
    event: K,
    handler: EventHandler<EditorEvents[K]>,
    options?: EventListenerOptions
  ): void {
    const eventName = event as string;
    
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }

    const listener: Listener<EditorEvents[K]> = {
      handler,
      once: options?.once ?? false,
    };

    this.listeners.get(eventName)!.add(listener as Listener);
  }

  /**
   * Subscribe to an event once (auto-unsubscribe after first trigger)
   * @param event - Event name
   * @param handler - Event handler function
   */
  once<K extends keyof EditorEvents>(
    event: K,
    handler: EventHandler<EditorEvents[K]>
  ): void {
    this.on(event, handler, { once: true });
  }


  /**
   * Unsubscribe from an event
   * @param event - Event name
   * @param handler - Event handler function to remove
   */
  off<K extends keyof EditorEvents>(
    event: K,
    handler: EventHandler<EditorEvents[K]>
  ): void {
    const eventName = event as string;
    const listeners = this.listeners.get(eventName);

    if (!listeners) {
      return;
    }

    for (const listener of listeners) {
      if (listener.handler === handler) {
        listeners.delete(listener);
        break;
      }
    }

    // Clean up empty listener sets
    if (listeners.size === 0) {
      this.listeners.delete(eventName);
    }
  }

  /**
   * Emit an event to all subscribers
   * @param event - Event name
   * @param data - Event data
   */
  emit<K extends keyof EditorEvents>(event: K, data: EditorEvents[K]): void {
    const eventName = event as string;
    const listeners = this.listeners.get(eventName);

    if (!listeners) {
      return;
    }

    // Create a copy to avoid modification during iteration
    const listenersArray = Array.from(listeners);

    for (const listener of listenersArray) {
      try {
        listener.handler(data);

        // Remove one-time listeners after execution
        if (listener.once) {
          listeners.delete(listener);
        }
      } catch (error) {
        console.error(`Error in event handler for "${eventName}":`, error);
      }
    }

    // Clean up empty listener sets
    if (listeners.size === 0) {
      this.listeners.delete(eventName);
    }
  }

  /**
   * Check if an event has any listeners
   * @param event - Event name
   * @returns True if the event has listeners
   */
  hasListeners<K extends keyof EditorEvents>(event: K): boolean {
    const eventName = event as string;
    const listeners = this.listeners.get(eventName);
    return listeners !== undefined && listeners.size > 0;
  }

  /**
   * Get the number of listeners for an event
   * @param event - Event name
   * @returns Number of listeners
   */
  listenerCount<K extends keyof EditorEvents>(event: K): number {
    const eventName = event as string;
    const listeners = this.listeners.get(eventName);
    return listeners?.size ?? 0;
  }

  /**
   * Remove all listeners for a specific event or all events
   * @param event - Optional event name. If not provided, removes all listeners
   */
  removeAllListeners<K extends keyof EditorEvents>(event?: K): void {
    if (event !== undefined) {
      this.listeners.delete(event as string);
    } else {
      this.listeners.clear();
    }
  }

  /**
   * Destroy the event manager and clean up all resources
   */
  destroy(): void {
    this.listeners.clear();
  }
}
