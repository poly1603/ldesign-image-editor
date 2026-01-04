/**
 * Feature: image-editor-plugin, Property 12: 配置合并正确性
 * Validates: Requirements 10.1
 * 
 * 对于任意用户配置对象，编辑器应该正确合并默认配置和用户配置，
 * 用户配置应该覆盖默认值，未指定的配置应该使用默认值。
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { ConfigManager } from '../../src/managers/ConfigManager';
import { DEFAULT_EDITOR_CONFIG } from '../../src/constants/defaults';
import type { EditorConfig, DeviceType } from '../../src/types/config.types';

/**
 * Arbitrary generator for DeviceType
 */
const deviceTypeArb = fc.constantFrom<DeviceType>('auto', 'pc', 'mobile');

/**
 * Arbitrary generator for partial EditorConfig
 */
const partialEditorConfigArb = fc.record(
  {
    width: fc.option(fc.integer({ min: 1, max: 10000 }), { nil: undefined }),
    height: fc.option(fc.integer({ min: 1, max: 10000 }), { nil: undefined }),
    backgroundColor: fc.option(
      fc.stringMatching(/^[0-9a-f]{6}$/).map((s) => `#${s}`),
      { nil: undefined }
    ),
    historyLimit: fc.option(fc.integer({ min: 1, max: 1000 }), { nil: undefined }),
    responsive: fc.option(fc.boolean(), { nil: undefined }),
    deviceType: fc.option(deviceTypeArb, { nil: undefined }),
  },
  { requiredKeys: [] }
);

describe('ConfigManager Property Tests', () => {
  /**
   * Property 12: 配置合并正确性
   * 用户配置应该覆盖默认值
   */
  it('should override default values with user config values', () => {
    fc.assert(
      fc.property(partialEditorConfigArb, (userConfig) => {
        const manager = new ConfigManager(userConfig);
        const result = manager.getConfig();

        // Check each property
        for (const key of Object.keys(DEFAULT_EDITOR_CONFIG) as (keyof EditorConfig)[]) {
          const userValue = userConfig[key];
          const defaultValue = DEFAULT_EDITOR_CONFIG[key];
          const resultValue = result[key];

          if (userValue !== undefined) {
            // User value should override default
            expect(resultValue).toBe(userValue);
          } else {
            // Default value should be used
            expect(resultValue).toBe(defaultValue);
          }
        }
      }),
      { numRuns: 100 }
    );
  });


  /**
   * Property: 未指定的配置应该使用默认值
   */
  it('should use default values for unspecified config properties', () => {
    fc.assert(
      fc.property(partialEditorConfigArb, (userConfig) => {
        const manager = new ConfigManager(userConfig);
        const result = manager.getConfig();

        // All default keys should exist in result
        for (const key of Object.keys(DEFAULT_EDITOR_CONFIG) as (keyof EditorConfig)[]) {
          expect(result).toHaveProperty(key);
          expect(result[key]).toBeDefined();
        }
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: 空配置应该返回完整的默认配置
   */
  it('should return complete default config when no user config provided', () => {
    const manager = new ConfigManager();
    const result = manager.getConfig();

    expect(result).toEqual(DEFAULT_EDITOR_CONFIG);
  });

  /**
   * Property: 运行时更新应该正确合并
   */
  it('should correctly merge runtime updates', () => {
    fc.assert(
      fc.property(
        partialEditorConfigArb,
        partialEditorConfigArb,
        (initialConfig, updateConfig) => {
          const manager = new ConfigManager(initialConfig);
          manager.update(updateConfig);
          const result = manager.getConfig();

          // Check each property after update
          for (const key of Object.keys(DEFAULT_EDITOR_CONFIG) as (keyof EditorConfig)[]) {
            const updateValue = updateConfig[key];
            const initialValue = initialConfig[key];
            const defaultValue = DEFAULT_EDITOR_CONFIG[key];
            const resultValue = result[key];

            if (updateValue !== undefined) {
              // Update value should be used
              expect(resultValue).toBe(updateValue);
            } else if (initialValue !== undefined) {
              // Initial value should be preserved
              expect(resultValue).toBe(initialValue);
            } else {
              // Default value should be used
              expect(resultValue).toBe(defaultValue);
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: getConfig 应该返回配置的副本，不影响内部状态
   */
  it('should return a copy of config that does not affect internal state', () => {
    fc.assert(
      fc.property(partialEditorConfigArb, (userConfig) => {
        const manager = new ConfigManager(userConfig);
        const result1 = manager.getConfig();
        
        // Modify the returned config
        result1.width = 99999;
        result1.height = 99999;
        
        const result2 = manager.getConfig();
        
        // Internal state should not be affected
        expect(result2.width).not.toBe(99999);
        expect(result2.height).not.toBe(99999);
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: reset 应该恢复到默认配置
   */
  it('should reset to default config', () => {
    fc.assert(
      fc.property(partialEditorConfigArb, (userConfig) => {
        const manager = new ConfigManager(userConfig);
        manager.reset();
        const result = manager.getConfig();

        expect(result).toEqual(DEFAULT_EDITOR_CONFIG);
      }),
      { numRuns: 100 }
    );
  });
});
