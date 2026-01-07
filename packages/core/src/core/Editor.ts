/**
 * Editor class - Main image editor implementation
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5
 */

import { Canvas } from './Canvas';
import { EventManager } from '../managers/EventManager';
import { HistoryManager } from '../managers/HistoryManager';
import { PluginManager } from '../managers/PluginManager';
import { ConfigManager } from '../managers/ConfigManager';
import { getElement } from '../utils/dom.utils';
import { Toolbar } from '../ui/Toolbar';
import { injectStyles } from '../ui/toolbar.styles';
import type { EditorOptions, EditorInterface, ToolbarConfig } from '../types/editor.types';
import type { PluginConstructor, Plugin, PluginContext } from '../types/plugin.types';
import type { EditorConfig, ExportOptions, DeepPartial } from '../types/config.types';
import type { EventHandler, EventListenerOptions, EditorEvents } from '../types/event.types';

/**
 * Editor class - Main entry point for the image editor
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5
 */
export class Editor implements EditorInterface {
  /** Canvas manager instance */
  private _canvas: Canvas;
  /** Event manager instance */
  private _eventManager: EventManager;
  /** History manager instance */
  private _historyManager: HistoryManager;
  /** Plugin manager instance */
  private _pluginManager: PluginManager;
  /** Config manager instance */
  private _configManager: ConfigManager;
  /** Container element */
  private _container: HTMLElement;
  /** Built-in toolbar instance */
  private _toolbar: Toolbar | null = null;
  /** Whether the editor is destroyed */
  private _destroyed: boolean = false;
  /** Whether the editor is ready */
  private _ready: boolean = false;

  /**
   * Create a new Editor instance
   * Requirements: 1.1, 1.3 - Initialize editor with container and config
   * @param options - Editor initialization options
   */
  constructor(options: EditorOptions) {
    // Get container element
    const container = getElement(options.container);
    if (!container) {
      throw new Error('Container element not found');
    }
    this._container = container;

    // Initialize config manager
    const editorConfig: DeepPartial<EditorConfig> = {
      width: options.width,
      height: options.height,
      backgroundColor: options.backgroundColor,
      historyLimit: options.historyLimit,
      responsive: options.responsive,
      deviceType: options.deviceType,
    };
    this._configManager = new ConfigManager(editorConfig);

    // Initialize event manager
    this._eventManager = new EventManager();

    // Initialize history manager
    const config = this._configManager.getConfig();
    this._historyManager = new HistoryManager(config.historyLimit);

    // Initialize canvas
    this._canvas = new Canvas(this._container, config);

    // Initialize plugin manager
    this._pluginManager = new PluginManager();
    this._pluginManager.setContext(this.createPluginContext());

    // Setup history change listener
    this._historyManager.onChange((canUndo, canRedo) => {
      this._eventManager.emit('history-change', { canUndo, canRedo });
    });

    // Setup plugin change listener
    this._pluginManager.onChange((tool, prevTool) => {
      this._eventManager.emit('tool-change', { tool: tool || '', prevTool });
    });

    // Register initial plugins
    if (options.plugins) {
      for (const PluginClass of options.plugins) {
        this.use(PluginClass);
      }
    }

    // Create built-in toolbar if enabled (default: true)
    const toolbarOption = options.toolbar;
    if (toolbarOption !== false) {
      injectStyles();
      const toolbarConfig: ToolbarConfig = typeof toolbarOption === 'object' ? toolbarOption : {};
      this._toolbar = new Toolbar(this, this._container, {
        zoom: toolbarConfig.zoom !== false,
        tools: toolbarConfig.tools !== false,
        history: toolbarConfig.history !== false,
        export: toolbarConfig.export !== false,
        theme: toolbarConfig.theme || 'dark',
        primaryColor: toolbarConfig.primaryColor,
        disabledTools: toolbarConfig.disabledTools,
        autoHide: toolbarConfig.autoHide !== false,
        placeholderText: toolbarConfig.placeholderText,
        placeholderSubText: toolbarConfig.placeholderSubText,
      });
    }

    // Load image if provided, otherwise show placeholder
    if (options.image) {
      this.loadImage(options.image).catch((error) => {
        this._eventManager.emit('error', { error });
      });
    } else if (this._toolbar) {
      // Show placeholder when no image provided
      this._toolbar.showPlaceholder();
    }
  }

