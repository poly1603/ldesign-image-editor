/**
 * Feature: image-editor-plugin, Property 5: 文字图层管理
 * Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5
 *
 * 对于任意文字内容、位置和样式配置（字体大小、颜色、粗体、斜体等），
 * 创建文字图层后，文字应该在指定位置以指定样式渲染；
 * 更新位置后，文字应该移动到新位置。
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { TextLayerManager, DEFAULT_TEXT_CONFIG } from '../../src/plugins/text/TextLayer';
import { buildFontString, measureText } from '../../src/plugins/text/text.utils';
import type { TextConfig } from '../../src/types/config.types';

/**
 * Arbitrary for generating valid text content
 */
const textContentArb = fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0);

/**
 * Arbitrary for generating valid positions
 */
const positionArb = fc.record({
  x: fc.float({ min: 0, max: 1000, noNaN: true }),
  y: fc.float({ min: 0, max: 1000, noNaN: true }),
});

/**
 * Arbitrary for generating valid text configuration
 */
const textConfigArb = fc.record({
  fontSize: fc.integer({ min: 8, max: 72 }),
  fontFamily: fc.constantFrom('Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana'),
  color: fc.hexaString({ minLength: 6, maxLength: 6 }).map(s => `#${s}`),
  bold: fc.boolean(),
  italic: fc.boolean(),
  underline: fc.boolean(),
  align: fc.constantFrom('left', 'center', 'right') as fc.Arbitrary<'left' | 'center' | 'right'>,
  lineHeight: fc.float({ min: 1, max: 3, noNaN: true }),
});

