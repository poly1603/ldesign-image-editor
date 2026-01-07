/**
 * Math utility functions for the image editor
 */

/**
 * 2D Point interface
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Rectangle interface
 */
export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Clamp a value between min and max
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Linear interpolation between two values
 * @param start - Start value
 * @param end - End value
 * @param t - Interpolation factor (0-1)
 * @returns Interpolated value
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * clamp(t, 0, 1);
}

/**
 * Inverse linear interpolation - find t given value
 * @param start - Start value
 * @param end - End value
 * @param value - Value to find t for
 * @returns t value (0-1)
 */
export function inverseLerp(start: number, end: number, value: number): number {
  if (start === end) return 0;
  return clamp((value - start) / (end - start), 0, 1);
}

/**
 * Remap a value from one range to another
 * @param value - Input value
 * @param inMin - Input range minimum
 * @param inMax - Input range maximum
 * @param outMin - Output range minimum
 * @param outMax - Output range maximum
 * @returns Remapped value
 */
export function remap(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  const t = inverseLerp(inMin, inMax, value);
  return lerp(outMin, outMax, t);
}

/**
 * Calculate distance between two points
 * @param p1 - First point
 * @param p2 - Second point
 * @returns Distance
 */
export function distance(p1: Point, p2: Point): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate squared distance between two points (faster, no sqrt)
 * @param p1 - First point
 * @param p2 - Second point
 * @returns Squared distance
 */
export function distanceSquared(p1: Point, p2: Point): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return dx * dx + dy * dy;
}

/**
 * Calculate angle in radians between two points
 * @param p1 - First point (origin)
 * @param p2 - Second point
 * @returns Angle in radians
 */
export function angle(p1: Point, p2: Point): number {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
}

/**
 * Calculate angle in degrees between two points
 * @param p1 - First point (origin)
 * @param p2 - Second point
 * @returns Angle in degrees
 */
export function angleDegrees(p1: Point, p2: Point): number {
  return radiansToDegrees(angle(p1, p2));
}

/**
 * Convert degrees to radians
 * @param degrees - Angle in degrees
 * @returns Angle in radians
 */
export function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Convert radians to degrees
 * @param radians - Angle in radians
 * @returns Angle in degrees
 */
export function radiansToDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

/**
 * Normalize angle to 0-360 range
 * @param degrees - Angle in degrees
 * @returns Normalized angle (0-360)
 */
export function normalizeAngle(degrees: number): number {
  return ((degrees % 360) + 360) % 360;
}

/**
 * Calculate midpoint between two points
 * @param p1 - First point
 * @param p2 - Second point
 * @returns Midpoint
 */
export function midpoint(p1: Point, p2: Point): Point {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}

/**
 * Rotate a point around an origin
 * @param point - Point to rotate
 * @param origin - Origin point
 * @param angleRadians - Rotation angle in radians
 * @returns Rotated point
 */
export function rotatePoint(point: Point, origin: Point, angleRadians: number): Point {
  const cos = Math.cos(angleRadians);
  const sin = Math.sin(angleRadians);
  const dx = point.x - origin.x;
  const dy = point.y - origin.y;
  
  return {
    x: origin.x + dx * cos - dy * sin,
    y: origin.y + dx * sin + dy * cos,
  };
}

/**
 * Check if a point is inside a rectangle
 * @param point - Point to check
 * @param rect - Rectangle
 * @returns True if point is inside rectangle
 */
export function isPointInRect(point: Point, rect: Rect): boolean {
  return (
    point.x >= rect.x &&
    point.x <= rect.x + rect.width &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.height
  );
}

/**
 * Check if a point is inside a circle
 * @param point - Point to check
 * @param center - Circle center
 * @param radius - Circle radius
 * @returns True if point is inside circle
 */
export function isPointInCircle(point: Point, center: Point, radius: number): boolean {
  return distanceSquared(point, center) <= radius * radius;
}

/**
 * Check if two rectangles intersect
 * @param rect1 - First rectangle
 * @param rect2 - Second rectangle
 * @returns True if rectangles intersect
 */
export function doRectsIntersect(rect1: Rect, rect2: Rect): boolean {
  return !(
    rect1.x + rect1.width < rect2.x ||
    rect2.x + rect2.width < rect1.x ||
    rect1.y + rect1.height < rect2.y ||
    rect2.y + rect2.height < rect1.y
  );
}

/**
 * Get intersection of two rectangles
 * @param rect1 - First rectangle
 * @param rect2 - Second rectangle
 * @returns Intersection rectangle or null if no intersection
 */
export function getRectsIntersection(rect1: Rect, rect2: Rect): Rect | null {
  const x = Math.max(rect1.x, rect2.x);
  const y = Math.max(rect1.y, rect2.y);
  const width = Math.min(rect1.x + rect1.width, rect2.x + rect2.width) - x;
  const height = Math.min(rect1.y + rect1.height, rect2.y + rect2.height) - y;
  
  if (width <= 0 || height <= 0) {
    return null;
  }
  
  return { x, y, width, height };
}

/**
 * Scale a rectangle from its center
 * @param rect - Rectangle to scale
 * @param scale - Scale factor
 * @returns Scaled rectangle
 */
export function scaleRectFromCenter(rect: Rect, scale: number): Rect {
  const centerX = rect.x + rect.width / 2;
  const centerY = rect.y + rect.height / 2;
  const newWidth = rect.width * scale;
  const newHeight = rect.height * scale;
  
  return {
    x: centerX - newWidth / 2,
    y: centerY - newHeight / 2,
    width: newWidth,
    height: newHeight,
  };
}

/**
 * Round a number to specified decimal places
 * @param value - Value to round
 * @param decimals - Number of decimal places
 * @returns Rounded value
 */
export function roundTo(value: number, decimals: number = 0): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Generate a random number in range
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random number in range
 */
export function randomRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/**
 * Generate a random integer in range
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns Random integer in range
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(randomRange(min, max + 1));
}

/**
 * Smoothstep interpolation (ease-in-out)
 * @param t - Input value (0-1)
 * @returns Smoothed value (0-1)
 */
export function smoothstep(t: number): number {
  const clamped = clamp(t, 0, 1);
  return clamped * clamped * (3 - 2 * clamped);
}

/**
 * Smoother step interpolation (Ken Perlin's improved smoothstep)
 * @param t - Input value (0-1)
 * @returns Smoothed value (0-1)
 */
export function smootherstep(t: number): number {
  const clamped = clamp(t, 0, 1);
  return clamped * clamped * clamped * (clamped * (clamped * 6 - 15) + 10);
}
