/**
 * Plugin type definitions for the image editor
 * Requirements: 2.5 - Plugin interface definition
 */

import type { TextConfig, FilterConfig } from './config.types';

/**
 * Plugin context provided to plugins during installation
 * Requirements: 2.3, 2.4
 */
export interface PluginContext {
  /** Editor instance */
  editor: unknown;
  /** Canvas element */
  canvas: HTMLCanvasElement;
  /** Canvas 2D rendering context */
  ctx: CanvasRenderingContext2D;
  /** Save current state to history */
  saveState(): void;
  /** Get current image data */
  getImageData(): ImageData;
  /** Set image data */
  putImageData(data: ImageData): void;
}

/**
 * Base plugin interface
 * Requirements: 2.5
 */
export interface Plugin {
  /** Plugin name, unique identifier */
  readonly name: string;
  /** Toolbar icon */
  readonly icon?: string;
  /** Toolbar title */
  readonly title?: string;

  /** Called when plugin is installed */
  install(context: PluginContext): void;
  /** Called when plugin is activated */
  activate(): void;
  /** Called when plugin is deactivated */
  deactivate(): void;
  /** Called when plugin is destroyed */
  destroy(): void;

  /** Get default configuration */
  getDefaultConfig(): object;
  /** Set configuration */
  setConfig(config: object): void;
  /** Get current configuration */
  getConfig(): object;
}

/**
 * Plugin constructor type
 */
export type PluginConstructor = new () => Plugin;


/**
 * Text layer data structure
 * Requirements: 4.1, 4.4
 */
export interface TextLayer {
  /** Unique identifier */
  id: string;
  /** Text content */
  text: string;
  /** X position */
  x: number;
  /** Y position */
  y: number;
  /** Text configuration */
  config: TextConfig;
}

/**
 * Mosaic plugin interface
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5
 */
export interface MosaicPluginInterface extends Plugin {
  name: 'mosaic';
  setBlockSize(size: number): void;
  setIntensity(intensity: number): void;
  setMode(mode: 'rect' | 'free'): void;
  setBrushSize(size: number): void;
}

/**
 * Text plugin interface
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6
 */
export interface TextPluginInterface extends Plugin {
  name: 'text';
  addText(text: string, x: number, y: number): TextLayer;
  updateText(id: string, text: string): void;
  updatePosition(id: string, x: number, y: number): void;
  updateConfig(id: string, config: Partial<TextConfig>): void;
  removeText(id: string): void;
  getTextLayers(): TextLayer[];
}

/**
 * Filter plugin interface
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5
 */
export interface FilterPluginInterface extends Plugin {
  name: 'filter';
  setBrightness(value: number): void;
  setContrast(value: number): void;
  setSaturation(value: number): void;
  setBlur(value: number): void;
  setGrayscale(value: number): void;
  setSepia(value: number): void;
  setInvert(value: number): void;
  applyFilter(config: Partial<FilterConfig>): void;
  reset(): void;
  getPreview(): ImageData;
}
