/**
 * Feature: image-editor-plugin, Property 3: 插件注册与激活
 * Validates: Requirements 2.1, 2.3, 2.4
 * 
 * 对于任意有效的插件，注册后应该出现在工具列表中；
 * 激活时 activate 方法应该被调用且接收正确的上下文；
 * 停用时 deactivate 方法应该被调用。
 */

import { describe, it, expect, vi } from 'vitest';
import * as fc from 'fast-check';
import { PluginManager } from '../../src/managers/PluginManager';
import type { Plugin, PluginContext, PluginConstructor } from '../../src/types/plugin.types';

/**
 * Create a mock plugin class for testing
 */
function createMockPluginClass(name: string): {
  PluginClass: PluginConstructor;
  installSpy: ReturnType<typeof vi.fn>;
  activateSpy: ReturnType<typeof vi.fn>;
  deactivateSpy: ReturnType<typeof vi.fn>;
  destroySpy: ReturnType<typeof vi.fn>;
} {
  const installSpy = vi.fn();
  const activateSpy = vi.fn();
  const deactivateSpy = vi.fn();
  const destroySpy = vi.fn();

  class MockPlugin implements Plugin {
    readonly name = name;
    readonly icon = 'test-icon';
    readonly title = 'Test Plugin';
    private config = {};

    install(context: PluginContext): void {
      installSpy(context);
    }
    activate(): void {
      activateSpy();
    }
    deactivate(): void {
      deactivateSpy();
    }
    destroy(): void {
      destroySpy();
    }
    getDefaultConfig(): object {
      return {};
    }
    setConfig(config: object): void {
      this.config = config;
    }
    getConfig(): object {
      return this.config;
    }
  }

  return {
    PluginClass: MockPlugin as PluginConstructor,
    installSpy,
    activateSpy,
    deactivateSpy,
    destroySpy,
  };
}


/**
 * Create a mock plugin context for testing (without canvas context)
 */
function createMockContext(): PluginContext {
  return {
    editor: {},
    canvas: {} as HTMLCanvasElement,
    ctx: {} as CanvasRenderingContext2D,
    saveState: vi.fn(),
    getImageData: vi.fn(() => ({} as ImageData)),
    putImageData: vi.fn(),
  };
}

/**
 * Arbitrary generator for plugin names
 */
const pluginNameArb = fc.stringMatching(/^[a-z][a-z0-9-]{0,19}$/);

describe('PluginManager Property Tests', () => {
  /**
   * Property 3: 插件注册与激活
   * 注册后应该出现在工具列表中
   */
  it('should add plugin to available tools list after registration', () => {
    fc.assert(
      fc.property(pluginNameArb, (name) => {
        const manager = new PluginManager();
        const context = createMockContext();
        manager.setContext(context);
        
        const { PluginClass } = createMockPluginClass(name);
        
        manager.register(PluginClass);
        
        // Plugin should be in the list
        expect(manager.has(name)).toBe(true);
        expect(manager.getNames()).toContain(name);
        expect(manager.get(name)).toBeDefined();
        
        manager.destroy();
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3: 插件注册与激活
   * 激活时 activate 方法应该被调用
   */
  it('should call activate method when plugin is activated', () => {
    fc.assert(
      fc.property(pluginNameArb, (name) => {
        const manager = new PluginManager();
        const context = createMockContext();
        manager.setContext(context);
        
        const { PluginClass, activateSpy } = createMockPluginClass(name);
        
        manager.register(PluginClass);
        manager.activate(name);
        
        // activate should be called
        expect(activateSpy).toHaveBeenCalledTimes(1);
        expect(manager.isActive(name)).toBe(true);
        expect(manager.getActiveName()).toBe(name);
        
        manager.destroy();
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3: 插件注册与激活
   * 停用时 deactivate 方法应该被调用
   */
  it('should call deactivate method when plugin is deactivated', () => {
    fc.assert(
      fc.property(pluginNameArb, (name) => {
        const manager = new PluginManager();
        const context = createMockContext();
        manager.setContext(context);
        
        const { PluginClass, deactivateSpy } = createMockPluginClass(name);
        
        manager.register(PluginClass);
        manager.activate(name);
        manager.deactivate(name);
        
        // deactivate should be called
        expect(deactivateSpy).toHaveBeenCalledTimes(1);
        expect(manager.isActive(name)).toBe(false);
        expect(manager.getActiveName()).toBeNull();
        
        manager.destroy();
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: install should be called with correct context during registration
   */
  it('should call install with correct context during registration', () => {
    fc.assert(
      fc.property(pluginNameArb, (name) => {
        const manager = new PluginManager();
        const context = createMockContext();
        manager.setContext(context);
        
        const { PluginClass, installSpy } = createMockPluginClass(name);
        
        manager.register(PluginClass);
        
        // install should be called with context
        expect(installSpy).toHaveBeenCalledTimes(1);
        expect(installSpy).toHaveBeenCalledWith(context);
        
        manager.destroy();
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Activating a new plugin should deactivate the previous one
   */
  it('should deactivate previous plugin when activating a new one', () => {
    fc.assert(
      fc.property(pluginNameArb, (baseName) => {
        const manager = new PluginManager();
        const context = createMockContext();
        manager.setContext(context);
        
        // Create two plugins with different names
        const name1 = `${baseName}-1`;
        const name2 = `${baseName}-2`;
        
        const mock1 = createMockPluginClass(name1);
        const mock2 = createMockPluginClass(name2);
        
        manager.register(mock1.PluginClass);
        manager.register(mock2.PluginClass);
        
        manager.activate(name1);
        manager.activate(name2);
        
        // First plugin should be deactivated
        expect(mock1.deactivateSpy).toHaveBeenCalledTimes(1);
        // Second plugin should be active
        expect(manager.isActive(name2)).toBe(true);
        expect(manager.isActive(name1)).toBe(false);
        
        manager.destroy();
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: destroy should call destroy on all plugins
   */
  it('should call destroy on all plugins when manager is destroyed', () => {
    fc.assert(
      fc.property(
        fc.array(pluginNameArb, { minLength: 1, maxLength: 5 }),
        (names) => {
          const manager = new PluginManager();
          const context = createMockContext();
          manager.setContext(context);
          
          // Ensure unique names by adding index
          const mocks = names.map((name, index) => ({
            name: `${name}-${index}`,
            ...createMockPluginClass(`${name}-${index}`),
          }));
          
          // Register all plugins
          for (const mock of mocks) {
            manager.register(mock.PluginClass);
          }
          
          // Destroy manager
          manager.destroy();
          
          // All plugins should be destroyed
          for (const mock of mocks) {
            expect(mock.destroySpy).toHaveBeenCalledTimes(1);
          }
          
          // Manager should be empty
          expect(manager.getNames()).toHaveLength(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Registering same plugin twice should not duplicate
   */
  it('should not duplicate plugin when registered twice', () => {
    fc.assert(
      fc.property(pluginNameArb, (name) => {
        const manager = new PluginManager();
        const context = createMockContext();
        manager.setContext(context);
        
        const mock1 = createMockPluginClass(name);
        const mock2 = createMockPluginClass(name);
        
        manager.register(mock1.PluginClass);
        manager.register(mock2.PluginClass);
        
        // Should only have one plugin
        expect(manager.getNames().filter((n) => n === name)).toHaveLength(1);
        // Second install should not be called
        expect(mock2.installSpy).not.toHaveBeenCalled();
        
        manager.destroy();
      }),
      { numRuns: 100 }
    );
  });
});
