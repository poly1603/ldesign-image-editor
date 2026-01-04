/**
 * Unit tests for Image utility functions
 * Requirements: 8.5
 * Note: Canvas/ImageData-dependent tests are skipped in jsdom environment
 */

import { describe, it, expect } from 'vitest';
import {
  getImageDimensions,
  calculateAspectRatioFit,
} from '../../src/utils/image.utils';

describe('Image Utils', () => {
  describe('getImageDimensions', () => {
    it('should return image dimensions', () => {
      const img = new Image();
      Object.defineProperty(img, 'naturalWidth', { value: 800 });
      Object.defineProperty(img, 'naturalHeight', { value: 600 });

      const dimensions = getImageDimensions(img);
      expect(dimensions.width).toBe(800);
      expect(dimensions.height).toBe(600);
    });

    it('should fallback to width/height if naturalWidth not available', () => {
      const img = new Image();
      Object.defineProperty(img, 'width', { value: 400, writable: true });
      Object.defineProperty(img, 'height', { value: 300, writable: true });
      Object.defineProperty(img, 'naturalWidth', { value: 0 });
      Object.defineProperty(img, 'naturalHeight', { value: 0 });

      const dimensions = getImageDimensions(img);
      expect(dimensions.width).toBe(400);
      expect(dimensions.height).toBe(300);
    });
  });

  describe('calculateAspectRatioFit', () => {
    it('should scale down to fit max dimensions', () => {
      const result = calculateAspectRatioFit(800, 600, 400, 300);
      expect(result.width).toBe(400);
      expect(result.height).toBe(300);
    });

    it('should maintain aspect ratio when width is limiting', () => {
      const result = calculateAspectRatioFit(800, 400, 400, 400);
      expect(result.width).toBe(400);
      expect(result.height).toBe(200);
    });

    it('should maintain aspect ratio when height is limiting', () => {
      const result = calculateAspectRatioFit(400, 800, 400, 400);
      expect(result.width).toBe(200);
      expect(result.height).toBe(400);
    });

    it('should handle square images', () => {
      const result = calculateAspectRatioFit(500, 500, 200, 200);
      expect(result.width).toBe(200);
      expect(result.height).toBe(200);
    });

    it('should handle very wide images', () => {
      const result = calculateAspectRatioFit(1000, 100, 500, 500);
      expect(result.width).toBe(500);
      expect(result.height).toBe(50);
    });

    it('should handle very tall images', () => {
      const result = calculateAspectRatioFit(100, 1000, 500, 500);
      expect(result.width).toBe(50);
      expect(result.height).toBe(500);
    });
  });
});
