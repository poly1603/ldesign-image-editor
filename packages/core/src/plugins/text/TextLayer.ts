/**
 * TextLayer - Manages individual text elements on the canvas
 * Requirements: 4.1, 4.2, 4.3, 4.5, 4.6
 */

import type { TextConfig } from '../../types/config.types';
import type { TextLayer as TextLayerData } from '../../types/plugin.types';

/**
 * Default text configuration
 * Requirements: 4.2, 4.3, 4.5, 4.6
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
 * Generate unique ID for text layers
 */
function generateId(): string {
  return `text_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * TextLayerManager - Manages text layer instances
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6
 */
export class TextLayerManager {
  /** Map of text layers by ID */
  private layers: Map<string, TextLayerData> = new Map();
  /** Currently selected layer ID */
  private selectedLayerId: string | null = null;

  /**
   * Create a new text layer
   * Requirements: 4.1
   * @param text - Text content
   * @param x - X position
   * @param y - Y position
   * @param config - Optional text configuration
   * @returns Created text layer
   */
  createLayer(
    text: string,
    x: number,
    y: number,
    config?: Partial<TextConfig>
  ): TextLayerData {
    const layer: TextLayerData = {
      id: generateId(),
      text,
      x,
      y,
      config: { ...DEFAULT_TEXT_CONFIG, ...config },
    };
    this.layers.set(layer.id, layer);
    return layer;
  }


  /**
   * Get a text layer by ID
   * @param id - Layer ID
   * @returns Text layer or undefined
   */
  getLayer(id: string): TextLayerData | undefined {
    return this.layers.get(id);
  }

  /**
   * Get all text layers
   * @returns Array of all text layers
   */
  getAllLayers(): TextLayerData[] {
    return Array.from(this.layers.values());
  }

  /**
   * Update text content
   * Requirements: 4.1
   * @param id - Layer ID
   * @param text - New text content
   * @returns Updated layer or undefined
   */
  updateText(id: string, text: string): TextLayerData | undefined {
    const layer = this.layers.get(id);
    if (layer) {
      layer.text = text;
    }
    return layer;
  }

  /**
   * Update layer position
   * Requirements: 4.4
   * @param id - Layer ID
   * @param x - New X position
   * @param y - New Y position
   * @returns Updated layer or undefined
   */
  updatePosition(id: string, x: number, y: number): TextLayerData | undefined {
    const layer = this.layers.get(id);
    if (layer) {
      layer.x = x;
      layer.y = y;
    }
    return layer;
  }

  /**
   * Update layer configuration
   * Requirements: 4.2, 4.3, 4.5, 4.6
   * @param id - Layer ID
   * @param config - Partial configuration to merge
   * @returns Updated layer or undefined
   */
  updateConfig(id: string, config: Partial<TextConfig>): TextLayerData | undefined {
    const layer = this.layers.get(id);
    if (layer) {
      layer.config = { ...layer.config, ...config };
    }
    return layer;
  }

  /**
   * Remove a text layer
   * @param id - Layer ID
   * @returns True if layer was removed
   */
  removeLayer(id: string): boolean {
    if (this.selectedLayerId === id) {
      this.selectedLayerId = null;
    }
    return this.layers.delete(id);
  }

  /**
   * Clear all text layers
   */
  clearAll(): void {
    this.layers.clear();
    this.selectedLayerId = null;
  }

  /**
   * Select a text layer
   * @param id - Layer ID or null to deselect
   */
  selectLayer(id: string | null): void {
    this.selectedLayerId = id;
  }

  /**
   * Get selected layer ID
   * @returns Selected layer ID or null
   */
  getSelectedLayerId(): string | null {
    return this.selectedLayerId;
  }

  /**
   * Get selected layer
   * @returns Selected layer or undefined
   */
  getSelectedLayer(): TextLayerData | undefined {
    if (this.selectedLayerId) {
      return this.layers.get(this.selectedLayerId);
    }
    return undefined;
  }

  /**
   * Check if a layer exists
   * @param id - Layer ID
   * @returns True if layer exists
   */
  hasLayer(id: string): boolean {
    return this.layers.has(id);
  }

  /**
   * Get layer count
   * @returns Number of layers
   */
  getLayerCount(): number {
    return this.layers.size;
  }
}
