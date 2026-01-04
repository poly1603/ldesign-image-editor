/**
 * CropTool - Handles image cropping, rotation and flipping
 */

import { icons } from './icons';
import type { I18n } from '../i18n';
import { getI18n } from '../i18n';

export type CropRatio = 'free' | '1:1' | '4:3' | '16:9' | '3:2' | '2:3' | '3:4' | '9:16';

export interface CropRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CropToolOptions {
  /** Initial aspect ratio */
  ratio?: CropRatio;
  /** Minimum crop size */
  minSize?: number;
  /** Enable rotation */
  enableRotation?: boolean;
  /** Enable flip */
  enableFlip?: boolean;
  /** i18n instance */
  i18n?: I18n;
}

const MIN_CROP_SIZE = 20;

type HandlePosition = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w';

/**
 * CropTool - Provides crop overlay and manipulation
 */
export class CropTool {
  private container: HTMLElement;
  private canvas: HTMLCanvasElement;
  private overlay: HTMLElement | null = null;
  private cropBox: HTMLElement | null = null;
  private controlPanel: HTMLElement | null = null;
  
  private i18n: I18n;
  private options: Required<CropToolOptions>;
  
  // Crop state
  private cropRect: CropRect = { x: 0, y: 0, width: 0, height: 0 };
  private rotation: number = 0;
  private flipH: boolean = false;
  private flipV: boolean = false;
  private currentRatio: CropRatio = 'free';
  
  // Interaction state
  private isDragging: boolean = false;
  private isResizing: boolean = false;
  private activeHandle: HandlePosition | null = null;
  private dragStart = { x: 0, y: 0 };
  private cropStart: CropRect = { x: 0, y: 0, width: 0, height: 0 };
  
  // Callbacks
  private onApplyCallback: ((rect: CropRect, rotation: number, flipH: boolean, flipV: boolean) => void) | null = null;
  private onCancelCallback: (() => void) | null = null;

  constructor(container: HTMLElement, canvas: HTMLCanvasElement, options: CropToolOptions = {}) {
    this.container = container;
    this.canvas = canvas;
    this.i18n = options.i18n || getI18n();
    
    this.options = {
      ratio: options.ratio || 'free',
      minSize: options.minSize || MIN_CROP_SIZE,
      enableRotation: options.enableRotation !== false,
      enableFlip: options.enableFlip !== false,
      i18n: this.i18n,
    };
    
    this.currentRatio = this.options.ratio;
  }

  /**
   * Show crop tool
   */
  show(): void {
    this.createOverlay();
    this.initCropRect();
    this.updateCropBox();
    this.setupEvents();
  }

  /**
   * Hide and cleanup crop tool
   */
  hide(): void {
    this.removeOverlay();
    this.cleanup();
  }

  /**
   * Set apply callback
   */
  onApply(callback: (rect: CropRect, rotation: number, flipH: boolean, flipV: boolean) => void): void {
    this.onApplyCallback = callback;
  }

  /**
   * Set cancel callback
   */
  onCancel(callback: () => void): void {
    this.onCancelCallback = callback;
  }

  /**
   * Get current crop rect
   */
  getCropRect(): CropRect {
    return { ...this.cropRect };
  }

  /**
   * Set aspect ratio
   */
  setRatio(ratio: CropRatio): void {
    this.currentRatio = ratio;
    this.applyRatioConstraint();
    this.updateCropBox();
    this.updateRatioButtons();
  }

  /**
   * Rotate image
   */
  rotate(angle: number): void {
    this.rotation = (this.rotation + angle) % 360;
    if (this.rotation < 0) this.rotation += 360;
    this.updateRotationPreview();
  }

  /**
   * Flip horizontally
   */
  flipHorizontal(): void {
    this.flipH = !this.flipH;
    this.updateFlipPreview();
  }

  /**
   * Flip vertically
   */
  flipVertical(): void {
    this.flipV = !this.flipV;
    this.updateFlipPreview();
  }

