/**
 * Mosaic Plugin - Applies mosaic effect to image regions
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5
 */

import { BasePlugin } from '../base/BasePlugin';
import type { MosaicConfig } from '../../types/config.types';
import type { MosaicPluginInterface } from '../../types/plugin.types';
import { normalizePointerEvent } from '../../utils/event.utils';
import { getResolvedDeviceType, getNonPassiveOptions } from '../../utils/device.utils';
import {
  applyMosaicToRegion,
  applyMosaicToCircularRegion,
  interpolatePoints,
} from './mosaic.utils';
import { cloneImageData } from '../../utils/image.utils';

/**
 * Drawing state for tracking mouse/touch interactions
 */
interface DrawingState {
  isDrawing: boolean;
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
  originalImageData: ImageData | null;
}

/**
 * MosaicPlugin class - Implements mosaic drawing functionality
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5
 */
export class MosaicPlugin extends BasePlugin<MosaicConfig> implements MosaicPluginInterface {
  readonly name = 'mosaic' as const;
  readonly icon = '▦';
  readonly title = 'Mosaic';

  /** Drawing state */
  private drawingState: DrawingState = {
    isDrawing: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    originalImageData: null,
  };

  /** Event cleanup functions */
  private cleanupFunctions: Array<() => void> = [];

  /**
   * Get default mosaic configuration
   * Requirements: 3.2, 3.4, 3.5
   */
  getDefaultConfig(): MosaicConfig {
    return {
      blockSize: 10,
      intensity: 100,
      mode: 'free',
      brushSize: 30,
    };
  }

  /**
   * Set mosaic block size
   * Requirements: 3.2
   * @param size - Block size in pixels
   */
  setBlockSize(size: number): void {
    this.setConfig({ blockSize: Math.max(1, Math.floor(size)) });
  }

  /**
   * Set mosaic intensity
   * Requirements: 3.4
   * @param intensity - Intensity value (0-100)
   */
  setIntensity(intensity: number): void {
    this.setConfig({ intensity: Math.max(0, Math.min(100, intensity)) });
  }

  /**
   * Set drawing mode
   * Requirements: 3.5
   * @param mode - Drawing mode ('rect' or 'free')
   */
  setMode(mode: 'rect' | 'free'): void {
    this.setConfig({ mode });
  }

  /**
   * Set brush size for free drawing mode
   * Requirements: 3.5
   * @param size - Brush size in pixels
   */
  setBrushSize(size: number): void {
    this.setConfig({ brushSize: Math.max(1, size) });
  }

  /**
   * Called when plugin is activated
   * Sets up event listeners for drawing
   * Requirements: 3.1, 3.3
   */
  protected onActivate(): void {
    const canvas = this.getCanvas();
    if (!canvas) return;

    this.setupEventListeners(canvas);
  }

  /**
   * Called when plugin is deactivated
   * Cleans up event listeners
   */
  protected onDeactivate(): void {
    this.cleanupEventListeners();
    this.resetDrawingState();
  }

  /**
   * Called when plugin is destroyed
   */
  protected onDestroy(): void {
    this.cleanupEventListeners();
    this.resetDrawingState();
  }

  /**
   * Set up mouse and touch event listeners
   * Requirements: 3.3 - Touch event support
   */
  private setupEventListeners(canvas: HTMLCanvasElement): void {
    const deviceType = getResolvedDeviceType('auto');
    const nonPassiveOptions = getNonPassiveOptions();

    if (deviceType === 'mobile') {
      // Touch events for mobile
      const touchStartHandler = this.handleTouchStart.bind(this);
      const touchMoveHandler = this.handleTouchMove.bind(this);
      const touchEndHandler = this.handleTouchEnd.bind(this);

      canvas.addEventListener('touchstart', touchStartHandler, nonPassiveOptions);
      canvas.addEventListener('touchmove', touchMoveHandler, nonPassiveOptions);
      canvas.addEventListener('touchend', touchEndHandler);
      canvas.addEventListener('touchcancel', touchEndHandler);

      this.cleanupFunctions.push(
        () => canvas.removeEventListener('touchstart', touchStartHandler),
        () => canvas.removeEventListener('touchmove', touchMoveHandler),
        () => canvas.removeEventListener('touchend', touchEndHandler),
        () => canvas.removeEventListener('touchcancel', touchEndHandler)
      );
    } else {
      // Mouse events for PC
      const mouseDownHandler = this.handleMouseDown.bind(this);
      const mouseMoveHandler = this.handleMouseMove.bind(this);
      const mouseUpHandler = this.handleMouseUp.bind(this);

      canvas.addEventListener('mousedown', mouseDownHandler);
      canvas.addEventListener('mousemove', mouseMoveHandler);
      canvas.addEventListener('mouseup', mouseUpHandler);
      canvas.addEventListener('mouseleave', mouseUpHandler);

      this.cleanupFunctions.push(
        () => canvas.removeEventListener('mousedown', mouseDownHandler),
        () => canvas.removeEventListener('mousemove', mouseMoveHandler),
        () => canvas.removeEventListener('mouseup', mouseUpHandler),
        () => canvas.removeEventListener('mouseleave', mouseUpHandler)
      );
    }
  }

  /**
   * Clean up all event listeners
   */
  private cleanupEventListeners(): void {
    for (const cleanup of this.cleanupFunctions) {
      cleanup();
    }
    this.cleanupFunctions = [];
  }

  /**
   * Reset drawing state
   */
  private resetDrawingState(): void {
    this.drawingState = {
      isDrawing: false,
      startX: 0,
      startY: 0,
      lastX: 0,
      lastY: 0,
      originalImageData: null,
    };
  }

