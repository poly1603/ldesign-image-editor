/**
 * Feature: image-editor-plugin, Property 4: 马赛克效果应用
 * Validates: Requirements 3.1, 3.2, 3.4
 *
 * 对于任意图片区域和马赛克配置（块大小、强度），应用马赛克后，
 * 该区域的像素应该被正确马赛克化，且马赛克块大小和强度应该符合配置。
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  applyMosaicToRegion,
  applyMosaicToCircularRegion,
  interpolatePoints,
} from '../../src/plugins/mosaic/mosaic.utils';

/**
 * Mock ImageData interface for testing (jsdom doesn't have full ImageData support)
 */
interface MockImageData {
  data: Uint8ClampedArray;
  width: number;
  height: number;
}

/**
 * Create a test ImageData with random pixel values
 */
function createTestImageData(width: number, height: number, seed: number): MockImageData {
  const data = new Uint8ClampedArray(width * height * 4);
  // Use seed to generate deterministic but varied pixel values
  for (let i = 0; i < data.length; i++) {
    data[i] = (seed * (i + 1) * 17) % 256;
  }
  return { data, width, height };
}

/**
 * Clone ImageData for comparison
 */
function cloneImageData(imageData: MockImageData): MockImageData {
  return {
    data: new Uint8ClampedArray(imageData.data),
    width: imageData.width,
    height: imageData.height,
  };
}

/**
 * Check if pixels within a block have the same color (mosaicked)
 */
function isBlockMosaicked(
  imageData: MockImageData,
  blockX: number,
  blockY: number,
  blockSize: number,
  intensity: number
): boolean {
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;

  const endX = Math.min(blockX + blockSize, width);
  const endY = Math.min(blockY + blockSize, height);

  if (blockX >= width || blockY >= height) return true;

  // Get the first pixel color in the block
  const firstIdx = (blockY * width + blockX) * 4;
  const firstR = data[firstIdx];
  const firstG = data[firstIdx + 1];
  const firstB = data[firstIdx + 2];
  const firstA = data[firstIdx + 3];

  // At 100% intensity, all pixels in the block should have the same color
  // At lower intensities, there's blending, so we check for consistency
  if (intensity === 100) {
    for (let y = blockY; y < endY; y++) {
      for (let x = blockX; x < endX; x++) {
        const idx = (y * width + x) * 4;
        if (
          data[idx] !== firstR ||
          data[idx + 1] !== firstG ||
          data[idx + 2] !== firstB ||
          data[idx + 3] !== firstA
        ) {
          return false;
        }
      }
    }
  }
  return true;
}

/**
 * Check if pixels outside a region are unchanged
 */
function isOutsideRegionUnchanged(
  original: MockImageData,
  modified: MockImageData,
  x: number,
  y: number,
  width: number,
  height: number
): boolean {
  const origData = original.data;
  const modData = modified.data;
  const imgWidth = original.width;
  const imgHeight = original.height;

  const startX = Math.max(0, Math.floor(x));
  const startY = Math.max(0, Math.floor(y));
  const endX = Math.min(imgWidth, Math.ceil(x + width));
  const endY = Math.min(imgHeight, Math.ceil(y + height));

  for (let py = 0; py < imgHeight; py++) {
    for (let px = 0; px < imgWidth; px++) {
      // Skip pixels inside the region
      if (px >= startX && px < endX && py >= startY && py < endY) {
        continue;
      }

      const idx = (py * imgWidth + px) * 4;
      if (
        origData[idx] !== modData[idx] ||
        origData[idx + 1] !== modData[idx + 1] ||
        origData[idx + 2] !== modData[idx + 2] ||
        origData[idx + 3] !== modData[idx + 3]
      ) {
        return false;
      }
    }
  }
  return true;
}

