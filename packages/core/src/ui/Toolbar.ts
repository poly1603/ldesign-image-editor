/**
 * Toolbar - Built-in toolbar UI for the editor
 */

import { icons } from './icons';
import { injectStyles } from './toolbar.styles';
import type { Editor } from '../core/Editor';
import { ShapeLayerManager, type PenShape, type RectShape, type CircleShape, type ArrowShape, type LineShape, type TriangleShape } from './ShapeLayer';
import { createPlaceholder } from '../utils/placeholder';

/** Available tool/button names that can be disabled */
export type ToolName = 
  | 'move' | 'pen' | 'rect' | 'circle' | 'arrow' | 'line' | 'triangle' | 'text' | 'mosaic' | 'eraser' | 'crop' | 'filter'  // Drawing tools
  | 'zoomIn' | 'zoomOut' | 'reset'  // Zoom controls
  | 'undo' | 'redo'  // History controls  
  | 'export';  // Export button

export interface ToolbarOptions {
  /** Show zoom controls */
  zoom?: boolean;
  /** Show tool buttons (brush, text) */
  tools?: boolean;
  /** Show history buttons (undo, redo) */
  history?: boolean;
  /** Show export button */
  export?: boolean;
  /** Theme: 'light' | 'dark' | 'auto' */
  theme?: 'light' | 'dark' | 'auto';
  /** Primary color for buttons and accents */
  primaryColor?: string;
  /** List of tools to disable */
  disabledTools?: ToolName[];
  /** Auto hide toolbar when no image is loaded */
  autoHide?: boolean;
  /** Placeholder text */
  placeholderText?: string;
  /** Placeholder sub text */
  placeholderSubText?: string;
  /** Placeholder width */
  placeholderWidth?: number;
  /** Placeholder height */
  placeholderHeight?: number;
  /** Locale for i18n */
  locale?: 'zh-CN' | 'en-US';
  /** Enable keyboard shortcuts */
  enableKeyboardShortcuts?: boolean;
  /** Enable advanced export dialog */
  enableExportDialog?: boolean;
  /** Enable watermark in export */
  enableWatermark?: boolean;
}

const defaultOptions: ToolbarOptions & { zoom: boolean; tools: boolean; history: boolean; export: boolean; theme: 'light' | 'dark' | 'auto'; autoHide: boolean } = {
  zoom: true,
  tools: true,
  history: true,
  export: true,
  theme: 'dark',
  autoHide: true,
};

export class Toolbar {
  private editor: Editor;
  private options: ToolbarOptions;
  private wrapper: HTMLElement;
  private canvasContainer: HTMLElement;
  private viewport: HTMLElement;
  private toolbar: HTMLElement;
  private zoomBadge: HTMLElement;
  
  // State
  private scale = 1;
  private translateX = 0;
  private translateY = 0;
  private isPanning = false;
  private lastPanPoint = { x: 0, y: 0 };
  private currentTool: string | null = null;
  private activePanel: string | null = null;
  
  // Drawing state
  private isDrawing = false;
  private drawStartPoint = { x: 0, y: 0 };
  private lastDrawPoint = { x: 0, y: 0 };
  private brushCursor: HTMLElement | null = null;
  
  // Settings for all tools
  private strokeWidth = 3;
  private strokeColor = '#ff0000';
  private mosaicSize = 10; // Block size for mosaic
  private textSize = 24;
  private textColor = '#ff0000';
  private textFontFamily = 'sans-serif';
  private textBold = false;
  private textItalic = false;
  private textUnderline = false;
  private eraserSize = 20;
  private eraserMode: 'pixel' | 'shape' = 'pixel';
  
  // Crop tool state
  private isCropActive = false;
  private cropOverlay: HTMLElement | null = null;
  
  // Touch gesture state
  private touchStartDistance = 0;
  private touchStartScale = 1;
  private touchStartCenter = { x: 0, y: 0 };
  private isTouchPanning = false;
  private lastTouchCenter = { x: 0, y: 0 };
  
  // Elements
  private panels: Map<string, HTMLElement> = new Map();
  private buttons: Map<string, HTMLButtonElement> = new Map();
  private zoomText: HTMLElement | null = null;
  
  // Inline text editing
  private inlineTextInput: HTMLDivElement | null = null;
  private textStyleBar: HTMLElement | null = null;
  private isAddingText = false;
  
  // Shape layer system
  private shapeManager: ShapeLayerManager;
  
  // Image state
  private hasRealImage = false;
  private currentShapeId: string | null = null;
  private isDraggingShape = false;
  private dragStartPoint = { x: 0, y: 0 };
  private originalImageData: ImageData | null = null;
  private pureImageData: ImageData | null = null;  // Pure original image without any annotations (for eraser)

  constructor(editor: Editor, container: HTMLElement, options: ToolbarOptions = {}) {
    this.editor = editor;
    this.options = { ...defaultOptions, ...options };
    
    // Initialize shape layer manager
    this.shapeManager = new ShapeLayerManager();
    this.shapeManager.setOnChange(() => this.renderAll());
    
    injectStyles();
    
    // Create wrapper
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'ie-editor-wrapper';
    
    // Apply theme and primary color
    this.applyTheme(this.options.theme || 'dark');
    if (this.options.primaryColor) {
      this.applyPrimaryColor(this.options.primaryColor);
    }
    
    // Create canvas container
    this.canvasContainer = document.createElement('div');
    this.canvasContainer.className = 'ie-canvas-container';
    
    // Create viewport
    this.viewport = document.createElement('div');
    this.viewport.className = 'ie-canvas-viewport';
    
    // Move canvas to viewport
    const canvas = editor.canvas;
    if (canvas.parentElement) {
      canvas.parentElement.removeChild(canvas);
    }
    this.viewport.appendChild(canvas);
    this.canvasContainer.appendChild(this.viewport);
    
    // Create zoom badge
    this.zoomBadge = document.createElement('div');
    this.zoomBadge.className = 'ie-zoom-badge';
    this.zoomBadge.textContent = '100%';
    this.canvasContainer.appendChild(this.zoomBadge);
    
    this.wrapper.appendChild(this.canvasContainer);
    
    // Create toolbar
    this.toolbar = this.createToolbar();
    this.wrapper.appendChild(this.toolbar);
    
    // Add to container
    container.appendChild(this.wrapper);
    
    // Setup events
    this.setupEvents();
    this.setupEditorEvents();
    
    // Set initial toolbar visibility
    if (this.options.autoHide) {
      this.setToolbarVisible(false);
    }
  }

  private createToolbar(): HTMLElement {
    const toolbar = document.createElement('div');
    toolbar.className = 'ie-toolbar';
    toolbar.style.position = 'relative';
    const disabled = this.options.disabledTools || [];
    
    // Zoom controls (always create, respect disabledTools)
    const zoomGroup = this.createGroup();
    zoomGroup.className = 'ie-toolbar-group ie-zoom-group';
    
    const zoomOutBtn = this.createButton('zoomOut', icons.zoomOut, () => this.zoomOut());
    if (disabled.includes('zoomOut')) zoomOutBtn.style.display = 'none';
    zoomGroup.appendChild(zoomOutBtn);
    
    this.zoomText = document.createElement('span');
    this.zoomText.className = 'ie-zoom-text';
    this.zoomText.textContent = '100%';
    zoomGroup.appendChild(this.zoomText);
    
    const zoomInBtn = this.createButton('zoomIn', icons.zoomIn, () => this.zoomIn());
    if (disabled.includes('zoomIn')) zoomInBtn.style.display = 'none';
    zoomGroup.appendChild(zoomInBtn);
    
    const resetBtn = this.createButton('reset', icons.reset, () => this.resetView());
    if (disabled.includes('reset')) resetBtn.style.display = 'none';
    zoomGroup.appendChild(resetBtn);
    
    toolbar.appendChild(zoomGroup);
    toolbar.appendChild(this.createDivider());
    
    // Tool controls (always create, respect disabledTools)
    const toolGroup = this.createGroup();
    toolGroup.className = 'ie-toolbar-group ie-tool-group';
    
    const moveBtn = this.createButton('move', icons.move, () => this.selectTool(null), true);
    if (disabled.includes('move')) moveBtn.style.display = 'none';
    toolGroup.appendChild(moveBtn);
    
    const penBtn = this.createButton('pen', icons.pen, () => this.selectTool('pen'));
    if (disabled.includes('pen')) penBtn.style.display = 'none';
    toolGroup.appendChild(penBtn);
    
    const rectBtn = this.createButton('rect', icons.rect, () => this.selectTool('rect'));
    if (disabled.includes('rect')) rectBtn.style.display = 'none';
    toolGroup.appendChild(rectBtn);
    
    const circleBtn = this.createButton('circle', icons.circle, () => this.selectTool('circle'));
    if (disabled.includes('circle')) circleBtn.style.display = 'none';
    toolGroup.appendChild(circleBtn);
    
    const arrowBtn = this.createButton('arrow', icons.arrow, () => this.selectTool('arrow'));
    if (disabled.includes('arrow')) arrowBtn.style.display = 'none';
    toolGroup.appendChild(arrowBtn);
    
    const lineBtn = this.createButton('line', icons.line, () => this.selectTool('line'));
    if (disabled.includes('line')) lineBtn.style.display = 'none';
    toolGroup.appendChild(lineBtn);
    
    const triangleBtn = this.createButton('triangle', icons.triangle, () => this.selectTool('triangle'));
    if (disabled.includes('triangle')) triangleBtn.style.display = 'none';
    toolGroup.appendChild(triangleBtn);
    
    const textBtn = this.createButton('text', icons.type, () => this.selectTool('text'));
    if (disabled.includes('text')) textBtn.style.display = 'none';
    toolGroup.appendChild(textBtn);
    
    const mosaicBtn = this.createButton('mosaic', icons.mosaic, () => this.selectTool('mosaic'));
    if (disabled.includes('mosaic')) mosaicBtn.style.display = 'none';
    toolGroup.appendChild(mosaicBtn);
    
    const eraserBtn = this.createButton('eraser', icons.eraser, () => this.selectTool('eraser'));
    if (disabled.includes('eraser')) eraserBtn.style.display = 'none';
    toolGroup.appendChild(eraserBtn);
    
    toolbar.appendChild(toolGroup);
    
    // Crop and filter tools
    const advancedGroup = this.createGroup();
    advancedGroup.className = 'ie-toolbar-group ie-advanced-group';
    
    const cropBtn = this.createButton('crop', icons.crop, () => this.toggleCropTool());
    if (disabled.includes('crop')) cropBtn.style.display = 'none';
    advancedGroup.appendChild(cropBtn);
    
    const filterBtn = this.createButton('filter', icons.filter, () => this.toggleFilterPanel());
    if (disabled.includes('filter')) filterBtn.style.display = 'none';
    advancedGroup.appendChild(filterBtn);
    
    toolbar.appendChild(advancedGroup);
    
    toolbar.appendChild(this.createDivider());
    
    // Create all settings panels (they are hidden until tool is selected)
    this.createDrawPanel(toolbar);
    this.createMosaicPanel(toolbar);
    this.createTextPanel(toolbar);
    this.createEraserPanel(toolbar);
    this.createFilterPanel(toolbar);
    
    // History controls (always create, respect disabledTools)
    const historyGroup = this.createGroup();
    historyGroup.className = 'ie-toolbar-group ie-history-group';
    
    const undoBtn = this.createButton('undo', icons.undo, () => this.editor.undo(), false, true);
    if (disabled.includes('undo')) undoBtn.style.display = 'none';
    historyGroup.appendChild(undoBtn);
    
    const redoBtn = this.createButton('redo', icons.redo, () => this.editor.redo(), false, true);
    if (disabled.includes('redo')) redoBtn.style.display = 'none';
    historyGroup.appendChild(redoBtn);
    
    toolbar.appendChild(historyGroup);
    toolbar.appendChild(this.createDivider());
    
    // Crop action buttons (hidden by default, shown when crop is active)
    const cropActionGroup = document.createElement('div');
    cropActionGroup.className = 'ie-toolbar-group ie-crop-action-group';
    cropActionGroup.style.display = 'none';
    
    const cropCancelBtn = document.createElement('button');
    cropCancelBtn.className = 'ie-btn ie-crop-toolbar-btn ie-crop-toolbar-cancel';
    cropCancelBtn.innerHTML = `${icons.close}<span>取消</span>`;
    cropCancelBtn.onclick = () => this.toggleCropTool();
    cropActionGroup.appendChild(cropCancelBtn);
    
    const cropConfirmBtn = document.createElement('button');
    cropConfirmBtn.className = 'ie-btn ie-crop-toolbar-btn ie-crop-toolbar-confirm';
    cropConfirmBtn.innerHTML = `${icons.check}<span>确认裁剪</span>`;
    cropConfirmBtn.onclick = () => this.applyCrop();
    cropActionGroup.appendChild(cropConfirmBtn);
    
    toolbar.appendChild(cropActionGroup);
    this.buttons.set('cropActionGroup', cropCancelBtn); // Store reference
    
    toolbar.appendChild(this.createDivider());
    
    // Export (always create, respect disabledTools)
    const exportBtn = this.createButton('export', icons.download, () => this.exportImage());
    exportBtn.classList.add('ie-btn-export');
    const span = document.createElement('span');
    span.textContent = '导出';
    exportBtn.appendChild(span);
    if (disabled.includes('export')) exportBtn.style.display = 'none';
    toolbar.appendChild(exportBtn);
    
    return toolbar;
  }

