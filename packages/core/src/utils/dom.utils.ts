/**
 * DOM utility functions
 * Requirements: 8.5 - Device type auto-switching
 */

/**
 * Get element by selector or return the element itself
 */
export function getElement(
  selector: string | HTMLElement
): HTMLElement | null {
  if (typeof selector === 'string') {
    return document.querySelector(selector);
  }
  return selector;
}

/**
 * Create a canvas element with specified dimensions
 */
export function createCanvas(
  width: number,
  height: number
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

/**
 * Get 2D rendering context from canvas
 */
export function getContext2D(
  canvas: HTMLCanvasElement
): CanvasRenderingContext2D {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get 2D context from canvas');
  }
  return ctx;
}

/**
 * Get element's bounding rect relative to viewport
 */
export function getElementRect(element: HTMLElement): DOMRect {
  return element.getBoundingClientRect();
}

/**
 * Get coordinates relative to an element
 */
export function getRelativeCoordinates(
  event: MouseEvent | Touch,
  element: HTMLElement
): { x: number; y: number } {
  const rect = getElementRect(element);
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}


/**
 * Set canvas dimensions
 */
export function setCanvasSize(
  canvas: HTMLCanvasElement,
  width: number,
  height: number
): void {
  canvas.width = width;
  canvas.height = height;
}

/**
 * Clear canvas content
 */
export function clearCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  ctx.clearRect(0, 0, width, height);
}

/**
 * Fill canvas with a color
 */
export function fillCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  color: string
): void {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
}

/**
 * Add CSS styles to an element
 */
export function setStyles(
  element: HTMLElement,
  styles: Partial<CSSStyleDeclaration>
): void {
  Object.assign(element.style, styles);
}

/**
 * Remove element from DOM
 */
export function removeElement(element: HTMLElement): void {
  element.parentNode?.removeChild(element);
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth
  );
}