describe('Text Layer Property Tests - Text Layer Management (Property 5)', () => {
  /**
   * Property 5: 文字图层管理
   * Requirements: 4.1 - 创建文字图层后，文字应该在指定位置
   */
  it('should create text layer at specified position with correct content', () => {
    fc.assert(
      fc.property(
        textContentArb,
        positionArb,
        (text, position) => {
          const manager = new TextLayerManager();
          
          const layer = manager.createLayer(text, position.x, position.y);
          
          // Layer should exist
          expect(manager.hasLayer(layer.id)).toBe(true);
          
          // Layer should have correct content and position
          expect(layer.text).toBe(text);
          expect(layer.x).toBe(position.x);
          expect(layer.y).toBe(position.y);
          
          // Layer should be retrievable
          const retrieved = manager.getLayer(layer.id);
          expect(retrieved).toBeDefined();
          expect(retrieved?.text).toBe(text);
          expect(retrieved?.x).toBe(position.x);
          expect(retrieved?.y).toBe(position.y);
        }
      ),
      { numRuns: 100 }
    );
  });


  /**
   * Property 5: 文字图层管理
   * Requirements: 4.2, 4.3, 4.5 - 文字应该以指定样式配置渲染
   */
  it('should create text layer with specified style configuration', () => {
    fc.assert(
      fc.property(
        textContentArb,
        positionArb,
        textConfigArb,
        (text, position, config) => {
          const manager = new TextLayerManager();
          
          const layer = manager.createLayer(text, position.x, position.y, config);
          
          // Layer should have correct configuration
          expect(layer.config.fontSize).toBe(config.fontSize);
          expect(layer.config.fontFamily).toBe(config.fontFamily);
          expect(layer.config.color).toBe(config.color);
          expect(layer.config.bold).toBe(config.bold);
          expect(layer.config.italic).toBe(config.italic);
          expect(layer.config.underline).toBe(config.underline);
          expect(layer.config.align).toBe(config.align);
          expect(layer.config.lineHeight).toBe(config.lineHeight);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5: 文字图层管理
   * Requirements: 4.4 - 更新位置后，文字应该移动到新位置
   */
  it('should update text layer position correctly', () => {
    fc.assert(
      fc.property(
        textContentArb,
        positionArb,
        positionArb,
        (text, initialPos, newPos) => {
          const manager = new TextLayerManager();
          
          const layer = manager.createLayer(text, initialPos.x, initialPos.y);
          
          // Update position
          manager.updatePosition(layer.id, newPos.x, newPos.y);
          
          // Position should be updated
          const updated = manager.getLayer(layer.id);
          expect(updated?.x).toBe(newPos.x);
          expect(updated?.y).toBe(newPos.y);
          
          // Text content should remain unchanged
          expect(updated?.text).toBe(text);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5: 文字图层管理
   * Requirements: 4.1 - 更新文字内容
   */
  it('should update text content correctly', () => {
    fc.assert(
      fc.property(
        textContentArb,
        textContentArb,
        positionArb,
        (initialText, newText, position) => {
          const manager = new TextLayerManager();
          
          const layer = manager.createLayer(initialText, position.x, position.y);
          
          // Update text
          manager.updateText(layer.id, newText);
          
          // Text should be updated
          const updated = manager.getLayer(layer.id);
          expect(updated?.text).toBe(newText);
          
          // Position should remain unchanged
          expect(updated?.x).toBe(position.x);
          expect(updated?.y).toBe(position.y);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5: 文字图层管理
   * Requirements: 4.2, 4.3, 4.5 - 更新样式配置
   */
  it('should update text configuration correctly', () => {
    fc.assert(
      fc.property(
        textContentArb,
        positionArb,
        textConfigArb,
        textConfigArb,
        (text, position, initialConfig, newConfig) => {
          const manager = new TextLayerManager();
          
          const layer = manager.createLayer(text, position.x, position.y, initialConfig);
          
          // Update configuration
          manager.updateConfig(layer.id, newConfig);
          
          // Configuration should be updated
          const updated = manager.getLayer(layer.id);
          expect(updated?.config.fontSize).toBe(newConfig.fontSize);
          expect(updated?.config.fontFamily).toBe(newConfig.fontFamily);
          expect(updated?.config.color).toBe(newConfig.color);
          expect(updated?.config.bold).toBe(newConfig.bold);
          expect(updated?.config.italic).toBe(newConfig.italic);
          
          // Text and position should remain unchanged
          expect(updated?.text).toBe(text);
          expect(updated?.x).toBe(position.x);
          expect(updated?.y).toBe(position.y);
        }
      ),
      { numRuns: 100 }
    );
  });


  /**
   * Property: Layer count should increase when adding layers
   */
  it('should increase layer count when adding layers', () => {
    fc.assert(
      fc.property(
        fc.array(fc.tuple(textContentArb, positionArb), { minLength: 1, maxLength: 10 }),
        (layerData) => {
          const manager = new TextLayerManager();
          
          expect(manager.getLayerCount()).toBe(0);
          
          for (let i = 0; i < layerData.length; i++) {
            const [text, pos] = layerData[i];
            manager.createLayer(text, pos.x, pos.y);
            expect(manager.getLayerCount()).toBe(i + 1);
          }
          
          expect(manager.getAllLayers().length).toBe(layerData.length);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Removing a layer should decrease count
   */
  it('should decrease layer count when removing layers', () => {
    fc.assert(
      fc.property(
        fc.array(fc.tuple(textContentArb, positionArb), { minLength: 2, maxLength: 10 }),
        (layerData) => {
          const manager = new TextLayerManager();
          
          const layers = layerData.map(([text, pos]) => 
            manager.createLayer(text, pos.x, pos.y)
          );
          
          const initialCount = manager.getLayerCount();
          
          // Remove first layer
          manager.removeLayer(layers[0].id);
          
          expect(manager.getLayerCount()).toBe(initialCount - 1);
          expect(manager.hasLayer(layers[0].id)).toBe(false);
          
          // Other layers should still exist
          for (let i = 1; i < layers.length; i++) {
            expect(manager.hasLayer(layers[i].id)).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Each layer should have a unique ID
   */
  it('should generate unique IDs for each layer', () => {
    fc.assert(
      fc.property(
        fc.array(fc.tuple(textContentArb, positionArb), { minLength: 2, maxLength: 20 }),
        (layerData) => {
          const manager = new TextLayerManager();
          
          const layers = layerData.map(([text, pos]) => 
            manager.createLayer(text, pos.x, pos.y)
          );
          
          const ids = new Set(layers.map(l => l.id));
          
          // All IDs should be unique
          expect(ids.size).toBe(layers.length);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Selection should work correctly
   */
  it('should handle layer selection correctly', () => {
    fc.assert(
      fc.property(
        fc.array(fc.tuple(textContentArb, positionArb), { minLength: 2, maxLength: 5 }),
        fc.integer({ min: 0, max: 4 }),
        (layerData, selectIndex) => {
          const manager = new TextLayerManager();
          
          const layers = layerData.map(([text, pos]) => 
            manager.createLayer(text, pos.x, pos.y)
          );
          
          // Initially no selection
          expect(manager.getSelectedLayerId()).toBeNull();
          
          // Select a layer
          const indexToSelect = selectIndex % layers.length;
          manager.selectLayer(layers[indexToSelect].id);
          
          expect(manager.getSelectedLayerId()).toBe(layers[indexToSelect].id);
          expect(manager.getSelectedLayer()?.id).toBe(layers[indexToSelect].id);
          
          // Deselect
          manager.selectLayer(null);
          expect(manager.getSelectedLayerId()).toBeNull();
          expect(manager.getSelectedLayer()).toBeUndefined();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Clear all should remove all layers
   */
  it('should remove all layers when clearAll is called', () => {
    fc.assert(
      fc.property(
        fc.array(fc.tuple(textContentArb, positionArb), { minLength: 1, maxLength: 10 }),
        (layerData) => {
          const manager = new TextLayerManager();
          
          const layers = layerData.map(([text, pos]) => 
            manager.createLayer(text, pos.x, pos.y)
          );
          
          // Select a layer
          manager.selectLayer(layers[0].id);
          
          // Clear all
          manager.clearAll();
          
          expect(manager.getLayerCount()).toBe(0);
          expect(manager.getAllLayers().length).toBe(0);
          expect(manager.getSelectedLayerId()).toBeNull();
          
          // All layers should be gone
          for (const layer of layers) {
            expect(manager.hasLayer(layer.id)).toBe(false);
          }
        }
      ),
      { numRuns: 100 }
    );
  });


  /**
   * Property: Default config should be applied when no config provided
   */
  it('should apply default configuration when none provided', () => {
    fc.assert(
      fc.property(
        textContentArb,
        positionArb,
        (text, position) => {
          const manager = new TextLayerManager();
          
          const layer = manager.createLayer(text, position.x, position.y);
          
          // Should have default config values
          expect(layer.config.fontSize).toBe(DEFAULT_TEXT_CONFIG.fontSize);
          expect(layer.config.fontFamily).toBe(DEFAULT_TEXT_CONFIG.fontFamily);
          expect(layer.config.color).toBe(DEFAULT_TEXT_CONFIG.color);
          expect(layer.config.bold).toBe(DEFAULT_TEXT_CONFIG.bold);
          expect(layer.config.italic).toBe(DEFAULT_TEXT_CONFIG.italic);
          expect(layer.config.underline).toBe(DEFAULT_TEXT_CONFIG.underline);
          expect(layer.config.align).toBe(DEFAULT_TEXT_CONFIG.align);
          expect(layer.config.lineHeight).toBe(DEFAULT_TEXT_CONFIG.lineHeight);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Partial config update should only change specified properties
   */
  it('should only update specified properties in partial config update', () => {
    fc.assert(
      fc.property(
        textContentArb,
        positionArb,
        textConfigArb,
        fc.integer({ min: 8, max: 72 }),
        (text, position, initialConfig, newFontSize) => {
          const manager = new TextLayerManager();
          
          const layer = manager.createLayer(text, position.x, position.y, initialConfig);
          
          // Update only fontSize
          manager.updateConfig(layer.id, { fontSize: newFontSize });
          
          const updated = manager.getLayer(layer.id);
          
          // fontSize should be updated
          expect(updated?.config.fontSize).toBe(newFontSize);
          
          // Other properties should remain unchanged
          expect(updated?.config.fontFamily).toBe(initialConfig.fontFamily);
          expect(updated?.config.color).toBe(initialConfig.color);
          expect(updated?.config.bold).toBe(initialConfig.bold);
          expect(updated?.config.italic).toBe(initialConfig.italic);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Font string should be built correctly from config
   */
  it('should build correct font string from configuration', () => {
    fc.assert(
      fc.property(
        textConfigArb,
        (config) => {
          const fontString = buildFontString(config);
          
          // Should contain font size
          expect(fontString).toContain(`${config.fontSize}px`);
          
          // Should contain font family
          expect(fontString).toContain(config.fontFamily);
          
          // Should contain italic if set
          if (config.italic) {
            expect(fontString).toContain('italic');
          }
          
          // Should contain bold if set
          if (config.bold) {
            expect(fontString).toContain('bold');
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Removing selected layer should clear selection
   */
  it('should clear selection when selected layer is removed', () => {
    fc.assert(
      fc.property(
        fc.array(fc.tuple(textContentArb, positionArb), { minLength: 2, maxLength: 5 }),
        (layerData) => {
          const manager = new TextLayerManager();
          
          const layers = layerData.map(([text, pos]) => 
            manager.createLayer(text, pos.x, pos.y)
          );
          
          // Select first layer
          manager.selectLayer(layers[0].id);
          expect(manager.getSelectedLayerId()).toBe(layers[0].id);
          
          // Remove selected layer
          manager.removeLayer(layers[0].id);
          
          // Selection should be cleared
          expect(manager.getSelectedLayerId()).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Operations on non-existent layer should return undefined
   */
  it('should return undefined for operations on non-existent layers', () => {
    fc.assert(
      fc.property(
        textContentArb,
        positionArb,
        fc.string({ minLength: 10, maxLength: 20 }),
        (text, position, fakeId) => {
          const manager = new TextLayerManager();
          
          // Create a layer
          manager.createLayer(text, position.x, position.y);
          
          // Operations on non-existent ID should return undefined
          expect(manager.getLayer(fakeId)).toBeUndefined();
          expect(manager.updateText(fakeId, 'new text')).toBeUndefined();
          expect(manager.updatePosition(fakeId, 100, 100)).toBeUndefined();
          expect(manager.updateConfig(fakeId, { fontSize: 20 })).toBeUndefined();
          
          // Remove should return false
          expect(manager.removeLayer(fakeId)).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });
});
