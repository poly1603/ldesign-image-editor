/**
 * TextPlugin - Manages text overlays on the canvas
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6
 */

import { BasePlugin } from '../base/BasePlugin';
import type { TextConfig } from '../../types/config.types';
import type { TextPluginInterface, TextLayer } from '../../types/plugin.types';
import { normalizePointerEvent } from '../../utils/event.utils';
import { getResolvedDeviceType, getNonPassiveOptions } from '../../utils/device.utils';
import { TextLayerManager, DEFAULT_TEXT_CONFIG } from './TextLayer';
import {
  renderAllTextLayers,
  findTextLayerAtPoint,
} from './text.utils';

/**
 * Drag state for tracking text layer dragging
 */
interface DragState {
  isDragging: boolean;
  layerId: string | null;
  startX: number;
  startY: number;
  offsetX: number;
  offsetY: number;
}

/**
 * TextPlugin class - Implements text overlay functionality
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6
 */
export class TextPlugin extends BasePlugin<TextConfig> implements TextPluginInterface {
  readonly name = 'text' as const;
  readonly icon = 'T';
  readonly title = 'Text';

  /** Text layer manager */
  private layerManager: TextLayerManager = new TextLayerManager();
  
  /** Base image data (without text layers) */
  private baseImageData: ImageData | null = null;
  
  /** Drag state */
  private dragState: DragState = {
    isDragging: false,
    layerId: null,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
  };

  /** Event cleanup functions */
  private cleanupFunctions: Array<() => void> = [];

  /**
   * Get default text configuration
   * Requirements: 4.2, 4.3, 4.5, 4.6
   */
  getDefaultConfig(): TextConfig {
    return { ...DEFAULT_TEXT_CONFIG };
  }


  /**
   * Add text at specified position
   * Requirements: 4.1
   * @param text - Text content
   * @param x - X position
   * @param y - Y position
   * @returns Created text layer
   */
  addText(text: string, x: number, y: number): TextLayer {
    // Save base image if not already saved
    if (!this.baseImageData) {
      this.saveBaseImage();
    }
    
    const layer = this.layerManager.createLayer(text, x, y, this.config);
    this.layerManager.selectLayer(layer.id);
    this.renderLayers();
    this.saveState();
    return layer;
  }

  /**
   * Update text content of a layer
   * Requirements: 4.1
   * @param id - Layer ID
   * @param text - New text content
   */
  updateText(id: string, text: string): void {
    const layer = this.layerManager.updateText(id, text);
    if (layer) {
      this.renderLayers();
      this.saveState();
    }
  }

  /**
   * Update position of a layer
   * Requirements: 4.4
   * @param id - Layer ID
   * @param x - New X position
   * @param y - New Y position
   */
  updatePosition(id: string, x: number, y: number): void {
    const layer = this.layerManager.updatePosition(id, x, y);
    if (layer) {
      this.renderLayers();
    }
  }

  /**
   * Update configuration of a layer
   * Requirements: 4.2, 4.3, 4.5, 4.6
   * @param id - Layer ID
   * @param config - Partial configuration to merge
   */
  updateConfig(id: string, config: Partial<TextConfig>): void {
    const layer = this.layerManager.updateConfig(id, config);
    if (layer) {
      this.renderLayers();
      this.saveState();
    }
  }

  /**
   * Remove a text layer
   * @param id - Layer ID
   */
  removeText(id: string): void {
    if (this.layerManager.removeLayer(id)) {
      this.renderLayers();
      this.saveState();
    }
  }

  /**
   * Get all text layers
   * @returns Array of text layers
   */
  getTextLayers(): TextLayer[] {
    return this.layerManager.getAllLayers();
  }

  /**
   * Get selected layer
   * @returns Selected layer or undefined
   */
  getSelectedLayer(): TextLayer | undefined {
    return this.layerManager.getSelectedLayer();
  }

  /**
   * Select a layer by ID
   * @param id - Layer ID or null to deselect
   */
  selectLayer(id: string | null): void {
    this.layerManager.selectLayer(id);
    this.renderLayers();
  }

  /**
   * Called when plugin is activated
   * Sets up event listeners
   */
  protected onActivate(): void {
    const canvas = this.getCanvas();
    if (!canvas) return;

    // Save current image as base
    this.saveBaseImage();
    this.setupEventListeners(canvas);
  }

  /**
   * Called when plugin is deactivated
   * Cleans up event listeners
   */
  protected onDeactivate(): void {
    this.cleanupEventListeners();
    this.resetDragState();
  }

  /**
   * Called when plugin is destroyed
   */
  protected onDestroy(): void {
    this.cleanupEventListeners();
    this.layerManager.clearAll();
    this.baseImageData = null;
  }


