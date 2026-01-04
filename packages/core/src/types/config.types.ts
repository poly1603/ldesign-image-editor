/**
 * Configuration type definitions for the image editor
 * Requirements: 10.1 - Configuration system
 */

/**
 * Export format options
 */
export type ExportFormat = 'png' | 'jpeg' | 'webp';

/**
 * Export data type options
 */
export type ExportDataType = 'base64' | 'blob' | 'file';

/**
 * Device type options
 */
export type DeviceType = 'auto' | 'pc' | 'mobile';

/**
 * Export options for saving edited images
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5
 */
export interface ExportOptions {
  /** Export format: png, jpeg, or webp */
  format?: ExportFormat;
  /** Quality 0-1, only for jpeg/webp */
  quality?: number;
  /** Export width */
  width?: number;
  /** Export height */
  height?: number;
  /** Data type: base64, blob, or file */
  type?: ExportDataType;
  /** File name, only for file type */
  fileName?: string;
}

/**
 * Mosaic plugin configuration
 * Requirements: 3.1, 3.2, 3.4, 3.5
 */
export interface MosaicConfig {
  /** Mosaic block size, default 10 */
  blockSize: number;
  /** Intensity 0-100, default 100 */
  intensity: number;
  /** Drawing mode: rect or free */
  mode: 'rect' | 'free';
  /** Brush size for free mode */
  brushSize: number;
}

/**
 * Text plugin configuration
 * Requirements: 4.1, 4.2, 4.3, 4.5, 4.6
 */
export interface TextConfig {
  /** Font size, default 16 */
  fontSize: number;
  /** Font family, default 'Arial' */
  fontFamily: string;
  /** Color, default '#000000' */
  color: string;
  /** Bold */
  bold: boolean;
  /** Italic */
  italic: boolean;
  /** Underline */
  underline: boolean;
  /** Text alignment */
  align: 'left' | 'center' | 'right';
  /** Line height multiplier */
  lineHeight: number;
}


/**
 * Filter plugin configuration
 * Requirements: 5.1, 5.2, 5.3, 5.4
 */
export interface FilterConfig {
  /** Brightness -100 to 100, default 0 */
  brightness: number;
  /** Contrast -100 to 100, default 0 */
  contrast: number;
  /** Saturation -100 to 100, default 0 */
  saturation: number;
  /** Blur 0 to 100, default 0 */
  blur: number;
  /** Grayscale 0 to 100, default 0 */
  grayscale: number;
  /** Sepia 0 to 100, default 0 */
  sepia: number;
  /** Invert 0 to 100, default 0 */
  invert: number;
}

/**
 * Default configuration for the editor
 * Requirements: 10.1
 */
export interface EditorConfig {
  /** Canvas width */
  width?: number;
  /** Canvas height */
  height?: number;
  /** Background color */
  backgroundColor?: string;
  /** History record limit */
  historyLimit?: number;
  /** Whether responsive */
  responsive?: boolean;
  /** Device type */
  deviceType?: DeviceType;
}

/**
 * Deep partial type utility
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