  private createGroup(): HTMLElement {
    const group = document.createElement('div');
    group.className = 'ie-toolbar-group';
    return group;
  }

  private createDivider(): HTMLElement {
    const divider = document.createElement('div');
    divider.className = 'ie-toolbar-divider';
    return divider;
  }

  private createButton(
    name: string,
    icon: string,
    onClick: () => void,
    active = false,
    isHistoryBtn = false
  ): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.className = 'ie-btn' + (active ? ' active' : '');
    btn.innerHTML = icon;
    btn.onclick = onClick;
    
    // Add tooltip
    const tooltipInfo = this.getTooltipInfo(name);
    const tooltip = document.createElement('div');
    tooltip.className = 'ie-tooltip';
    tooltip.innerHTML = `
      <div class="ie-tooltip-title">${tooltipInfo.title}</div>
      ${tooltipInfo.desc ? `<div class="ie-tooltip-desc">${tooltipInfo.desc}</div>` : ''}
      ${tooltipInfo.shortcut ? `<div class="ie-tooltip-shortcut">${tooltipInfo.shortcut}</div>` : ''}
    `;
    btn.appendChild(tooltip);
    
    if (isHistoryBtn) {
      btn.disabled = true;
    }
    
    this.buttons.set(name, btn);
    return btn;
  }

  private getTooltipInfo(name: string): { title: string; desc?: string; shortcut?: string } {
    const tooltips: Record<string, { title: string; desc?: string; shortcut?: string }> = {
      zoomOut: { title: '缩小', desc: '缩小图片视图', shortcut: '-' },
      zoomIn: { title: '放大', desc: '放大图片视图', shortcut: '+' },
      reset: { title: '重置视图', desc: '恢复默认缩放和位置', shortcut: '0' },
      move: { title: '移动', desc: '拖拽平移画布，点击选中形状', shortcut: 'V' },
      pen: { title: '画笔', desc: '自由绘制线条', shortcut: 'P' },
      rect: { title: '矩形', desc: '绘制矩形框', shortcut: 'R' },
      circle: { title: '圆形', desc: '绘制圆形/椭圆', shortcut: 'O' },
      arrow: { title: '箭头', desc: '绘制带箭头的线条', shortcut: 'A' },
      line: { title: '直线', desc: '绘制直线', shortcut: 'L' },
      triangle: { title: '三角形', desc: '绘制三角形' },
      text: { title: '文字', desc: '添加文字标注', shortcut: 'T' },
      mosaic: { title: '马赛克', desc: '模糊敏感区域', shortcut: 'M' },
      eraser: { title: '橡皮擦', desc: '擦除文字和标记', shortcut: 'E' },
      crop: { title: '裁剪', desc: '裁剪图片区域', shortcut: 'C' },
      filter: { title: '滤镜', desc: '调整亮度/对比度/饱和度', shortcut: 'F' },
      undo: { title: '撤销', desc: '撤销上一步操作', shortcut: 'Ctrl+Z' },
      redo: { title: '重做', desc: '恢复撤销的操作', shortcut: 'Ctrl+Y' },
      export: { title: '导出', desc: '保存图片到本地', shortcut: 'Ctrl+S' },
    };
    return tooltips[name] || { title: name };
  }

  /** Create drawing tools panel (shared by pen, rect, circle, arrow) */
  private createDrawPanel(toolbar: HTMLElement): void {
    const panel = document.createElement('div');
    panel.className = 'ie-panel';
    panel.style.display = 'none';
    panel.innerHTML = `
      <div class="ie-panel-title">绘图设置</div>
      <div class="ie-panel-row">
        <span class="ie-panel-label">线宽</span>
        <div class="ie-size-control">
          <button class="ie-size-btn" data-action="stroke-dec">${icons.minus}</button>
          <span class="ie-panel-value" data-value="stroke-width">${this.strokeWidth}px</span>
          <button class="ie-size-btn" data-action="stroke-inc">${icons.plus}</button>
        </div>
      </div>
      <div class="ie-panel-row">
        <span class="ie-panel-label">颜色</span>
        <div class="ie-color-row">
          <input type="color" class="ie-color-input" value="${this.strokeColor}" data-input="stroke-color">
          <span class="ie-color-hex" data-value="stroke-color">${this.strokeColor}</span>
        </div>
      </div>
    `;
    
    // Events
    panel.querySelector('[data-action="stroke-dec"]')?.addEventListener('click', () => {
      this.strokeWidth = Math.max(1, this.strokeWidth - 1);
      this.updateDrawPanelUI();
    });
    panel.querySelector('[data-action="stroke-inc"]')?.addEventListener('click', () => {
      this.strokeWidth = Math.min(20, this.strokeWidth + 1);
      this.updateDrawPanelUI();
    });
    panel.querySelector('[data-input="stroke-color"]')?.addEventListener('input', (e) => {
      this.strokeColor = (e.target as HTMLInputElement).value;
      this.updateDrawPanelUI();
    });
    
    toolbar.appendChild(panel);
    this.panels.set('draw', panel);
  }
  
  private updateDrawPanelUI(): void {
    const panel = this.panels.get('draw');
    if (!panel) return;
    
    const widthEl = panel.querySelector('[data-value="stroke-width"]');
    const colorEl = panel.querySelector('[data-value="stroke-color"]');
    const colorInput = panel.querySelector('[data-input="stroke-color"]') as HTMLInputElement;
    
    if (widthEl) widthEl.textContent = `${this.strokeWidth}px`;
    if (colorEl) colorEl.textContent = this.strokeColor;
    if (colorInput) colorInput.value = this.strokeColor;
    
    // Update brush cursor if visible
    this.updateBrushCursorSize();
  }

  /** Create mosaic settings panel */
  private createMosaicPanel(toolbar: HTMLElement): void {
    const panel = document.createElement('div');
    panel.className = 'ie-panel ie-panel-mosaic';
    panel.style.display = 'none';
    panel.innerHTML = `
      <div class="ie-panel-title">马赛克设置</div>
      <div class="ie-panel-row ie-slider-row">
        <span class="ie-panel-label">笔刷大小</span>
        <input type="range" class="ie-range-slider" min="1" max="20" value="${this.strokeWidth}" data-slider="mosaic-brush">
        <span class="ie-panel-value" data-value="mosaic-brush">${this.strokeWidth * 3}</span>
      </div>
      <div class="ie-panel-row ie-slider-row">
        <span class="ie-panel-label">色块大小</span>
        <input type="range" class="ie-range-slider" min="3" max="30" value="${this.mosaicSize}" data-slider="mosaic-block">
        <span class="ie-panel-value" data-value="mosaic-block">${this.mosaicSize}</span>
      </div>
    `;
    
    // Events for brush size slider
    panel.querySelector('[data-slider="mosaic-brush"]')?.addEventListener('input', (e) => {
      this.strokeWidth = parseInt((e.target as HTMLInputElement).value);
      this.updateMosaicPanelUI();
    });
    
    // Events for block size slider
    panel.querySelector('[data-slider="mosaic-block"]')?.addEventListener('input', (e) => {
      this.mosaicSize = parseInt((e.target as HTMLInputElement).value);
      this.updateMosaicPanelUI();
    });
    
    toolbar.appendChild(panel);
    this.panels.set('mosaic', panel);
  }
  
  private updateMosaicPanelUI(): void {
    const panel = this.panels.get('mosaic');
    if (!panel) return;
    
    const brushEl = panel.querySelector('[data-value="mosaic-brush"]');
    const blockEl = panel.querySelector('[data-value="mosaic-block"]');
    const brushSlider = panel.querySelector('[data-slider="mosaic-brush"]') as HTMLInputElement;
    const blockSlider = panel.querySelector('[data-slider="mosaic-block"]') as HTMLInputElement;
    
    if (brushEl) brushEl.textContent = String(this.strokeWidth * 3);
    if (blockEl) blockEl.textContent = String(this.mosaicSize);
    if (brushSlider) brushSlider.value = String(this.strokeWidth);
    if (blockSlider) blockSlider.value = String(this.mosaicSize);
    
    // Update brush cursor
    this.updateBrushCursorSize();
  }

  private createTextPanel(_toolbar: HTMLElement): void {
    // Text panel is now inline on the canvas, not in the toolbar
    // Create a simple hint panel
    const panel = document.createElement('div');
    panel.className = 'ie-panel ie-panel-text-hint';
    panel.style.display = 'none';
    panel.innerHTML = `
      <div class="ie-panel-row" style="color:var(--ie-text-muted);font-size:12px;text-align:center;">
        点击图片添加文字
      </div>
    `;
    _toolbar.appendChild(panel);
    this.panels.set('text', panel);
  }

  /** Create eraser panel */
  private createEraserPanel(toolbar: HTMLElement): void {
    const panel = document.createElement('div');
    panel.className = 'ie-panel ie-panel-eraser';
    panel.style.display = 'none';
    panel.innerHTML = `
      <div class="ie-panel-title">橡皮擦设置</div>
      <div class="ie-panel-row ie-slider-row">
        <span class="ie-panel-label">笔刷大小</span>
        <input type="range" class="ie-range-slider" min="5" max="50" value="${this.eraserSize}" data-slider="eraser-size">
        <span class="ie-panel-value" data-value="eraser-size">${this.eraserSize}</span>
      </div>
      <div class="ie-panel-row">
        <span class="ie-panel-label">模式</span>
        <div class="ie-btn-group">
          <button class="ie-mode-btn ${this.eraserMode === 'pixel' ? 'active' : ''}" data-mode="pixel">像素</button>
          <button class="ie-mode-btn ${this.eraserMode === 'shape' ? 'active' : ''}" data-mode="shape">形状</button>
        </div>
      </div>
    `;
    
    // Events
    panel.querySelector('[data-slider="eraser-size"]')?.addEventListener('input', (e) => {
      this.eraserSize = parseInt((e.target as HTMLInputElement).value);
      this.updateEraserPanelUI();
    });
    
    panel.querySelectorAll('[data-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.eraserMode = btn.getAttribute('data-mode') as 'pixel' | 'shape';
        this.updateEraserPanelUI();
      });
    });
    
    toolbar.appendChild(panel);
    this.panels.set('eraser', panel);
  }
  
  private updateEraserPanelUI(): void {
    const panel = this.panels.get('eraser');
    if (!panel) return;
    
    const sizeEl = panel.querySelector('[data-value="eraser-size"]');
    const sizeSlider = panel.querySelector('[data-slider="eraser-size"]') as HTMLInputElement;
    
    if (sizeEl) sizeEl.textContent = String(this.eraserSize);
    if (sizeSlider) sizeSlider.value = String(this.eraserSize);
    
    // Update mode buttons
    panel.querySelectorAll('[data-mode]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-mode') === this.eraserMode);
    });
    
    this.updateBrushCursorSize();
  }

  /** Create filter panel */
  private createFilterPanel(toolbar: HTMLElement): void {
    const panel = document.createElement('div');
    panel.className = 'ie-panel ie-panel-filter';
    panel.style.display = 'none';
    panel.innerHTML = `
      <div class="ie-panel-title">滤镜调整</div>
      <div class="ie-filter-presets">
        <button class="ie-filter-preset" data-preset="none" title="原图">原图</button>
        <button class="ie-filter-preset" data-preset="grayscale" title="灰度">灰度</button>
        <button class="ie-filter-preset" data-preset="sepia" title="怀旧">怀旧</button>
        <button class="ie-filter-preset" data-preset="invert" title="反色">反色</button>
        <button class="ie-filter-preset" data-preset="warm" title="暖色">暖色</button>
        <button class="ie-filter-preset" data-preset="cool" title="冷色">冷色</button>
        <button class="ie-filter-preset" data-preset="vivid" title="鲜艳">鲜艳</button>
        <button class="ie-filter-preset" data-preset="vintage" title="复古">复古</button>
      </div>
      <div class="ie-panel-row ie-slider-row">
        <span class="ie-panel-label">亮度</span>
        <input type="range" class="ie-range-slider" min="-100" max="100" value="0" data-filter="brightness">
        <span class="ie-panel-value" data-value="brightness">0</span>
      </div>
      <div class="ie-panel-row ie-slider-row">
        <span class="ie-panel-label">对比度</span>
        <input type="range" class="ie-range-slider" min="-100" max="100" value="0" data-filter="contrast">
        <span class="ie-panel-value" data-value="contrast">0</span>
      </div>
      <div class="ie-panel-row ie-slider-row">
        <span class="ie-panel-label">饱和度</span>
        <input type="range" class="ie-range-slider" min="-100" max="100" value="0" data-filter="saturation">
        <span class="ie-panel-value" data-value="saturation">0</span>
      </div>
      <div class="ie-panel-row ie-slider-row">
        <span class="ie-panel-label">模糊</span>
        <input type="range" class="ie-range-slider" min="0" max="20" value="0" data-filter="blur">
        <span class="ie-panel-value" data-value="blur">0</span>
      </div>
      <div class="ie-panel-row ie-btn-row">
        <button class="ie-btn-apply" data-action="apply-filter">应用</button>
        <button class="ie-btn-reset" data-action="reset-filter">重置</button>
      </div>
    `;
    
    // Events for filter presets
    panel.querySelectorAll('[data-preset]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const preset = (e.target as HTMLElement).getAttribute('data-preset') || 'none';
        this.applyFilterPreset(preset);
        // Highlight active preset
        panel.querySelectorAll('[data-preset]').forEach(b => b.classList.remove('active'));
        (e.target as HTMLElement).classList.add('active');
      });
    });
    
    // Events for sliders
    panel.querySelectorAll('[data-filter]').forEach(slider => {
      slider.addEventListener('input', (e) => {
        const filterName = (e.target as HTMLInputElement).getAttribute('data-filter');
        const value = (e.target as HTMLInputElement).value;
        const valueEl = panel.querySelector(`[data-value="${filterName}"]`);
        if (valueEl) valueEl.textContent = value;
        this.previewFilter();
        // Clear preset highlight when manually adjusting
        panel.querySelectorAll('[data-preset]').forEach(b => b.classList.remove('active'));
      });
    });
    
    // Apply button
    panel.querySelector('[data-action="apply-filter"]')?.addEventListener('click', () => {
      this.applyFilter();
    });
    
    // Reset button
    panel.querySelector('[data-action="reset-filter"]')?.addEventListener('click', () => {
      this.resetFilterPanel();
    });
    
    toolbar.appendChild(panel);
    this.panels.set('filter', panel);
  }
  
  private getFilterValues(): { brightness: number; contrast: number; saturation: number; blur: number } {
    const panel = this.panels.get('filter');
    if (!panel) return { brightness: 0, contrast: 0, saturation: 0, blur: 0 };
    
    return {
      brightness: parseInt((panel.querySelector('[data-filter="brightness"]') as HTMLInputElement)?.value || '0'),
      contrast: parseInt((panel.querySelector('[data-filter="contrast"]') as HTMLInputElement)?.value || '0'),
      saturation: parseInt((panel.querySelector('[data-filter="saturation"]') as HTMLInputElement)?.value || '0'),
      blur: parseInt((panel.querySelector('[data-filter="blur"]') as HTMLInputElement)?.value || '0'),
    };
  }
  
  private previewFilter(): void {
    const { brightness, contrast, saturation, blur } = this.getFilterValues();
    const ctx = this.editor.ctx;
    const canvas = this.editor.canvas;
    if (!ctx || !canvas || !this.originalImageData) return;
    
    // Restore original image
    ctx.putImageData(this.originalImageData, 0, 0);
    
    // Apply CSS filters for preview
    const filters = [
      `brightness(${100 + brightness}%)`,
      `contrast(${100 + contrast}%)`,
      `saturate(${100 + saturation}%)`,
      blur > 0 ? `blur(${blur}px)` : '',
    ].filter(Boolean).join(' ');
    
    ctx.filter = filters || 'none';
    ctx.drawImage(canvas, 0, 0);
    ctx.filter = 'none';
  }
  
  private applyFilter(): void {
    // The preview already drew the filtered result, just save it
    this.saveOriginalImage();
    this.resetFilterPanel();
    (this.editor as any).saveToHistory?.('apply filter');
  }
  
  private resetFilterPanel(): void {
    const panel = this.panels.get('filter');
    if (!panel) return;
    
    // Reset all sliders
    panel.querySelectorAll<HTMLInputElement>('[data-filter]').forEach(slider => {
      slider.value = '0';
      const filterName = slider.getAttribute('data-filter');
      const valueEl = panel.querySelector(`[data-value="${filterName}"]`);
      if (valueEl) valueEl.textContent = '0';
    });
    
    // Reset preset buttons
    panel.querySelectorAll('[data-preset]').forEach(b => b.classList.remove('active'));
    panel.querySelector('[data-preset="none"]')?.classList.add('active');
    
    // Restore original image
    if (this.originalImageData) {
      this.editor.ctx?.putImageData(this.originalImageData, 0, 0);
    }
  }
  
  /** Apply filter preset */
  private applyFilterPreset(preset: string): void {
    const panel = this.panels.get('filter');
    if (!panel) return;
    
    const ctx = this.editor.ctx;
    const canvas = this.editor.canvas;
    if (!ctx || !canvas || !this.originalImageData) return;
    
    // Restore original image first
    ctx.putImageData(this.originalImageData, 0, 0);
    
    // Get preset values
    const presets: Record<string, { brightness: number; contrast: number; saturation: number; blur: number; css?: string }> = {
      none: { brightness: 0, contrast: 0, saturation: 0, blur: 0 },
      grayscale: { brightness: 0, contrast: 0, saturation: -100, blur: 0 },
      sepia: { brightness: 0, contrast: 0, saturation: -30, blur: 0, css: 'sepia(80%)' },
      invert: { brightness: 0, contrast: 0, saturation: 0, blur: 0, css: 'invert(100%)' },
      warm: { brightness: 10, contrast: 10, saturation: 20, blur: 0, css: 'sepia(20%)' },
      cool: { brightness: 0, contrast: 10, saturation: -10, blur: 0, css: 'hue-rotate(180deg) saturate(50%)' },
      vivid: { brightness: 10, contrast: 30, saturation: 50, blur: 0 },
      vintage: { brightness: -10, contrast: 20, saturation: -20, blur: 0, css: 'sepia(40%)' },
    };
    
    const settings = presets[preset] || presets.none;
    
    // Update sliders
    const brightnessSlider = panel.querySelector('[data-filter="brightness"]') as HTMLInputElement;
    const contrastSlider = panel.querySelector('[data-filter="contrast"]') as HTMLInputElement;
    const saturationSlider = panel.querySelector('[data-filter="saturation"]') as HTMLInputElement;
    const blurSlider = panel.querySelector('[data-filter="blur"]') as HTMLInputElement;
    
    if (brightnessSlider) {
      brightnessSlider.value = String(settings.brightness);
      const val = panel.querySelector('[data-value="brightness"]');
      if (val) val.textContent = String(settings.brightness);
    }
    if (contrastSlider) {
      contrastSlider.value = String(settings.contrast);
      const val = panel.querySelector('[data-value="contrast"]');
      if (val) val.textContent = String(settings.contrast);
    }
    if (saturationSlider) {
      saturationSlider.value = String(settings.saturation);
      const val = panel.querySelector('[data-value="saturation"]');
      if (val) val.textContent = String(settings.saturation);
    }
    if (blurSlider) {
      blurSlider.value = String(settings.blur);
      const val = panel.querySelector('[data-value="blur"]');
      if (val) val.textContent = String(settings.blur);
    }
    
    // Apply preview with CSS filter
    const filters = [
      `brightness(${100 + settings.brightness}%)`,
      `contrast(${100 + settings.contrast}%)`,
      `saturate(${100 + settings.saturation}%)`,
      settings.blur > 0 ? `blur(${settings.blur}px)` : '',
      settings.css || '',
    ].filter(Boolean).join(' ');
    
    ctx.filter = filters || 'none';
    ctx.drawImage(canvas, 0, 0);
    ctx.filter = 'none';
  }

  private updateTextUI(): void {
    // Update text style bar if visible
    this.updateTextStyleBar();
    // Apply to current editing text
    this.applyTextStyle();
  }

  private showPanel(name: string | null): void {
    this.panels.forEach((panel, key) => {
      if (key === name) {
        // Show with animation
        panel.style.display = 'block';
        panel.classList.remove('ie-panel-hidden');
      } else if (panel.style.display !== 'none') {
        // Hide with animation
        panel.classList.add('ie-panel-hidden');
        // Hide after animation completes
        setTimeout(() => {
          if (panel.classList.contains('ie-panel-hidden')) {
            panel.style.display = 'none';
          }
        }, 200);
      }
    });
    this.activePanel = name;
  }
  
  /** Hide all panels */
  private hideAllPanels(): void {
    this.showPanel(null);
  }

  private setupEvents(): void {
    // Wheel zoom - disabled when showing placeholder
    this.canvasContainer.addEventListener('wheel', (e) => {
      if (!this.hasRealImage) return; // Disable zoom for placeholder
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      this.setScale(this.scale * delta, e.clientX, e.clientY);
    }, { passive: false });
    
    // Pointer down - handle pan, drawing, or shape selection/dragging
    this.canvasContainer.addEventListener('pointerdown', (e) => {
      if (!this.hasRealImage) return; // Disable interactions for placeholder
      
      const pos = this.clientToCanvasCoords(e.clientX, e.clientY);
      
      // Drawing tools
      if (this.isDrawingTool(this.currentTool)) {
        this.startDrawing(pos);
        this.canvasContainer.setPointerCapture(e.pointerId);
      } else if (!this.currentTool || this.currentTool === '') {
        // Move mode - check for shape selection first
        const shape = this.shapeManager.findShapeAtPoint(pos.x, pos.y, 8);
        if (shape) {
          // Select and start dragging shape
          this.shapeManager.selectShape(shape.id);
          this.isDraggingShape = true;
          this.dragStartPoint = pos;
          this.canvasContainer.classList.add('grabbing');
          this.canvasContainer.setPointerCapture(e.pointerId);
        } else {
          // Deselect any selected shape and start panning
          this.shapeManager.selectShape(null);
          this.isPanning = true;
          this.lastPanPoint = { x: e.clientX, y: e.clientY };
          this.canvasContainer.classList.add('grabbing');
          this.canvasContainer.setPointerCapture(e.pointerId);
        }
      }
    });
    
    this.canvasContainer.addEventListener('pointermove', (e) => {
      // Default cursor for placeholder
      if (!this.hasRealImage) {
        this.canvasContainer.style.cursor = 'default';
        return;
      }
      
      const pos = this.clientToCanvasCoords(e.clientX, e.clientY);
      
      // Update brush cursor position
      if (this.brushCursor && this.isDrawingTool(this.currentTool)) {
        this.updateBrushCursorPosition(e.clientX, e.clientY);
      }
      
      if (this.isDrawing) {
        this.continueDrawing(pos);
      } else if (this.isDraggingShape) {
        // Drag selected shape
        const selected = this.shapeManager.getSelectedShape();
        if (selected) {
          const dx = pos.x - this.dragStartPoint.x;
          const dy = pos.y - this.dragStartPoint.y;
          this.shapeManager.moveShape(selected.id, dx, dy);
          this.dragStartPoint = pos;
        }
      } else if (this.isPanning) {
        this.translateX += e.clientX - this.lastPanPoint.x;
        this.translateY += e.clientY - this.lastPanPoint.y;
        this.lastPanPoint = { x: e.clientX, y: e.clientY };
        this.updateTransform();
      } else if (!this.currentTool || this.currentTool === '') {
        // Move mode - update cursor based on hovering over shape
        const shape = this.shapeManager.findShapeAtPoint(pos.x, pos.y, 8);
        this.canvasContainer.style.cursor = shape ? 'move' : 'grab';
      }
    });
    
    this.canvasContainer.addEventListener('pointerup', (e) => {
      if (this.isDrawing) {
        this.endDrawing();
      }
      if (this.isDraggingShape) {
        this.isDraggingShape = false;
        (this.editor as any).saveToHistory?.('move shape');
      }
      this.isPanning = false;
      this.canvasContainer.classList.remove('grabbing');
      this.canvasContainer.releasePointerCapture(e.pointerId);
    });
    
    this.canvasContainer.addEventListener('pointerleave', () => {
      if (this.brushCursor) {
        this.brushCursor.style.display = 'none';
      }
    });
    
    this.canvasContainer.addEventListener('pointerenter', () => {
      if (this.brushCursor && this.isDrawingTool(this.currentTool)) {
        this.brushCursor.style.display = 'block';
      }
    });
    
    // Text tool click
    this.canvasContainer.addEventListener('click', (e) => {
      if (this.currentTool !== 'text') return;
      if (this.isAddingText) return;
      
      const pos = this.clientToCanvasCoords(e.clientX, e.clientY);
      this.showInlineTextInput(e.clientX, e.clientY, pos);
    });
    
    // Keyboard events for delete
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        // Don't delete if we're editing text
        if (this.isAddingText || document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
          return;
        }
        const selected = this.shapeManager.getSelectedShape();
        if (selected) {
          e.preventDefault();
          this.shapeManager.deleteShape(selected.id);
          (this.editor as any).saveToHistory?.('delete shape');
        }
      }
    });
    
    // Touch events for pinch-to-zoom and two-finger pan
    this.canvasContainer.addEventListener('touchstart', (e) => {
      if (!this.hasRealImage) return;
      
      if (e.touches.length === 2) {
        e.preventDefault();
        // Pinch gesture start
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        this.touchStartDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        this.touchStartScale = this.scale;
        this.touchStartCenter = {
          x: (touch1.clientX + touch2.clientX) / 2,
          y: (touch1.clientY + touch2.clientY) / 2
        };
        this.lastTouchCenter = { ...this.touchStartCenter };
        this.isTouchPanning = true;
      }
    }, { passive: false });
    
    this.canvasContainer.addEventListener('touchmove', (e) => {
      if (!this.hasRealImage) return;
      
      if (e.touches.length === 2 && this.touchStartDistance > 0) {
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        
        // Calculate new distance for pinch zoom
        const currentDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        const scaleRatio = currentDistance / this.touchStartDistance;
        const newScale = Math.max(0.1, Math.min(5, this.touchStartScale * scaleRatio));
        
        // Calculate center point for zoom
        const currentCenter = {
          x: (touch1.clientX + touch2.clientX) / 2,
          y: (touch1.clientY + touch2.clientY) / 2
        };
        
        // Apply zoom at center point
        this.setScale(newScale, currentCenter.x, currentCenter.y);
        
        // Also apply pan from center movement
        if (this.isTouchPanning) {
          this.translateX += currentCenter.x - this.lastTouchCenter.x;
          this.translateY += currentCenter.y - this.lastTouchCenter.y;
          this.updateTransform();
        }
        
        this.lastTouchCenter = currentCenter;
      }
    }, { passive: false });
    
    this.canvasContainer.addEventListener('touchend', (e) => {
      if (e.touches.length < 2) {
        this.touchStartDistance = 0;
        this.isTouchPanning = false;
      }
    });
    
    // Click outside to close panels
    document.addEventListener('click', (e) => {
      if (this.activePanel) {
        const target = e.target as HTMLElement;
        // Check if click is outside panels and toolbar buttons
        const isInPanel = target.closest('.ie-panel');
        const isToolbarBtn = target.closest('.ie-btn');
        if (!isInPanel && !isToolbarBtn) {
          this.hideAllPanels();
        }
      }
    });
    
    // Drag and drop support
    this.setupDropZone();
  }
  
  private dropZone: HTMLElement | null = null;
  
  private setupDropZone(): void {
    // Create drop zone overlay
    this.dropZone = document.createElement('div');
    this.dropZone.className = 'ie-drop-zone';
    this.dropZone.innerHTML = `
      <div class="ie-drop-zone-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
      </div>
      <div class="ie-drop-zone-text">松开鼠标上传图片</div>
      <div class="ie-drop-zone-hint">支持 PNG、JPG、GIF 等格式</div>
    `;
    this.canvasContainer.appendChild(this.dropZone);
    
    // Drag enter
    this.canvasContainer.addEventListener('dragenter', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.isImageDrag(e)) {
        this.dropZone?.classList.add('active');
      }
    });
    
    // Drag over
    this.canvasContainer.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.isImageDrag(e)) {
        e.dataTransfer!.dropEffect = 'copy';
        this.dropZone?.classList.add('active');
      }
    });
    
    // Drag leave
    this.canvasContainer.addEventListener('dragleave', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Only hide if leaving the container completely
      const rect = this.canvasContainer.getBoundingClientRect();
      if (e.clientX <= rect.left || e.clientX >= rect.right ||
          e.clientY <= rect.top || e.clientY >= rect.bottom) {
        this.dropZone?.classList.remove('active');
      }
    });
    
    // Drop
    this.canvasContainer.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.dropZone?.classList.remove('active');
      
      const file = e.dataTransfer?.files?.[0];
      if (file?.type.startsWith('image/')) {
        this.loadImageFile(file);
      }
    });
  }
  
  private isImageDrag(e: DragEvent): boolean {
    if (!e.dataTransfer) return false;
    // Check if dragging files
    if (e.dataTransfer.types.includes('Files')) {
      return true;
    }
    return false;
  }
  
  private loadImageFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        this.editor.loadImage(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  }
  
  private isDrawingTool(tool: string | null): boolean {
    return ['pen', 'rect', 'circle', 'arrow', 'line', 'triangle', 'mosaic', 'eraser'].includes(tool || '');
  }
  
  /** Check if tool creates shapes (vs direct canvas drawing like mosaic) */
  private isShapeTool(tool: string | null): boolean {
    return ['pen', 'rect', 'circle', 'arrow', 'line', 'triangle'].includes(tool || '');
  }
  
  private startDrawing(pos: { x: number; y: number }): void {
    this.isDrawing = true;
    this.drawStartPoint = pos;
    this.lastDrawPoint = pos;
    
    const style = { strokeColor: this.strokeColor, strokeWidth: this.strokeWidth };
    
    // Create shape via manager for shape tools
    if (this.isShapeTool(this.currentTool)) {
      const type = this.currentTool as 'pen' | 'rect' | 'circle' | 'arrow' | 'line' | 'triangle';
      this.currentShapeId = this.shapeManager.createShape(type, style);
      
      // Initialize shape data
      if (type === 'pen') {
        const shape = this.shapeManager.getShape(this.currentShapeId) as PenShape;
        if (shape) {
          shape.points = [{ x: pos.x, y: pos.y }];
        }
      } else if (type === 'rect') {
        const shape = this.shapeManager.getShape(this.currentShapeId) as RectShape;
        if (shape) {
          shape.x = pos.x;
          shape.y = pos.y;
          shape.width = 0;
          shape.height = 0;
        }
      } else if (type === 'circle') {
        const shape = this.shapeManager.getShape(this.currentShapeId) as CircleShape;
        if (shape) {
          shape.cx = pos.x;
          shape.cy = pos.y;
          shape.rx = 0;
          shape.ry = 0;
        }
      } else if (type === 'arrow' || type === 'line') {
        const shape = this.shapeManager.getShape(this.currentShapeId) as ArrowShape | LineShape;
        if (shape) {
          shape.start = { x: pos.x, y: pos.y };
          shape.end = { x: pos.x, y: pos.y };
        }
      } else if (type === 'triangle') {
        const shape = this.shapeManager.getShape(this.currentShapeId) as TriangleShape;
        if (shape) {
          // Initialize triangle with start point
          shape.points = [{ x: pos.x, y: pos.y }, { x: pos.x, y: pos.y }, { x: pos.x, y: pos.y }];
        }
      }
    } else if (this.currentTool === 'mosaic') {
      // Mosaic draws directly to canvas (not as a shape)
      this.applyMosaicAt(pos.x, pos.y);
    } else if (this.currentTool === 'eraser') {
      this.applyEraserAt(pos.x, pos.y);
    }
  }
  
  private continueDrawing(pos: { x: number; y: number }): void {
    if (!this.isDrawing) return;
    
    if (this.isShapeTool(this.currentTool) && this.currentShapeId) {
      const shape = this.shapeManager.getShape(this.currentShapeId);
      if (!shape) return;
      
      switch (this.currentTool) {
        case 'pen': {
          const s = shape as PenShape;
          s.points.push({ x: pos.x, y: pos.y });
          break;
        }
        case 'rect': {
          const s = shape as RectShape;
          s.x = Math.min(this.drawStartPoint.x, pos.x);
          s.y = Math.min(this.drawStartPoint.y, pos.y);
          s.width = Math.abs(pos.x - this.drawStartPoint.x);
          s.height = Math.abs(pos.y - this.drawStartPoint.y);
          break;
        }
        case 'circle': {
          const s = shape as CircleShape;
          s.cx = (this.drawStartPoint.x + pos.x) / 2;
          s.cy = (this.drawStartPoint.y + pos.y) / 2;
          s.rx = Math.abs(pos.x - this.drawStartPoint.x) / 2;
          s.ry = Math.abs(pos.y - this.drawStartPoint.y) / 2;
          break;
        }
        case 'arrow':
        case 'line': {
          const s = shape as ArrowShape | LineShape;
          s.end = { x: pos.x, y: pos.y };
          break;
        }
        case 'triangle': {
          const s = shape as TriangleShape;
          // Create isoceles triangle based on drag
          const midX = (this.drawStartPoint.x + pos.x) / 2;
          s.points = [
            { x: midX, y: this.drawStartPoint.y },  // Top vertex
            { x: this.drawStartPoint.x, y: pos.y }, // Bottom left
            { x: pos.x, y: pos.y }                   // Bottom right
          ];
          break;
        }
      }
      
      this.renderAll();
      this.lastDrawPoint = pos;
    } else if (this.currentTool === 'mosaic') {
      this.interpolateMosaic(this.lastDrawPoint.x, this.lastDrawPoint.y, pos.x, pos.y);
      this.lastDrawPoint = pos;
    } else if (this.currentTool === 'eraser') {
      this.interpolateEraser(this.lastDrawPoint.x, this.lastDrawPoint.y, pos.x, pos.y);
      this.lastDrawPoint = pos;
    }
  }
  
  private endDrawing(): void {
    if (!this.isDrawing) return;
    
    // Finalize shape - check if it's too small and should be deleted
    if (this.isShapeTool(this.currentTool) && this.currentShapeId) {
      const shape = this.shapeManager.getShape(this.currentShapeId);
      if (shape) {
        const bounds = this.shapeManager.getShapeBounds(shape);
        // Delete shape if it's too small (less than 3px in any dimension)
        if (bounds && bounds.width < 3 && bounds.height < 3) {
          this.shapeManager.deleteShape(this.currentShapeId);
        }
      }
    } else if (this.currentTool === 'mosaic' || this.currentTool === 'eraser') {
      // Mosaic/Eraser modifies canvas directly, update originalImageData so shapes don't overwrite it
      this.saveOriginalImage();
    }
    
    this.isDrawing = false;
    this.currentShapeId = null;
    (this.editor as any).saveToHistory?.(this.currentTool + ' draw');
  }
  
  /** Convert client coordinates to canvas coordinates */
  private clientToCanvasCoords(clientX: number, clientY: number): { x: number; y: number } {
    const rect = this.canvasContainer.getBoundingClientRect();
    const canvas = this.editor.canvas;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = (clientX - rect.left - centerX - this.translateX) / this.scale + canvas.width / 2;
    const y = (clientY - rect.top - centerY - this.translateY) / this.scale + canvas.height / 2;
    return { x, y };
  }
  
  // ============ Mosaic Tool Methods ============
  
  /** Apply mosaic at a point */
  private applyMosaicAt(x: number, y: number): void {
    const ctx = this.editor.ctx;
    const canvas = this.editor.canvas;
    if (!ctx || !canvas) return;
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const radius = this.strokeWidth * 3;
    this.applyMosaicCircle(imageData, x, y, radius, this.mosaicSize);
    ctx.putImageData(imageData, 0, 0);
  }
  
  /** Interpolate mosaic stroke */
  private interpolateMosaic(x1: number, y1: number, x2: number, y2: number): void {
    const ctx = this.editor.ctx;
    const canvas = this.editor.canvas;
    if (!ctx || !canvas) return;
    
    const radius = this.strokeWidth * 3;
    const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const step = radius / 2;
    const steps = Math.max(1, Math.ceil(dist / step));
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = x1 + (x2 - x1) * t;
      const y = y1 + (y2 - y1) * t;
      this.applyMosaicCircle(imageData, x, y, radius, this.mosaicSize);
    }
    
    ctx.putImageData(imageData, 0, 0);
  }
  
  /** Apply mosaic effect in a circular region */
  private applyMosaicCircle(imageData: ImageData, cx: number, cy: number, radius: number, blockSize: number): void {
    const { width, height, data } = imageData;
    
    const minX = Math.max(0, Math.floor(cx - radius));
    const maxX = Math.min(width - 1, Math.ceil(cx + radius));
    const minY = Math.max(0, Math.floor(cy - radius));
    const maxY = Math.min(height - 1, Math.ceil(cy + radius));
    
    for (let by = minY; by <= maxY; by += blockSize) {
      for (let bx = minX; bx <= maxX; bx += blockSize) {
        const bcx = bx + blockSize / 2;
        const bcy = by + blockSize / 2;
        const dist = Math.sqrt((bcx - cx) ** 2 + (bcy - cy) ** 2);
        if (dist > radius) continue;
        
        let r = 0, g = 0, b = 0, count = 0;
        const blockEndX = Math.min(bx + blockSize, maxX + 1);
        const blockEndY = Math.min(by + blockSize, maxY + 1);
        
        for (let py = by; py < blockEndY; py++) {
          for (let px = bx; px < blockEndX; px++) {
            const idx = (py * width + px) * 4;
            r += data[idx];
            g += data[idx + 1];
            b += data[idx + 2];
            count++;
          }
        }
        
        if (count > 0) {
          r = Math.round(r / count);
          g = Math.round(g / count);
          b = Math.round(b / count);
          
          for (let py = by; py < blockEndY; py++) {
            for (let px = bx; px < blockEndX; px++) {
              const pDist = Math.sqrt((px - cx) ** 2 + (py - cy) ** 2);
              if (pDist <= radius) {
                const idx = (py * width + px) * 4;
                data[idx] = r;
                data[idx + 1] = g;
                data[idx + 2] = b;
              }
            }
          }
        }
      }
    }
  }

  private setupEditorEvents(): void {
    this.editor.on('tool-change', ({ tool }) => {
      this.currentTool = tool || null;
      this.updateToolButtons();
      this.updateCursor();
    });
    
    this.editor.on('history-change', ({ canUndo, canRedo }) => {
      const undoBtn = this.buttons.get('undo');
      const redoBtn = this.buttons.get('redo');
      if (undoBtn) undoBtn.disabled = !canUndo;
      if (redoBtn) redoBtn.disabled = !canRedo;
    });
    
    // Save original image when image is loaded
    this.editor.on('image-loaded', () => {
      // Delay slightly to ensure canvas is fully rendered
      setTimeout(() => {
        // Save pure image for eraser tool (only if not already saved)
        if (!this.pureImageData) {
          this.savePureImage();
        }
        this.saveOriginalImage();
      }, 50);
    });
  }

  private updateToolButtons(): void {
    // Clear all active states
    const toolButtons = ['move', 'pen', 'rect', 'circle', 'arrow', 'line', 'triangle', 'text', 'mosaic', 'eraser', 'crop', 'filter'];
    this.buttons.forEach((btn, name) => {
      if (toolButtons.includes(name)) {
        btn.classList.toggle('active', 
          (name === 'move' && !this.currentTool) ||
          (name === this.currentTool)
        );
      }
    });
  }

  private updateCursor(): void {
    // Remove all tool cursor classes
    this.canvasContainer.classList.remove('tool-draw', 'tool-text', 'tool-move');
    // Reset inline style cursor
    this.canvasContainer.style.cursor = '';
    
    // Remove existing brush cursor
    if (this.brushCursor) {
      this.brushCursor.remove();
      this.brushCursor = null;
    }
    
    if (this.isDrawingTool(this.currentTool)) {
      this.canvasContainer.classList.add('tool-draw');
      if (['pen', 'mosaic', 'eraser'].includes(this.currentTool || '')) {
        this.createBrushCursor();
      }
    } else if (this.currentTool === 'text') {
      this.canvasContainer.classList.add('tool-text');
    } else {
      // Move mode - default grab cursor, will change to move when hovering over shapes
      this.canvasContainer.classList.add('tool-move');
    }
  }
  
  /** Create custom brush cursor */
  private createBrushCursor(): void {
    this.brushCursor = document.createElement('div');
    this.brushCursor.className = 'ie-brush-cursor';
    this.updateBrushCursorSize();
    this.canvasContainer.appendChild(this.brushCursor);
  }
  
  /** Update brush cursor size */
  private updateBrushCursorSize(): void {
    if (!this.brushCursor) return;
    let baseSize: number;
    if (this.currentTool === 'mosaic') {
      baseSize = this.strokeWidth * 6;
    } else if (this.currentTool === 'eraser') {
      baseSize = this.eraserSize;
    } else {
      baseSize = this.strokeWidth * 2;
    }
    const size = baseSize * this.scale;
    this.brushCursor.style.width = `${size}px`;
    this.brushCursor.style.height = `${size}px`;
  }
  
  /** Update brush cursor position */
  private updateBrushCursorPosition(clientX: number, clientY: number): void {
    if (!this.brushCursor) return;
    const rect = this.canvasContainer.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    this.brushCursor.style.left = `${x}px`;
    this.brushCursor.style.top = `${y}px`;
  }

  private selectTool(tool: string | null): void {
    if (tool === this.currentTool) {
      // Toggle panel for tools that have one
      const panelName = this.getPanelNameForTool(tool);
      if (panelName && this.activePanel === panelName) {
        this.showPanel(null);
      } else if (panelName) {
        this.showPanel(panelName);
      }
      return;
    }
    
    this.editor.setTool(tool || '');
    this.currentTool = tool;
    this.updateToolButtons();
    this.updateCursor();
    
    // Show corresponding panel
    const panelName = this.getPanelNameForTool(tool);
    if (panelName) {
      this.showPanel(panelName);
    } else {
      this.showPanel(null);
    }
  }
  
  private getPanelNameForTool(tool: string | null): string | null {
    if (!tool) return null;
    if (['pen', 'rect', 'circle', 'arrow', 'line', 'triangle'].includes(tool)) return 'draw';
    if (tool === 'mosaic') return 'mosaic';
    if (tool === 'text') return 'text';
    if (tool === 'eraser') return 'eraser';
    if (tool === 'filter') return 'filter';
    return null;
  }

  /** Show inline text input at click position */
  private showInlineTextInput(clientX: number, clientY: number, canvasPos: { x: number; y: number }): void {
    this.isAddingText = true;
    
    // Create inline input container
    this.inlineTextInput = document.createElement('div');
    this.inlineTextInput.className = 'ie-inline-text-container';
    
    // Position relative to canvas container
    const rect = this.canvasContainer.getBoundingClientRect();
    const left = clientX - rect.left;
    const top = clientY - rect.top;
    
    this.inlineTextInput.style.left = `${left}px`;
    this.inlineTextInput.style.top = `${top}px`;
    
    // Create editable text area
    const textArea = document.createElement('div');
    textArea.className = 'ie-inline-text-input';
    textArea.contentEditable = 'true';
    textArea.style.fontSize = `${this.textSize * this.scale}px`;
    textArea.style.color = this.textColor;
    textArea.setAttribute('data-placeholder', '输入文字...');
    
    this.inlineTextInput.appendChild(textArea);
    this.canvasContainer.appendChild(this.inlineTextInput);
    
    // Create style bar
    this.createTextStyleBar();
    
    // Focus and select
    textArea.focus();
    
    // Store canvas position
    (this.inlineTextInput as any).__canvasPos = canvasPos;
    
    // Events
    textArea.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.cancelInlineText();
      } else if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.confirmInlineText();
      }
    });
    
    textArea.addEventListener('input', () => {
      this.updateTextStyleBarPosition();
    });
    
    // Click outside to confirm
    setTimeout(() => {
      document.addEventListener('pointerdown', this.handleOutsideClick);
    }, 100);
  }
  
  private handleOutsideClick = (e: PointerEvent): void => {
    if (!this.inlineTextInput) return;
    
    const target = e.target as HTMLElement;
    if (!this.inlineTextInput.contains(target) && 
        !this.textStyleBar?.contains(target)) {
      this.confirmInlineText();
    }
  };
  
  /** Create floating text style bar */
  private createTextStyleBar(): void {
    if (this.textStyleBar) {
      this.textStyleBar.remove();
    }
    
    this.textStyleBar = document.createElement('div');
    this.textStyleBar.className = 'ie-text-style-bar';
    this.textStyleBar.innerHTML = `
      <select class="ie-style-select" data-input="font" title="字体">
        <option value="sans-serif">默认</option>
        <option value="serif">衬线</option>
        <option value="monospace">等宽</option>
        <option value="cursive">手写</option>
        <option value="'Microsoft YaHei', sans-serif">微软雅黑</option>
        <option value="'SimSun', serif">宋体</option>
        <option value="'KaiTi', serif">楷体</option>
      </select>
      <span class="ie-style-divider"></span>
      <button class="ie-style-btn" data-action="size-dec" title="减小字号">${icons.minus}</button>
      <span class="ie-style-value" data-value="size">${this.textSize}</span>
      <button class="ie-style-btn" data-action="size-inc" title="增大字号">${icons.plus}</button>
      <span class="ie-style-divider"></span>
      <button class="ie-style-btn ${this.textBold ? 'active' : ''}" data-action="bold" title="粗体">${icons.bold}</button>
      <button class="ie-style-btn ${this.textItalic ? 'active' : ''}" data-action="italic" title="斜体">${icons.italic}</button>
      <button class="ie-style-btn ${this.textUnderline ? 'active' : ''}" data-action="underline" title="下划线">${icons.underline}</button>
      <span class="ie-style-divider"></span>
      <input type="color" class="ie-style-color" value="${this.textColor}" data-input="color" title="文字颜色">
      <span class="ie-style-divider"></span>
      <button class="ie-style-btn ie-style-confirm" data-action="confirm" title="确认">${icons.check}</button>
    `;
    
    // Set current font
    const fontSelect = this.textStyleBar.querySelector('[data-input="font"]') as HTMLSelectElement;
    if (fontSelect) fontSelect.value = this.textFontFamily;
    
    // Bind events
    fontSelect?.addEventListener('change', (e) => {
      e.stopPropagation();
      this.textFontFamily = (e.target as HTMLSelectElement).value;
      this.updateTextUI();
    });
    
    this.textStyleBar.querySelector('[data-action="size-dec"]')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.textSize = Math.max(12, this.textSize - 2);
      this.updateTextUI();
    });
    
    this.textStyleBar.querySelector('[data-action="size-inc"]')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.textSize = Math.min(72, this.textSize + 2);
      this.updateTextUI();
    });
    
    this.textStyleBar.querySelector('[data-action="bold"]')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.textBold = !this.textBold;
      (e.target as HTMLElement).closest('.ie-style-btn')?.classList.toggle('active', this.textBold);
      this.updateTextUI();
    });
    
    this.textStyleBar.querySelector('[data-action="italic"]')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.textItalic = !this.textItalic;
      (e.target as HTMLElement).closest('.ie-style-btn')?.classList.toggle('active', this.textItalic);
      this.updateTextUI();
    });
    
    this.textStyleBar.querySelector('[data-action="underline"]')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.textUnderline = !this.textUnderline;
      (e.target as HTMLElement).closest('.ie-style-btn')?.classList.toggle('active', this.textUnderline);
      this.updateTextUI();
    });
    
    this.textStyleBar.querySelector('[data-input="color"]')?.addEventListener('input', (e) => {
      e.stopPropagation();
      this.textColor = (e.target as HTMLInputElement).value;
      this.updateTextUI();
    });
    
    this.textStyleBar.querySelector('[data-action="confirm"]')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.confirmInlineText();
    });
    
    this.canvasContainer.appendChild(this.textStyleBar);
    this.updateTextStyleBarPosition();
  }
  
  /** Update style bar position */
  private updateTextStyleBarPosition(): void {
    if (!this.textStyleBar || !this.inlineTextInput) return;
    
    const rect = this.inlineTextInput.getBoundingClientRect();
    const containerRect = this.canvasContainer.getBoundingClientRect();
    
    let left = rect.left - containerRect.left;
    let top = rect.top - containerRect.top - 40;
    
    // Keep within bounds
    if (top < 5) top = rect.bottom - containerRect.top + 5;
    if (left < 5) left = 5;
    
    this.textStyleBar.style.left = `${left}px`;
    this.textStyleBar.style.top = `${top}px`;
  }
  
  /** Update text style bar values */
  private updateTextStyleBar(): void {
    if (!this.textStyleBar) return;
    
    const sizeEl = this.textStyleBar.querySelector('[data-value="size"]');
    const colorInput = this.textStyleBar.querySelector('[data-input="color"]') as HTMLInputElement;
    
    if (sizeEl) sizeEl.textContent = String(this.textSize);
    if (colorInput) colorInput.value = this.textColor;
  }
  
  /** Apply text style to current editing text */
  private applyTextStyle(): void {
    if (!this.inlineTextInput) return;
    
    const textArea = this.inlineTextInput.querySelector('.ie-inline-text-input') as HTMLElement;
    if (textArea) {
      textArea.style.fontSize = `${this.textSize * this.scale}px`;
      textArea.style.color = this.textColor;
      textArea.style.fontFamily = this.textFontFamily;
      textArea.style.fontWeight = this.textBold ? 'bold' : 'normal';
      textArea.style.fontStyle = this.textItalic ? 'italic' : 'normal';
      textArea.style.textDecoration = this.textUnderline ? 'underline' : 'none';
    }
  }
  
  /** Cancel inline text editing */
  private cancelInlineText(): void {
    document.removeEventListener('pointerdown', this.handleOutsideClick);
    
    if (this.inlineTextInput) {
      this.inlineTextInput.remove();
      this.inlineTextInput = null;
    }
    if (this.textStyleBar) {
      this.textStyleBar.remove();
      this.textStyleBar = null;
    }
    this.isAddingText = false;
  }
  
  /** Confirm and add text to canvas */
  private confirmInlineText(): void {
    if (!this.inlineTextInput) return;
    
    const textArea = this.inlineTextInput.querySelector('.ie-inline-text-input') as HTMLElement;
    const text = textArea?.textContent?.trim() || '';
    const canvasPos = (this.inlineTextInput as any).__canvasPos as { x: number; y: number };
    
    document.removeEventListener('pointerdown', this.handleOutsideClick);
    
    if (text && canvasPos) {
      // Draw text directly to canvas with all style options
      const ctx = this.editor.ctx;
      if (ctx) {
        ctx.save();
        const fontStyle = this.textItalic ? 'italic' : 'normal';
        const fontWeight = this.textBold ? 'bold' : 'normal';
        ctx.font = `${fontStyle} ${fontWeight} ${this.textSize}px ${this.textFontFamily}`;
        ctx.fillStyle = this.textColor;
        ctx.textBaseline = 'top';
        ctx.fillText(text, canvasPos.x, canvasPos.y);
        
        // Draw underline if enabled
        if (this.textUnderline) {
          const metrics = ctx.measureText(text);
          ctx.strokeStyle = this.textColor;
          ctx.lineWidth = Math.max(1, this.textSize / 15);
          ctx.beginPath();
          ctx.moveTo(canvasPos.x, canvasPos.y + this.textSize + 2);
          ctx.lineTo(canvasPos.x + metrics.width, canvasPos.y + this.textSize + 2);
          ctx.stroke();
        }
        ctx.restore();
        
        // Save to history
        this.saveOriginalImage();
        (this.editor as any).saveToHistory?.('add text');
      }
    }
    
    // Cleanup
    if (this.inlineTextInput) {
      this.inlineTextInput.remove();
      this.inlineTextInput = null;
    }
    if (this.textStyleBar) {
      this.textStyleBar.remove();
      this.textStyleBar = null;
    }
    this.isAddingText = false;
  }

  // ============ Crop Tool ============
  
  /** Toggle crop tool */
  private toggleCropTool(): void {
    if (this.isCropActive) {
      this.hideCropOverlay();
    } else {
      this.showCropOverlay();
    }
    this.isCropActive = !this.isCropActive;
    this.buttons.get('crop')?.classList.toggle('active', this.isCropActive);
    
    // Show/hide crop action buttons in toolbar
    const cropActionGroup = this.toolbar.querySelector('.ie-crop-action-group') as HTMLElement;
    if (cropActionGroup) {
      cropActionGroup.style.display = this.isCropActive ? 'flex' : 'none';
    }
  }
  
  /** Show crop overlay */
  private showCropOverlay(): void {
    if (this.cropOverlay) return;
    
    const canvas = this.editor.canvas;
    
    this.cropOverlay = document.createElement('div');
    this.cropOverlay.className = 'ie-crop-overlay';
    
    // Initialize crop box at 80% of canvas size, centered
    const margin = 0.1;
    const boxWidth = canvas.width * (1 - margin * 2);
    const boxHeight = canvas.height * (1 - margin * 2);
    const boxX = canvas.width * margin;
    const boxY = canvas.height * margin;
    
    this.cropOverlay.innerHTML = `
      <div class="ie-crop-mask ie-crop-mask-top"></div>
      <div class="ie-crop-mask ie-crop-mask-left"></div>
      <div class="ie-crop-mask ie-crop-mask-right"></div>
      <div class="ie-crop-mask ie-crop-mask-bottom"></div>
      <div class="ie-crop-box" style="left:${boxX}px;top:${boxY}px;width:${boxWidth}px;height:${boxHeight}px;">
        <div class="ie-crop-grid">
          <div class="ie-crop-grid-h"></div>
          <div class="ie-crop-grid-h"></div>
          <div class="ie-crop-grid-v"></div>
          <div class="ie-crop-grid-v"></div>
        </div>
        <div class="ie-crop-handle ie-crop-handle-nw" data-handle="nw"></div>
        <div class="ie-crop-handle ie-crop-handle-n" data-handle="n"></div>
        <div class="ie-crop-handle ie-crop-handle-ne" data-handle="ne"></div>
        <div class="ie-crop-handle ie-crop-handle-e" data-handle="e"></div>
        <div class="ie-crop-handle ie-crop-handle-se" data-handle="se"></div>
        <div class="ie-crop-handle ie-crop-handle-s" data-handle="s"></div>
        <div class="ie-crop-handle ie-crop-handle-sw" data-handle="sw"></div>
        <div class="ie-crop-handle ie-crop-handle-w" data-handle="w"></div>
      </div>
      <div class="ie-crop-actions">
        <button class="ie-crop-btn ie-crop-btn-cancel" data-action="cancel">取消</button>
        <button class="ie-crop-btn ie-crop-btn-apply" data-action="apply">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          裁剪
        </button>
      </div>
    `;
    
    // Add to viewport
    this.viewport.appendChild(this.cropOverlay);
    
    // Setup crop events
    this.setupCropEvents();
  }
  
  /** Setup crop overlay events */
  private setupCropEvents(): void {
    if (!this.cropOverlay) return;
    
    const cropBox = this.cropOverlay.querySelector('.ie-crop-box') as HTMLElement;
    let isDragging = false;
    let isResizing = false;
    let activeHandle = '';
    let startX = 0, startY = 0;
    let startLeft = 0, startTop = 0, startWidth = 0, startHeight = 0;
    
    // Handle drag
    cropBox.addEventListener('pointerdown', (e) => {
      if ((e.target as HTMLElement).classList.contains('ie-crop-handle')) return;
      e.stopPropagation();
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      startLeft = cropBox.offsetLeft;
      startTop = cropBox.offsetTop;
      cropBox.setPointerCapture(e.pointerId);
    });
    
    // Handle resize
    this.cropOverlay.querySelectorAll('.ie-crop-handle').forEach(handle => {
      handle.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        isResizing = true;
        activeHandle = (e.target as HTMLElement).getAttribute('data-handle') || '';
        startX = (e as PointerEvent).clientX;
        startY = (e as PointerEvent).clientY;
        startLeft = cropBox.offsetLeft;
        startTop = cropBox.offsetTop;
        startWidth = cropBox.offsetWidth;
        startHeight = cropBox.offsetHeight;
        (handle as HTMLElement).setPointerCapture((e as PointerEvent).pointerId);
      });
    });
    
    // Move handler
    this.cropOverlay.addEventListener('pointermove', (e) => {
      if (!isDragging && !isResizing) return;
      
      const dx = (e.clientX - startX) / this.scale;
      const dy = (e.clientY - startY) / this.scale;
      const canvas = this.editor.canvas;
      
      if (isDragging) {
        let newLeft = startLeft + dx;
        let newTop = startTop + dy;
        // Constrain to canvas bounds
        newLeft = Math.max(0, Math.min(newLeft, canvas.width - cropBox.offsetWidth));
        newTop = Math.max(0, Math.min(newTop, canvas.height - cropBox.offsetHeight));
        cropBox.style.left = `${newLeft}px`;
        cropBox.style.top = `${newTop}px`;
      } else if (isResizing) {
        let newLeft = startLeft, newTop = startTop, newWidth = startWidth, newHeight = startHeight;
        
        if (activeHandle.includes('e')) { newWidth = Math.max(50, startWidth + dx); }
        if (activeHandle.includes('w')) { newWidth = Math.max(50, startWidth - dx); newLeft = startLeft + dx; }
        if (activeHandle.includes('s')) { newHeight = Math.max(50, startHeight + dy); }
        if (activeHandle.includes('n')) { newHeight = Math.max(50, startHeight - dy); newTop = startTop + dy; }
        
        // Constrain to canvas bounds
        if (newLeft < 0) { newWidth += newLeft; newLeft = 0; }
        if (newTop < 0) { newHeight += newTop; newTop = 0; }
        if (newLeft + newWidth > canvas.width) newWidth = canvas.width - newLeft;
        if (newTop + newHeight > canvas.height) newHeight = canvas.height - newTop;
        
        cropBox.style.left = `${newLeft}px`;
        cropBox.style.top = `${newTop}px`;
        cropBox.style.width = `${newWidth}px`;
        cropBox.style.height = `${newHeight}px`;
      }
      
      this.updateCropMask();
    });
    
    // End handler
    this.cropOverlay.addEventListener('pointerup', () => {
      isDragging = false;
      isResizing = false;
      activeHandle = '';
    });
    
    // Control buttons
    this.cropOverlay.querySelector('[data-action="cancel"]')?.addEventListener('click', () => {
      this.toggleCropTool();
    });
    
    this.cropOverlay.querySelector('[data-action="apply"]')?.addEventListener('click', () => {
      this.applyCrop();
    });
    
    // Initial mask update
    this.updateCropMask();
  }
  
  /** Update crop mask to show cropped area */
  private updateCropMask(): void {
    if (!this.cropOverlay) return;
    const cropBox = this.cropOverlay.querySelector('.ie-crop-box') as HTMLElement;
    if (!cropBox) return;
    
    const canvas = this.editor.canvas;
    const left = cropBox.offsetLeft;
    const top = cropBox.offsetTop;
    const width = cropBox.offsetWidth;
    const height = cropBox.offsetHeight;
    
    // Update 4 mask blocks to surround the crop box
    const maskTop = this.cropOverlay.querySelector('.ie-crop-mask-top') as HTMLElement;
    const maskLeft = this.cropOverlay.querySelector('.ie-crop-mask-left') as HTMLElement;
    const maskRight = this.cropOverlay.querySelector('.ie-crop-mask-right') as HTMLElement;
    const maskBottom = this.cropOverlay.querySelector('.ie-crop-mask-bottom') as HTMLElement;
    
    if (maskTop) {
      maskTop.style.cssText = `left:0;top:0;width:${canvas.width}px;height:${top}px;`;
    }
    if (maskLeft) {
      maskLeft.style.cssText = `left:0;top:${top}px;width:${left}px;height:${height}px;`;
    }
    if (maskRight) {
      maskRight.style.cssText = `left:${left + width}px;top:${top}px;width:${canvas.width - left - width}px;height:${height}px;`;
    }
    if (maskBottom) {
      maskBottom.style.cssText = `left:0;top:${top + height}px;width:${canvas.width}px;height:${canvas.height - top - height}px;`;
    }
  }
  
  /** Apply crop to canvas */
  private applyCrop(): void {
    if (!this.cropOverlay) return;
    const cropBox = this.cropOverlay.querySelector('.ie-crop-box') as HTMLElement;
    if (!cropBox) return;
    
    const x = cropBox.offsetLeft;
    const y = cropBox.offsetTop;
    const width = cropBox.offsetWidth;
    const height = cropBox.offsetHeight;
    
    // Get cropped image data
    const ctx = this.editor.ctx;
    const canvas = this.editor.canvas;
    if (!ctx || !canvas) return;
    
    // Save current state to history BEFORE crop (so we can undo)
    (this.editor as any).saveToHistory?.('before crop');
    
    // Fade out entire crop overlay
    this.cropOverlay.style.transition = 'opacity 0.25s ease-out';
    this.cropOverlay.style.opacity = '0';
    
    // After fade out, apply the actual crop
    setTimeout(() => {
      const croppedData = ctx.getImageData(x, y, width, height);
      
      // Resize canvas
      canvas.width = width;
      canvas.height = height;
      
      // Draw cropped image
      ctx.putImageData(croppedData, 0, 0);
      
      // Update original image data
      this.saveOriginalImage();
      this.savePureImage();
      
      // Hide crop overlay (no animation since already faded)
      if (this.cropOverlay) {
        this.cropOverlay.remove();
        this.cropOverlay = null;
      }
      this.isCropActive = false;
      this.buttons.get('crop')?.classList.remove('active');
      
      // Hide crop action buttons in toolbar
      const cropActionGroup = this.toolbar.querySelector('.ie-crop-action-group') as HTMLElement;
      if (cropActionGroup) {
        cropActionGroup.style.display = 'none';
      }
      
      // Reset view with animation
      this.viewport.style.transition = 'transform 0.3s ease-out';
      this.resetView();
      
      // Remove transition after animation
      setTimeout(() => {
        this.viewport.style.transition = 'none';
      }, 300);
    }, 250);
  }
  
  /** Hide crop overlay */
  private hideCropOverlay(): void {
    if (this.cropOverlay) {
      // Add fade out animation
      this.cropOverlay.style.transition = 'opacity 0.2s ease-out';
      this.cropOverlay.style.opacity = '0';
      
      setTimeout(() => {
        if (this.cropOverlay) {
          this.cropOverlay.remove();
          this.cropOverlay = null;
        }
      }, 200);
    }
  }

  // ============ Filter Tool ============
  
  /** Toggle filter panel */
  private toggleFilterPanel(): void {
    const filterPanel = this.panels.get('filter');
    if (!filterPanel) return;
    
    if (this.activePanel === 'filter') {
      this.showPanel(null);
      this.buttons.get('filter')?.classList.remove('active');
    } else {
      this.showPanel('filter');
      this.buttons.get('filter')?.classList.add('active');
    }
  }

  // ============ Eraser Tool ============
  
  /** Apply eraser at position - restores original image pixels */
  private applyEraserAt(x: number, y: number): void {
    if (this.eraserMode === 'shape') {
      // Shape mode: delete shape under cursor
      const shape = this.shapeManager.findShapeAtPoint(x, y, this.eraserSize / 2);
      if (shape) {
        this.shapeManager.deleteShape(shape.id);
      }
    } else {
      // Pixel mode: restore original image pixels in the eraser area
      this.restoreOriginalPixels(x, y, this.eraserSize / 2);
    }
  }
  
  /** Restore original image pixels in a circular area */
  private restoreOriginalPixels(cx: number, cy: number, radius: number): void {
    const ctx = this.editor.ctx;
    const canvas = this.editor.canvas;
    const pureData = this.pureImageData;
    
    if (!ctx || !canvas || !pureData) {
      console.warn('[Eraser] Missing required data, skipping restore');
      return;
    }
    
    const radiusSq = radius * radius;
    const minX = Math.max(0, Math.floor(cx - radius));
    const maxX = Math.min(canvas.width - 1, Math.ceil(cx + radius));
    const minY = Math.max(0, Math.floor(cy - radius));
    const maxY = Math.min(canvas.height - 1, Math.ceil(cy + radius));
    
    const regionWidth = maxX - minX + 1;
    const regionHeight = maxY - minY + 1;
    
    if (regionWidth <= 0 || regionHeight <= 0) return;
    
    // Get current canvas data
    const currentData = ctx.getImageData(minX, minY, regionWidth, regionHeight);
    const currentPixels = currentData.data;
    const purePixels = pureData.data;
    const pureWidth = pureData.width;
    
    let pixelsChanged = 0;
    
    // Restore pixels within the circle
    for (let py = minY; py <= maxY; py++) {
      for (let px = minX; px <= maxX; px++) {
        const dx = px - cx;
        const dy = py - cy;
        const distSq = dx * dx + dy * dy;
        
        if (distSq <= radiusSq) {
          // Inside the eraser circle - restore from pure image
          const pureIdx = (py * pureWidth + px) * 4;
          const currentIdx = ((py - minY) * regionWidth + (px - minX)) * 4;
          
          // Check if pixel is different
          if (currentPixels[currentIdx] !== purePixels[pureIdx] ||
              currentPixels[currentIdx + 1] !== purePixels[pureIdx + 1] ||
              currentPixels[currentIdx + 2] !== purePixels[pureIdx + 2] ||
              currentPixels[currentIdx + 3] !== purePixels[pureIdx + 3]) {
            pixelsChanged++;
          }
          
          // Apply smooth edge (anti-aliasing)
          const dist = Math.sqrt(distSq);
          const edgeFade = Math.min(1, (radius - dist) / 2);
          
          if (edgeFade >= 1) {
            // Full restore
            currentPixels[currentIdx] = purePixels[pureIdx];
            currentPixels[currentIdx + 1] = purePixels[pureIdx + 1];
            currentPixels[currentIdx + 2] = purePixels[pureIdx + 2];
            currentPixels[currentIdx + 3] = purePixels[pureIdx + 3];
          } else {
            // Blend for smooth edges
            currentPixels[currentIdx] = Math.round(currentPixels[currentIdx] * (1 - edgeFade) + purePixels[pureIdx] * edgeFade);
            currentPixels[currentIdx + 1] = Math.round(currentPixels[currentIdx + 1] * (1 - edgeFade) + purePixels[pureIdx + 1] * edgeFade);
            currentPixels[currentIdx + 2] = Math.round(currentPixels[currentIdx + 2] * (1 - edgeFade) + purePixels[pureIdx + 2] * edgeFade);
            currentPixels[currentIdx + 3] = Math.round(currentPixels[currentIdx + 3] * (1 - edgeFade) + purePixels[pureIdx + 3] * edgeFade);
          }
        }
      }
    }
    
    if (pixelsChanged > 0) {
      console.log('[Eraser] Restoring', pixelsChanged, 'different pixels');
    }
    
    ctx.putImageData(currentData, minX, minY);
  }
  
  /** Interpolate eraser stroke */
  private interpolateEraser(x1: number, y1: number, x2: number, y2: number): void {
    const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const step = Math.max(1, this.eraserSize / 6); // Smaller step for smoother strokes
    const steps = Math.max(1, Math.ceil(dist / step));
    
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = x1 + (x2 - x1) * t;
      const y = y1 + (y2 - y1) * t;
      this.applyEraserAt(x, y);
    }
  }

  // Zoom methods
  private setScale(newScale: number, clientX?: number, clientY?: number): void {
    newScale = Math.max(0.1, Math.min(5, newScale));
    
    if (clientX !== undefined && clientY !== undefined) {
      const rect = this.canvasContainer.getBoundingClientRect();
      const mouseX = clientX - rect.left - rect.width / 2;
      const mouseY = clientY - rect.top - rect.height / 2;
      
      const scaleDiff = newScale - this.scale;
      this.translateX -= mouseX * scaleDiff / this.scale;
      this.translateY -= mouseY * scaleDiff / this.scale;
    }
    
    this.scale = newScale;
    this.updateTransform();
  }

  private updateTransform(): void {
    this.viewport.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
    const percent = Math.round(this.scale * 100);
    if (this.zoomText) this.zoomText.textContent = `${percent}%`;
    this.zoomBadge.textContent = `${percent}%`;
    // Update brush cursor size based on new scale
    this.updateBrushCursorSize();
  }

  private zoomIn(): void {
    this.setScale(this.scale * 1.25);
  }

  private zoomOut(): void {
    this.setScale(this.scale / 1.25);
  }

  private resetView(): void {
    this.scale = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.updateTransform();
  }

  private async exportImage(): Promise<void> {
    try {
      const data = await this.editor.export({
        format: 'png',
        quality: 0.95,
        type: 'base64',
      });
      
      const link = document.createElement('a');
      link.href = data as string;
      link.download = `image-${Date.now()}.png`;
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    }
  }

  /** Apply theme to editor */
  private applyTheme(theme: 'light' | 'dark' | 'auto'): void {
    let resolvedTheme: 'light' | 'dark' = theme === 'auto' 
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    
    this.wrapper.classList.remove('ie-theme-light', 'ie-theme-dark');
    this.wrapper.classList.add(`ie-theme-${resolvedTheme}`);
  }
  
  /** Set theme at runtime */
  setTheme(theme: 'light' | 'dark' | 'auto'): void {
    this.options.theme = theme;
    this.applyTheme(theme);
    
    // Update placeholder if showing
    if (!this.hasRealImage) {
      this.showPlaceholder();
    }
  }
  
  /** Apply primary color */
  private applyPrimaryColor(color: string): void {
    this.wrapper.style.setProperty('--ie-primary', color);
    this.wrapper.style.setProperty('--ie-btn-active-bg', color);
  }
  
  /** Set primary color at runtime */
  setPrimaryColor(color: string): void {
    this.options.primaryColor = color;
    this.applyPrimaryColor(color);
  }
  
  /** Get current theme */
  getTheme(): 'light' | 'dark' | 'auto' {
    return this.options.theme || 'dark';
  }
  
  /** Update disabled tools list at runtime */
  setDisabledTools(disabledTools: ToolName[]): void {
    this.options.disabledTools = disabledTools;
    
    // All toggleable buttons
    const allToggleableButtons: ToolName[] = [
      'move', 'pen', 'rect', 'circle', 'arrow', 'line', 'triangle', 'text', 'mosaic', 'eraser', 'crop', 'filter',  // Drawing tools
      'zoomIn', 'zoomOut', 'reset',  // Zoom controls
      'undo', 'redo',  // History controls
      'export',  // Export button
    ];
    
    for (const btnName of allToggleableButtons) {
      const btn = this.buttons.get(btnName);
      if (btn) {
        if (disabledTools.includes(btnName)) {
          btn.style.display = 'none';
        } else {
          btn.style.display = '';
        }
      }
    }
    
    // Handle zoom text visibility (shown only if any zoom button is visible)
    if (this.zoomText) {
      const zoomHidden = disabledTools.includes('zoomIn') && 
                         disabledTools.includes('zoomOut') && 
                         disabledTools.includes('reset');
      this.zoomText.style.display = zoomHidden ? 'none' : '';
    }
    
    // If current tool is now disabled, close its panel
    if (this.activePanel) {
      const panel = this.panels.get(this.activePanel);
      if (panel) {
        panel.style.display = 'none';
      }
      this.activePanel = null;
    }
    
    // If current tool is now disabled, switch to move tool (if move is available)
    if (this.currentTool && disabledTools.includes(this.currentTool as ToolName)) {
      if (!disabledTools.includes('move')) {
        this.selectTool(null);
      } else {
        this.currentTool = null;
      }
    }
  }
  
  /** Get current disabled tools */
  getDisabledTools(): ToolName[] {
    return this.options.disabledTools || [];
  }

  // ============ Shape Layer Rendering ============
  
  /** Save the current canvas state as original image (called after image load or flatten) */
  saveOriginalImage(): void {
    const ctx = this.editor.ctx;
    const canvas = this.editor.canvas;
    if (ctx && canvas) {
      this.originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
  }
  
  /** Render original image + all shapes from manager */
  private renderAll(): void {
    const ctx = this.editor.ctx;
    const canvas = this.editor.canvas;
    if (!ctx || !canvas) return;
    
    // If we have original image data, restore it first
    if (this.originalImageData) {
      ctx.putImageData(this.originalImageData, 0, 0);
    } else {
      // Otherwise just clear canvas with white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // Render all shapes from shape manager
    this.shapeManager.render(ctx);
  }
  
  /** Flatten all shapes into the original image (makes them permanent) */
  flattenShapes(): void {
    this.renderAll();
    this.saveOriginalImage();
    this.shapeManager.clear();
  }
  
  /** Get the shape layer manager */
  getShapeManager(): ShapeLayerManager {
    return this.shapeManager;
  }
  
  // ============ Toolbar Visibility ============
  
  /** Set toolbar visibility with animation */
  setToolbarVisible(visible: boolean): void {
    if (visible) {
      this.toolbar.classList.remove('ie-toolbar-hidden');
      this.zoomBadge.classList.remove('ie-zoom-badge-hidden');
    } else {
      this.toolbar.classList.add('ie-toolbar-hidden');
      this.zoomBadge.classList.add('ie-zoom-badge-hidden');
    }
    this.hasRealImage = visible;
  }
  
  /** Check if toolbar is visible */
  isToolbarVisible(): boolean {
    return !this.toolbar.classList.contains('ie-toolbar-hidden');
  }
  
  /** Check if current image is placeholder */
  hasImage(): boolean {
    return this.hasRealImage;
  }
  
  /** Generate and load placeholder image */
  showPlaceholder(): void {
    const theme = this.options.theme === 'auto'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : (this.options.theme || 'dark');
    
    // Calculate placeholder size - fill the entire container
    let width = this.options.placeholderWidth;
    let height = this.options.placeholderHeight;
    
    if (!width || !height) {
      const containerRect = this.canvasContainer.getBoundingClientRect();
      // Use full container size
      width = Math.max(400, Math.round(containerRect.width));
      height = Math.max(300, Math.round(containerRect.height));
    }
    
    const placeholder = createPlaceholder({
      width,
      height,
      text: this.options.placeholderText,
      subText: this.options.placeholderSubText,
      theme,
    });
    
    this.hasRealImage = false;
    
    // Load placeholder (isUserImage=false to prevent toolbar from showing)
    this.editor.loadImage(placeholder, false).then(() => {
      // Keep toolbar hidden for placeholder
      if (this.options.autoHide) {
        this.setToolbarVisible(false);
      }
    });
  }
  
  /** Called when a real image is loaded */
  onImageLoaded(): void {
    this.hasRealImage = true;
    if (this.options.autoHide) {
      this.setToolbarVisible(true);
    }
    // Save pure image data first (before any annotations)
    this.savePureImage();
    this.saveOriginalImage();
  }
  
  /** Save the pure original image (without any annotations) - for eraser tool */
  private savePureImage(): void {
    const ctx = this.editor.ctx;
    const canvas = this.editor.canvas;
    if (ctx && canvas) {
      this.pureImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
  }

  destroy(): void {
    this.wrapper.remove();
    this.panels.clear();
    this.buttons.clear();
    this.shapeManager.clear();
  }
}
