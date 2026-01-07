/**
 * Default configuration constants
 * Requirements: 10.1 - Configuration system
 */

import type {
  EditorConfig,
  MosaicConfig,
  TextConfig,
  FilterConfig,
  ExportOptions,
} from '../types';

/**
 * Default editor configuration
 */
export const DEFAULT_EDITOR_CONFIG: Required<EditorConfig> = {
  width: 800,
  height: 600,
  backgroundColor: 'transparent',
  historyLimit: 50,
  responsive: true,
  deviceType: 'auto',
};

/**
 * Default mosaic plugin configuration
 */
export const DEFAULT_MOSAIC_CONFIG: MosaicConfig = {
  blockSize: 10,
  intensity: 100,
  mode: 'free',
  brushSize: 20,
};

/**
 * Default text plugin configuration
 */
export const DEFAULT_TEXT_CONFIG: TextConfig = {
  fontSize: 16,
  fontFamily: 'Arial',
  color: '#000000',
  bold: false,
  italic: false,
  underline: false,
  align: 'left',
  lineHeight: 1.2,
};

/**
 * Default filter plugin configuration
 */
export const DEFAULT_FILTER_CONFIG: FilterConfig = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  blur: 0,
  grayscale: 0,
  sepia: 0,
  invert: 0,
};

/**
 * Default export options
 */
export const DEFAULT_EXPORT_OPTIONS: Required<ExportOptions> = {
  format: 'png',
  quality: 0.92,
  width: 0, // 0 means use original size
  height: 0,
  type: 'base64',
  fileName: 'image',
  preserveTransparency: true,
  backgroundColor: '#ffffff',
  maxFileSize: 0, // 0 means no limit
  addTimestamp: false,
};
