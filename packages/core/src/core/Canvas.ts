/**
 * Canvas class - Manages canvas creation, sizing, and image data
 * Requirements: 1.1, 8.2
 */

import {
  createCanvas,
  getContext2D,
  setCanvasSize,
  clearCanvas,
  fillCanvas,
  setStyles,
  removeElement,
} from '../utils/dom.utils';
import {
  loadImage,
  getImageDimensions,
  calculateAspectRatioFit,
  drawImageToCanvas,
  getImageData,
  putImageData,
  cloneImageData,
} from '../utils/image.utils';
import type { EditorConfig } from '../types/config.types';

/**
 * Canvas resize event data
 */
export interface CanvasResizeData {
  width: number;
  height: number;
  previousWidth: number;
  previousHeight: number;
}

/**
 * Canvas class - Handles canvas creation and management
 * Requirements: 1.1, 8.2
 */
export class Canvas {
  /** Canvas element */
  private _canvas: HTMLCanvasElement;
  /** Canvas 2D context */
  private _ctx: CanvasRenderingContext2D;
  /** Container element */
  private _container: HTMLElement;
  /** Original image element */
  private _originalImage: HTMLImageElement | null = null;
  /** Original image data (for reset) */
  private _originalImageData: ImageData | null = null;
  /** Whether responsive mode is enabled */
  private _responsive: boolean;
  /** Background color */
  private _backgroundColor: string;
  /** Resize observer for responsive mode */
  private _resizeObserver: ResizeObserver | null = null;
  /** Resize listeners */
  private _resizeListeners: Set<(data: CanvasResizeData) => void> = new Set();
  /** Whether the canvas is destroyed */
  private _destroyed: boolean = false;


  /**
   * Create a new Canvas instance
   * @param container - Container element
   * @param config - Editor configuration
   */
  constructor(container: HTMLElement, config: Required<EditorConfig>) {
    this._container = container;
    this._responsive = config.responsive;
    this._backgroundColor = config.backgroundColor;

    // Create canvas element
    this._canvas = createCanvas(config.width, config.height);
    this._ctx = getContext2D(this._canvas);

    // Style the canvas
    setStyles(this._canvas, {
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    });

    // Append to container
    this._container.appendChild(this._canvas);

    // Fill with background color
    this.fillBackground();

    // Setup responsive behavior if enabled
    if (this._responsive) {
      this.setupResponsive();
    }
  }

  /**
   * Get the canvas element
   */
  get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  /**
   * Get the canvas 2D context
   */
  get ctx(): CanvasRenderingContext2D {
    return this._ctx;
  }

  /**
   * Get the canvas width
   */
  get width(): number {
    return this._canvas.width;
  }

  /**
   * Get the canvas height
   */
  get height(): number {
    return this._canvas.height;
  }

  /**
   * Get the container element
   */
  get container(): HTMLElement {
    return this._container;
  }

  /**
   * Get the original image
   */
  get originalImage(): HTMLImageElement | null {
    return this._originalImage;
  }

  /**
   * Check if canvas is destroyed
   */
  get isDestroyed(): boolean {
    return this._destroyed;
  }


  /**
   * Fill canvas with background color
   */
  private fillBackground(): void {
    if (this._backgroundColor === 'transparent') {
      clearCanvas(this._ctx, this.width, this.height);
    } else {
      fillCanvas(this._ctx, this.width, this.height, this._backgroundColor);
    }
  }