  /**
   * Create overlay elements
   */
  private createOverlay(): void {
    // Main overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'ie-crop-overlay';
    
    // Crop box
    this.cropBox = document.createElement('div');
    this.cropBox.className = 'ie-crop-box';
    
    // Grid lines
    const grid = document.createElement('div');
    grid.className = 'ie-crop-grid';
    grid.innerHTML = `
      <div class="ie-crop-grid-h"></div>
      <div class="ie-crop-grid-h"></div>
      <div class="ie-crop-grid-v"></div>
      <div class="ie-crop-grid-v"></div>
    `;
    this.cropBox.appendChild(grid);
    
    // Resize handles
    const handles: HandlePosition[] = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];
    handles.forEach(pos => {
      const handle = document.createElement('div');
      handle.className = `ie-crop-handle ie-crop-handle-${pos}`;
      handle.dataset.handle = pos;
      this.cropBox!.appendChild(handle);
    });
    
    this.overlay.appendChild(this.cropBox);
    
    // Control panel
    this.controlPanel = this.createControlPanel();
    this.overlay.appendChild(this.controlPanel);
    
    this.container.appendChild(this.overlay);
  }

  /**
   * Create control panel with ratio, rotate, flip buttons
   */
  private createControlPanel(): HTMLElement {
    const panel = document.createElement('div');
    panel.className = 'ie-crop-panel';
    
    const t = (key: string) => this.i18n.t(key as any);
    
    // Ratio buttons
    const ratioGroup = document.createElement('div');
    ratioGroup.className = 'ie-crop-group';
    ratioGroup.innerHTML = `
      <span class="ie-crop-label">${t('crop.ratio')}</span>
      <div class="ie-crop-buttons ie-crop-ratio-buttons">
        <button class="ie-crop-btn ${this.currentRatio === 'free' ? 'active' : ''}" data-ratio="free">${t('crop.free')}</button>
        <button class="ie-crop-btn ${this.currentRatio === '1:1' ? 'active' : ''}" data-ratio="1:1">1:1</button>
        <button class="ie-crop-btn ${this.currentRatio === '4:3' ? 'active' : ''}" data-ratio="4:3">4:3</button>
        <button class="ie-crop-btn ${this.currentRatio === '16:9' ? 'active' : ''}" data-ratio="16:9">16:9</button>
        <button class="ie-crop-btn ${this.currentRatio === '3:2' ? 'active' : ''}" data-ratio="3:2">3:2</button>
      </div>
    `;
    panel.appendChild(ratioGroup);
    
    // Rotate & flip buttons
    if (this.options.enableRotation || this.options.enableFlip) {
      const transformGroup = document.createElement('div');
      transformGroup.className = 'ie-crop-group';
      transformGroup.innerHTML = `
        <span class="ie-crop-label">${t('crop.rotate')}</span>
        <div class="ie-crop-buttons">
          ${this.options.enableRotation ? `
            <button class="ie-crop-btn ie-crop-btn-icon" data-action="rotate-left" title="${t('crop.rotateLeft')}">${icons.rotateLeft}</button>
            <button class="ie-crop-btn ie-crop-btn-icon" data-action="rotate-right" title="${t('crop.rotateRight')}">${icons.rotateRight}</button>
          ` : ''}
          ${this.options.enableFlip ? `
            <button class="ie-crop-btn ie-crop-btn-icon" data-action="flip-h" title="${t('crop.flipH')}">${icons.flipH}</button>
            <button class="ie-crop-btn ie-crop-btn-icon" data-action="flip-v" title="${t('crop.flipV')}">${icons.flipV}</button>
          ` : ''}
        </div>
      `;
      panel.appendChild(transformGroup);
    }
    
    // Action buttons
    const actionGroup = document.createElement('div');
    actionGroup.className = 'ie-crop-group ie-crop-actions';
    actionGroup.innerHTML = `
      <button class="ie-crop-btn ie-crop-btn-cancel" data-action="cancel">${t('crop.cancel')}</button>
      <button class="ie-crop-btn ie-crop-btn-apply" data-action="apply">${icons.check} ${t('crop.apply')}</button>
    `;
    panel.appendChild(actionGroup);
    
    // Event bindings
    panel.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const btn = target.closest('[data-ratio], [data-action]') as HTMLElement;
      if (!btn) return;
      
      const ratio = btn.dataset.ratio as CropRatio;
      const action = btn.dataset.action;
      
      if (ratio) {
        this.setRatio(ratio);
      } else if (action) {
        switch (action) {
          case 'rotate-left': this.rotate(-90); break;
          case 'rotate-right': this.rotate(90); break;
          case 'flip-h': this.flipHorizontal(); break;
          case 'flip-v': this.flipVertical(); break;
          case 'apply': this.apply(); break;
          case 'cancel': this.cancel(); break;
        }
      }
    });
    
    return panel;
  }

  /**
   * Initialize crop rect to cover most of image
   */
  private initCropRect(): void {
    const canvasRect = this.canvas.getBoundingClientRect();
    const containerRect = this.container.getBoundingClientRect();
    
    // Calculate canvas position relative to container
    const offsetX = canvasRect.left - containerRect.left;
    const offsetY = canvasRect.top - containerRect.top;
    
    // Default to 80% of canvas
    const padding = 0.1;
    this.cropRect = {
      x: offsetX + canvasRect.width * padding,
      y: offsetY + canvasRect.height * padding,
      width: canvasRect.width * (1 - 2 * padding),
      height: canvasRect.height * (1 - 2 * padding),
    };
    
    this.applyRatioConstraint();
  }

  /**
   * Apply aspect ratio constraint
   */
  private applyRatioConstraint(): void {
    if (this.currentRatio === 'free') return;
    
    const [w, h] = this.currentRatio.split(':').map(Number);
    const ratio = w / h;
    
    const centerX = this.cropRect.x + this.cropRect.width / 2;
    const centerY = this.cropRect.y + this.cropRect.height / 2;
    
    let newWidth = this.cropRect.width;
    let newHeight = this.cropRect.height;
    
    if (newWidth / newHeight > ratio) {
      newWidth = newHeight * ratio;
    } else {
      newHeight = newWidth / ratio;
    }
    
    this.cropRect.width = newWidth;
    this.cropRect.height = newHeight;
    this.cropRect.x = centerX - newWidth / 2;
    this.cropRect.y = centerY - newHeight / 2;
  }

  /**
   * Update crop box position/size
   */
  private updateCropBox(): void {
    if (!this.cropBox || !this.overlay) return;
    
    this.cropBox.style.left = `${this.cropRect.x}px`;
    this.cropBox.style.top = `${this.cropRect.y}px`;
    this.cropBox.style.width = `${this.cropRect.width}px`;
    this.cropBox.style.height = `${this.cropRect.height}px`;
    
    // Update dark overlay regions
    this.updateOverlayMask();
  }

  /**
   * Update overlay mask to darken outside crop area
   */
  private updateOverlayMask(): void {
    if (!this.overlay) return;
    
    const { x, y, width, height } = this.cropRect;
    
    // Use clip-path to create the dark overlay effect
    this.overlay.style.setProperty('--crop-x', `${x}px`);
    this.overlay.style.setProperty('--crop-y', `${y}px`);
    this.overlay.style.setProperty('--crop-w', `${width}px`);
    this.overlay.style.setProperty('--crop-h', `${height}px`);
  }

  /**
   * Update ratio buttons active state
   */
  private updateRatioButtons(): void {
    if (!this.controlPanel) return;
    
    this.controlPanel.querySelectorAll('[data-ratio]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-ratio') === this.currentRatio);
    });
  }

  /**
   * Update rotation preview
   */
  private updateRotationPreview(): void {
    // Rotation is applied when crop is confirmed
    // Could add visual preview here
  }

  /**
   * Update flip preview
   */
  private updateFlipPreview(): void {
    // Flip is applied when crop is confirmed
    // Could add visual preview here
  }

  /**
   * Setup event listeners
   */
  private setupEvents(): void {
    if (!this.cropBox) return;
    
    // Crop box drag
    this.cropBox.addEventListener('pointerdown', this.handlePointerDown);
    document.addEventListener('pointermove', this.handlePointerMove);
    document.addEventListener('pointerup', this.handlePointerUp);
  }

  private handlePointerDown = (e: PointerEvent): void => {
    const target = e.target as HTMLElement;
    
    // Check if clicking on handle
    if (target.classList.contains('ie-crop-handle')) {
      this.isResizing = true;
      this.activeHandle = target.dataset.handle as HandlePosition;
    } else if (target.closest('.ie-crop-box')) {
      this.isDragging = true;
    }
    
    if (this.isDragging || this.isResizing) {
      this.dragStart = { x: e.clientX, y: e.clientY };
      this.cropStart = { ...this.cropRect };
      e.preventDefault();
    }
  };

  private handlePointerMove = (e: PointerEvent): void => {
    if (!this.isDragging && !this.isResizing) return;
    
    const dx = e.clientX - this.dragStart.x;
    const dy = e.clientY - this.dragStart.y;
    
    if (this.isDragging) {
      this.cropRect.x = this.cropStart.x + dx;
      this.cropRect.y = this.cropStart.y + dy;
      this.constrainToContainer();
    } else if (this.isResizing && this.activeHandle) {
      this.resizeCropBox(dx, dy);
    }
    
    this.updateCropBox();
  };

  private handlePointerUp = (): void => {
    this.isDragging = false;
    this.isResizing = false;
    this.activeHandle = null;
  };

  /**
   * Resize crop box based on handle
   */
  private resizeCropBox(dx: number, dy: number): void {
    if (!this.activeHandle) return;
    
    const { x, y, width, height } = this.cropStart;
    const minSize = this.options.minSize;
    
    let newX = x, newY = y, newW = width, newH = height;
    
    // Calculate new dimensions based on handle
    switch (this.activeHandle) {
      case 'nw':
        newX = x + dx;
        newY = y + dy;
        newW = width - dx;
        newH = height - dy;
        break;
      case 'n':
        newY = y + dy;
        newH = height - dy;
        break;
      case 'ne':
        newY = y + dy;
        newW = width + dx;
        newH = height - dy;
        break;
      case 'e':
        newW = width + dx;
        break;
      case 'se':
        newW = width + dx;
        newH = height + dy;
        break;
      case 's':
        newH = height + dy;
        break;
      case 'sw':
        newX = x + dx;
        newW = width - dx;
        newH = height + dy;
        break;
      case 'w':
        newX = x + dx;
        newW = width - dx;
        break;
    }
    
    // Apply minimum size
    if (newW < minSize) {
      if (this.activeHandle.includes('w')) {
        newX = x + width - minSize;
      }
      newW = minSize;
    }
    if (newH < minSize) {
      if (this.activeHandle.includes('n')) {
        newY = y + height - minSize;
      }
      newH = minSize;
    }
    
    // Apply ratio constraint if not free
    if (this.currentRatio !== 'free') {
      const [rw, rh] = this.currentRatio.split(':').map(Number);
      const ratio = rw / rh;
      
      // Determine which dimension to adjust
      if (['n', 's'].includes(this.activeHandle)) {
        newW = newH * ratio;
      } else if (['e', 'w'].includes(this.activeHandle)) {
        newH = newW / ratio;
      } else {
        // Corner handles - use the larger change
        const targetRatio = newW / newH;
        if (targetRatio > ratio) {
          newW = newH * ratio;
        } else {
          newH = newW / ratio;
        }
      }
    }
    
    this.cropRect = { x: newX, y: newY, width: newW, height: newH };
    this.constrainToContainer();
  }

  /**
   * Constrain crop rect to container bounds
   */
  private constrainToContainer(): void {
    const canvasRect = this.canvas.getBoundingClientRect();
    const containerRect = this.container.getBoundingClientRect();
    
    const minX = canvasRect.left - containerRect.left;
    const minY = canvasRect.top - containerRect.top;
    const maxX = minX + canvasRect.width;
    const maxY = minY + canvasRect.height;
    
    // Constrain position
    this.cropRect.x = Math.max(minX, Math.min(maxX - this.cropRect.width, this.cropRect.x));
    this.cropRect.y = Math.max(minY, Math.min(maxY - this.cropRect.height, this.cropRect.y));
    
    // Constrain size
    this.cropRect.width = Math.min(this.cropRect.width, maxX - this.cropRect.x);
    this.cropRect.height = Math.min(this.cropRect.height, maxY - this.cropRect.y);
  }

  /**
   * Convert screen rect to canvas coordinates
   */
  private toCanvasCoords(): CropRect {
    const canvasRect = this.canvas.getBoundingClientRect();
    const containerRect = this.container.getBoundingClientRect();
    
    const offsetX = canvasRect.left - containerRect.left;
    const offsetY = canvasRect.top - containerRect.top;
    
    const scaleX = this.canvas.width / canvasRect.width;
    const scaleY = this.canvas.height / canvasRect.height;
    
    return {
      x: (this.cropRect.x - offsetX) * scaleX,
      y: (this.cropRect.y - offsetY) * scaleY,
      width: this.cropRect.width * scaleX,
      height: this.cropRect.height * scaleY,
    };
  }

  /**
   * Apply crop
   */
  private apply(): void {
    const canvasRect = this.toCanvasCoords();
    
    if (this.onApplyCallback) {
      this.onApplyCallback(canvasRect, this.rotation, this.flipH, this.flipV);
    }
    
    this.hide();
  }

  /**
   * Cancel crop
   */
  private cancel(): void {
    if (this.onCancelCallback) {
      this.onCancelCallback();
    }
    
    this.hide();
  }

  /**
   * Remove overlay
   */
  private removeOverlay(): void {
    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
      this.cropBox = null;
      this.controlPanel = null;
    }
  }

  /**
   * Cleanup event listeners
   */
  private cleanup(): void {
    document.removeEventListener('pointermove', this.handlePointerMove);
    document.removeEventListener('pointerup', this.handlePointerUp);
  }

  /**
   * Destroy crop tool
   */
  destroy(): void {
    this.hide();
    this.onApplyCallback = null;
    this.onCancelCallback = null;
  }
}

