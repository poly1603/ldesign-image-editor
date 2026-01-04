/**
 * Rulers - Pixel rulers and grid overlay for the editor
 */

export interface RulersOptions {
  /** Show horizontal ruler */
  showHorizontal?: boolean;
  /** Show vertical ruler */
  showVertical?: boolean;
  /** Show grid */
  showGrid?: boolean;
  /** Grid size in pixels */
  gridSize?: number;
  /** Ruler color */
  rulerColor?: string;
  /** Grid color */
  gridColor?: string;
  /** Ruler background */
  rulerBackground?: string;
  /** Unit (pixels or percentage) */
  unit?: 'px' | '%';
}

const defaultOptions: Required<RulersOptions> = {
  showHorizontal: true,
  showVertical: true,
  showGrid: false,
  gridSize: 50,
  rulerColor: '#666',
  gridColor: 'rgba(128, 128, 128, 0.3)',
  rulerBackground: '#f5f5f5',
  unit: 'px',
};

export class Rulers {
  private options: Required<RulersOptions>;
  private container: HTMLElement;
  private horizontalRuler: HTMLCanvasElement | null = null;
  private verticalRuler: HTMLCanvasElement | null = null;
  private gridOverlay: HTMLCanvasElement | null = null;
  
  // View state
  private scale = 1;
  private offsetX = 0;
  private offsetY = 0;
  private canvasWidth = 0;
  private canvasHeight = 0;
  
  constructor(container: HTMLElement, options: RulersOptions = {}) {
    this.container = container;
    this.options = { ...defaultOptions, ...options };
    this.init();
  }
  
  private init(): void {
    // Create horizontal ruler
    if (this.options.showHorizontal) {
      this.horizontalRuler = document.createElement('canvas');
      this.horizontalRuler.className = 'ie-ruler ie-ruler-horizontal';
      this.horizontalRuler.style.cssText = `
        position: absolute;
        top: 0;
        left: 24px;
        height: 24px;
        width: calc(100% - 24px);
        background: ${this.options.rulerBackground};
        border-bottom: 1px solid #ddd;
        z-index: 100;
      `;
      this.container.appendChild(this.horizontalRuler);
    }
    
    // Create vertical ruler
    if (this.options.showVertical) {
      this.verticalRuler = document.createElement('canvas');
      this.verticalRuler.className = 'ie-ruler ie-ruler-vertical';
      this.verticalRuler.style.cssText = `
        position: absolute;
        top: 24px;
        left: 0;
        width: 24px;
        height: calc(100% - 24px);
        background: ${this.options.rulerBackground};
        border-right: 1px solid #ddd;
        z-index: 100;
      `;
      this.container.appendChild(this.verticalRuler);
    }
    
    // Create corner piece
    if (this.options.showHorizontal && this.options.showVertical) {
      const corner = document.createElement('div');
      corner.className = 'ie-ruler-corner';
      corner.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 24px;
        height: 24px;
        background: ${this.options.rulerBackground};
        border-right: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        z-index: 101;
      `;
      this.container.appendChild(corner);
    }
    
    // Create grid overlay
    if (this.options.showGrid) {
      this.gridOverlay = document.createElement('canvas');
      this.gridOverlay.className = 'ie-grid-overlay';
      this.gridOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 50;
      `;
      this.container.appendChild(this.gridOverlay);
    }
    
    this.updateRulers();
  }
  
  /** Update view state */
  updateView(scale: number, offsetX: number, offsetY: number, canvasWidth: number, canvasHeight: number): void {
    this.scale = scale;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.updateRulers();
  }
  
  /** Update ruler drawings */
  private updateRulers(): void {
    this.drawHorizontalRuler();
    this.drawVerticalRuler();
    this.drawGrid();
  }
  
  private drawHorizontalRuler(): void {
    if (!this.horizontalRuler) return;
    
    const canvas = this.horizontalRuler;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.clearRect(0, 0, rect.width, rect.height);
    
    ctx.fillStyle = this.options.rulerColor;
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    
    // Calculate tick interval based on scale
    const baseInterval = this.getTickInterval();
    
    // Calculate start position
    const containerCenter = rect.width / 2;
    const canvasStart = containerCenter + this.offsetX - (this.canvasWidth * this.scale) / 2;
    
    // Draw ticks
    for (let i = 0; i <= this.canvasWidth; i += baseInterval) {
      const x = canvasStart + i * this.scale;
      if (x < 0 || x > rect.width) continue;
      
      const isMajor = i % (baseInterval * 5) === 0;
      const tickHeight = isMajor ? 12 : 6;
      
      ctx.beginPath();
      ctx.moveTo(x, rect.height);
      ctx.lineTo(x, rect.height - tickHeight);
      ctx.stroke();
      
      if (isMajor) {
        ctx.fillText(String(i), x, rect.height - 14);
      }
    }
  }
  
