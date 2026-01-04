/**
 * Feature: image-editor-plugin, Property 6: 滤镜应用与重置往返
 * Validates: Requirements 5.1, 5.2, 5.5
 *
 * 对于任意图片和滤镜配置，应用滤镜后图片像素应该被正确修改；
 * 重置滤镜后，图片应该恢复到原始状态（往返属性）。
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { FilterPlugin } from '../../src/plugins/filter/FilterPlugin';
import {
  applyBrightness,
  applyContrast,
  applySaturation,
  applyBlur,
  applyGrayscale,
  applySepia,
  applyInvert,
} from '../../src/plugins/filter/filters';
import type { PluginContext } from '../../src/types/plugin.types';

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
 * Compare two ImageData objects for equality
 */
function imageDataEquals(a: MockImageData, b: MockImageData): boolean {
  if (a.width !== b.width || a.height !== b.height) return false;
  for (let i = 0; i < a.data.length; i++) {
    if (a.data[i] !== b.data[i]) return false;
  }
  return true;
}

/**
 * Check if image data has been modified
 */
function imageDataModified(original: MockImageData, modified: MockImageData): boolean {
  for (let i = 0; i < original.data.length; i++) {
    if (original.data[i] !== modified.data[i]) return true;
  }
  return false;
}

/**
 * Create a mock plugin context for testing
 */
function createMockContext(imageData: MockImageData): PluginContext {
  let currentImageData = cloneImageData(imageData);
  
  return {
    editor: {},
    canvas: document.createElement('canvas'),
    ctx: document.createElement('canvas').getContext('2d')!,
    saveState: () => {},
    getImageData: () => {
      // Return as ImageData type (cast for compatibility)
      return {
        data: new Uint8ClampedArray(currentImageData.data),
        width: currentImageData.width,
        height: currentImageData.height,
      } as unknown as ImageData;
    },
    putImageData: (data: ImageData) => {
      currentImageData = {
        data: new Uint8ClampedArray(data.data),
        width: data.width,
        height: data.height,
      };
    },
  };
}