/**
 * Apply crop, rotation and flip to canvas
 */
export function applyCropToCanvas(
  canvas: HTMLCanvasElement,
  rect: CropRect,
  rotation: number,
  flipH: boolean,
  flipV: boolean
): HTMLCanvasElement {
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;
  
  // Create cropped canvas
  let croppedWidth = rect.width;
  let croppedHeight = rect.height;
  
  // Swap dimensions if rotated 90 or 270
  if (rotation === 90 || rotation === 270) {
    [croppedWidth, croppedHeight] = [croppedHeight, croppedWidth];
  }
  
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = croppedWidth;
  tempCanvas.height = croppedHeight;
  const tempCtx = tempCanvas.getContext('2d')!;
  
  // Apply transformations
  tempCtx.save();
  tempCtx.translate(croppedWidth / 2, croppedHeight / 2);
  
  if (rotation) {
    tempCtx.rotate((rotation * Math.PI) / 180);
  }
  
  if (flipH) {
    tempCtx.scale(-1, 1);
  }
  
  if (flipV) {
    tempCtx.scale(1, -1);
  }
  
  // Draw cropped region
  let drawWidth = rect.width;
  let drawHeight = rect.height;
  if (rotation === 90 || rotation === 270) {
    [drawWidth, drawHeight] = [drawHeight, drawWidth];
  }
  
  tempCtx.drawImage(
    canvas,
    rect.x, rect.y, rect.width, rect.height,
    -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight
  );
  
  tempCtx.restore();
  
  // Update original canvas
  canvas.width = croppedWidth;
  canvas.height = croppedHeight;
  ctx.drawImage(tempCanvas, 0, 0);
  
  return canvas;
}
