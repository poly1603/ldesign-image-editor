/**
 * Image utility functions
 * Requirements: 8.5 - Image processing utilities
 */

/**
 * Load an image from URL or HTMLImageElement
 */
export function loadImage(
  source: string | HTMLImageElement
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    if (source instanceof HTMLImageElement) {
      if (source.complete) {
        resolve(source);
      } else {
        source.onload = () => resolve(source);
        source.onerror = () => reject(new Error('Failed to load image'));
      }
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${source}`));
    img.src = source;
  });
}

/**
 * Get image dimensions
 */
export function getImageDimensions(
  image: HTMLImageElement
): { width: number; height: number } {
  return {
    width: image.naturalWidth || image.width,
    height: image.naturalHeight || image.height,
  };
}

/**
 * Calculate scaled dimensions while maintaining aspect ratio
 */
export function calculateAspectRatioFit(
  srcWidth: number,
  srcHeight: number,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number } {
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  return {
    width: Math.round(srcWidth * ratio),
    height: Math.round(srcHeight * ratio),
  };
}


/**
 * Draw image to canvas context
 */
export function drawImageToCanvas(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number = 0,
  y: number = 0,
  width?: number,
  height?: number
): void {
  if (width !== undefined && height !== undefined) {
    ctx.drawImage(image, x, y, width, height);
  } else {
    ctx.drawImage(image, x, y);
  }
}

/**
 * Get ImageData from canvas
 */
export function getImageData(
  ctx: CanvasRenderingContext2D,
  x: number = 0,
  y: number = 0,
  width?: number,
  height?: number
): ImageData {
  const w = width ?? ctx.canvas.width;
  const h = height ?? ctx.canvas.height;
  return ctx.getImageData(x, y, w, h);
}

/**
 * Put ImageData to canvas
 */
export function putImageData(
  ctx: CanvasRenderingContext2D,
  imageData: ImageData,
  x: number = 0,
  y: number = 0
): void {
  ctx.putImageData(imageData, x, y);
}

/**
 * Clone ImageData
 */
export function cloneImageData(imageData: ImageData): ImageData {
  return new ImageData(
    new Uint8ClampedArray(imageData.data),
    imageData.width,
    imageData.height
  );
}

/**
 * Create empty ImageData
 */
export function createImageData(
  width: number,
  height: number
): ImageData {
  return new ImageData(width, height);
}

/**
 * Convert canvas to data URL
 */
export function canvasToDataURL(
  canvas: HTMLCanvasElement,
  format: 'png' | 'jpeg' | 'webp' = 'png',
  quality: number = 0.92
): string {
  const mimeType = `image/${format}`;
  return canvas.toDataURL(mimeType, quality);
}

/**
 * Convert canvas to Blob
 */
export function canvasToBlob(
  canvas: HTMLCanvasElement,
  format: 'png' | 'jpeg' | 'webp' = 'png',
  quality: number = 0.92
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const mimeType = `image/${format}`;
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to convert canvas to blob'));
        }
      },
      mimeType,
      quality
    );
  });
}

/**
 * Create a scaled canvas
 */
export function createScaledCanvas(
  sourceCanvas: HTMLCanvasElement,
  width: number,
  height: number
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.drawImage(sourceCanvas, 0, 0, width, height);
  }
  return canvas;
}
