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
  priority: number;
}

/**
 * Extended listener options with priority
 */
export interface ExtendedEventListenerOptions extends EventListenerOptions {
  /** Priority (higher = executed first, default: 0) */
  priority?: number;
}

/**
 * EventManager class - Manages event subscriptions and emissions
 * Requirements: 1.2, 1.4
 */
export class EventManager {
  private listeners: Map<string, Set<Listener>> = new Map();
  /** Whether to pause event emission */
  private paused: boolean = false;
  /** Queue of events to emit when unpaused */
  private eventQueue: Array<{ event: string; data: unknown }> = [];

  /**
   * Subscribe to an event
   * @param event - Event name
   * @param handler - Event handler function
   * @param options - Listener options (including priority)
   */
  on<K extends keyof EditorEvents>(
    event: K,
    handler: EventHandler<EditorEvents[K]>,
    options?: ExtendedEventListenerOptions
  ): void {
    const eventName = event as string;
    
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }

    const listener: Listener<EditorEvents[K]> = {
      handler,
      once: options?.once ?? false,
      priority: options?.priority ?? 0,
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
    
    // If paused, queue the event
    if (this.paused) {
      this.eventQueue.push({ event: eventName, data });
      return;
    }
    
    this.emitInternal(eventName, data);
  }
  
  /**
   * Internal emit logic
   */
  private emitInternal(eventName: string, data: unknown): void {
    const listeners = this.listeners.get(eventName);

    if (!listeners) {
      return;
    }

    // Create a copy and sort by priority (higher first)
    const listenersArray = Array.from(listeners)
      .sort((a, b) => b.priority - a.priority);

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
   * Emit an event asynchronously (handlers run in parallel)
   * @param event - Event name
   * @param data - Event data
   * @returns Promise that resolves when all handlers complete
   */
  async emitAsync<K extends keyof EditorEvents>(
    event: K,
    data: EditorEvents[K]
  ): Promise<void> {
    const eventName = event as string;
    const listeners = this.listeners.get(eventName);

    if (!listeners) {
      return;
    }

    // Create a copy and sort by priority (higher first)
    const listenersArray = Array.from(listeners)
      .sort((a, b) => b.priority - a.priority);

    const promises = listenersArray.map(async (listener) => {
      try {
        await listener.handler(data);

        // Remove one-time listeners after execution
        if (listener.once) {
          listeners.delete(listener);
        }
      } catch (error) {
        console.error(`Error in async event handler for "${eventName}":`, error);
      }
    });

    await Promise.all(promises);

    // Clean up empty listener sets
    if (listeners.size === 0) {
      this.listeners.delete(eventName);
    }
  }
  
  /**
   * Emit an event and wait for each handler sequentially
   * @param event - Event name
   * @param data - Event data
   * @returns Promise that resolves when all handlers complete
   */
  async emitSequential<K extends keyof EditorEvents>(
    event: K,
    data: EditorEvents[K]
  ): Promise<void> {
    const eventName = event as string;
    const listeners = this.listeners.get(eventName);

    if (!listeners) {
      return;
    }

    // Create a copy and sort by priority (higher first)
    const listenersArray = Array.from(listeners)
      .sort((a, b) => b.priority - a.priority);

    for (const listener of listenersArray) {
      try {
        await listener.handler(data);

        // Remove one-time listeners after execution
        if (listener.once) {
          listeners.delete(listener);
        }
      } catch (error) {
        console.error(`Error in sequential event handler for "${eventName}":`, error);
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
   * Pause event emission (events will be queued)
   */
  pause(): void {
    this.paused = true;
  }
  
  /**
   * Resume event emission (queued events will be emitted)
   */
  resume(): void {
    this.paused = false;
    
    // Emit queued events
    const queue = [...this.eventQueue];
    this.eventQueue = [];
    
    for (const { event, data } of queue) {
      this.emitInternal(event, data);
    }
  }
  
  /**
   * Check if event emission is paused
   * @returns True if paused
   */
  isPaused(): boolean {
    return this.paused;
  }
  
  /**
   * Clear the event queue without emitting
   */
  clearQueue(): void {
    this.eventQueue = [];
  }
  
  /**
   * Get all registered event names
   * @returns Array of event names
   */
  getEventNames(): string[] {
    return Array.from(this.listeners.keys());
  }

  /**
   * Destroy the event manager and clean up all resources
   */
  destroy(): void {
    this.listeners.clear();
    this.eventQueue = [];
    this.paused = false;
  }
}