  /**
   * Save base image data (without text layers)
   */
  private saveBaseImage(): void {
    const ctx = this.getContext();
    const canvas = this.getCanvas();
    if (!ctx || !canvas) return;
    
    this.baseImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  /**
   * Render all text layers on top of base image
   */
  private renderLayers(): void {
    const ctx = this.getContext();
    const canvas = this.getCanvas();
    if (!ctx || !canvas) return;

    // Restore base image
    if (this.baseImageData) {
      ctx.putImageData(this.baseImageData, 0, 0);
    }

    // Render all text layers
    const layers = this.layerManager.getAllLayers();
    const selectedId = this.layerManager.getSelectedLayerId();
    renderAllTextLayers(ctx, layers, selectedId);
  }

  /**
   * Set up mouse and touch event listeners
   * Requirements: 4.4 - Touch event support for dragging
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
      const dblClickHandler = this.handleDoubleClick.bind(this);

      canvas.addEventListener('mousedown', mouseDownHandler);
      canvas.addEventListener('mousemove', mouseMoveHandler);
      canvas.addEventListener('mouseup', mouseUpHandler);
      canvas.addEventListener('mouseleave', mouseUpHandler);
      canvas.addEventListener('dblclick', dblClickHandler);

      this.cleanupFunctions.push(
        () => canvas.removeEventListener('mousedown', mouseDownHandler),
        () => canvas.removeEventListener('mousemove', mouseMoveHandler),
        () => canvas.removeEventListener('mouseup', mouseUpHandler),
        () => canvas.removeEventListener('mouseleave', mouseUpHandler),
        () => canvas.removeEventListener('dblclick', dblClickHandler)
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
   * Reset drag state
   */
  private resetDragState(): void {
    this.dragState = {
      isDragging: false,
      layerId: null,
      startX: 0,
      startY: 0,
      offsetX: 0,
      offsetY: 0,
    };
  }

  /**
   * Handle mouse down event
   */
  private handleMouseDown(event: MouseEvent): void {
    const canvas = this.getCanvas();
    const ctx = this.getContext();
    if (!canvas || !ctx) return;

    const pointerEvent = normalizePointerEvent(event, canvas, 'start');
    this.startInteraction(pointerEvent.x, pointerEvent.y, ctx);
  }

  /**
   * Handle mouse move event
   */
  private handleMouseMove(event: MouseEvent): void {
    if (!this.dragState.isDragging) return;

    const canvas = this.getCanvas();
    if (!canvas) return;

    const pointerEvent = normalizePointerEvent(event, canvas, 'move');
    this.continueDrag(pointerEvent.x, pointerEvent.y);
  }

  /**
   * Handle mouse up event
   */
  private handleMouseUp(): void {
    if (this.dragState.isDragging) {
      this.endDrag();
    }
  }

  /**
   * Handle double click event - add new text
   */
  private handleDoubleClick(event: MouseEvent): void {
    const canvas = this.getCanvas();
    const ctx = this.getContext();
    if (!canvas || !ctx) return;

    const pointerEvent = normalizePointerEvent(event, canvas, 'start');
    
    // Check if clicking on existing layer
    const layers = this.layerManager.getAllLayers();
    const clickedLayer = findTextLayerAtPoint(pointerEvent.x, pointerEvent.y, layers, ctx);
    
    if (!clickedLayer) {
      // Add new text at click position
      const defaultText = 'Double click to edit';
      this.addText(defaultText, pointerEvent.x, pointerEvent.y);
    }
  }


  /**
   * Handle touch start event
   */
  private handleTouchStart(event: TouchEvent): void {
    event.preventDefault();
    const canvas = this.getCanvas();
    const ctx = this.getContext();
    if (!canvas || !ctx) return;

    const pointerEvent = normalizePointerEvent(event, canvas, 'start');
    this.startInteraction(pointerEvent.x, pointerEvent.y, ctx);
  }

  /**
   * Handle touch move event
   */
  private handleTouchMove(event: TouchEvent): void {
    event.preventDefault();
    if (!this.dragState.isDragging) return;

    const canvas = this.getCanvas();
    if (!canvas) return;

    const pointerEvent = normalizePointerEvent(event, canvas, 'move');
    this.continueDrag(pointerEvent.x, pointerEvent.y);
  }

  /**
   * Handle touch end event
   */
  private handleTouchEnd(): void {
    if (this.dragState.isDragging) {
      this.endDrag();
    }
  }

  /**
   * Start interaction (select or drag)
   */
  private startInteraction(x: number, y: number, ctx: CanvasRenderingContext2D): void {
    const layers = this.layerManager.getAllLayers();
    const clickedLayer = findTextLayerAtPoint(x, y, layers, ctx);

    if (clickedLayer) {
      // Select and start dragging
      this.layerManager.selectLayer(clickedLayer.id);
      
      this.dragState = {
        isDragging: true,
        layerId: clickedLayer.id,
        startX: x,
        startY: y,
        offsetX: x - clickedLayer.x,
        offsetY: y - clickedLayer.y,
      };
      
      this.renderLayers();
    } else {
      // Deselect
      this.layerManager.selectLayer(null);
      this.renderLayers();
    }
  }

  /**
   * Continue drag operation
   * Requirements: 4.4
   */
  private continueDrag(x: number, y: number): void {
    if (!this.dragState.isDragging || !this.dragState.layerId) return;

    const newX = x - this.dragState.offsetX;
    const newY = y - this.dragState.offsetY;

    this.layerManager.updatePosition(this.dragState.layerId, newX, newY);
    this.renderLayers();
  }

  /**
   * End drag operation
   * Requirements: 4.4
   */
  private endDrag(): void {
    if (this.dragState.isDragging && this.dragState.layerId) {
      this.saveState();
    }
    this.resetDragState();
  }

  /**
   * Flatten text layers into the base image
   * Call this before exporting or when finalizing edits
   */
  flattenLayers(): void {
    const ctx = this.getContext();
    const canvas = this.getCanvas();
    if (!ctx || !canvas) return;

    // Render layers without selection
    if (this.baseImageData) {
      ctx.putImageData(this.baseImageData, 0, 0);
    }
    
    const layers = this.layerManager.getAllLayers();
    renderAllTextLayers(ctx, layers, null);

    // Update base image with flattened result
    this.baseImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Clear layers
    this.layerManager.clearAll();
  }

  /**
   * Update base image (call after external canvas changes)
   */
  updateBaseImage(): void {
    this.saveBaseImage();
    this.renderLayers();
  }
}
