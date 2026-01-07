/**
 * Export utilities - Image export functionality
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5
 * 
 * Supports multiple formats: PNG, JPEG/JPG, WebP, BMP, GIF
 * Supports multiple data types: base64, blob, file, arraybuffer
 */

import type { ExportOptions, ExportFormat } from '../types/config.types';
import { DEFAULT_EXPORT_OPTIONS } from '../constants/defaults';
import { canvasToDataURL, canvasToBlob } from './image.utils';

/**
 * Normalize export format (jpg -> jpeg)
 */
function normalizeFormat(format: ExportFormat): 'png' | 'jpeg' | 'webp' | 'bmp' | 'gif' {
  if (format === 'jpg') return 'jpeg';
  return format;
}

/**
 * Get file extension for format
 */
function getExtension(format: ExportFormat): string {
  if (format === 'jpeg') return 'jpg';
  return format;
}

/**
 * Get MIME type for format
 */
export function getMimeType(format: ExportFormat): string {
  const normalized = normalizeFormat(format);
  return `image/${normalized}`;
}

/**
 * Check if format supports transparency
 */
export function supportsTransparency(format: ExportFormat): boolean {
  return format === 'png' || format === 'webp' || format === 'gif';
}

/**
 * Check if format supports quality setting
 */
export function supportsQuality(format: ExportFormat): boolean {
  const normalized = normalizeFormat(format);
  return normalized === 'jpeg' || normalized === 'webp';
}

/**
 * Prepare canvas for export (handle background, scaling, etc.)
 */
function prepareCanvas(
  canvas: HTMLCanvasElement,
  options: Required<ExportOptions>
): HTMLCanvasElement {
  let targetCanvas = canvas;
  const needsScaling = 
    (options.width && options.height && (options.width !== canvas.width || options.height !== canvas.height)) ||
    (options.width && !options.height) ||
    (options.height && !options.width);
  
  // Calculate target dimensions
  let targetWidth = canvas.width;
  let targetHeight = canvas.height;
  
  if (options.width && options.height) {
    targetWidth = options.width;
    targetHeight = options.height;
  } else if (options.width && !options.height) {
    const ratio = options.width / canvas.width;
    targetWidth = options.width;
    targetHeight = Math.round(canvas.height * ratio);
  } else if (options.height && !options.width) {
    const ratio = options.height / canvas.height;
    targetWidth = Math.round(canvas.width * ratio);
    targetHeight = options.height;
  }
  
  // Check if we need to handle background (for formats that don't support transparency)
  const needsBackground = !supportsTransparency(options.format) || options.preserveTransparency === false;
  
  if (needsScaling || needsBackground) {
    targetCanvas = document.createElement('canvas');
    targetCanvas.width = targetWidth;
    targetCanvas.height = targetHeight;
    const ctx = targetCanvas.getContext('2d');
    
    if (ctx) {
      // Fill background if needed
      if (needsBackground) {
        ctx.fillStyle = options.backgroundColor || '#ffffff';
        ctx.fillRect(0, 0, targetWidth, targetHeight);
      }
      
      // Draw source canvas
      ctx.drawImage(canvas, 0, 0, targetWidth, targetHeight);
    }
  }
  
  return targetCanvas;
}

/**
 * Generate filename with optional timestamp
 */
function generateFilename(baseName: string, format: ExportFormat, addTimestamp: boolean): string {
  const extension = getExtension(format);
  const timestamp = addTimestamp ? `-${Date.now()}` : '';
  return `${baseName}${timestamp}.${extension}`;
}

/**
 * Export image from canvas with specified options
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5
 * @param canvas - Source canvas element
 * @param options - Export options
 * @returns Promise with exported data (base64, Blob, File, or ArrayBuffer)
 */
export async function exportImage(
  canvas: HTMLCanvasElement,
  options?: ExportOptions
): Promise<string | Blob | File | ArrayBuffer> {
  const opts = {
    ...DEFAULT_EXPORT_OPTIONS,
    ...options,
  } as Required<ExportOptions>;
  
  // Normalize format
  const format = normalizeFormat(opts.format);
  
  // Prepare canvas (scaling, background, etc.)
  const targetCanvas = prepareCanvas(canvas, opts);
  
  // Handle max file size constraint (reduce quality iteratively)
  let quality = opts.quality;
  if (opts.maxFileSize && supportsQuality(opts.format)) {
    let blob = await canvasToBlob(targetCanvas, format, quality);
    while (blob.size > opts.maxFileSize && quality > 0.1) {
      quality -= 0.1;
      blob = await canvasToBlob(targetCanvas, format, quality);
    }
  }

  // Export based on type
  switch (opts.type) {
    case 'base64':
      return canvasToDataURL(targetCanvas, format, quality);

    case 'blob':
      return canvasToBlob(targetCanvas, format, quality);

    case 'file': {
      const blob = await canvasToBlob(targetCanvas, format, quality);
      const fileName = generateFilename(opts.fileName || 'image', opts.format, opts.addTimestamp ?? false);
      return new File([blob], fileName, { type: getMimeType(opts.format) });
    }
    
    case 'arraybuffer': {
      const blob = await canvasToBlob(targetCanvas, format, quality);
      return blob.arrayBuffer();
    }

    default:
      return canvasToDataURL(targetCanvas, format, quality);
  }
}

/**
 * Quick export to PNG base64
 */
export function exportToPNG(canvas: HTMLCanvasElement): string {
  return canvasToDataURL(canvas, 'png', 1);
}

/**
 * Quick export to JPEG base64
 */