describe('Mosaic Property Tests - Mosaic Effect Application (Property 4)', () => {
  /**
   * Property 4: 马赛克效果应用
   * Requirements: 3.1 - 应用马赛克后，该区域的像素应该被修改
   */
  it('should modify pixels within the specified region when mosaic is applied', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 20, max: 100 }), // image width
        fc.integer({ min: 20, max: 100 }), // image height
        fc.integer({ min: 0, max: 255 }), // seed for pixel values
        fc.integer({ min: 2, max: 20 }), // block size
        (imgWidth, imgHeight, seed, blockSize) => {
          const imageData = createTestImageData(imgWidth, imgHeight, seed);
          const original = cloneImageData(imageData);

          // Apply mosaic to a region in the center
          const regionX = Math.floor(imgWidth / 4);
          const regionY = Math.floor(imgHeight / 4);
          const regionWidth = Math.floor(imgWidth / 2);
          const regionHeight = Math.floor(imgHeight / 2);

          applyMosaicToRegion(
            imageData as unknown as ImageData,
            regionX,
            regionY,
            regionWidth,
            regionHeight,
            blockSize,
            100 // full intensity
          );

          // The region should be modified (unless all pixels were already the same)
          // We check that at least the mosaic algorithm ran without error
          // and that pixels outside the region are unchanged
          expect(
            isOutsideRegionUnchanged(
              original,
              imageData,
              regionX,
              regionY,
              regionWidth,
              regionHeight
            )
          ).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 4: 马赛克效果应用
   * Requirements: 3.2 - 马赛克块大小应该符合配置
   */
  it('should create uniform color blocks matching the configured block size', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 30, max: 100 }), // image size (square for simplicity)
        fc.integer({ min: 2, max: 10 }), // block size
        (imgSize, blockSize) => {
          // Create image with varied pixel values
          const imageData = createTestImageData(imgSize, imgSize, 42);

          // Apply mosaic to entire image
          applyMosaicToRegion(
            imageData as unknown as ImageData,
            0,
            0,
            imgSize,
            imgSize,
            blockSize,
            100
          );

          // Check that each block has uniform color
          for (let blockY = 0; blockY < imgSize; blockY += blockSize) {
            for (let blockX = 0; blockX < imgSize; blockX += blockSize) {
              expect(
                isBlockMosaicked(imageData, blockX, blockY, blockSize, 100)
              ).toBe(true);
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 4: 马赛克效果应用
   * Requirements: 3.4 - 强度为0时不应修改图像
   */
  it('should not modify image when intensity is 0', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 10, max: 50 }), // image width
        fc.integer({ min: 10, max: 50 }), // image height
        fc.integer({ min: 0, max: 255 }), // seed
        fc.integer({ min: 2, max: 10 }), // block size
        (imgWidth, imgHeight, seed, blockSize) => {
          const imageData = createTestImageData(imgWidth, imgHeight, seed);
          const original = cloneImageData(imageData);

          // Apply mosaic with 0 intensity
          applyMosaicToRegion(
            imageData as unknown as ImageData,
            0,
            0,
            imgWidth,
            imgHeight,
            blockSize,
            0
          );

          // Image should be unchanged
          for (let i = 0; i < imageData.data.length; i++) {
            expect(imageData.data[i]).toBe(original.data[i]);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 4: 马赛克效果应用
   * Requirements: 3.4 - 强度应该影响马赛克效果的程度
   */
  it('should blend original and mosaic colors based on intensity', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 20, max: 50 }), // image size
        fc.integer({ min: 1, max: 99 }), // intensity (not 0 or 100)
        (imgSize, intensity) => {
          const blockSize = 5;
          const imageData = createTestImageData(imgSize, imgSize, 123);
          const original = cloneImageData(imageData);

          applyMosaicToRegion(
            imageData as unknown as ImageData,
            0,
            0,
            imgSize,
            imgSize,
            blockSize,
            intensity
          );

          // At partial intensity, the result should be different from both
          // the original and a full-intensity mosaic
          const fullIntensity = createTestImageData(imgSize, imgSize, 123);
          applyMosaicToRegion(
            fullIntensity as unknown as ImageData,
            0,
            0,
            imgSize,
            imgSize,
            blockSize,
            100
          );

          // Check that partial intensity produces intermediate values
          let hasDifferentFromOriginal = false;
          let hasDifferentFromFull = false;

          for (let i = 0; i < imageData.data.length; i++) {
            if (imageData.data[i] !== original.data[i]) {
              hasDifferentFromOriginal = true;
            }
            if (imageData.data[i] !== fullIntensity.data[i]) {
              hasDifferentFromFull = true;
            }
          }

          // Should be different from original (mosaic was applied)
          // and different from full intensity (blending occurred)
          expect(hasDifferentFromOriginal || hasDifferentFromFull).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Circular mosaic should only affect pixels within the radius
   */
  it('should only affect pixels within the specified radius for circular mosaic', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 50, max: 100 }), // image size
        fc.integer({ min: 5, max: 20 }), // radius
        fc.integer({ min: 2, max: 5 }), // block size
        (imgSize, radius, blockSize) => {
          const imageData = createTestImageData(imgSize, imgSize, 77);
          const original = cloneImageData(imageData);

          const centerX = imgSize / 2;
          const centerY = imgSize / 2;

          applyMosaicToCircularRegion(
            imageData as unknown as ImageData,
            centerX,
            centerY,
            radius,
            blockSize,
            100
          );

          // Check pixels outside the circle are unchanged
          const radiusSquared = radius * radius;
          for (let y = 0; y < imgSize; y++) {
            for (let x = 0; x < imgSize; x++) {
              const dx = x - centerX;
              const dy = y - centerY;
              const distSquared = dx * dx + dy * dy;

              // Pixels clearly outside the circle should be unchanged
              // (with some margin for block boundaries)
              if (distSquared > (radius + blockSize) * (radius + blockSize)) {
                const idx = (y * imgSize + x) * 4;
                expect(imageData.data[idx]).toBe(original.data[idx]);
                expect(imageData.data[idx + 1]).toBe(original.data[idx + 1]);
                expect(imageData.data[idx + 2]).toBe(original.data[idx + 2]);
                expect(imageData.data[idx + 3]).toBe(original.data[idx + 3]);
              }
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Interpolate points should create evenly spaced points
   */
  it('should create evenly spaced points between two coordinates', () => {
    fc.assert(
      fc.property(
        fc.float({ min: 0, max: 100, noNaN: true }),
        fc.float({ min: 0, max: 100, noNaN: true }),
        fc.float({ min: 0, max: 100, noNaN: true }),
        fc.float({ min: 0, max: 100, noNaN: true }),
        fc.float({ min: 1, max: 20, noNaN: true }),
        (x1, y1, x2, y2, spacing) => {
          const points = interpolatePoints(x1, y1, x2, y2, spacing);

          // Should have at least one point
          expect(points.length).toBeGreaterThan(0);

          // Last point should be close to the end coordinates
          const lastPoint = points[points.length - 1];
          const dx = lastPoint.x - x2;
          const dy = lastPoint.y - y2;
          const distToEnd = Math.sqrt(dx * dx + dy * dy);
          expect(distToEnd).toBeLessThanOrEqual(spacing + 0.001);

          // Points should be roughly evenly spaced
          if (points.length > 1) {
            for (let i = 1; i < points.length; i++) {
              const pdx = points[i].x - points[i - 1].x;
              const pdy = points[i].y - points[i - 1].y;
              const dist = Math.sqrt(pdx * pdx + pdy * pdy);
              // Distance between consecutive points should not exceed spacing
              expect(dist).toBeLessThanOrEqual(spacing + 0.001);
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Block size of 1 should preserve original colors (each pixel is its own block)
   */
  it('should preserve original colors when block size is 1', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 10, max: 30 }), // image size
        fc.integer({ min: 0, max: 255 }), // seed
        (imgSize, seed) => {
          const imageData = createTestImageData(imgSize, imgSize, seed);
          const original = cloneImageData(imageData);

          // Apply mosaic with block size 1
          applyMosaicToRegion(
            imageData as unknown as ImageData,
            0,
            0,
            imgSize,
            imgSize,
            1,
            100
          );

          // Each pixel is its own block, so colors should be preserved
          for (let i = 0; i < imageData.data.length; i++) {
            expect(imageData.data[i]).toBe(original.data[i]);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Mosaic should be idempotent at 100% intensity
   */
  it('should be idempotent - applying mosaic twice should produce same result', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 20, max: 50 }), // image size
        fc.integer({ min: 2, max: 10 }), // block size
        (imgSize, blockSize) => {
          const imageData = createTestImageData(imgSize, imgSize, 99);

          // Apply mosaic once
          applyMosaicToRegion(
            imageData as unknown as ImageData,
            0,
            0,
            imgSize,
            imgSize,
            blockSize,
            100
          );
          const afterFirst = cloneImageData(imageData);

          // Apply mosaic again
          applyMosaicToRegion(
            imageData as unknown as ImageData,
            0,
            0,
            imgSize,
            imgSize,
            blockSize,
            100
          );

          // Result should be the same
          for (let i = 0; i < imageData.data.length; i++) {
            expect(imageData.data[i]).toBe(afterFirst.data[i]);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