  private drawVerticalRuler(): void {
    if (!this.verticalRuler) return;
    
    const canvas = this.verticalRuler;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.clearRect(0, 0, rect.width, rect.height);
    
    ctx.fillStyle = this.options.rulerColor;
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'right';
    
    // Calculate tick interval based on scale
    const baseInterval = this.getTickInterval();
    
    // Calculate start position
    const containerCenter = rect.height / 2;
    const canvasStart = containerCenter + this.offsetY - (this.canvasHeight * this.scale) / 2;
    
    // Draw ticks
    for (let i = 0; i <= this.canvasHeight; i += baseInterval) {
      const y = canvasStart + i * this.scale;
      if (y < 0 || y > rect.height) continue;
      
      const isMajor = i % (baseInterval * 5) === 0;
      const tickWidth = isMajor ? 12 : 6;
      
      ctx.beginPath();
      ctx.moveTo(rect.width, y);
      ctx.lineTo(rect.width - tickWidth, y);
      ctx.stroke();
      
      if (isMajor) {
        ctx.save();
        ctx.translate(rect.width - 14, y);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText(String(i), 0, 0);
        ctx.restore();
      }
    }
  }
  
  private drawGrid(): void {
    if (!this.gridOverlay) return;
    
    const canvas = this.gridOverlay;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.clearRect(0, 0, rect.width, rect.height);
    
    ctx.strokeStyle = this.options.gridColor;
    ctx.lineWidth = 1;
    
    // Calculate start position
    const containerCenterX = rect.width / 2;
    const containerCenterY = rect.height / 2;
    const canvasStartX = containerCenterX + this.offsetX - (this.canvasWidth * this.scale) / 2;
    const canvasStartY = containerCenterY + this.offsetY - (this.canvasHeight * this.scale) / 2;
    const canvasEndX = canvasStartX + this.canvasWidth * this.scale;
    const canvasEndY = canvasStartY + this.canvasHeight * this.scale;
    
    // Draw vertical lines
    for (let i = 0; i <= this.canvasWidth; i += this.options.gridSize) {
      const x = canvasStartX + i * this.scale;
      if (x < 0 || x > rect.width) continue;
      
      ctx.beginPath();
      ctx.moveTo(x, Math.max(0, canvasStartY));
      ctx.lineTo(x, Math.min(rect.height, canvasEndY));
      ctx.stroke();
    }
    
    // Draw horizontal lines
    for (let i = 0; i <= this.canvasHeight; i += this.options.gridSize) {
      const y = canvasStartY + i * this.scale;
      if (y < 0 || y > rect.height) continue;
      
      ctx.beginPath();
      ctx.moveTo(Math.max(0, canvasStartX), y);
      ctx.lineTo(Math.min(rect.width, canvasEndX), y);
      ctx.stroke();
    }
  }
  
  /** Get tick interval based on scale */
  private getTickInterval(): number {
    if (this.scale < 0.25) return 100;
    if (this.scale < 0.5) return 50;
    if (this.scale < 1) return 25;
    if (this.scale < 2) return 10;
    return 5;
  }
  
  /** Toggle grid visibility */
  setGridVisible(visible: boolean): void {
    this.options.showGrid = visible;
    if (visible && !this.gridOverlay) {
      this.gridOverlay = document.createElement('canvas');
      this.gridOverlay.className = 'ie-grid-overlay';
      this.gridOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 50;
      `;
      this.container.appendChild(this.gridOverlay);
    } else if (!visible && this.gridOverlay) {
      this.gridOverlay.remove();
      this.gridOverlay = null;
    }
    this.updateRulers();
  }
  
  /** Set grid size */
  setGridSize(size: number): void {
    this.options.gridSize = size;
    this.updateRulers();
  }
  
  /** Destroy rulers */
  destroy(): void {
    this.horizontalRuler?.remove();
    this.verticalRuler?.remove();
    this.gridOverlay?.remove();
    // Remove corner
    this.container.querySelector('.ie-ruler-corner')?.remove();
  }
}

/** Create rulers helper */
export function createRulers(container: HTMLElement, options?: RulersOptions): Rulers {
  return new Rulers(container, options);
}
