/**
 * Mosaic utility functions
 * Requirements: 3.1, 3.2, 3.4 - Mosaic algorithm implementation
 */

/**
 * Apply mosaic effect to a rectangular region of image data
 * Requirements: 3.1, 3.2, 3.4
 * @param imageData - Source image data
 * @param x - Start X coordinate
 * @param y - Start Y coordinate
 * @param width - Region width
 * @param height - Region height
 * @param blockSize - Mosaic block size
 * @param intensity - Mosaic intensity (0-100)
 * @returns Modified image data
 */
export function applyMosaicToRegion(
  imageData: ImageData,
  x: number,
  y: number,
  width: number,
  height: number,
  blockSize: number,
  intensity: number
): ImageData {
  const data = imageData.data;
  const imgWidth = imageData.width;
  const imgHeight = imageData.height;

  // Clamp coordinates to image bounds
  const startX = Math.max(0, Math.floor(x));
  const startY = Math.max(0, Math.floor(y));
  const endX = Math.min(imgWidth, Math.ceil(x + width));
  const endY = Math.min(imgHeight, Math.ceil(y + height));

  // Ensure block size is at least 1
  const effectiveBlockSize = Math.max(1, Math.floor(blockSize));
  
  // Normalize intensity to 0-1 range
  const normalizedIntensity = Math.max(0, Math.min(100, intensity)) / 100;

  // Process each block
  for (let blockY = startY; blockY < endY; blockY += effectiveBlockSize) {
    for (let blockX = startX; blockX < endX; blockX += effectiveBlockSize) {
      // Calculate block bounds
      const blockEndX = Math.min(blockX + effectiveBlockSize, endX);
      const blockEndY = Math.min(blockY + effectiveBlockSize, endY);
      const blockWidth = blockEndX - blockX;
      const blockHeight = blockEndY - blockY;
      const pixelCount = blockWidth * blockHeight;

      if (pixelCount === 0) continue;

      // Calculate average color for the block
      let totalR = 0;
      let totalG = 0;
      let totalB = 0;
      let totalA = 0;

      for (let py = blockY; py < blockEndY; py++) {
        for (let px = blockX; px < blockEndX; px++) {
          const idx = (py * imgWidth + px) * 4;
          totalR += data[idx];
          totalG += data[idx + 1];
          totalB += data[idx + 2];
          totalA += data[idx + 3];
        }
      }

      const avgR = Math.round(totalR / pixelCount);
      const avgG = Math.round(totalG / pixelCount);
      const avgB = Math.round(totalB / pixelCount);
      const avgA = Math.round(totalA / pixelCount);

      // Apply the average color to all pixels in the block with intensity blending
      for (let py = blockY; py < blockEndY; py++) {
        for (let px = blockX; px < blockEndX; px++) {
          const idx = (py * imgWidth + px) * 4;
          
          // Blend original and mosaic color based on intensity
          data[idx] = Math.round(data[idx] * (1 - normalizedIntensity) + avgR * normalizedIntensity);
          data[idx + 1] = Math.round(data[idx + 1] * (1 - normalizedIntensity) + avgG * normalizedIntensity);
          data[idx + 2] = Math.round(data[idx + 2] * (1 - normalizedIntensity) + avgB * normalizedIntensity);
          data[idx + 3] = Math.round(data[idx + 3] * (1 - normalizedIntensity) + avgA * normalizedIntensity);
        }
      }
    }
  }

  return imageData;
}

/**
 * Apply mosaic effect along a brush stroke path
 * Requirements: 3.1, 3.5 - Free drawing mode
 * @param imageData - Source image data
 * @param points - Array of points along the stroke
 * @param brushSize - Brush diameter
 * @param blockSize - Mosaic block size
 * @param intensity - Mosaic intensity (0-100)
 * @returns Modified image data
 */
export function applyMosaicAlongPath(
  imageData: ImageData,
  points: Array<{ x: number; y: number }>,
  brushSize: number,
  blockSize: number,
  intensity: number
): ImageData {
  if (points.length === 0) return imageData;

  const radius = brushSize / 2;

  // For each point, apply mosaic to a circular region
  for (const point of points) {
    applyMosaicToCircularRegion(
      imageData,
      point.x,
      point.y,
      radius,
      blockSize,
      intensity
    );
  }

  return imageData;
}

