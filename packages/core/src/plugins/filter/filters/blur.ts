/**
 * Blur filter algorithm (Box blur)
 * Requirements: 5.3 - Support blur filter
 */

/**
 * Apply blur effect to image data using box blur algorithm
 * @param imageData - The image data to modify (modified in place)
 * @param value - Blur value from 0 to 100 (0 = no blur)
 */
export function applyBlur(imageData: ImageData, value: number): void {
  if (value === 0) return;

  const { width, height, data } = imageData;
  // Convert 0-100 range to blur radius (0-10 pixels)
  const radius = Math.round((value / 100) * 10);
  
  if (radius === 0) return;

  // Create a copy of the original data
  const original = new Uint8ClampedArray(data);

  // Apply horizontal blur pass
  const temp = new Uint8ClampedArray(data.length);
  horizontalBlur(original, temp, width, height, radius);

  // Apply vertical blur pass
  verticalBlur(temp, data, width, height, radius);
}

/**
 * Horizontal blur pass
 */
function horizontalBlur(
  src: Uint8ClampedArray,
  dst: Uint8ClampedArray,
  width: number,
  height: number,
  radius: number
): void {
  const diameter = radius * 2 + 1;

  for (let y = 0; y < height; y++) {
    let rSum = 0, gSum = 0, bSum = 0, aSum = 0;
    
    // Initialize sum for first pixel
    for (let x = -radius; x <= radius; x++) {
      const px = Math.max(0, Math.min(width - 1, x));
      const idx = (y * width + px) * 4;
      rSum += src[idx];
      gSum += src[idx + 1];
      bSum += src[idx + 2];
      aSum += src[idx + 3];
    }

    for (let x = 0; x < width; x++) {
      const dstIdx = (y * width + x) * 4;
      dst[dstIdx] = Math.round(rSum / diameter);
      dst[dstIdx + 1] = Math.round(gSum / diameter);
      dst[dstIdx + 2] = Math.round(bSum / diameter);
      dst[dstIdx + 3] = Math.round(aSum / diameter);

      // Slide the window
      const leftX = Math.max(0, x - radius);
      const rightX = Math.min(width - 1, x + radius + 1);
      
      const leftIdx = (y * width + leftX) * 4;
      const rightIdx = (y * width + rightX) * 4;

      rSum += src[rightIdx] - src[leftIdx];
      gSum += src[rightIdx + 1] - src[leftIdx + 1];
      bSum += src[rightIdx + 2] - src[leftIdx + 2];
      aSum += src[rightIdx + 3] - src[leftIdx + 3];
    }
  }
}

/**
 * Vertical blur pass
 */
function verticalBlur(
  src: Uint8ClampedArray,
  dst: Uint8ClampedArray,
  width: number,
  height: number,
  radius: number
): void {
  const diameter = radius * 2 + 1;

  for (let x = 0; x < width; x++) {
    let rSum = 0, gSum = 0, bSum = 0, aSum = 0;
    
    // Initialize sum for first pixel
    for (let y = -radius; y <= radius; y++) {
      const py = Math.max(0, Math.min(height - 1, y));
      const idx = (py * width + x) * 4;
      rSum += src[idx];
      gSum += src[idx + 1];
      bSum += src[idx + 2];
      aSum += src[idx + 3];
    }

    for (let y = 0; y < height; y++) {
      const dstIdx = (y * width + x) * 4;
      dst[dstIdx] = Math.round(rSum / diameter);
      dst[dstIdx + 1] = Math.round(gSum / diameter);
      dst[dstIdx + 2] = Math.round(bSum / diameter);
      dst[dstIdx + 3] = Math.round(aSum / diameter);

      // Slide the window
      const topY = Math.max(0, y - radius);
      const bottomY = Math.min(height - 1, y + radius + 1);
      
      const topIdx = (topY * width + x) * 4;
      const bottomIdx = (bottomY * width + x) * 4;

      rSum += src[bottomIdx] - src[topIdx];
      gSum += src[bottomIdx + 1] - src[topIdx + 1];
      bSum += src[bottomIdx + 2] - src[topIdx + 2];
      aSum += src[bottomIdx + 3] - src[topIdx + 3];
    }
  }
}