describe('Filter Property Tests - Filter Apply and Reset Round-trip (Property 6)', () => {
  /**
   * Property 6: 滤镜应用与重置往返
   * Requirements: 5.5 - Reset should restore original state
   */
  it('should restore original image after applying filters and then resetting', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 10, max: 50 }), // image width
        fc.integer({ min: 10, max: 50 }), // image height
        fc.integer({ min: 0, max: 255 }), // seed
        fc.integer({ min: -100, max: 100 }), // brightness
        fc.integer({ min: -100, max: 100 }), // contrast
        fc.integer({ min: -100, max: 100 }), // saturation
        (imgWidth, imgHeight, seed, brightness, contrast, saturation) => {
          const originalImageData = createTestImageData(imgWidth, imgHeight, seed);
          const original = cloneImageData(originalImageData);
          
          // Create mock context
          const mockContext = createMockContext(originalImageData);

          // Create and install plugin
          const plugin = new FilterPlugin();
          plugin.install(mockContext);

          // Apply filters
          plugin.applyFilter({ brightness, contrast, saturation });

          // Reset filters
          plugin.reset();

          // Get the result
          const result = mockContext.getImageData();

          // Should be equal to original
          expect(imageDataEquals(original, {
            data: new Uint8ClampedArray(result.data),
            width: result.width,
            height: result.height,
          })).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 6: 滤镜应用与重置往返
   * Requirements: 5.1 - Filter should modify image pixels
   */
  it('should modify image pixels when non-zero filter is applied', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 10, max: 30 }), // image size
        fc.integer({ min: 0, max: 255 }), // seed
        fc.integer({ min: 1, max: 100 }), // non-zero brightness (positive)
        (imgSize, seed, brightness) => {
          const imageData = createTestImageData(imgSize, imgSize, seed);
          const original = cloneImageData(imageData);

          // Apply brightness filter directly
          applyBrightness(imageData as unknown as ImageData, brightness);

          // Image should be modified
          expect(imageDataModified(original, imageData)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 6: 滤镜应用与重置往返
   * Requirements: 5.2 - Zero filter value should not modify image
   */
  it('should not modify image when filter value is zero', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 10, max: 30 }), // image size
        fc.integer({ min: 0, max: 255 }), // seed
        (imgSize, seed) => {
          const imageData = createTestImageData(imgSize, imgSize, seed);
          const original = cloneImageData(imageData);

          // Apply all filters with zero values
          applyBrightness(imageData as unknown as ImageData, 0);
          applyContrast(imageData as unknown as ImageData, 0);
          applySaturation(imageData as unknown as ImageData, 0);
          applyGrayscale(imageData as unknown as ImageData, 0);
          applySepia(imageData as unknown as ImageData, 0);
          applyInvert(imageData as unknown as ImageData, 0);
          applyBlur(imageData as unknown as ImageData, 0);

          // Image should be unchanged
          expect(imageDataEquals(original, imageData)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Grayscale at 100% should produce equal RGB values
   */
  it('should produce equal RGB values when grayscale is 100%', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 5, max: 20 }), // image size
        fc.integer({ min: 0, max: 255 }), // seed
        (imgSize, seed) => {
          const imageData = createTestImageData(imgSize, imgSize, seed);

          // Apply full grayscale
          applyGrayscale(imageData as unknown as ImageData, 100);

          // Check that R = G = B for all pixels
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            // Allow small rounding differences
            expect(Math.abs(r - g)).toBeLessThanOrEqual(1);
            expect(Math.abs(g - b)).toBeLessThanOrEqual(1);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Invert at 100% should produce complementary colors
   */
  it('should produce complementary colors when invert is 100%', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 5, max: 20 }), // image size
        fc.integer({ min: 0, max: 255 }), // seed
        (imgSize, seed) => {
          const imageData = createTestImageData(imgSize, imgSize, seed);
          const original = cloneImageData(imageData);

          // Apply full invert
          applyInvert(imageData as unknown as ImageData, 100);

          // Check that each pixel is inverted (R + R' = 255, etc.)
          const data = imageData.data;
          const origData = original.data;
          for (let i = 0; i < data.length; i += 4) {
            expect(data[i] + origData[i]).toBe(255);     // R
            expect(data[i + 1] + origData[i + 1]).toBe(255); // G
            expect(data[i + 2] + origData[i + 2]).toBe(255); // B
            expect(data[i + 3]).toBe(origData[i + 3]);   // Alpha unchanged
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Double invert should restore original image
   */
  it('should restore original image when invert is applied twice at 100%', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 5, max: 20 }), // image size
        fc.integer({ min: 0, max: 255 }), // seed
        (imgSize, seed) => {
          const imageData = createTestImageData(imgSize, imgSize, seed);
          const original = cloneImageData(imageData);

          // Apply invert twice
          applyInvert(imageData as unknown as ImageData, 100);
          applyInvert(imageData as unknown as ImageData, 100);

          // Should be back to original
          expect(imageDataEquals(original, imageData)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Brightness should clamp values to 0-255 range
   */
  it('should clamp pixel values to valid range after brightness adjustment', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 5, max: 20 }), // image size
        fc.integer({ min: 0, max: 255 }), // seed
        fc.integer({ min: -100, max: 100 }), // brightness
        (imgSize, seed, brightness) => {
          const imageData = createTestImageData(imgSize, imgSize, seed);

          applyBrightness(imageData as unknown as ImageData, brightness);

          // All values should be in valid range
          const data = imageData.data;
          for (let i = 0; i < data.length; i++) {
            expect(data[i]).toBeGreaterThanOrEqual(0);
            expect(data[i]).toBeLessThanOrEqual(255);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Contrast should clamp values to 0-255 range
   */
  it('should clamp pixel values to valid range after contrast adjustment', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 5, max: 20 }), // image size
        fc.integer({ min: 0, max: 255 }), // seed
        fc.integer({ min: -100, max: 100 }), // contrast
        (imgSize, seed, contrast) => {
          const imageData = createTestImageData(imgSize, imgSize, seed);

          applyContrast(imageData as unknown as ImageData, contrast);

          // All values should be in valid range
          const data = imageData.data;
          for (let i = 0; i < data.length; i++) {
            expect(data[i]).toBeGreaterThanOrEqual(0);
            expect(data[i]).toBeLessThanOrEqual(255);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Saturation at -100 should produce grayscale
   */
  it('should produce grayscale when saturation is -100', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 5, max: 20 }), // image size
        fc.integer({ min: 0, max: 255 }), // seed
        (imgSize, seed) => {
          const imageData = createTestImageData(imgSize, imgSize, seed);

          // Apply minimum saturation (should be grayscale)
          applySaturation(imageData as unknown as ImageData, -100);

          // Check that R = G = B for all pixels (grayscale)
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            // Allow small rounding differences
            expect(Math.abs(r - g)).toBeLessThanOrEqual(1);
            expect(Math.abs(g - b)).toBeLessThanOrEqual(1);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Alpha channel should never be modified by filters
   */
  it('should preserve alpha channel for all filter operations', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 5, max: 20 }), // image size
        fc.integer({ min: 0, max: 255 }), // seed
        fc.integer({ min: -100, max: 100 }), // brightness
        fc.integer({ min: -100, max: 100 }), // contrast
        fc.integer({ min: 0, max: 100 }), // grayscale
        (imgSize, seed, brightness, contrast, grayscale) => {
          const imageData = createTestImageData(imgSize, imgSize, seed);
          
          // Store original alpha values
          const originalAlpha: number[] = [];
          for (let i = 3; i < imageData.data.length; i += 4) {
            originalAlpha.push(imageData.data[i]);
          }

          // Apply multiple filters
          applyBrightness(imageData as unknown as ImageData, brightness);
          applyContrast(imageData as unknown as ImageData, contrast);
          applyGrayscale(imageData as unknown as ImageData, grayscale);

          // Check alpha values are unchanged
          let alphaIndex = 0;
          for (let i = 3; i < imageData.data.length; i += 4) {
            expect(imageData.data[i]).toBe(originalAlpha[alphaIndex]);
            alphaIndex++;
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});


/**
 * Feature: image-editor-plugin, Property 7: 滤镜叠加顺序
 * Validates: Requirements 5.4
 *
 * 对于任意多个滤镜的组合，按顺序应用滤镜后，最终效果应该等于按相同顺序依次应用各滤镜的效果。
 */
describe('Filter Property Tests - Filter Stacking Order (Property 7)', () => {
  /**
   * Property 7: 滤镜叠加顺序
   * Requirements: 5.4 - Filters should be applied in consistent order
   */
  it('should produce consistent results when applying multiple filters in sequence', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 10, max: 30 }), // image size
        fc.integer({ min: 0, max: 255 }), // seed
        fc.integer({ min: -50, max: 50 }), // brightness
        fc.integer({ min: -50, max: 50 }), // contrast
        fc.integer({ min: 0, max: 50 }), // grayscale
        (imgSize, seed, brightness, contrast, grayscale) => {
          // Create two identical images
          const imageData1 = createTestImageData(imgSize, imgSize, seed);
          const imageData2 = createTestImageData(imgSize, imgSize, seed);

          // Apply filters in the same order to both
          applyBrightness(imageData1 as unknown as ImageData, brightness);
          applyContrast(imageData1 as unknown as ImageData, contrast);
          applyGrayscale(imageData1 as unknown as ImageData, grayscale);

          applyBrightness(imageData2 as unknown as ImageData, brightness);
          applyContrast(imageData2 as unknown as ImageData, contrast);
          applyGrayscale(imageData2 as unknown as ImageData, grayscale);

          // Results should be identical
          expect(imageDataEquals(imageData1, imageData2)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 7: 滤镜叠加顺序
   * Requirements: 5.4 - Different filter orders may produce different results
   */
  it('should potentially produce different results when filter order changes', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 10, max: 30 }), // image size
        fc.integer({ min: 1, max: 255 }), // seed (non-zero for varied pixels)
        fc.integer({ min: 20, max: 50 }), // significant brightness change
        fc.integer({ min: 20, max: 50 }), // significant contrast change
        (imgSize, seed, brightness, contrast) => {
          // Create two identical images
          const imageData1 = createTestImageData(imgSize, imgSize, seed);
          const imageData2 = createTestImageData(imgSize, imgSize, seed);

          // Apply filters in different orders
          // Order 1: brightness then contrast
          applyBrightness(imageData1 as unknown as ImageData, brightness);
          applyContrast(imageData1 as unknown as ImageData, contrast);

          // Order 2: contrast then brightness
          applyContrast(imageData2 as unknown as ImageData, contrast);
          applyBrightness(imageData2 as unknown as ImageData, brightness);

          // Results may be different (order matters for these filters)
          // We just verify both produce valid results (no crashes, values in range)
          const data1 = imageData1.data;
          const data2 = imageData2.data;
          
          for (let i = 0; i < data1.length; i++) {
            expect(data1[i]).toBeGreaterThanOrEqual(0);
            expect(data1[i]).toBeLessThanOrEqual(255);
            expect(data2[i]).toBeGreaterThanOrEqual(0);
            expect(data2[i]).toBeLessThanOrEqual(255);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 7: 滤镜叠加顺序
   * Requirements: 5.4 - FilterPlugin should apply filters in consistent internal order
   */
  it('should apply filters in consistent order through FilterPlugin', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 10, max: 30 }), // image size
        fc.integer({ min: 0, max: 255 }), // seed
        fc.integer({ min: -30, max: 30 }), // brightness
        fc.integer({ min: -30, max: 30 }), // contrast
        fc.integer({ min: 0, max: 30 }), // grayscale
        (imgSize, seed, brightness, contrast, grayscale) => {
          // Create two identical starting images
          const originalImageData1 = createTestImageData(imgSize, imgSize, seed);
          const originalImageData2 = createTestImageData(imgSize, imgSize, seed);

          // Create two plugins with same starting data
          const mockContext1 = createMockContext(originalImageData1);
          const mockContext2 = createMockContext(originalImageData2);

          const plugin1 = new FilterPlugin();
          const plugin2 = new FilterPlugin();

          plugin1.install(mockContext1);
          plugin2.install(mockContext2);

          // Apply same filters through both plugins
          plugin1.applyFilter({ brightness, contrast, grayscale });
          plugin2.applyFilter({ brightness, contrast, grayscale });

          // Get results
          const result1 = mockContext1.getImageData();
          const result2 = mockContext2.getImageData();

          // Results should be identical
          expect(imageDataEquals(
            { data: new Uint8ClampedArray(result1.data), width: result1.width, height: result1.height },
            { data: new Uint8ClampedArray(result2.data), width: result2.width, height: result2.height }
          )).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 7: 滤镜叠加顺序
   * Requirements: 5.4 - Multiple filter applications should be cumulative
   */
  it('should produce same result whether filters applied together or separately', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 10, max: 30 }), // image size
        fc.integer({ min: 0, max: 255 }), // seed
        fc.integer({ min: -30, max: 30 }), // brightness
        fc.integer({ min: -30, max: 30 }), // contrast
        (imgSize, seed, brightness, contrast) => {
          // Create two identical starting images
          const originalImageData1 = createTestImageData(imgSize, imgSize, seed);
          const originalImageData2 = createTestImageData(imgSize, imgSize, seed);

          // Create two plugins
          const mockContext1 = createMockContext(originalImageData1);
          const mockContext2 = createMockContext(originalImageData2);

          const plugin1 = new FilterPlugin();
          const plugin2 = new FilterPlugin();

          plugin1.install(mockContext1);
          plugin2.install(mockContext2);

          // Plugin 1: Apply all filters at once
          plugin1.applyFilter({ brightness, contrast });

          // Plugin 2: Apply filters one at a time (but in same call, so same internal order)
          plugin2.setBrightness(brightness);
          plugin2.setContrast(contrast);

          // Get results
          const result1 = mockContext1.getImageData();
          const result2 = mockContext2.getImageData();

          // Results should be identical since both use same internal filter order
          expect(imageDataEquals(
            { data: new Uint8ClampedArray(result1.data), width: result1.width, height: result1.height },
            { data: new Uint8ClampedArray(result2.data), width: result2.width, height: result2.height }
          )).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });
});