/**
 * Apply mosaic effect to a circular region
 * @param imageData - Source image data
 * @param centerX - Center X coordinate
 * @param centerY - Center Y coordinate
 * @param radius - Circle radius
 * @param blockSize - Mosaic block size
 * @param intensity - Mosaic intensity (0-100)
 * @returns Modified image data
 */
export function applyMosaicToCircularRegion(
  imageData: ImageData,
  centerX: number,
  centerY: number,
  radius: number,
  blockSize: number,
  intensity: number
): ImageData {
  const data = imageData.data;
  const imgWidth = imageData.width;
  const imgHeight = imageData.height;

  // Calculate bounding box
  const startX = Math.max(0, Math.floor(centerX - radius));
  const startY = Math.max(0, Math.floor(centerY - radius));
  const endX = Math.min(imgWidth, Math.ceil(centerX + radius));
  const endY = Math.min(imgHeight, Math.ceil(centerY + radius));

  const effectiveBlockSize = Math.max(1, Math.floor(blockSize));
  const normalizedIntensity = Math.max(0, Math.min(100, intensity)) / 100;
  const radiusSquared = radius * radius;

  // Process each block within the bounding box
  for (let blockY = startY; blockY < endY; blockY += effectiveBlockSize) {
    for (let blockX = startX; blockX < endX; blockX += effectiveBlockSize) {
      const blockEndX = Math.min(blockX + effectiveBlockSize, endX);
      const blockEndY = Math.min(blockY + effectiveBlockSize, endY);

      // Check if block center is within the circle
      const blockCenterX = blockX + effectiveBlockSize / 2;
      const blockCenterY = blockY + effectiveBlockSize / 2;
      const dx = blockCenterX - centerX;
      const dy = blockCenterY - centerY;
      
      if (dx * dx + dy * dy > radiusSquared) continue;

      // Calculate average color for pixels within the circle
      let totalR = 0;
      let totalG = 0;
      let totalB = 0;
      let totalA = 0;
      let pixelCount = 0;

      for (let py = blockY; py < blockEndY; py++) {
        for (let px = blockX; px < blockEndX; px++) {
          const pdx = px - centerX;
          const pdy = py - centerY;
          if (pdx * pdx + pdy * pdy <= radiusSquared) {
            const idx = (py * imgWidth + px) * 4;
            totalR += data[idx];
            totalG += data[idx + 1];
            totalB += data[idx + 2];
            totalA += data[idx + 3];
            pixelCount++;
          }
        }
      }

      if (pixelCount === 0) continue;

      const avgR = Math.round(totalR / pixelCount);
      const avgG = Math.round(totalG / pixelCount);
      const avgB = Math.round(totalB / pixelCount);
      const avgA = Math.round(totalA / pixelCount);

      // Apply average color to pixels within the circle
      for (let py = blockY; py < blockEndY; py++) {
        for (let px = blockX; px < blockEndX; px++) {
          const pdx = px - centerX;
          const pdy = py - centerY;
          if (pdx * pdx + pdy * pdy <= radiusSquared) {
            const idx = (py * imgWidth + px) * 4;
            data[idx] = Math.round(data[idx] * (1 - normalizedIntensity) + avgR * normalizedIntensity);
            data[idx + 1] = Math.round(data[idx + 1] * (1 - normalizedIntensity) + avgG * normalizedIntensity);
            data[idx + 2] = Math.round(data[idx + 2] * (1 - normalizedIntensity) + avgB * normalizedIntensity);
            data[idx + 3] = Math.round(data[idx + 3] * (1 - normalizedIntensity) + avgA * normalizedIntensity);
          }
        }
      }
    }
  }

  return imageData;
}

/**
 * Interpolate points between two coordinates for smooth brush strokes
 * @param x1 - Start X
 * @param y1 - Start Y
 * @param x2 - End X
 * @param y2 - End Y
 * @param spacing - Spacing between points
 * @returns Array of interpolated points
 */
export function interpolatePoints(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  spacing: number
): Array<{ x: number; y: number }> {
  const points: Array<{ x: number; y: number }> = [];
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < spacing) {
    points.push({ x: x2, y: y2 });
    return points;
  }

  const steps = Math.ceil(distance / spacing);
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    points.push({
      x: x1 + dx * t,
      y: y1 + dy * t,
    });
  }

  return points;
}