  /**
   * Setup responsive behavior
   * Requirements: 8.2 - Auto-adjust canvas size on container resize
   */
  private setupResponsive(): void {
    if (typeof ResizeObserver === 'undefined') {
      // Fallback to window resize event
      window.addEventListener('resize', this.handleResize);
      return;
    }

    this._resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === this._container) {
          this.handleContainerResize();
        }
      }
    });

    this._resizeObserver.observe(this._container);
  }

  /**
   * Handle window resize (fallback)
   */
  private handleResize = (): void => {
    this.handleContainerResize();
  };

  /**
   * Handle container resize
   * Requirements: 8.2 - Maintain aspect ratio on resize
   */
  private handleContainerResize(): void {
    if (this._destroyed || !this._originalImage) {
      return;
    }

    const containerRect = this._container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    if (containerWidth === 0 || containerHeight === 0) {
      return;
    }

    const { width: imgWidth, height: imgHeight } = getImageDimensions(this._originalImage);
    const previousWidth = this.width;
    const previousHeight = this.height;

    // Calculate new dimensions maintaining aspect ratio
    const { width: newWidth, height: newHeight } = calculateAspectRatioFit(
      imgWidth,
      imgHeight,
      containerWidth,
      containerHeight
    );

    // Only resize if dimensions changed
    if (newWidth !== previousWidth || newHeight !== previousHeight) {
      this.resize(newWidth, newHeight, true);

      // Notify listeners
      this.notifyResizeListeners({
        width: newWidth,
        height: newHeight,
        previousWidth,
        previousHeight,
      });
    }
  }


  /**
   * Load an image onto the canvas
   * Requirements: 1.1 - Load image into canvas
   * @param source - Image source (URL or HTMLImageElement)
   * @returns Promise with image dimensions
   */
  async loadImage(source: string | HTMLImageElement): Promise<{ width: number; height: number }> {
    const image = await loadImage(source);
    this._originalImage = image;

    const { width: imgWidth, height: imgHeight } = getImageDimensions(image);

    // Calculate dimensions based on container if responsive
    let targetWidth = imgWidth;
    let targetHeight = imgHeight;

    if (this._responsive) {
      const containerRect = this._container.getBoundingClientRect();
      const containerWidth = containerRect.width || imgWidth;
      const containerHeight = containerRect.height || imgHeight;

      const scaled = calculateAspectRatioFit(
        imgWidth,
        imgHeight,
        containerWidth,
        containerHeight
      );
      targetWidth = scaled.width;
      targetHeight = scaled.height;
    }

    // Resize canvas to fit image
    this.resize(targetWidth, targetHeight, false);

    // Draw image
    drawImageToCanvas(this._ctx, image, 0, 0, targetWidth, targetHeight);

    // Store original image data
    this._originalImageData = this.getImageData();

    return { width: targetWidth, height: targetHeight };
  }

  /**
   * Resize the canvas
   * @param width - New width
   * @param height - New height
   * @param preserveContent - Whether to preserve current content
   */
  resize(width: number, height: number, preserveContent: boolean = false): void {
    // Resize canvas
    setCanvasSize(this._canvas, width, height);

    // Fill background
    this.fillBackground();

    // Restore content
    if (preserveContent && this._originalImage) {
      // Redraw original image at new size
      drawImageToCanvas(this._ctx, this._originalImage, 0, 0, width, height);
    }
  }

  /**
   * Get image data from canvas
   * @param x - Start X coordinate
   * @param y - Start Y coordinate
   * @param width - Width (defaults to canvas width)
   * @param height - Height (defaults to canvas height)
   * @returns ImageData
   * @throws Error if canvas is destroyed or dimensions are invalid
   */
  getImageData(x: number = 0, y: number = 0, width?: number, height?: number): ImageData {
    if (this._destroyed) {
      throw new Error('Cannot get image data from destroyed canvas');
    }
    
    const w = width ?? this.width;
    const h = height ?? this.height;
    
    if (w <= 0 || h <= 0) {
      throw new Error(`Invalid dimensions for getImageData: ${w}x${h}`);
    }
    
    return getImageData(this._ctx, x, y, w, h);
  }

  /**
   * Put image data to canvas
   * @param imageData - ImageData to put
   * @param x - X coordinate
   * @param y - Y coordinate
   * @throws Error if canvas is destroyed
   */
  putImageData(imageData: ImageData, x: number = 0, y: number = 0): void {
    if (this._destroyed) {
      throw new Error('Cannot put image data to destroyed canvas');
    }
    putImageData(this._ctx, imageData, x, y);
  }

  /**
   * Get original image data (for reset)
   * @returns Original ImageData or null
   */
  getOriginalImageData(): ImageData | null {
    return this._originalImageData ? cloneImageData(this._originalImageData) : null;
  }


  /**
   * Clear the canvas
   * @throws Error if canvas is destroyed
   */
  clear(): void {
    if (this._destroyed) {
      throw new Error('Cannot clear destroyed canvas');
    }
    clearCanvas(this._ctx, this.width, this.height);
    this.fillBackground();
  }

  /**
   * Reset canvas to original image
   * @throws Error if canvas is destroyed
   */
  reset(): void {
    if (this._destroyed) {
      throw new Error('Cannot reset destroyed canvas');
    }
    if (this._originalImageData) {
      this.clear();
      this.putImageData(this._originalImageData);
    }
  }

  /**
   * Set background color
   * @param color - Background color
   */
  setBackgroundColor(color: string): void {
    this._backgroundColor = color;
  }

  /**
   * Rotate the canvas by specified degrees
   * @param degrees - Rotation angle (90, 180, 270, or any value)
   * @throws Error if canvas is destroyed
   */
  rotate(degrees: number): void {
    if (this._destroyed) {
      throw new Error('Cannot rotate destroyed canvas');
    }
    
    const radians = (degrees * Math.PI) / 180;
    const sin = Math.abs(Math.sin(radians));
    const cos = Math.abs(Math.cos(radians));
    
    const oldWidth = this.width;
    const oldHeight = this.height;
    
    // Calculate new dimensions
    const newWidth = Math.round(oldWidth * cos + oldHeight * sin);
    const newHeight = Math.round(oldWidth * sin + oldHeight * cos);
    
    // Save current content
    const imageData = this.getImageData();
    
    // Create temp canvas with old content
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = oldWidth;
    tempCanvas.height = oldHeight;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;
    tempCtx.putImageData(imageData, 0, 0);
    
    // Resize main canvas
    this._canvas.width = newWidth;
    this._canvas.height = newHeight;
    
    // Fill background
    this.fillBackground();
    
    // Draw rotated content
    this._ctx.save();
    this._ctx.translate(newWidth / 2, newHeight / 2);
    this._ctx.rotate(radians);
    this._ctx.drawImage(tempCanvas, -oldWidth / 2, -oldHeight / 2);
    this._ctx.restore();
    
    // Update original image if exists
    if (this._originalImage) {
      this._originalImageData = this.getImageData();
    }
  }

  /**
   * Flip the canvas horizontally or vertically
   * @param direction - 'horizontal' or 'vertical'
   * @throws Error if canvas is destroyed
   */
  flip(direction: 'horizontal' | 'vertical'): void {
    if (this._destroyed) {
      throw new Error('Cannot flip destroyed canvas');
    }
    
    // Save current content
    const imageData = this.getImageData();
    
    // Create temp canvas
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = this.width;
    tempCanvas.height = this.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;
    tempCtx.putImageData(imageData, 0, 0);
    
    // Clear and redraw flipped
    this.clear();
    
    this._ctx.save();
    if (direction === 'horizontal') {
      this._ctx.translate(this.width, 0);
      this._ctx.scale(-1, 1);
    } else {
      this._ctx.translate(0, this.height);
      this._ctx.scale(1, -1);
    }
    this._ctx.drawImage(tempCanvas, 0, 0);
    this._ctx.restore();
    
    // Update original image data if exists
    if (this._originalImage) {
      this._originalImageData = this.getImageData();
    }
  }

  /**
   * Apply crop to the canvas
   * @param x - Crop region X
   * @param y - Crop region Y
   * @param width - Crop width
   * @param height - Crop height
   * @throws Error if canvas is destroyed or dimensions are invalid
   */
  crop(x: number, y: number, width: number, height: number): void {
    if (this._destroyed) {
      throw new Error('Cannot crop destroyed canvas');
    }
    
    if (width <= 0 || height <= 0) {
      throw new Error(`Invalid crop dimensions: ${width}x${height}`);
    }
    
    // Clamp to canvas bounds
    const clampedX = Math.max(0, Math.min(x, this.width - 1));
    const clampedY = Math.max(0, Math.min(y, this.height - 1));
    const clampedW = Math.min(width, this.width - clampedX);
    const clampedH = Math.min(height, this.height - clampedY);
    
    if (clampedW <= 0 || clampedH <= 0) {
      throw new Error('Crop region is outside canvas bounds');
    }
    
    // Get cropped region
    const croppedData = this._ctx.getImageData(clampedX, clampedY, clampedW, clampedH);
    
    // Resize canvas
    this._canvas.width = clampedW;
    this._canvas.height = clampedH;
    
    // Fill background and put cropped data
    this.fillBackground();
    this._ctx.putImageData(croppedData, 0, 0);
    
    // Update original image data
    this._originalImageData = this.getImageData();
  }

  /**
   * Scale the canvas to new dimensions
   * @param width - New width
   * @param height - New height
   * @param maintainAspectRatio - Whether to maintain aspect ratio (default: false)
   * @throws Error if canvas is destroyed or dimensions are invalid
   */
  scale(width: number, height: number, maintainAspectRatio: boolean = false): void {
    if (this._destroyed) {
      throw new Error('Cannot scale destroyed canvas');
    }
    
    if (width <= 0 || height <= 0) {
      throw new Error(`Invalid scale dimensions: ${width}x${height}`);
    }
    
    let targetWidth = Math.round(width);
    let targetHeight = Math.round(height);
    
    if (maintainAspectRatio) {
      const ratio = Math.min(width / this.width, height / this.height);
      targetWidth = Math.round(this.width * ratio);
      targetHeight = Math.round(this.height * ratio);
    }
    
    // Save current content
    const imageData = this.getImageData();
    
    // Create temp canvas
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = this.width;
    tempCanvas.height = this.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;
    tempCtx.putImageData(imageData, 0, 0);
    
    // Resize main canvas
    this._canvas.width = targetWidth;
    this._canvas.height = targetHeight;
    
    // Fill background
    this.fillBackground();
    
    // Draw scaled content with high quality
    this._ctx.imageSmoothingEnabled = true;
    this._ctx.imageSmoothingQuality = 'high';
    this._ctx.drawImage(tempCanvas, 0, 0, targetWidth, targetHeight);
    
    // Update original image data
    this._originalImageData = this.getImageData();
  }

  /**
   * Subscribe to resize events
   * @param listener - Resize listener
   * @returns Unsubscribe function
   */
  onResize(listener: (data: CanvasResizeData) => void): () => void {
    this._resizeListeners.add(listener);
    return () => {
      this._resizeListeners.delete(listener);
    };
  }

  /**
   * Notify resize listeners
   */
  private notifyResizeListeners(data: CanvasResizeData): void {
    for (const listener of this._resizeListeners) {
      try {
        listener(data);
      } catch (error) {
        console.error('Error in resize listener:', error);
      }
    }
  }

  /**
   * Destroy the canvas and clean up resources
   * Requirements: 1.5 - Clean up canvas resources
   */
  destroy(): void {
    if (this._destroyed) {
      return;
    }

    this._destroyed = true;

    // Remove resize observer
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }

    // Remove window resize listener
    window.removeEventListener('resize', this.handleResize);

    // Clear listeners
    this._resizeListeners.clear();

    // Remove canvas from DOM
    removeElement(this._canvas);

    // Clear references
    this._originalImage = null;
    this._originalImageData = null;
  }
}
