/**
 * Filter Plugin - Apply various image filters
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5
 */

import { BasePlugin } from '../base/BasePlugin';
import type { FilterConfig } from '../../types/config.types';
import type { FilterPluginInterface } from '../../types/plugin.types';
import {
  applyBrightness,
  applyContrast,
  applySaturation,
  applyBlur,
  applyGrayscale,
  applySepia,
  applyInvert,
} from './filters';

/**
 * Default filter configuration
 */
const DEFAULT_FILTER_CONFIG: FilterConfig = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  blur: 0,
  grayscale: 0,
  sepia: 0,
  invert: 0,
};

/**
 * FilterPlugin - Provides image filter functionality
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5
 */
export class FilterPlugin extends BasePlugin<FilterConfig> implements FilterPluginInterface {
  readonly name = 'filter' as const;
  readonly icon = '🎨';
  readonly title = 'Filter';

  /** Original image data before any filters applied */
  private originalImageData: ImageData | null = null;

  /**
   * Get default filter configuration
   */
  getDefaultConfig(): FilterConfig {
    return { ...DEFAULT_FILTER_CONFIG };
  }

  /**
   * Hook called when plugin is installed
   */
  protected onInstall(): void {
    // Store original image data when installed
    this.storeOriginalImageData();
  }

  /**
   * Hook called when plugin is activated
   */
  protected onActivate(): void {
    // Ensure we have original image data
    if (!this.originalImageData) {
      this.storeOriginalImageData();
    }
  }

  /**
   * Store the original image data for reset functionality
   */
  private storeOriginalImageData(): void {
    const imageData = this.getImageData();
    if (imageData) {
      this.originalImageData = createImageDataCopy(imageData);
    }
  }

  /**
   * Update original image data (call after external changes)
   */
  updateOriginalImageData(): void {
    this.storeOriginalImageData();
  }

  /**
   * Set brightness value
   * Requirements: 5.2 - Real-time preview
   * @param value - Brightness value from -100 to 100
   */
  setBrightness(value: number): void {
    this.setConfig({ brightness: clampValue(value, -100, 100) });
    this.applyAllFilters();
  }

  /**
   * Set contrast value
   * Requirements: 5.2 - Real-time preview
   * @param value - Contrast value from -100 to 100
   */
  setContrast(value: number): void {
    this.setConfig({ contrast: clampValue(value, -100, 100) });
    this.applyAllFilters();
  }

  /**
   * Set saturation value
   * Requirements: 5.2 - Real-time preview
   * @param value - Saturation value from -100 to 100
   */
  setSaturation(value: number): void {
    this.setConfig({ saturation: clampValue(value, -100, 100) });
    this.applyAllFilters();
  }

  /**
   * Set blur value
   * Requirements: 5.2 - Real-time preview
   * @param value - Blur value from 0 to 100
   */
  setBlur(value: number): void {
    this.setConfig({ blur: clampValue(value, 0, 100) });
    this.applyAllFilters();
  }

  /**
   * Set grayscale value
   * Requirements: 5.2 - Real-time preview
   * @param value - Grayscale value from 0 to 100
   */
  setGrayscale(value: number): void {
    this.setConfig({ grayscale: clampValue(value, 0, 100) });
    this.applyAllFilters();
  }

  /**
   * Set sepia value
   * Requirements: 5.2 - Real-time preview
   * @param value - Sepia value from 0 to 100
   */
  setSepia(value: number): void {
    this.setConfig({ sepia: clampValue(value, 0, 100) });
    this.applyAllFilters();
  }

  /**
   * Set invert value
   * Requirements: 5.2 - Real-time preview
   * @param value - Invert value from 0 to 100
   */
  setInvert(value: number): void {
    this.setConfig({ invert: clampValue(value, 0, 100) });
    this.applyAllFilters();
  }

  /**
   * Apply filter configuration
   * Requirements: 5.1 - Apply filter to entire image
   * @param config - Partial filter configuration to apply
   */
  applyFilter(config: Partial<FilterConfig>): void {
    // Clamp all values
    const clampedConfig: Partial<FilterConfig> = {};
    if (config.brightness !== undefined) {
      clampedConfig.brightness = clampValue(config.brightness, -100, 100);
    }
    if (config.contrast !== undefined) {
      clampedConfig.contrast = clampValue(config.contrast, -100, 100);
    }
    if (config.saturation !== undefined) {
      clampedConfig.saturation = clampValue(config.saturation, -100, 100);
    }
    if (config.blur !== undefined) {
      clampedConfig.blur = clampValue(config.blur, 0, 100);
    }
    if (config.grayscale !== undefined) {
      clampedConfig.grayscale = clampValue(config.grayscale, 0, 100);
    }
    if (config.sepia !== undefined) {
      clampedConfig.sepia = clampValue(config.sepia, 0, 100);
    }
    if (config.invert !== undefined) {
      clampedConfig.invert = clampValue(config.invert, 0, 100);
    }

    this.setConfig(clampedConfig);
    this.applyAllFilters();
  }

