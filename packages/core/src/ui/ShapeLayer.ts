/**
 * ShapeLayer - Manages drawable shapes as layers
 */

export type ShapeType = 'pen' | 'rect' | 'circle' | 'arrow' | 'text' | 'line' | 'triangle';

export interface Point {
  x: number;
  y: number;
}

export interface ShapeStyle {
  strokeColor: string;
  strokeWidth: number;
  fillColor?: string;
  strokeDash?: number[];  // For dashed lines
  fillMode?: 'none' | 'fill' | 'stroke' | 'both';  // Fill mode
}

export interface BaseShape {
  id: string;
  type: ShapeType;
  style: ShapeStyle;
  selected: boolean;
}

export interface PenShape extends BaseShape {
  type: 'pen';
  points: Point[];
}

export interface RectShape extends BaseShape {
  type: 'rect';
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CircleShape extends BaseShape {
  type: 'circle';
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

export interface ArrowShape extends BaseShape {
  type: 'arrow';
  start: Point;
  end: Point;
}

export interface TextShape extends BaseShape {
  type: 'text';
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontFamily?: string;
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
  textDecoration?: 'none' | 'underline';
  strokeEnabled?: boolean;
  strokeColor?: string;
  strokeWidth?: number;
}

export interface LineShape extends BaseShape {
  type: 'line';
  start: Point;
  end: Point;
}

export interface TriangleShape extends BaseShape {
  type: 'triangle';
  points: [Point, Point, Point];
}

export type Shape = PenShape | RectShape | CircleShape | ArrowShape | TextShape | LineShape | TriangleShape;

let shapeIdCounter = 0;
function generateId(): string {
  return `shape_${Date.now()}_${++shapeIdCounter}`;
}

export class ShapeLayerManager {
  private shapes: Shape[] = [];
  private selectedShapeId: string | null = null;
  private onChange: (() => void) | null = null;

  /** Create a new shape */
  createShape(type: ShapeType, style: ShapeStyle): string {
    const id = generateId();
    const baseShape = { id, type, style, selected: false };
    
    switch (type) {
      case 'pen':
        this.shapes.push({ ...baseShape, type: 'pen', points: [] } as PenShape);
        break;
      case 'rect':
        this.shapes.push({ ...baseShape, type: 'rect', x: 0, y: 0, width: 0, height: 0 } as RectShape);
        break;
      case 'circle':
        this.shapes.push({ ...baseShape, type: 'circle', cx: 0, cy: 0, rx: 0, ry: 0 } as CircleShape);
        break;
      case 'arrow':
        this.shapes.push({ ...baseShape, type: 'arrow', start: { x: 0, y: 0 }, end: { x: 0, y: 0 } } as ArrowShape);
        break;
      case 'text':
        this.shapes.push({ ...baseShape, type: 'text', text: '', x: 0, y: 0, fontSize: 24, color: style.strokeColor } as TextShape);
        break;
      case 'line':
        this.shapes.push({ ...baseShape, type: 'line', start: { x: 0, y: 0 }, end: { x: 0, y: 0 } } as LineShape);
        break;
      case 'triangle':
        this.shapes.push({ ...baseShape, type: 'triangle', points: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }] } as TriangleShape);
        break;
    }
    
    return id;
  }

  /** Get shape by ID */
  getShape(id: string): Shape | undefined {
    return this.shapes.find(s => s.id === id);
  }

  /** Update shape data */
  updateShape(id: string, updates: Partial<Shape>): void {
    const shape = this.shapes.find(s => s.id === id);
    if (shape) {
      Object.assign(shape, updates);
      this.notifyChange();
    }
  }

  /** Delete shape */
  deleteShape(id: string): void {
    const index = this.shapes.findIndex(s => s.id === id);
    if (index !== -1) {
      this.shapes.splice(index, 1);
      if (this.selectedShapeId === id) {
        this.selectedShapeId = null;
      }
      this.notifyChange();
    }
  }

