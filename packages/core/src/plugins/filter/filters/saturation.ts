/**
 * Saturation filter algorithm
 * Requirements: 5.3 - Support saturation filter
 */

/**
 * Apply saturation adjustment to image data
 * @param imageData - The image data to modify (modified in place)
 * @param value - Saturation value from -100 to 100 (0 = no change)
 */
export function applySaturation(imageData: ImageData, value: number): void {
  if (value === 0) return;

  const data = imageData.data;
  // Convert -100 to 100 range to saturation multiplier
  // At value = -100, multiplier = 0 (grayscale)
  // At value = 0, multiplier = 1 (no change)
  // At value = 100, multiplier = 2 (double saturation)
  const multiplier = 1 + value / 100;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Calculate grayscale value using luminance formula
    const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // Interpolate between grayscale and original color
    data[i] = clamp(gray + (r - gray) * multiplier);     // R
    data[i + 1] = clamp(gray + (g - gray) * multiplier); // G
    data[i + 2] = clamp(gray + (b - gray) * multiplier); // B
    // Alpha channel (i + 3) remains unchanged
  }
}

/**
 * Clamp a value to the 0-255 range
 */
function clamp(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}
