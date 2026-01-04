/**
 * Grayscale filter algorithm
 * Requirements: 5.3 - Support grayscale filter
 */

/**
 * Apply grayscale effect to image data
 * @param imageData - The image data to modify (modified in place)
 * @param value - Grayscale value from 0 to 100 (0 = no effect, 100 = full grayscale)
 */
export function applyGrayscale(imageData: ImageData, value: number): void {
  if (value === 0) return;

  const data = imageData.data;
  // Convert 0-100 range to blend factor (0-1)
  const factor = value / 100;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Calculate grayscale value using luminance formula (ITU-R BT.709)
    const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // Blend between original and grayscale based on factor
    data[i] = Math.round(r + (gray - r) * factor);     // R
    data[i + 1] = Math.round(g + (gray - g) * factor); // G
    data[i + 2] = Math.round(b + (gray - b) * factor); // B
    // Alpha channel (i + 3) remains unchanged
  }
}

/**
 * Apply sepia effect to image data
 * Requirements: 5.3 - Support sepia (vintage) filter
 * @param imageData - The image data to modify (modified in place)
 * @param value - Sepia value from 0 to 100 (0 = no effect, 100 = full sepia)
 */
export function applySepia(imageData: ImageData, value: number): void {
  if (value === 0) return;

  const data = imageData.data;
  // Convert 0-100 range to blend factor (0-1)
  const factor = value / 100;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Sepia transformation matrix
    const sepiaR = Math.min(255, 0.393 * r + 0.769 * g + 0.189 * b);
    const sepiaG = Math.min(255, 0.349 * r + 0.686 * g + 0.168 * b);
    const sepiaB = Math.min(255, 0.272 * r + 0.534 * g + 0.131 * b);

    // Blend between original and sepia based on factor
    data[i] = Math.round(r + (sepiaR - r) * factor);     // R
    data[i + 1] = Math.round(g + (sepiaG - g) * factor); // G
    data[i + 2] = Math.round(b + (sepiaB - b) * factor); // B
    // Alpha channel (i + 3) remains unchanged
  }
}

/**
 * Apply invert (negative) effect to image data
 * Requirements: 5.3 - Support invert filter
 * @param imageData - The image data to modify (modified in place)
 * @param value - Invert value from 0 to 100 (0 = no effect, 100 = full invert)
 */
export function applyInvert(imageData: ImageData, value: number): void {
  if (value === 0) return;

  const data = imageData.data;
  // Convert 0-100 range to blend factor (0-1)
  const factor = value / 100;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Inverted colors
    const invertR = 255 - r;
    const invertG = 255 - g;
    const invertB = 255 - b;

    // Blend between original and inverted based on factor
    data[i] = Math.round(r + (invertR - r) * factor);     // R
    data[i + 1] = Math.round(g + (invertG - g) * factor); // G
    data[i + 2] = Math.round(b + (invertB - b) * factor); // B
    // Alpha channel (i + 3) remains unchanged
  }
}
