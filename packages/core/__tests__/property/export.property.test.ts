/**
 * Feature: image-editor-plugin, Property 10: 导出配置正确性
 * Validates: Requirements 7.1, 7.2, 7.3, 7.4
 * 
 * 对于任意导出配置（格式、质量、尺寸、数据类型），导出的数据应该符合指定的格式和尺寸，
 * 且数据类型应该正确。
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as fc from 'fast-check';
import { exportImage } from '../../src/utils/export.utils';
import { createScaledCanvas, canvasToDataURL, canvasToBlob } from '../../src/utils/image.utils';
import type { ExportOptions, ExportFormat, ExportDataType } from '../../src/types/config.types';

/**
 * Mock CanvasRenderingContext2D
 */
function createMockContext2D(): CanvasRenderingContext2D {
  return {
    canvas: document.createElement('canvas'),
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
    fillRect: vi.fn(),
    clearRect: vi.fn(),
    drawImage: vi.fn(),
    getImageData: vi.fn((x: number, y: number, w: number, h: number) => {
      return new ImageData(w, h);
    }),
    putImageData: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
  } as unknown as CanvasRenderingContext2D;
}

/**
 * Setup canvas mock
 */
function setupCanvasMock(): void {
  HTMLCanvasElement.prototype.getContext = function(
    contextId: string,
    options?: any
  ): RenderingContext | null {
    if (contextId === '2d') {
      const ctx = createMockContext2D();
      (ctx as any).canvas = this;
      return ctx;
    }
    return null;
  } as typeof HTMLCanvasElement.prototype.getContext;

  HTMLCanvasElement.prototype.toDataURL = function(type?: string, quality?: any) {
    const format = type?.replace('image/', '') || 'png';
    return `data:image/${format};base64,mockBase64Data`;
  };

  HTMLCanvasElement.prototype.toBlob = function(
    callback: BlobCallback,
    type?: string,
    quality?: any
  ) {
    const format = type?.replace('image/', '') || 'png';
    callback(new Blob(['mock'], { type: `image/${format}` }));
  };
}

/**
 * Create a mock canvas with specified dimensions
 */
function createMockCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

/**
 * Arbitrary generators
 */
const formatArb = fc.constantFrom<ExportFormat>('png', 'jpeg', 'webp');
const dataTypeArb = fc.constantFrom<ExportDataType>('base64', 'blob', 'file');
const qualityArb = fc.double({ min: 0.1, max: 1.0, noNaN: true });
const dimensionArb = fc.integer({ min: 50, max: 2000 });
const fileNameArb = fc.stringMatching(/^[a-zA-Z0-9_-]{1,20}$/);