  /**
   * Get the canvas element
   */
  get canvas(): HTMLCanvasElement {
    return this._canvas.canvas;
  }

  /**
   * Get the canvas 2D context
   */
  get ctx(): CanvasRenderingContext2D {
    return this._canvas.ctx;
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
   * Get the current tool name
   */
  get currentTool(): string | null {
    return this._pluginManager.getActiveName();
  }

  /**
   * Check if the editor is ready
   */
  get isReady(): boolean {
    return this._ready;
  }

  /**
   * Check if the editor is destroyed
   */
  get isDestroyed(): boolean {
    return this._destroyed;
  }

  /**
   * Create plugin context
   * Requirements: 2.3 - Provide editor context to plugins
   */
  private createPluginContext(): PluginContext {
    return {
      editor: this,
      canvas: this._canvas.canvas,
      ctx: this._canvas.ctx,
      saveState: () => this.saveState(),
      getImageData: () => this._canvas.getImageData(),
      putImageData: (data: ImageData) => this._canvas.putImageData(data),
    };
  }

  /**
   * Save current state to history
   * Requirements: 6.1 - Record operations to history stack
   */
  private saveState(toolName?: string, description?: string): void {
    const imageData = this._canvas.getImageData();
    this._historyManager.push({
      imageData,
      toolName: toolName || this.currentTool || 'unknown',
      description,
    });
  }

  /**
   * Load an image into the editor
   * Requirements: 1.1, 1.2 - Load image and trigger ready event
   * @param source - Image source (URL or HTMLImageElement)
   * @param isUserImage - Whether this is a user-provided image (not placeholder)
   */
  async loadImage(source: string | HTMLImageElement, isUserImage = true): Promise<void> {
    if (this._destroyed) {
      throw new Error('Editor is destroyed');
    }

    try {
      const { width, height } = await this._canvas.loadImage(source);

      // Save initial state
      this.saveState('init', 'Initial state');

      // Mark as ready
      this._ready = true;

      // Emit events
      this._eventManager.emit('image-loaded', { width, height });
      this._eventManager.emit('ready', { width, height });
      
      // Notify toolbar if this is a user image
      if (isUserImage && this._toolbar) {
        this._toolbar.onImageLoaded();
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      this._eventManager.emit('error', { error: err });
      throw err;
    }
  }

  /**
   * Register a plugin
   * Requirements: 2.1 - Add plugin to available tools list
   * @param PluginClass - Plugin constructor
   * @returns The editor instance for chaining
   */
  use(PluginClass: PluginConstructor): this {
    if (this._destroyed) {
      throw new Error('Editor is destroyed');
    }

    this._pluginManager.register(PluginClass);
    return this;
  }

  /** Built-in tools that are not plugins */
  private static BUILTIN_TOOLS = ['', 'pen', 'rect', 'circle', 'arrow', 'line', 'triangle', 'mosaic', 'eraser', 'text', 'crop', 'filter'];

  /**
   * Set the current tool
   * Requirements: 2.3 - Activate plugin
   * @param toolName - Tool/plugin name
   */
  setTool(toolName: string): void {
    if (this._destroyed) {
      throw new Error('Editor is destroyed');
    }

    // Only activate plugins, not built-in toolbar tools
    if (!Editor.BUILTIN_TOOLS.includes(toolName)) {
      this._pluginManager.activate(toolName);
    } else {
      // Deactivate any active plugin when switching to built-in tool
      const activeName = this._pluginManager.getActiveName();
      if (activeName) {
        this._pluginManager.deactivate(activeName);
      }
      // Emit tool-change event for built-in tools
      this._eventManager.emit('tool-change', { tool: toolName, prevTool: activeName });
    }
  }

  /**
   * Get a tool/plugin by name
   * @param toolName - Tool/plugin name
   * @returns Plugin instance or undefined
   */
  getTool(toolName: string): Plugin | undefined {
    return this._pluginManager.get(toolName);
  }

  /**
   * Undo the last operation
   * Requirements: 6.2 - Restore to previous state
   */
  undo(): void {
    if (this._destroyed) {
      throw new Error('Editor is destroyed');
    }

    const state = this._historyManager.undo();
    if (state) {
      // Restore canvas size if it changed (e.g., after crop)
      const imageData = state.imageData;
      if (this._canvas.width !== imageData.width || this._canvas.height !== imageData.height) {
        this._canvas.canvas.width = imageData.width;
        this._canvas.canvas.height = imageData.height;
      }
      this._canvas.putImageData(imageData);
      
      // Notify toolbar to update its state
      if (this._toolbar) {
        this._toolbar.saveOriginalImage();
      }
    }
  }

  /**
   * Redo the last undone operation
   * Requirements: 6.3 - Restore to next state
   */
  redo(): void {
    if (this._destroyed) {
      throw new Error('Editor is destroyed');
    }

    const state = this._historyManager.redo();
    if (state) {
      // Restore canvas size if it changed (e.g., after crop)
      const imageData = state.imageData;
      if (this._canvas.width !== imageData.width || this._canvas.height !== imageData.height) {
        this._canvas.canvas.width = imageData.width;
        this._canvas.canvas.height = imageData.height;
      }
      this._canvas.putImageData(imageData);
      
      // Notify toolbar to update its state
      if (this._toolbar) {
        this._toolbar.saveOriginalImage();
      }
    }
  }

  /**
   * Check if undo is available
   * @returns True if can undo
   */
  canUndo(): boolean {
    return this._historyManager.canUndo();
  }

  /**
   * Check if redo is available
   * @returns True if can redo
   */
  canRedo(): boolean {
    return this._historyManager.canRedo();
  }

  /**
   * Save current state to history (public API)
   * @param description - Optional description of the operation
   */
  saveToHistory(description?: string): void {
    if (this._destroyed) return;
    this.saveState(this.currentTool || 'toolbar', description);
  }

  /**
   * Export the edited image
   * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5 - Export with various options
   * @param options - Export options
   * @returns Promise with exported data
   */
  async export(options?: ExportOptions): Promise<string | Blob | File | ArrayBuffer> {
    if (this._destroyed) {
      throw new Error('Editor is destroyed');
    }

    // Import export utilities dynamically to avoid circular dependencies
    const exportUtils = await import('../utils/export.utils');

    const exportOptions = options || {};
    this._eventManager.emit('before-export', { options: exportOptions });

    const data = await exportUtils.exportImage(this._canvas.canvas, exportOptions);

    this._eventManager.emit('after-export', { data });
    return data;
  }

  /**
   * Subscribe to an event
   * Requirements: 1.2 - Event subscription
   * @param event - Event name
   * @param handler - Event handler
   * @param options - Listener options
   */
  on<K extends keyof EditorEvents>(
    event: K,
    handler: EventHandler<EditorEvents[K]>,
    options?: EventListenerOptions
  ): void {
    this._eventManager.on(event, handler, options);
  }

  /**
   * Unsubscribe from an event
   * @param event - Event name
   * @param handler - Event handler
   */
  off<K extends keyof EditorEvents>(
    event: K,
    handler: EventHandler<EditorEvents[K]>
  ): void {
    this._eventManager.off(event, handler);
  }

  /**
   * Emit an event
   * @param event - Event name
   * @param data - Event data
   */
  emit<K extends keyof EditorEvents>(event: K, data: EditorEvents[K]): void {
    this._eventManager.emit(event, data);
  }

  /**
   * Get the current configuration
   * @returns Current configuration
   */
  getConfig(): EditorConfig {
    return this._configManager.getConfig();
  }

  /**
   * Update configuration at runtime
   * Requirements: 10.5 - Runtime configuration update
   * @param updates - Configuration updates
   */
  updateConfig(updates: DeepPartial<EditorConfig>): void {
    if (this._destroyed) {
      throw new Error('Editor is destroyed');
    }

    this._configManager.update(updates);
  }

  /**
   * Reset the canvas to original image
   */
  reset(): void {
    if (this._destroyed) {
      throw new Error('Editor is destroyed');
    }

    this._canvas.reset();
    this.saveState('reset', 'Reset to original');
  }

  /**
   * Clear the canvas
   */
  clear(): void {
    if (this._destroyed) {
      throw new Error('Editor is destroyed');
    }

    this._canvas.clear();
    this.saveState('clear', 'Clear canvas');
  }

  /**
   * Get the history manager
   * @returns History manager instance
   */
  getHistoryManager(): HistoryManager {
    return this._historyManager;
  }

  /**
   * Get the plugin manager
   * @returns Plugin manager instance
   */
  getPluginManager(): PluginManager {
    return this._pluginManager;
  }

  /**
   * Get the event manager
   * @returns Event manager instance
   */
  getEventManager(): EventManager {
    return this._eventManager;
  }

  /**
   * Get the canvas manager
   * @returns Canvas manager instance
   */
  getCanvasManager(): Canvas {
    return this._canvas;
  }

  /**
   * Get the built-in toolbar instance
   * @returns Toolbar instance or null if disabled
   */
  getToolbar(): Toolbar | null {
    return this._toolbar;
  }
  
  // ============ Image Data APIs ============
  
  /**
   * Get current canvas image data
   * @returns ImageData object
   */
  getImageData(): ImageData {
    if (this._destroyed) {
      throw new Error('Editor is destroyed');
    }
    return this._canvas.getImageData();
  }
  
  /**
   * Get canvas as data URL
   * @param type - Image MIME type (default: 'image/png')
   * @param quality - Image quality for jpeg (0-1)
   * @returns Data URL string
   */
  toDataURL(type: string = 'image/png', quality?: number): string {
    if (this._destroyed) {
      throw new Error('Editor is destroyed');
    }
    return this._canvas.canvas.toDataURL(type, quality);
  }
  
  /**
   * Get canvas as Blob
   * @param type - Image MIME type (default: 'image/png')
   * @param quality - Image quality for jpeg (0-1)
   * @returns Promise resolving to Blob
   */
  toBlob(type: string = 'image/png', quality?: number): Promise<Blob | null> {
    if (this._destroyed) {
      throw new Error('Editor is destroyed');
    }
    return new Promise((resolve) => {
      this._canvas.canvas.toBlob(resolve, type, quality);
    });
  }
  
  /**
   * Get image information
   * @returns Object containing width, height, and other info
   */
  getImageInfo(): { width: number; height: number; aspectRatio: number } {
    if (this._destroyed) {
      throw new Error('Editor is destroyed');
    }
    const width = this._canvas.width;
    const height = this._canvas.height;
    return {
      width,
      height,
      aspectRatio: width / height,
    };
  }
  
  // ============ Convenient Export Methods ============
  
  /**
   * Quick export to PNG base64
   * @returns PNG data URL string
   */
  toPNG(): string {
    if (this._destroyed) {
      throw new Error('Editor is destroyed');
    }
    return this._canvas.canvas.toDataURL('image/png');
  }
  
  /**
   * Quick export to JPEG base64
   * @param quality - Image quality (0-1, default: 0.92)
   * @returns JPEG data URL string
   */
  toJPEG(quality = 0.92): string {
    if (this._destroyed) {
      throw new Error('Editor is destroyed');
    }
    // Create temp canvas with white background (JPEG doesn't support transparency)
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = this._canvas.width;
    tempCanvas.height = this._canvas.height;
    const ctx = tempCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
      ctx.drawImage(this._canvas.canvas, 0, 0);
    }
    return tempCanvas.toDataURL('image/jpeg', quality);
  }
  
  /**
   * Alias for toJPEG
   */
  toJPG(quality = 0.92): string {
    return this.toJPEG(quality);
  }
  
  /**
   * Quick export to WebP base64
   * @param quality - Image quality (0-1, default: 0.92)
   * @returns WebP data URL string
   */
  toWebP(quality = 0.92): string {
    if (this._destroyed) {
      throw new Error('Editor is destroyed');
    }
    return this._canvas.canvas.toDataURL('image/webp', quality);
  }
  
  /**
   * Quick export to base64 with custom format
   * @param format - Image format ('png' | 'jpeg' | 'jpg' | 'webp')
   * @param quality - Image quality for jpeg/webp (0-1)
   * @returns Data URL string
   */
  toBase64(format: 'png' | 'jpeg' | 'jpg' | 'webp' = 'png', quality = 0.92): string {
    if (this._destroyed) {
      throw new Error('Editor is destroyed');
    }
    const normalizedFormat = format === 'jpg' ? 'jpeg' : format;
    if (normalizedFormat === 'jpeg') {
      return this.toJPEG(quality);
    }
    return this._canvas.canvas.toDataURL(`image/${normalizedFormat}`, quality);
  }
  
  /**
   * Download the edited image
   * @param filename - Download filename (without extension, default: 'image')
   * @param options - Export options
   */
  async download(filename = 'image', options?: ExportOptions): Promise<void> {
    if (this._destroyed) {
      throw new Error('Editor is destroyed');
    }
    
    const exportUtils = await import('../utils/export.utils');
    await exportUtils.downloadImage(this._canvas.canvas, filename, options);
  }
  
  /**
   * Copy image to clipboard
   * @returns Promise that resolves when copied
   */
  async copyToClipboard(): Promise<void> {
    if (this._destroyed) {
      throw new Error('Editor is destroyed');
    }
    
    const exportUtils = await import('../utils/export.utils');
    await exportUtils.copyImageToClipboard(this._canvas.canvas);
  }
  
  /**
   * Get estimated file size for export
   * @param options - Export options
   * @returns Estimated size in bytes
   */
  async getExportSize(options?: ExportOptions): Promise<number> {
    if (this._destroyed) {
      throw new Error('Editor is destroyed');
    }
    
    const exportUtils = await import('../utils/export.utils');
    return exportUtils.estimateFileSize(this._canvas.canvas, options);
  }
  
  // ============ Transform Methods ============
  
  /**
   * Rotate the image by specified degrees
   * @param degrees - Rotation angle in degrees (90, 180, 270, or any value)
   */
  rotate(degrees: number): void {
    if (this._destroyed) {
      throw new Error('Editor is destroyed');
    }
    
    this._canvas.rotate(degrees);
    this.saveState('rotate', `Rotate ${degrees}°`);
    this._eventManager.emit('transform', { type: 'rotate', degrees });
    
    // Notify toolbar to update
    if (this._toolbar) {
      this._toolbar.saveOriginalImage();
    }
  }
  
  /**
   * Rotate the image 90 degrees clockwise
   */
  rotateRight(): void {
    this.rotate(90);
  }
  
  /**
   * Rotate the image 90 degrees counter-clockwise
   */
  rotateLeft(): void {
    this.rotate(-90);
  }
  
  /**
   * Rotate the image 180 degrees
   */
  rotate180(): void {
    this.rotate(180);
  }
  
  /**
   * Flip the image horizontally (mirror)
   */
  flipHorizontal(): void {
    if (this._destroyed) {
      throw new Error('Editor is destroyed');
    }
    
    this._canvas.flip('horizontal');
    this.saveState('flip', 'Flip horizontal');
    this._eventManager.emit('transform', { type: 'flip', direction: 'horizontal' });
    
    // Notify toolbar to update
    if (this._toolbar) {
      this._toolbar.saveOriginalImage();
    }
  }
  
  /**
   * Flip the image vertically
   */
  flipVertical(): void {
    if (this._destroyed) {
      throw new Error('Editor is destroyed');
    }
    
    this._canvas.flip('vertical');
    this.saveState('flip', 'Flip vertical');
    this._eventManager.emit('transform', { type: 'flip', direction: 'vertical' });
    
    // Notify toolbar to update
    if (this._toolbar) {
      this._toolbar.saveOriginalImage();
    }
  }
  
  /**
   * Crop the image to specified region
   * @param x - X coordinate of crop region
   * @param y - Y coordinate of crop region
   * @param width - Width of crop region
   * @param height - Height of crop region
   */
  crop(x: number, y: number, width: number, height: number): void {
    if (this._destroyed) {
      throw new Error('Editor is destroyed');
    }
    
    this._canvas.crop(x, y, width, height);
    this.saveState('crop', `Crop to ${width}x${height}`);
    this._eventManager.emit('transform', { type: 'crop', x, y, width, height });
    
    // Notify toolbar to update
    if (this._toolbar) {
      this._toolbar.saveOriginalImage();
    }
  }
  
  /**
   * Scale/resize the image to new dimensions
   * @param width - New width
   * @param height - New height
   * @param maintainAspectRatio - Whether to maintain aspect ratio (default: false)
   */
  resize(width: number, height: number, maintainAspectRatio: boolean = false): void {
    if (this._destroyed) {
      throw new Error('Editor is destroyed');
    }
    
    this._canvas.scale(width, height, maintainAspectRatio);
    this.saveState('resize', `Resize to ${this._canvas.width}x${this._canvas.height}`);
    this._eventManager.emit('transform', { 
      type: 'resize', 
      width: this._canvas.width, 
      height: this._canvas.height 
    });
    
    // Notify toolbar to update
    if (this._toolbar) {
      this._toolbar.saveOriginalImage();
    }
  }
  
  /**
   * Scale the image by a factor
   * @param factor - Scale factor (e.g., 0.5 for 50%, 2 for 200%)
   */
  scale(factor: number): void {
    if (this._destroyed) {
      throw new Error('Editor is destroyed');
    }
    
    if (factor <= 0) {
      throw new Error('Scale factor must be positive');
    }
    
    const newWidth = Math.round(this._canvas.width * factor);
    const newHeight = Math.round(this._canvas.height * factor);
    this.resize(newWidth, newHeight);
  }
  
  /**
   * Fit the image to specified dimensions while maintaining aspect ratio
   * @param maxWidth - Maximum width
   * @param maxHeight - Maximum height
   */
  fit(maxWidth: number, maxHeight: number): void {
    if (this._destroyed) {
      throw new Error('Editor is destroyed');
    }
    
    const currentRatio = this._canvas.width / this._canvas.height;
    const targetRatio = maxWidth / maxHeight;
    
    let newWidth: number;
    let newHeight: number;
    
    if (currentRatio > targetRatio) {
      // Width is limiting factor
      newWidth = maxWidth;
      newHeight = Math.round(maxWidth / currentRatio);
    } else {
      // Height is limiting factor
      newHeight = maxHeight;
      newWidth = Math.round(maxHeight * currentRatio);
    }
    
    this.resize(newWidth, newHeight);
  }

  /**
   * Destroy the editor and clean up all resources
   * Requirements: 1.5 - Clean up all event listeners and canvas resources
   */
  destroy(): void {
    if (this._destroyed) {
      return;
    }

    this._destroyed = true;

    // Emit destroy event before cleanup
    this._eventManager.emit('destroy', undefined as unknown as void);

    // Destroy toolbar first
    if (this._toolbar) {
      this._toolbar.destroy();
      this._toolbar = null;
    }

    // Destroy all managers
    this._pluginManager.destroy();
    this._historyManager.destroy();
    this._canvas.destroy();
    this._eventManager.destroy();
    this._configManager.destroy();

    this._ready = false;
  }
}
