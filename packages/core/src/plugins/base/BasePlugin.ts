/**
 * Base Plugin - Abstract base class for all plugins
 * Requirements: 2.5 - Plugin interface definition with unified lifecycle methods
 */

import type { Plugin, PluginContext } from '../../types/plugin.types';

/**
 * Abstract base class for plugins
 * Provides common functionality and enforces plugin interface
 * Requirements: 2.5
 */
export abstract class BasePlugin<TConfig extends object = object> implements Plugin {
  /** Plugin name - must be unique */
  abstract readonly name: string;
  /** Toolbar icon (optional) */
  readonly icon?: string;
  /** Toolbar title (optional) */
  readonly title?: string;

  /** Plugin context provided during installation */
  protected context: PluginContext | null = null;
  /** Current plugin configuration */
  protected config: TConfig;
  /** Whether the plugin is currently active */
  protected isActive: boolean = false;

  constructor() {
    this.config = this.getDefaultConfig();
  }

  /**
   * Get default configuration for the plugin
   * Subclasses should override this to provide their default config
   */
  abstract getDefaultConfig(): TConfig;

  /**
   * Install the plugin with the provided context
   * Requirements: 2.5 - install lifecycle method
   * @param context - Plugin context from editor
   */
  install(context: PluginContext): void {
    this.context = context;
    this.onInstall();
  }

  /**
   * Activate the plugin
   * Requirements: 2.5 - activate lifecycle method
   */
  activate(): void {
    if (!this.context) {
      throw new Error(`Plugin "${this.name}" is not installed. Call install() first.`);
    }
    this.isActive = true;
    this.onActivate();
  }

  /**
   * Deactivate the plugin
   * Requirements: 2.5 - deactivate lifecycle method
   */
  deactivate(): void {
    this.isActive = false;
    this.onDeactivate();
  }

  /**
   * Destroy the plugin and clean up resources
   * Requirements: 2.5 - destroy lifecycle method
   */
  destroy(): void {
    this.deactivate();
    this.onDestroy();
    this.context = null;
  }

  /**
   * Set plugin configuration
   * @param config - Partial configuration to merge
   */
  setConfig(config: Partial<TConfig>): void {
    this.config = { ...this.config, ...config };
    this.onConfigChange(this.config);
  }

  /**
   * Get current plugin configuration
   * @returns Current configuration
   */
  getConfig(): TConfig {
    return { ...this.config };
  }

  /**
   * Check if the plugin is currently active
   * @returns True if active
   */
  getIsActive(): boolean {
    return this.isActive;
  }

  /**
   * Get the canvas element
   * @returns Canvas element or null if not installed
   */
  protected getCanvas(): HTMLCanvasElement | null {
    return this.context?.canvas ?? null;
  }

  /**
   * Get the canvas 2D context
   * @returns Canvas context or null if not installed
   */
  protected getContext(): CanvasRenderingContext2D | null {
    return this.context?.ctx ?? null;
  }

  /**
   * Save current state to history
   */
  protected saveState(): void {
    this.context?.saveState();
  }

  /**
   * Get current image data from canvas
   * @returns ImageData or null if not available
   */
  protected getImageData(): ImageData | null {
    return this.context?.getImageData() ?? null;
  }

  /**
   * Put image data to canvas
   * @param data - ImageData to put
   */
  protected putImageData(data: ImageData): void {
    this.context?.putImageData(data);
  }

  /**
   * Hook called after plugin is installed
   * Subclasses can override to perform initialization
   */
  protected onInstall(): void {
    // Override in subclass if needed
  }

  /**
   * Hook called when plugin is activated
   * Subclasses can override to set up event listeners, etc.
   */
  protected onActivate(): void {
    // Override in subclass if needed
  }

  /**
   * Hook called when plugin is deactivated
   * Subclasses can override to clean up event listeners, etc.
   */
  protected onDeactivate(): void {
    // Override in subclass if needed
  }

  /**
   * Hook called when plugin is destroyed
   * Subclasses can override to perform final cleanup
   */
  protected onDestroy(): void {
    // Override in subclass if needed
  }

  /**
   * Hook called when configuration changes
   * Subclasses can override to react to config changes
   * @param _config - New configuration
   */
  protected onConfigChange(_config: TConfig): void {
    // Override in subclass if needed
  }
}