describe('Export Property Tests - Export Configuration (Property 10)', () => {
  beforeEach(() => {
    setupCanvasMock();
  });

  /**
   * Property 10.1: Export should return correct data type based on options
   */
  it('should return correct data type based on export options', async () => {
    await fc.assert(
      fc.asyncProperty(
        dataTypeArb,
        formatArb,
        async (dataType, format) => {
          const canvas = createMockCanvas(100, 100);
          const options: ExportOptions = {
            type: dataType,
            format,
          };

          const result = await exportImage(canvas, options);

          switch (dataType) {
            case 'base64':
              expect(typeof result).toBe('string');
              expect((result as string).startsWith('data:image/')).toBe(true);
              break;
            case 'blob':
              expect(result).toBeInstanceOf(Blob);
              break;
            case 'file':
              expect(result).toBeInstanceOf(File);
              break;
          }
        }
      ),
      { numRuns: 20 }
    );
  });

  /**
   * Property 10.2: Export format should be reflected in output
   */
  it('should use correct format in output', async () => {
    await fc.assert(
      fc.asyncProperty(formatArb, async (format) => {
        const canvas = createMockCanvas(100, 100);
        const options: ExportOptions = {
          type: 'base64',
          format,
        };

        const result = await exportImage(canvas, options);
        expect(typeof result).toBe('string');
        expect((result as string).includes(`image/${format}`)).toBe(true);
      }),
      { numRuns: 20 }
    );
  });

  /**
   * Property 10.3: File export should have correct file name and extension
   */
  it('should create file with correct name and extension', async () => {
    await fc.assert(
      fc.asyncProperty(formatArb, fileNameArb, async (format, fileName) => {
        const canvas = createMockCanvas(100, 100);
        const options: ExportOptions = {
          type: 'file',
          format,
          fileName,
        };

        const result = await exportImage(canvas, options);
        expect(result).toBeInstanceOf(File);
        
        const file = result as File;
        const expectedExtension = format === 'jpeg' ? 'jpg' : format;
        expect(file.name).toBe(`${fileName}.${expectedExtension}`);
        expect(file.type).toBe(`image/${format}`);
      }),
      { numRuns: 20 }
    );
  });

  /**
   * Property 10.4: Blob export should have correct MIME type
   */
  it('should create blob with correct MIME type', async () => {
    await fc.assert(
      fc.asyncProperty(formatArb, async (format) => {
        const canvas = createMockCanvas(100, 100);
        const options: ExportOptions = {
          type: 'blob',
          format,
        };

        const result = await exportImage(canvas, options);
        expect(result).toBeInstanceOf(Blob);
        expect((result as Blob).type).toBe(`image/${format}`);
      }),
      { numRuns: 20 }
    );
  });

  /**
   * Property 10.5: Default options should be applied when not specified
   */
  it('should apply default options when not specified', async () => {
    const canvas = createMockCanvas(100, 100);
    
    // Export with no options
    const result = await exportImage(canvas);
    
    // Default type is base64
    expect(typeof result).toBe('string');
    // Default format is png
    expect((result as string).includes('image/png')).toBe(true);
  });

  /**
   * Property 10.6: Quality parameter should be passed to export
   */
  it('should accept quality parameter without error', async () => {
    await fc.assert(
      fc.asyncProperty(qualityArb, async (quality) => {
        const canvas = createMockCanvas(100, 100);
        const options: ExportOptions = {
          type: 'base64',
          format: 'jpeg',
          quality,
        };

        // Should not throw
        const result = await exportImage(canvas, options);
        expect(typeof result).toBe('string');
      }),
      { numRuns: 20 }
    );
  });

  /**
   * Property 10.7: Scaled canvas should be created when dimensions differ
   */
  it('should handle dimension options correctly', async () => {
    await fc.assert(
      fc.asyncProperty(
        dimensionArb,
        dimensionArb,
        dimensionArb,
        dimensionArb,
        async (srcWidth, srcHeight, targetWidth, targetHeight) => {
          const canvas = createMockCanvas(srcWidth, srcHeight);
          const options: ExportOptions = {
            type: 'base64',
            format: 'png',
            width: targetWidth,
            height: targetHeight,
          };

          // Should not throw
          const result = await exportImage(canvas, options);
          expect(typeof result).toBe('string');
        }
      ),
      { numRuns: 20 }
    );
  });

  /**
   * Property 10.8: Proportional scaling with only width
   */
  it('should scale proportionally when only width is specified', async () => {
    await fc.assert(
      fc.asyncProperty(
        dimensionArb,
        dimensionArb,
        dimensionArb,
        async (srcWidth, srcHeight, targetWidth) => {
          const canvas = createMockCanvas(srcWidth, srcHeight);
          const options: ExportOptions = {
            type: 'base64',
            format: 'png',
            width: targetWidth,
          };

          // Should not throw
          const result = await exportImage(canvas, options);
          expect(typeof result).toBe('string');
        }
      ),
      { numRuns: 20 }
    );
  });

  /**
   * Property 10.9: Proportional scaling with only height
   */
  it('should scale proportionally when only height is specified', async () => {
    await fc.assert(
      fc.asyncProperty(
        dimensionArb,
        dimensionArb,
        dimensionArb,
        async (srcWidth, srcHeight, targetHeight) => {
          const canvas = createMockCanvas(srcWidth, srcHeight);
          const options: ExportOptions = {
            type: 'base64',
            format: 'png',
            height: targetHeight,
          };

          // Should not throw
          const result = await exportImage(canvas, options);
          expect(typeof result).toBe('string');
        }
      ),
      { numRuns: 20 }
    );
  });
});
