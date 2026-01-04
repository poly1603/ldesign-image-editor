/**
 * Text rendering utility functions
 * Requirements: 4.1, 4.2, 4.3, 4.5, 4.6
 */

import type { TextConfig } from '../../types/config.types';
import type { TextLayer } from '../../types/plugin.types';

/**
 * Build CSS font string from text configuration
 * Requirements: 4.2, 4.5
 * @param config - Text configuration
 * @returns CSS font string
 */
export function buildFontString(config: TextConfig): string {
  const parts: string[] = [];
  
  if (config.italic) {
    parts.push('italic');
  }
  
  if (config.bold) {
    parts.push('bold');
  }
  
  parts.push(`${config.fontSize}px`);
  parts.push(config.fontFamily);
  
  return parts.join(' ');
}

/**
 * Measure text dimensions
 * @param ctx - Canvas 2D context
 * @param text - Text to measure
 * @param config - Text configuration
 * @returns Text dimensions
 */
export function measureText(
  ctx: CanvasRenderingContext2D,
  text: string,
  config: TextConfig
): { width: number; height: number } {
  const originalFont = ctx.font;
  ctx.font = buildFontString(config);
  
  const lines = text.split('\n');
  const lineHeight = config.fontSize * config.lineHeight;
  
  let maxWidth = 0;
  for (const line of lines) {
    const metrics = ctx.measureText(line);
    maxWidth = Math.max(maxWidth, metrics.width);
  }
  
  ctx.font = originalFont;
  
  return {
    width: maxWidth,
    height: lines.length * lineHeight,
  };
}

/**
 * Get text bounding box
 * @param layer - Text layer
 * @param ctx - Canvas 2D context
 * @returns Bounding box coordinates
 */
export function getTextBoundingBox(
  layer: TextLayer,
  ctx: CanvasRenderingContext2D
): { x: number; y: number; width: number; height: number } {
  const dimensions = measureText(ctx, layer.text, layer.config);
  
  let x = layer.x;
  
  // Adjust x based on alignment
  if (layer.config.align === 'center') {
    x -= dimensions.width / 2;
  } else if (layer.config.align === 'right') {
    x -= dimensions.width;
  }
  
  return {
    x,
    y: layer.y - layer.config.fontSize,
    width: dimensions.width,
    height: dimensions.height,
  };
}


/**
 * Check if a point is inside a text layer's bounding box
 * @param x - X coordinate
 * @param y - Y coordinate
 * @param layer - Text layer
 * @param ctx - Canvas 2D context
 * @param padding - Optional padding around the bounding box
 * @returns True if point is inside
 */
export function isPointInTextLayer(
  x: number,
  y: number,
  layer: TextLayer,
  ctx: CanvasRenderingContext2D,
  padding: number = 5
): boolean {
  const box = getTextBoundingBox(layer, ctx);
  
  return (
    x >= box.x - padding &&
    x <= box.x + box.width + padding &&
    y >= box.y - padding &&
    y <= box.y + box.height + padding
  );
}

/**
 * Find text layer at a given point
 * @param x - X coordinate
 * @param y - Y coordinate
 * @param layers - Array of text layers
 * @param ctx - Canvas 2D context
 * @returns Found layer or undefined
 */
export function findTextLayerAtPoint(
  x: number,
  y: number,
  layers: TextLayer[],
  ctx: CanvasRenderingContext2D
): TextLayer | undefined {
  // Search in reverse order (top layers first)
  for (let i = layers.length - 1; i >= 0; i--) {
    if (isPointInTextLayer(x, y, layers[i], ctx)) {
      return layers[i];
    }
  }
  return undefined;
}

/**
 * Render a single text layer to canvas
 * Requirements: 4.1, 4.2, 4.3, 4.5, 4.6
 * @param ctx - Canvas 2D context
 * @param layer - Text layer to render
 * @param isSelected - Whether the layer is selected
 */
export function renderTextLayer(
  ctx: CanvasRenderingContext2D,
  layer: TextLayer,
  isSelected: boolean = false
): void {
  const { text, x, y, config } = layer;
  
  // Save context state
  ctx.save();
  
  // Set font properties
  ctx.font = buildFontString(config);
  ctx.fillStyle = config.color;
  ctx.textAlign = config.align;
  ctx.textBaseline = 'alphabetic';
  
  // Render each line
  const lines = text.split('\n');
  const lineHeight = config.fontSize * config.lineHeight;
  
  for (let i = 0; i < lines.length; i++) {
    const lineY = y + i * lineHeight;
    ctx.fillText(lines[i], x, lineY);
    
    // Draw underline if enabled
    if (config.underline) {
      drawUnderline(ctx, lines[i], x, lineY, config);
    }
  }
  
  // Draw selection box if selected
  if (isSelected) {
    drawSelectionBox(ctx, layer);
  }
  
  // Restore context state
  ctx.restore();
}

/**
 * Draw underline for text
 * Requirements: 4.5
 * @param ctx - Canvas 2D context
 * @param text - Text content
 * @param x - X position
 * @param y - Y position
 * @param config - Text configuration
 */
function drawUnderline(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  config: TextConfig
): void {
  const metrics = ctx.measureText(text);
  const underlineY = y + config.fontSize * 0.1;
  const underlineThickness = Math.max(1, config.fontSize / 12);
  
  let startX = x;
  if (config.align === 'center') {
    startX = x - metrics.width / 2;
  } else if (config.align === 'right') {
    startX = x - metrics.width;
  }
  
  ctx.strokeStyle = config.color;
  ctx.lineWidth = underlineThickness;
  ctx.beginPath();
  ctx.moveTo(startX, underlineY);
  ctx.lineTo(startX + metrics.width, underlineY);
  ctx.stroke();
}

/**
 * Draw selection box around text layer
 * @param ctx - Canvas 2D context
 * @param layer - Text layer
 */
function drawSelectionBox(
  ctx: CanvasRenderingContext2D,
  layer: TextLayer
): void {
  const box = getTextBoundingBox(layer, ctx);
  const padding = 4;
  
  ctx.strokeStyle = '#0066ff';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.strokeRect(
    box.x - padding,
    box.y - padding,
    box.width + padding * 2,
    box.height + padding * 2
  );
  ctx.setLineDash([]);
  
  // Draw resize handles
  const handleSize = 6;
  ctx.fillStyle = '#0066ff';
  
  // Corner handles
  const corners = [
    { x: box.x - padding, y: box.y - padding },
    { x: box.x + box.width + padding, y: box.y - padding },
    { x: box.x - padding, y: box.y + box.height + padding },
    { x: box.x + box.width + padding, y: box.y + box.height + padding },
  ];
  
  for (const corner of corners) {
    ctx.fillRect(
      corner.x - handleSize / 2,
      corner.y - handleSize / 2,
      handleSize,
      handleSize
    );
  }
}

/**
 * Render all text layers
 * @param ctx - Canvas 2D context
 * @param layers - Array of text layers
 * @param selectedId - ID of selected layer (optional)
 */
export function renderAllTextLayers(
  ctx: CanvasRenderingContext2D,
  layers: TextLayer[],
  selectedId?: string | null
): void {
  for (const layer of layers) {
    renderTextLayer(ctx, layer, layer.id === selectedId);
  }
}
