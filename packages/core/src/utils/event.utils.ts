/**
 * Event utility functions
 * Requirements: 8.5 - Event handling utilities
 */

import type { PointerEventData, GestureEventData } from '../types';

/**
 * Normalize mouse/touch event to unified pointer event
 */
export function normalizePointerEvent(
  event: MouseEvent | TouchEvent,
  element: HTMLElement,
  type: 'start' | 'move' | 'end'
): PointerEventData {
  const rect = element.getBoundingClientRect();

  if ('touches' in event) {
    const touch = event.touches[0] || event.changedTouches[0];
    return {
      type,
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
      pressure: touch.force || 0.5,
      isPrimary: true,
      pointerId: touch.identifier,
    };
  }

  return {
    type,
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
    pressure: 0.5,
    isPrimary: true,
    pointerId: 0,
  };
}

/**
 * Calculate distance between two touch points
 */
export function getTouchDistance(touch1: Touch, touch2: Touch): number {
  const dx = touch1.clientX - touch2.clientX;
  const dy = touch1.clientY - touch2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate center point between two touch points
 */
export function getTouchCenter(
  touch1: Touch,
  touch2: Touch
): { x: number; y: number } {
  return {
    x: (touch1.clientX + touch2.clientX) / 2,
    y: (touch1.clientY + touch2.clientY) / 2,
  };
}


/**
 * Create pinch gesture event data
 */
export function createPinchEvent(
  touches: TouchList,
  element: HTMLElement,
  initialDistance: number
): GestureEventData {
  const touch1 = touches[0];
  const touch2 = touches[1];
  const currentDistance = getTouchDistance(touch1, touch2);
  const rect = element.getBoundingClientRect();
  const center = getTouchCenter(touch1, touch2);

  return {
    type: 'pinch',
    scale: currentDistance / initialDistance,
    center: {
      x: center.x - rect.left,
      y: center.y - rect.top,
    },
  };
}

/**
 * Create pan gesture event data
 */
export function createPanEvent(
  deltaX: number,
  deltaY: number
): GestureEventData {
  return {
    type: 'pan',
    deltaX,
    deltaY,
  };
}

/**
 * Throttle function execution
 */
export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): T {
  let lastCall = 0;
  return ((...args: unknown[]) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  }) as T;
}

/**
 * Debounce function execution
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return ((...args: unknown[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  }) as T;
}

/**
 * Prevent default event behavior
 */
export function preventDefault(event: Event): void {
  event.preventDefault();
}

/**
 * Stop event propagation
 */
export function stopPropagation(event: Event): void {
  event.stopPropagation();
}

/**
 * Add event listener with cleanup function
 */
export function addEventListenerWithCleanup<K extends keyof HTMLElementEventMap>(
  element: HTMLElement | Window,
  type: K,
  listener: (event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): () => void {
  element.addEventListener(type, listener as EventListener, options);
  return () => {
    element.removeEventListener(type, listener as EventListener, options);
  };
}