  /**
   * Reset all filters to default values
   * Requirements: 5.5 - Reset to original state
   */
  reset(): void {
    // Reset config to defaults
    this.config = this.getDefaultConfig();
    
    // Restore original image data
    if (this.originalImageData) {
      const restoredData = createImageDataCopy(this.originalImageData);
      this.putImageData(restoredData);
    }
  }

  /**
   * Get preview of current filter settings
   * Requirements: 5.2 - Real-time preview
   * @returns ImageData with filters applied
   */
  getPreview(): ImageData {
    if (!this.originalImageData) {
      const currentData = this.getImageData();
      if (!currentData) {
        throw new Error('No image data available');
      }
      return currentData;
    }

    // Create a copy of original data
    const previewData = createImageDataCopy(this.originalImageData);

    // Apply all filters to the copy
    this.applyFiltersToImageData(previewData);

    return previewData;
  }

  /**
   * Apply all filters in sequence
   * Requirements: 5.4 - Multiple filters stacked in order
   */
  private applyAllFilters(): void {
    if (!this.originalImageData) {
      return;
    }

    // Start with a fresh copy of original data
    const imageData = createImageDataCopy(this.originalImageData);

    // Apply all filters
    this.applyFiltersToImageData(imageData);

    // Put the result back to canvas
    this.putImageData(imageData);
  }

  /**
   * Apply all configured filters to image data
   * Requirements: 5.4 - Filters applied in order
   * @param imageData - ImageData to modify in place
   */
  private applyFiltersToImageData(imageData: ImageData): void {
    const config = this.config;

    // Apply filters in a consistent order
    // Order: brightness -> contrast -> saturation -> grayscale -> sepia -> invert -> blur
    // (blur is last because it's computationally expensive and works better on final colors)
    
    if (config.brightness !== 0) {
      applyBrightness(imageData, config.brightness);
    }
    
    if (config.contrast !== 0) {
      applyContrast(imageData, config.contrast);
    }
    
    if (config.saturation !== 0) {
      applySaturation(imageData, config.saturation);
    }
    
    if (config.grayscale !== 0) {
      applyGrayscale(imageData, config.grayscale);
    }
    
    if (config.sepia !== 0) {
      applySepia(imageData, config.sepia);
    }
    
    if (config.invert !== 0) {
      applyInvert(imageData, config.invert);
    }
    
    if (config.blur !== 0) {
      applyBlur(imageData, config.blur);
    }
  }

  /**
   * Commit current filter state to history
   * Call this when user confirms filter changes
   */
  commit(): void {
    this.saveState();
    // Update original image data to current state
    this.storeOriginalImageData();
    // Reset config since changes are now committed
    this.config = this.getDefaultConfig();
  }

  /**
   * Check if any filter is currently applied
   * @returns True if any filter value is non-zero
   */
  hasActiveFilters(): boolean {
    const config = this.config;
    return (
      config.brightness !== 0 ||
      config.contrast !== 0 ||
      config.saturation !== 0 ||
      config.blur !== 0 ||
      config.grayscale !== 0 ||
      config.sepia !== 0 ||
      config.invert !== 0
    );
  }

  /**
   * Hook called when plugin is destroyed
   */
  protected onDestroy(): void {
    this.originalImageData = null;
  }
}

/**
 * Clamp a value to a range
 */
function clampValue(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Create a copy of ImageData
 * Works in both browser and test environments
 */
function createImageDataCopy(imageData: ImageData): ImageData {
  const data = new Uint8ClampedArray(imageData.data);
  // Try to use ImageData constructor if available (browser)
  if (typeof ImageData !== 'undefined') {
    try {
      return new ImageData(data, imageData.width, imageData.height);
    } catch {
      // Fall through to mock implementation
    }
  }
  // Fallback for test environments
  return {
    data,
    width: imageData.width,
    height: imageData.height,
    colorSpace: 'srgb',
  } as ImageData;
}
