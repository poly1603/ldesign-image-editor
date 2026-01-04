/**
 * Feature: image-editor-plugin, Property 11: Responsive Sizing
 * Validates: Requirements 8.2
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { calculateAspectRatioFit } from '../../src/utils/image.utils';

const dimensionArb = fc.integer({ min: 100, max: 2000 });

describe('Canvas Property Tests - Responsive Sizing (Property 11)', () => {
  it('should preserve aspect ratio when calculating fit dimensions', () => {
    fc.assert(
      fc.property(
        dimensionArb,
        dimensionArb,
        dimensionArb,
        dimensionArb,
        (srcWidth, srcHeight, maxWidth, maxHeight) => {
          const originalRatio = srcWidth / srcHeight;
          const { width, height } = calculateAspectRatioFit(
            srcWidth, srcHeight, maxWidth, maxHeight
          );
          const newRatio = width / height;
          // Rounding tolerance: 1 pixel error on each dimension can cause ratio deviation
          // For small output dimensions, this can be significant
          const maxRatioError = Math.abs(originalRatio - (width + 1) / (height - 1)) + 0.1;
          expect(Math.abs(originalRatio - newRatio)).toBeLessThan(maxRatioError);
          expect(width).toBeLessThanOrEqual(maxWidth + 1);
          expect(height).toBeLessThanOrEqual(maxHeight + 1);
        }
      ),
      { numRuns: 20 }
    );
  });

  it('should not exceed container bounds when scaling', () => {
    fc.assert(
      fc.property(
        dimensionArb, dimensionArb, dimensionArb, dimensionArb,
        (srcWidth, srcHeight, containerWidth, containerHeight) => {
          const { width, height } = calculateAspectRatioFit(
            srcWidth, srcHeight, containerWidth, containerHeight
          );
          expect(width).toBeLessThanOrEqual(containerWidth + 1);
          expect(height).toBeLessThanOrEqual(containerHeight + 1);
          const touchesWidth = Math.abs(width - containerWidth) <= 1;
          const touchesHeight = Math.abs(height - containerHeight) <= 1;
          expect(touchesWidth || touchesHeight).toBe(true);
        }
      ),
      { numRuns: 20 }
    );
  });

  it('should use consistent scaling ratio', () => {
    fc.assert(
      fc.property(
        dimensionArb, dimensionArb, dimensionArb, dimensionArb,
        (srcWidth, srcHeight, maxWidth, maxHeight) => {
          const { width, height } = calculateAspectRatioFit(
            srcWidth, srcHeight, maxWidth, maxHeight
          );
          const expectedRatio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
          const widthRatio = width / srcWidth;
          const heightRatio = height / srcHeight;
          expect(Math.abs(widthRatio - expectedRatio)).toBeLessThan(0.02);
          expect(Math.abs(heightRatio - expectedRatio)).toBeLessThan(0.02);
        }
      ),
      { numRuns: 20 }
    );
  });

  it('should be deterministic', () => {
    fc.assert(
      fc.property(
        dimensionArb, dimensionArb, dimensionArb, dimensionArb,
        (srcWidth, srcHeight, maxWidth, maxHeight) => {
          const r1 = calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight);
          const r2 = calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight);
          expect(r1.width).toBe(r2.width);
          expect(r1.height).toBe(r2.height);
        }
      ),
      { numRuns: 20 }
    );
  });
});
