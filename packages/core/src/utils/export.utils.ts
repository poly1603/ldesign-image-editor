/**
 * Export utilities - Image export functionality
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5
 * 
 * Note: Full implementation in task 5.6
 */

import type { ExportOptions } from '../types/config.types';
import { DEFAULT_EXPORT_OPTIONS } from '../constants/defaults';
import { canvasToDataURL, canvasToBlob, createScaledCanvas } from './image.utils';

/**
 * Export image from canvas with specified options
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5
 * @param canvas - Source canvas element
 * @param options - Export options
 * @returns Promise with exported data (base64, Blob, or File)
 */
export async function exportImage(
  canvas: HTMLCanvasElement,
  options?: ExportOptions
): Promise<string | Blob | File> {
  const opts = {
    ...DEFAULT_EXPORT_OPTIONS,
    ...options,
  };

  // Determine target canvas (scaled or original)
  let targetCanvas = canvas;
  if (opts.width && opts.height && (opts.width !== canvas.width || opts.height !== canvas.height)) {
    targetCanvas = createScaledCanvas(canvas, opts.width, opts.height);
  } else if (opts.width && !opts.height) {
    // Scale proportionally based on width
    const ratio = opts.width / canvas.width;
    const height = Math.round(canvas.height * ratio);
    targetCanvas = createScaledCanvas(canvas, opts.width, height);
  } else if (opts.height && !opts.width) {
    // Scale proportionally based on height
    const ratio = opts.height / canvas.height;
    const width = Math.round(canvas.width * ratio);
    targetCanvas = createScaledCanvas(canvas, width, opts.height);
  }

  // Export based on type
  switch (opts.type) {
    case 'base64':
      return canvasToDataURL(targetCanvas, opts.format, opts.quality);

    case 'blob':
      return canvasToBlob(targetCanvas, opts.format, opts.quality);

    case 'file': {
      const blob = await canvasToBlob(targetCanvas, opts.format, opts.quality);
      const extension = opts.format === 'jpeg' ? 'jpg' : opts.format;
      const fileName = `${opts.fileName || 'image'}.${extension}`;
      return new File([blob], fileName, { type: `image/${opts.format}` });
    }

    default:
      return canvasToDataURL(targetCanvas, opts.format, opts.quality);
  }
}