  /**
   * Handle mouse down event
   */
  private handleMouseDown(event: MouseEvent): void {
    const canvas = this.getCanvas();
    if (!canvas) return;

    const pointerEvent = normalizePointerEvent(event, canvas, 'start');
    this.startDrawing(pointerEvent.x, pointerEvent.y);
  }

  /**
   * Handle mouse move event
   */
  private handleMouseMove(event: MouseEvent): void {
    if (!this.drawingState.isDrawing) return;

    const canvas = this.getCanvas();
    if (!canvas) return;

    const pointerEvent = normalizePointerEvent(event, canvas, 'move');
    this.continueDrawing(pointerEvent.x, pointerEvent.y);
  }

  /**
   * Handle mouse up event
   */
  private handleMouseUp(): void {
    if (!this.drawingState.isDrawing) return;
    this.endDrawing();
  }

  /**
   * Handle touch start event
   * Requirements: 3.3
   */
  private handleTouchStart(event: TouchEvent): void {
    event.preventDefault();
    const canvas = this.getCanvas();
    if (!canvas) return;

    const pointerEvent = normalizePointerEvent(event, canvas, 'start');
    this.startDrawing(pointerEvent.x, pointerEvent.y);
  }

  /**
   * Handle touch move event
   * Requirements: 3.3
   */
  private handleTouchMove(event: TouchEvent): void {
    event.preventDefault();
    if (!this.drawingState.isDrawing) return;

    const canvas = this.getCanvas();
    if (!canvas) return;

    const pointerEvent = normalizePointerEvent(event, canvas, 'move');
    this.continueDrawing(pointerEvent.x, pointerEvent.y);
  }

  /**
   * Handle touch end event
   * Requirements: 3.3
   */
  private handleTouchEnd(): void {
    if (!this.drawingState.isDrawing) return;
    this.endDrawing();
  }

  /**
   * Start drawing operation
   */
  private startDrawing(x: number, y: number): void {
    const imageData = this.getImageData();
    if (!imageData) return;

    // Save original state for rect mode preview
    this.drawingState = {
      isDrawing: true,
      startX: x,
      startY: y,
      lastX: x,
      lastY: y,
      originalImageData: cloneImageData(imageData),
    };

    // For free mode, apply mosaic at the starting point
    if (this.config.mode === 'free') {
      this.applyMosaicAtPoint(x, y);
    }
  }

  /**
   * Continue drawing operation
   */
  private continueDrawing(x: number, y: number): void {
    if (!this.drawingState.isDrawing) return;

    if (this.config.mode === 'free') {
      // Interpolate points for smooth brush stroke
      const points = interpolatePoints(
        this.drawingState.lastX,
        this.drawingState.lastY,
        x,
        y,
        this.config.brushSize / 4
      );

      for (const point of points) {
        this.applyMosaicAtPoint(point.x, point.y);
      }

      this.drawingState.lastX = x;
      this.drawingState.lastY = y;
    } else {
      // Rect mode: preview the rectangle
      this.previewRectMosaic(x, y);
    }
  }

  /**
   * End drawing operation
   */
  private endDrawing(): void {
    if (!this.drawingState.isDrawing) return;

    if (this.config.mode === 'rect') {
      // Apply final rect mosaic
      this.applyRectMosaic(
        this.drawingState.startX,
        this.drawingState.startY,
        this.drawingState.lastX,
        this.drawingState.lastY
      );
    }

    // Save state to history
    this.saveState();

    this.resetDrawingState();
  }

  /**
   * Apply mosaic at a single point (free mode)
   * Requirements: 3.1, 3.5
   */
  private applyMosaicAtPoint(x: number, y: number): void {
    const ctx = this.getContext();
    const canvas = this.getCanvas();
    if (!ctx || !canvas) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    applyMosaicToCircularRegion(
      imageData,
      x,
      y,
      this.config.brushSize / 2,
      this.config.blockSize,
      this.config.intensity
    );

    ctx.putImageData(imageData, 0, 0);
  }

  /**
   * Preview rect mosaic (during drag)
   * Requirements: 3.5
   */
  private previewRectMosaic(currentX: number, currentY: number): void {
    const ctx = this.getContext();
    const canvas = this.getCanvas();
    if (!ctx || !canvas || !this.drawingState.originalImageData) return;

    // Restore original image
    ctx.putImageData(this.drawingState.originalImageData, 0, 0);

    // Get fresh image data and apply mosaic
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    const x = Math.min(this.drawingState.startX, currentX);
    const y = Math.min(this.drawingState.startY, currentY);
    const width = Math.abs(currentX - this.drawingState.startX);
    const height = Math.abs(currentY - this.drawingState.startY);

    applyMosaicToRegion(
      imageData,
      x,
      y,
      width,
      height,
      this.config.blockSize,
      this.config.intensity
    );

    ctx.putImageData(imageData, 0, 0);
    this.drawingState.lastX = currentX;
    this.drawingState.lastY = currentY;
  }

  /**
   * Apply final rect mosaic
   * Requirements: 3.1, 3.5
   */
  private applyRectMosaic(startX: number, startY: number, endX: number, endY: number): void {
    const ctx = this.getContext();
    const canvas = this.getCanvas();
    if (!ctx || !canvas || !this.drawingState.originalImageData) return;

    // Restore original and apply final mosaic
    ctx.putImageData(this.drawingState.originalImageData, 0, 0);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    const x = Math.min(startX, endX);
    const y = Math.min(startY, endY);
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);

    applyMosaicToRegion(
      imageData,
      x,
      y,
      width,
      height,
      this.config.blockSize,
      this.config.intensity
    );

    ctx.putImageData(imageData, 0, 0);
  }
}
