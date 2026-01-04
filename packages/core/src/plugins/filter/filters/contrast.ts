/**
 * Contrast filter algorithm
 * Requirements: 5.3 - Support contrast filter
 */

/**
 * Apply contrast adjustment to image data
 * @param imageData - The image data to modify (modified in place)
 * @param value - Contrast value from -100 to 100 (0 = no change)
 */
export function applyContrast(imageData: ImageData, value: number): void {
  if (value === 0) return;

  const data = imageData.data;
  // Convert -100 to 100 range to contrast factor
  // At value = 100, factor ≈ 2.59 (high contrast)
  // At value = -100, factor ≈ 0 (no contrast, all gray)
  const factor = (259 * (value + 255)) / (255 * (259 - value));

  for (let i = 0; i < data.length; i += 4) {
    data[i] = clamp(factor * (data[i] - 128) + 128);     // R
    data[i + 1] = clamp(factor * (data[i + 1] - 128) + 128); // G
    data[i + 2] = clamp(factor * (data[i + 2] - 128) + 128); // B
    // Alpha channel (i + 3) remains unchanged
  }
}

/**
 * Clamp a value to the 0-255 range
 */
function clamp(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}
