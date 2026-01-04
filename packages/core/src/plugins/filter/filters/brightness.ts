/**
 * Brightness filter algorithm
 * Requirements: 5.3 - Support brightness filter
 */

/**
 * Apply brightness adjustment to image data
 * @param imageData - The image data to modify (modified in place)
 * @param value - Brightness value from -100 to 100 (0 = no change)
 */
export function applyBrightness(imageData: ImageData, value: number): void {
  if (value === 0) return;

  const data = imageData.data;
  // Convert -100 to 100 range to -255 to 255 adjustment
  const adjustment = (value / 100) * 255;

  for (let i = 0; i < data.length; i += 4) {
    data[i] = clamp(data[i] + adjustment);     // R
    data[i + 1] = clamp(data[i + 1] + adjustment); // G
    data[i + 2] = clamp(data[i + 2] + adjustment); // B
    // Alpha channel (i + 3) remains unchanged
  }
}

/**
 * Clamp a value to the 0-255 range
 */
function clamp(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}