  /** Select shape */
  selectShape(id: string | null): void {
    // Deselect previous
    if (this.selectedShapeId) {
      const prev = this.shapes.find(s => s.id === this.selectedShapeId);
      if (prev) prev.selected = false;
    }
    
    // Select new
    this.selectedShapeId = id;
    if (id) {
      const shape = this.shapes.find(s => s.id === id);
      if (shape) shape.selected = true;
    }
    
    this.notifyChange();
  }

  /** Get selected shape */
  getSelectedShape(): Shape | null {
    if (!this.selectedShapeId) return null;
    return this.shapes.find(s => s.id === this.selectedShapeId) || null;
  }

  /** Find shape at point */
  findShapeAtPoint(x: number, y: number, tolerance: number = 5): Shape | null {
    // Check from top to bottom (last drawn = top)
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i];
      if (this.isPointInShape(shape, x, y, tolerance)) {
        return shape;
      }
    }
    return null;
  }

  /** Check if point is inside shape */
  private isPointInShape(shape: Shape, x: number, y: number, tolerance: number): boolean {
    switch (shape.type) {
      case 'rect': {
        const s = shape as RectShape;
        return x >= s.x - tolerance && x <= s.x + s.width + tolerance &&
               y >= s.y - tolerance && y <= s.y + s.height + tolerance;
      }
      case 'circle': {
        const s = shape as CircleShape;
        const dx = (x - s.cx) / (s.rx + tolerance);
        const dy = (y - s.cy) / (s.ry + tolerance);
        return dx * dx + dy * dy <= 1;
      }
      case 'arrow':
      case 'line': {
        const s = shape as ArrowShape | LineShape;
        // Check distance to line segment
        const dist = this.pointToLineDistance(x, y, s.start.x, s.start.y, s.end.x, s.end.y);
        return dist <= tolerance + s.style.strokeWidth;
      }
      case 'triangle': {
        const s = shape as TriangleShape;
        // Check if point is near any edge
        for (let i = 0; i < 3; i++) {
          const p1 = s.points[i];
          const p2 = s.points[(i + 1) % 3];
          const dist = this.pointToLineDistance(x, y, p1.x, p1.y, p2.x, p2.y);
          if (dist <= tolerance + s.style.strokeWidth) return true;
        }
        return false;
      }
      case 'pen': {
        const s = shape as PenShape;
        // Check distance to any segment
        for (let i = 1; i < s.points.length; i++) {
          const dist = this.pointToLineDistance(x, y, s.points[i-1].x, s.points[i-1].y, s.points[i].x, s.points[i].y);
          if (dist <= tolerance + s.style.strokeWidth) return true;
        }
        return false;
      }
      case 'text': {
        const s = shape as TextShape;
        // Approximate text bounds
        const width = s.text.length * s.fontSize * 0.6;
        const height = s.fontSize * 1.2;
        return x >= s.x - tolerance && x <= s.x + width + tolerance &&
               y >= s.y - height - tolerance && y <= s.y + tolerance;
      }
    }
    return false;
  }

  /** Calculate distance from point to line segment */
  private pointToLineDistance(px: number, py: number, x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len2 = dx * dx + dy * dy;
    
    if (len2 === 0) {
      return Math.sqrt((px - x1) ** 2 + (py - y1) ** 2);
    }
    
    let t = ((px - x1) * dx + (py - y1) * dy) / len2;
    t = Math.max(0, Math.min(1, t));
    
    const nearX = x1 + t * dx;
    const nearY = y1 + t * dy;
    
    return Math.sqrt((px - nearX) ** 2 + (py - nearY) ** 2);
  }

  /** Move shape by delta */
  moveShape(id: string, dx: number, dy: number): void {
    const shape = this.shapes.find(s => s.id === id);
    if (!shape) return;
    
    switch (shape.type) {
      case 'rect': {
        const s = shape as RectShape;
        s.x += dx;
        s.y += dy;
        break;
      }
      case 'circle': {
        const s = shape as CircleShape;
        s.cx += dx;
        s.cy += dy;
        break;
      }
      case 'arrow': {
        const s = shape as ArrowShape;
        s.start.x += dx;
        s.start.y += dy;
        s.end.x += dx;
        s.end.y += dy;
        break;
      }
      case 'pen': {
        const s = shape as PenShape;
        s.points.forEach(p => {
          p.x += dx;
          p.y += dy;
        });
        break;
      }
      case 'text': {
        const s = shape as TextShape;
        s.x += dx;
        s.y += dy;
        break;
      }
      case 'line': {
        const s = shape as LineShape;
        s.start.x += dx;
        s.start.y += dy;
        s.end.x += dx;
        s.end.y += dy;
        break;
      }
      case 'triangle': {
        const s = shape as TriangleShape;
        s.points.forEach(p => {
          p.x += dx;
          p.y += dy;
        });
        break;
      }
    }
    
    this.notifyChange();
  }

  /** Get all shapes */
  getShapes(): Shape[] {
    return [...this.shapes];
  }

  /** Clear all shapes */
  clear(): void {
    this.shapes = [];
    this.selectedShapeId = null;
    this.notifyChange();
  }

  /** Set change callback */
  setOnChange(callback: () => void): void {
    this.onChange = callback;
  }

  // ========== Layer Management ==========
  
  /** Bring shape to front */
  bringToFront(id: string): void {
    const index = this.shapes.findIndex(s => s.id === id);
    if (index !== -1 && index < this.shapes.length - 1) {
      const [shape] = this.shapes.splice(index, 1);
      this.shapes.push(shape);
      this.notifyChange();
    }
  }

  /** Send shape to back */
  sendToBack(id: string): void {
    const index = this.shapes.findIndex(s => s.id === id);
    if (index > 0) {
      const [shape] = this.shapes.splice(index, 1);
      this.shapes.unshift(shape);
      this.notifyChange();
    }
  }

  /** Bring shape forward one level */
  bringForward(id: string): void {
    const index = this.shapes.findIndex(s => s.id === id);
    if (index !== -1 && index < this.shapes.length - 1) {
      [this.shapes[index], this.shapes[index + 1]] = [this.shapes[index + 1], this.shapes[index]];
      this.notifyChange();
    }
  }

  /** Send shape backward one level */
  sendBackward(id: string): void {
    const index = this.shapes.findIndex(s => s.id === id);
    if (index > 0) {
      [this.shapes[index - 1], this.shapes[index]] = [this.shapes[index], this.shapes[index - 1]];
      this.notifyChange();
    }
  }

  /** Duplicate a shape */
  duplicateShape(id: string, offset: { x: number; y: number } = { x: 20, y: 20 }): string | null {
    const shape = this.shapes.find(s => s.id === id);
    if (!shape) return null;
    
    const newId = generateId();
    const clonedShape = JSON.parse(JSON.stringify(shape));
    clonedShape.id = newId;
    clonedShape.selected = false;
    
    // Offset the clone
    this.offsetShape(clonedShape, offset.x, offset.y);
    
    this.shapes.push(clonedShape);
    this.notifyChange();
    return newId;
  }
  
  /** Offset shape position */
  private offsetShape(shape: Shape, dx: number, dy: number): void {
    switch (shape.type) {
      case 'rect':
        (shape as RectShape).x += dx;
        (shape as RectShape).y += dy;
        break;
      case 'circle':
        (shape as CircleShape).cx += dx;
        (shape as CircleShape).cy += dy;
        break;
      case 'arrow':
      case 'line':
        (shape as ArrowShape).start.x += dx;
        (shape as ArrowShape).start.y += dy;
        (shape as ArrowShape).end.x += dx;
        (shape as ArrowShape).end.y += dy;
        break;
      case 'pen':
        (shape as PenShape).points.forEach(p => { p.x += dx; p.y += dy; });
        break;
      case 'text':
        (shape as TextShape).x += dx;
        (shape as TextShape).y += dy;
        break;
      case 'triangle':
        (shape as TriangleShape).points.forEach(p => { p.x += dx; p.y += dy; });
        break;
    }
  }

  /** Get shape z-index (position in array) */
  getShapeZIndex(id: string): number {
    return this.shapes.findIndex(s => s.id === id);
  }

  /** Get shape count */
  getShapeCount(): number {
    return this.shapes.length;
  }

  private notifyChange(): void {
    this.onChange?.();
  }

  /** Render all shapes to canvas context */
  render(ctx: CanvasRenderingContext2D): void {
    for (const shape of this.shapes) {
      this.renderShape(ctx, shape);
    }
  }

  /** Render single shape */
  private renderShape(ctx: CanvasRenderingContext2D, shape: Shape): void {
    ctx.save();
    ctx.strokeStyle = shape.style.strokeColor;
    ctx.lineWidth = shape.style.strokeWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    switch (shape.type) {
      case 'rect': {
        const s = shape as RectShape;
        ctx.beginPath();
        ctx.rect(s.x, s.y, s.width, s.height);
        ctx.stroke();
        break;
      }
      case 'circle': {
        const s = shape as CircleShape;
        ctx.beginPath();
        ctx.ellipse(s.cx, s.cy, s.rx, s.ry, 0, 0, Math.PI * 2);
        ctx.stroke();
        break;
      }
      case 'arrow': {
        const s = shape as ArrowShape;
        // Draw line
        ctx.beginPath();
        ctx.moveTo(s.start.x, s.start.y);
        ctx.lineTo(s.end.x, s.end.y);
        ctx.stroke();
        // Draw arrowhead
        const headLen = Math.max(10, s.style.strokeWidth * 4);
        const angle = Math.atan2(s.end.y - s.start.y, s.end.x - s.start.x);
        ctx.beginPath();
        ctx.moveTo(s.end.x, s.end.y);
        ctx.lineTo(s.end.x - headLen * Math.cos(angle - Math.PI / 6), s.end.y - headLen * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(s.end.x, s.end.y);
        ctx.lineTo(s.end.x - headLen * Math.cos(angle + Math.PI / 6), s.end.y - headLen * Math.sin(angle + Math.PI / 6));
        ctx.stroke();
        break;
      }
      case 'pen': {
        const s = shape as PenShape;
        if (s.points.length < 2) break;
        ctx.beginPath();
        ctx.moveTo(s.points[0].x, s.points[0].y);
        for (let i = 1; i < s.points.length; i++) {
          ctx.lineTo(s.points[i].x, s.points[i].y);
        }
        ctx.stroke();
        break;
      }
      case 'text': {
        const s = shape as TextShape;
        ctx.font = `${s.fontSize}px sans-serif`;
        ctx.fillStyle = s.color;
        ctx.fillText(s.text, s.x, s.y);
        break;
      }
      case 'line': {
        const s = shape as LineShape;
        ctx.beginPath();
        ctx.moveTo(s.start.x, s.start.y);
        ctx.lineTo(s.end.x, s.end.y);
        ctx.stroke();
        break;
      }
      case 'triangle': {
        const s = shape as TriangleShape;
        ctx.beginPath();
        ctx.moveTo(s.points[0].x, s.points[0].y);
        ctx.lineTo(s.points[1].x, s.points[1].y);
        ctx.lineTo(s.points[2].x, s.points[2].y);
        ctx.closePath();
        ctx.stroke();
        break;
      }
    }
    
    // Draw selection indicator
    if (shape.selected) {
      this.renderSelectionBox(ctx, shape);
    }
    
    ctx.restore();
  }

  /** Render selection box around shape */
  private renderSelectionBox(ctx: CanvasRenderingContext2D, shape: Shape): void {
    const bounds = this.getShapeBounds(shape);
    if (!bounds) return;
    
    const padding = 4;
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(
      bounds.x - padding,
      bounds.y - padding,
      bounds.width + padding * 2,
      bounds.height + padding * 2
    );
    ctx.setLineDash([]);
  }

  /** Get shape bounding box */
  getShapeBounds(shape: Shape): { x: number; y: number; width: number; height: number } | null {
    switch (shape.type) {
      case 'rect': {
        const s = shape as RectShape;
        return { x: s.x, y: s.y, width: s.width, height: s.height };
      }
      case 'circle': {
        const s = shape as CircleShape;
        return { x: s.cx - s.rx, y: s.cy - s.ry, width: s.rx * 2, height: s.ry * 2 };
      }
      case 'arrow': {
        const s = shape as ArrowShape;
        const minX = Math.min(s.start.x, s.end.x);
        const minY = Math.min(s.start.y, s.end.y);
        const maxX = Math.max(s.start.x, s.end.x);
        const maxY = Math.max(s.start.y, s.end.y);
        return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
      }
      case 'pen': {
        const s = shape as PenShape;
        if (s.points.length === 0) return null;
        let minX = s.points[0].x, maxX = s.points[0].x;
        let minY = s.points[0].y, maxY = s.points[0].y;
        for (const p of s.points) {
          minX = Math.min(minX, p.x);
          maxX = Math.max(maxX, p.x);
          minY = Math.min(minY, p.y);
          maxY = Math.max(maxY, p.y);
        }
        return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
      }
      case 'text': {
        const s = shape as TextShape;
        const width = s.text.length * s.fontSize * 0.6;
        const height = s.fontSize * 1.2;
        return { x: s.x, y: s.y - height, width, height };
      }
      case 'line': {
        const s = shape as LineShape;
        const minX = Math.min(s.start.x, s.end.x);
        const minY = Math.min(s.start.y, s.end.y);
        const maxX = Math.max(s.start.x, s.end.x);
        const maxY = Math.max(s.start.y, s.end.y);
        return { x: minX, y: minY, width: maxX - minX || 1, height: maxY - minY || 1 };
      }
      case 'triangle': {
        const s = shape as TriangleShape;
        const xs = s.points.map(p => p.x);
        const ys = s.points.map(p => p.y);
        const minX = Math.min(...xs);
        const minY = Math.min(...ys);
        const maxX = Math.max(...xs);
        const maxY = Math.max(...ys);
        return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
      }
    }
    return null;
  }

  /** Resize shape by scale factor */
  resizeShape(id: string, scaleX: number, scaleY: number, anchorX: number, anchorY: number): void {
    const shape = this.shapes.find(s => s.id === id);
    if (!shape) return;
    
    switch (shape.type) {
      case 'rect': {
        const s = shape as RectShape;
        const newX = anchorX + (s.x - anchorX) * scaleX;
        const newY = anchorY + (s.y - anchorY) * scaleY;
        s.x = newX;
        s.y = newY;
        s.width *= scaleX;
        s.height *= scaleY;
        break;
      }
      case 'circle': {
        const s = shape as CircleShape;
        s.cx = anchorX + (s.cx - anchorX) * scaleX;
        s.cy = anchorY + (s.cy - anchorY) * scaleY;
        s.rx *= scaleX;
        s.ry *= scaleY;
        break;
      }
      case 'arrow':
      case 'line': {
        const s = shape as ArrowShape | LineShape;
        s.start.x = anchorX + (s.start.x - anchorX) * scaleX;
        s.start.y = anchorY + (s.start.y - anchorY) * scaleY;
        s.end.x = anchorX + (s.end.x - anchorX) * scaleX;
        s.end.y = anchorY + (s.end.y - anchorY) * scaleY;
        break;
      }
      case 'pen': {
        const s = shape as PenShape;
        s.points.forEach(p => {
          p.x = anchorX + (p.x - anchorX) * scaleX;
          p.y = anchorY + (p.y - anchorY) * scaleY;
        });
        break;
      }
      case 'triangle': {
        const s = shape as TriangleShape;
        s.points.forEach(p => {
          p.x = anchorX + (p.x - anchorX) * scaleX;
          p.y = anchorY + (p.y - anchorY) * scaleY;
        });
        break;
      }
    }
    
    this.notifyChange();
  }

  /** Get control points for selected shape */
  getControlPoints(shape: Shape): Array<{ x: number; y: number; type: string }> {
    const bounds = this.getShapeBounds(shape);
    if (!bounds) return [];
    
    const { x, y, width, height } = bounds;
    return [
      { x: x, y: y, type: 'nw' },
      { x: x + width / 2, y: y, type: 'n' },
      { x: x + width, y: y, type: 'ne' },
      { x: x + width, y: y + height / 2, type: 'e' },
      { x: x + width, y: y + height, type: 'se' },
      { x: x + width / 2, y: y + height, type: 's' },
      { x: x, y: y + height, type: 'sw' },
      { x: x, y: y + height / 2, type: 'w' },
    ];
  }
}