export function exportToJPEG(canvas: HTMLCanvasElement, quality = 0.92): string {
  // Create canvas with white background for JPEG
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  const ctx = tempCanvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(canvas, 0, 0);
  }
  return canvasToDataURL(tempCanvas, 'jpeg', quality);
}

/**
 * Quick export to WebP base64
 */
export function exportToWebP(canvas: HTMLCanvasElement, quality = 0.92): string {
  return canvasToDataURL(canvas, 'webp', quality);
}

/**
 * Download image from canvas
 * @param canvas - Source canvas
 * @param filename - Download filename (without extension)
 * @param options - Export options
 */
export async function downloadImage(
  canvas: HTMLCanvasElement,
  filename?: string,
  options?: ExportOptions
): Promise<void> {
  const opts: ExportOptions = {
    format: 'png',
    quality: 0.92,
    ...options,
    type: 'base64',
  };
  
  const dataUrl = await exportImage(canvas, opts) as string;
  const extension = getExtension(opts.format || 'png');
  const timestamp = opts.addTimestamp ? `-${Date.now()}` : '';
  const downloadName = filename 
    ? `${filename}${timestamp}.${extension}`
    : `image${timestamp}.${extension}`;
  
  // Create download link
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = downloadName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Check if clipboard API is supported
 * @returns True if Clipboard API with write support is available
 */
export function isClipboardSupported(): boolean {
  return typeof navigator !== 'undefined' &&
    'clipboard' in navigator &&
    typeof navigator.clipboard.write === 'function';
}

/**
 * Copy image to clipboard (as PNG)
 * @param canvas - Source canvas
 * @returns Promise that resolves when copied
 * @throws Error if clipboard access is denied or not supported
 */
export async function copyImageToClipboard(canvas: HTMLCanvasElement): Promise<void> {
  // Check if we're in a secure context (required for clipboard API)
  if (typeof window !== 'undefined' && !window.isSecureContext) {
    throw new Error('Clipboard API requires a secure context (HTTPS)');
  }
  
  // Try modern Clipboard API first
  if (isClipboardSupported()) {
    try {
      const blob = await canvasToBlob(canvas, 'png', 1);
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      return;
    } catch (err) {
      // If permission denied, throw specific error
      if (err instanceof DOMException && err.name === 'NotAllowedError') {
        throw new Error('Clipboard access denied. Please allow clipboard permissions.');
      }
      // Otherwise fall through to fallback
    }
  }
  
  // Fallback: try to copy as text (base64)
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      const dataUrl = canvasToDataURL(canvas, 'png', 1);
      await navigator.clipboard.writeText(dataUrl);
      return;
    } catch (fallbackErr) {
      throw new Error('Failed to copy image to clipboard. Please try again or use the download option.');
    }
  }
  
  throw new Error('Clipboard API is not supported in this browser');
}

/**
 * Get estimated file size for export options
 * @param canvas - Source canvas
 * @param options - Export options
 * @returns Estimated size in bytes
 */
export async function estimateFileSize(
  canvas: HTMLCanvasElement,
  options?: ExportOptions
): Promise<number> {
  const blob = await exportImage(canvas, { ...options, type: 'blob' }) as Blob;
  return blob.size;
}

/**
 * Format file size for display
 * @param bytes - Size in bytes
 * @returns Formatted string (e.g., "1.5 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Get image dimensions info
 * @param canvas - Source canvas
 * @returns Dimension info object
 */
export function getImageInfo(canvas: HTMLCanvasElement): {
  width: number;
  height: number;
  aspectRatio: number;
  megapixels: number;
  orientation: 'landscape' | 'portrait' | 'square';
} {
  const width = canvas.width;
  const height = canvas.height;
  const aspectRatio = height > 0 ? width / height : 1;
  
  let orientation: 'landscape' | 'portrait' | 'square';
  if (Math.abs(aspectRatio - 1) < 0.01) {
    orientation = 'square';
  } else if (aspectRatio > 1) {
    orientation = 'landscape';
  } else {
    orientation = 'portrait';
  }
  
  return {
    width,
    height,
    aspectRatio,
    megapixels: (width * height) / 1000000,
    orientation,
  };
}

/**
 * Check if a format is supported by the browser
 * @param format - Export format to check
 * @returns True if format is supported
 */
export function isFormatSupported(format: ExportFormat): boolean {
  if (typeof document === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  const mimeType = getMimeType(format);
  const dataUrl = canvas.toDataURL(mimeType);
  
  // If format is not supported, browser returns PNG
  return dataUrl.startsWith(`data:${mimeType}`);
}

/**
 * Get all supported export formats
 * @returns Array of supported formats
 */
export function getSupportedFormats(): ExportFormat[] {
  const allFormats: ExportFormat[] = ['png', 'jpeg', 'webp', 'bmp', 'gif'];
  return allFormats.filter(isFormatSupported);
}

/**
 * Convert data URL to Blob
 * @param dataUrl - Data URL string
 * @returns Blob
 */
export function dataUrlToBlob(dataUrl: string): Blob {
  const parts = dataUrl.split(',');
  if (parts.length !== 2) {
    throw new Error('Invalid data URL format');
  }
  
  const mimeMatch = parts[0].match(/:(.*?);/);
  if (!mimeMatch) {
    throw new Error('Could not extract MIME type from data URL');
  }
  
  const mimeType = mimeMatch[1];
  const byteString = atob(parts[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }
  
  return new Blob([arrayBuffer], { type: mimeType });
}

/**
 * Convert Blob to data URL
 * @param blob - Blob to convert
 * @returns Promise resolving to data URL
 */
export function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to convert blob to data URL'));
    reader.readAsDataURL(blob);
  });
}
