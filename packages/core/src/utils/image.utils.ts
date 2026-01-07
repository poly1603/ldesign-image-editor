/**
 * Image utility functions
 * Requirements: 8.5 - Image processing utilities
 */

/** Default timeout for image loading in milliseconds */
const DEFAULT_LOAD_TIMEOUT = 30000;

/**
 * Options for loading an image
 */
export interface LoadImageOptions {
  /** Timeout in milliseconds (default: 30000) */
  timeout?: number;
  /** Cross-origin setting */
  crossOrigin?: string | null;
  /** Abort signal for cancellation */
  signal?: AbortSignal;
}

/**
 * Load an image from URL or HTMLImageElement
 * @param source - Image source URL or HTMLImageElement
 * @param options - Loading options
 * @returns Promise resolving to loaded image element
 */
export function loadImage(
  source: string | HTMLImageElement,
  options: LoadImageOptions = {}
): Promise<HTMLImageElement> {
  const { timeout = DEFAULT_LOAD_TIMEOUT, crossOrigin = 'anonymous', signal } = options;

  return new Promise((resolve, reject) => {
    // Check if already aborted
    if (signal?.aborted) {
      reject(new DOMException('Image loading aborted', 'AbortError'));
      return;
    }

    if (source instanceof HTMLImageElement) {
      if (source.complete && source.naturalWidth > 0) {
        resolve(source);
      } else if (source.complete && source.naturalWidth === 0) {
        reject(new Error('Failed to load image: invalid image element'));
      } else {
        source.onload = () => resolve(source);
        source.onerror = () => reject(new Error('Failed to load image'));
      }
      return;
    }

    // Validate source URL
    if (!source || typeof source !== 'string') {
      reject(new Error('Invalid image source: must be a non-empty string or HTMLImageElement'));
      return;
    }

    const img = new Image();
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let isSettled = false;

    const cleanup = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      img.onload = null;
      img.onerror = null;
    };

    const settle = (error?: Error) => {
      if (isSettled) return;
      isSettled = true;
      cleanup();
      if (error) {
        reject(error);
      } else {
        resolve(img);
      }
    };

    // Setup abort handler
    if (signal) {
      signal.addEventListener('abort', () => {
        settle(new DOMException('Image loading aborted', 'AbortError'));
      }, { once: true });
    }

    // Setup timeout
    if (timeout > 0) {
      timeoutId = setTimeout(() => {
        settle(new Error(`Image loading timed out after ${timeout}ms: ${source}`));
      }, timeout);
    }

    if (crossOrigin !== null) {
      img.crossOrigin = crossOrigin;
    }
    img.onload = () => settle();
    img.onerror = () => settle(new Error(`Failed to load image: ${source}`));
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
 * @param srcWidth - Source width (must be positive)
 * @param srcHeight - Source height (must be positive)
 * @param maxWidth - Maximum width (must be positive)
 * @param maxHeight - Maximum height (must be positive)
 * @returns Scaled dimensions
 * @throws Error if any dimension is not positive
 */
export function calculateAspectRatioFit(
  srcWidth: number,
  srcHeight: number,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number } {
  // Validate inputs
  if (srcWidth <= 0 || srcHeight <= 0) {
    throw new Error(`Invalid source dimensions: ${srcWidth}x${srcHeight}. Both must be positive.`);
  }
  if (maxWidth <= 0 || maxHeight <= 0) {
    throw new Error(`Invalid max dimensions: ${maxWidth}x${maxHeight}. Both must be positive.`);
  }

  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  return {
    width: Math.round(srcWidth * ratio),
    height: Math.round(srcHeight * ratio),
  };
}

/**
 * Safely calculate scaled dimensions (returns original if invalid)
 * @param srcWidth - Source width
 * @param srcHeight - Source height  
 * @param maxWidth - Maximum width
 * @param maxHeight - Maximum height
 * @returns Scaled dimensions or original if inputs are invalid
 */
export function safeCalculateAspectRatioFit(
  srcWidth: number,
  srcHeight: number,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number } {
  if (srcWidth <= 0 || srcHeight <= 0 || maxWidth <= 0 || maxHeight <= 0) {
    return { width: Math.max(1, srcWidth), height: Math.max(1, srcHeight) };
  }
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  return {
    width: Math.max(1, Math.round(srcWidth * ratio)),
    height: Math.max(1, Math.round(srcHeight * ratio)),
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
 * @param ctx - Canvas 2D context
 * @param x - Start X coordinate (default: 0)
 * @param y - Start Y coordinate (default: 0)
 * @param width - Width (default: canvas width)
 * @param height - Height (default: canvas height)
 * @returns ImageData from the specified region
 * @throws Error if dimensions are invalid
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
  
  // Validate dimensions
  if (w <= 0 || h <= 0) {
    throw new Error(`Invalid dimensions for getImageData: ${w}x${h}. Both must be positive.`);
  }
  
  // Clamp x and y to valid range
  const clampedX = Math.max(0, Math.min(x, ctx.canvas.width - 1));
  const clampedY = Math.max(0, Math.min(y, ctx.canvas.height - 1));
  
  // Clamp width and height to available space
  const clampedW = Math.min(w, ctx.canvas.width - clampedX);
  const clampedH = Math.min(h, ctx.canvas.height - clampedY);
  
  if (clampedW <= 0 || clampedH <= 0) {
    throw new Error('Region is outside canvas bounds');
  }
  
  return ctx.getImageData(clampedX, clampedY, clampedW, clampedH);
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
  format: string = 'png',
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
  format: string = 'png',
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
 * @param sourceCanvas - Source canvas to scale
 * @param width - Target width (must be positive)
 * @param height - Target height (must be positive)
 * @returns New canvas with scaled content
 * @throws Error if dimensions are invalid or context cannot be obtained
 */
export function createScaledCanvas(
  sourceCanvas: HTMLCanvasElement,
  width: number,
  height: number
): HTMLCanvasElement {
  // Validate dimensions
  if (width <= 0 || height <= 0) {
    throw new Error(`Invalid dimensions for scaled canvas: ${width}x${height}. Both must be positive.`);
  }
  
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(width);
  canvas.height = Math.round(height);
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get 2D context for scaled canvas');
  }
  
  // Use high-quality scaling
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(sourceCanvas, 0, 0, canvas.width, canvas.height);
  
  return canvas;
}

/**
 * Crop a region from a canvas
 * @param sourceCanvas - Source canvas
 * @param x - X coordinate of crop region
 * @param y - Y coordinate of crop region
 * @param width - Width of crop region
 * @param height - Height of crop region
 * @returns New canvas with cropped content
 */
export function cropCanvas(
  sourceCanvas: HTMLCanvasElement,
  x: number,
  y: number,
  width: number,
  height: number
): HTMLCanvasElement {
  if (width <= 0 || height <= 0) {
    throw new Error(`Invalid crop dimensions: ${width}x${height}. Both must be positive.`);
  }
  
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(width);
  canvas.height = Math.round(height);
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get 2D context for cropped canvas');
  }
  
  ctx.drawImage(
    sourceCanvas,
    x, y, width, height,
    0, 0, width, height
  );
  
  return canvas;
}

/**
 * Rotate a canvas by specified degrees
 * @param sourceCanvas - Source canvas
 * @param degrees - Rotation angle in degrees (90, 180, 270, or any value)
 * @returns New canvas with rotated content
 */
export function rotateCanvas(
  sourceCanvas: HTMLCanvasElement,
  degrees: number
): HTMLCanvasElement {
  const radians = (degrees * Math.PI) / 180;
  const sin = Math.abs(Math.sin(radians));
  const cos = Math.abs(Math.cos(radians));
  
  const srcWidth = sourceCanvas.width;
  const srcHeight = sourceCanvas.height;
  
  // Calculate new dimensions
  const newWidth = Math.round(srcWidth * cos + srcHeight * sin);
  const newHeight = Math.round(srcWidth * sin + srcHeight * cos);
  
  const canvas = document.createElement('canvas');
  canvas.width = newWidth;
  canvas.height = newHeight;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get 2D context for rotated canvas');
  }
  
  ctx.translate(newWidth / 2, newHeight / 2);
  ctx.rotate(radians);
  ctx.drawImage(sourceCanvas, -srcWidth / 2, -srcHeight / 2);
  
  return canvas;
}

/**
 * Flip a canvas horizontally or vertically
 * @param sourceCanvas - Source canvas
 * @param direction - 'horizontal' or 'vertical'
 * @returns New canvas with flipped content
 */
export function flipCanvas(
  sourceCanvas: HTMLCanvasElement,
  direction: 'horizontal' | 'vertical'
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = sourceCanvas.width;
  canvas.height = sourceCanvas.height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get 2D context for flipped canvas');
  }
  
  if (direction === 'horizontal') {
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
  } else {
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);
  }
  
  ctx.drawImage(sourceCanvas, 0, 0);
  
  return canvas;
}
