/**
 * Feature: image-editor-plugin, Property 1: 编辑器初始化正确性
 * Validates: Requirements 1.1, 1.2, 1.3
 * 
 * 对于任意有效的容器元素和图片源，初始化编辑器后，Canvas 应该被创建在容器内，
 * 且图片应该被正确加载，ready 事件应该被触发并包含正确的尺寸信息。
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fc from 'fast-check';
import { Editor } from '../../src/core/Editor';
import type { EditorOptions } from '../../src/types/editor.types';

/**
 * Mock CanvasRenderingContext2D
 */
function createMockContext2D(): CanvasRenderingContext2D {
  const imageDataStore: Map<string, ImageData> = new Map();
  
  return {
    canvas: document.createElement('canvas'),
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
    font: '10px sans-serif',
    textAlign: 'start',
    textBaseline: 'alphabetic',
    globalAlpha: 1,
    globalCompositeOperation: 'source-over',
    fillRect: vi.fn(),
    clearRect: vi.fn(),
    strokeRect: vi.fn(),
    beginPath: vi.fn(),
    closePath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    drawImage: vi.fn(),
    getImageData: vi.fn((x: number, y: number, w: number, h: number) => {
      return new ImageData(w, h);
    }),
    putImageData: vi.fn(),
    createImageData: vi.fn((w: number, h: number) => new ImageData(w, h)),
    save: vi.fn(),
    restore: vi.fn(),
    scale: vi.fn(),
    rotate: vi.fn(),
    translate: vi.fn(),
    transform: vi.fn(),
    setTransform: vi.fn(),
    resetTransform: vi.fn(),
    clip: vi.fn(),
    measureText: vi.fn(() => ({ width: 0 })),
    fillText: vi.fn(),
    strokeText: vi.fn(),
    createLinearGradient: vi.fn(),
    createRadialGradient: vi.fn(),
    createPattern: vi.fn(),
    rect: vi.fn(),
    quadraticCurveTo: vi.fn(),
    bezierCurveTo: vi.fn(),
    arcTo: vi.fn(),
    isPointInPath: vi.fn(() => false),
    isPointInStroke: vi.fn(() => false),
    getLineDash: vi.fn(() => []),
    setLineDash: vi.fn(),
    lineDashOffset: 0,
    shadowBlur: 0,
    shadowColor: 'rgba(0, 0, 0, 0)',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    lineCap: 'butt',
    lineJoin: 'miter',
    miterLimit: 10,
    getContextAttributes: vi.fn(() => ({})),
    imageSmoothingEnabled: true,
    imageSmoothingQuality: 'low',
    direction: 'ltr',
    fontKerning: 'auto',
    fontStretch: 'normal',
    fontVariantCaps: 'normal',
    letterSpacing: '0px',
    textRendering: 'auto',
    wordSpacing: '0px',
    drawFocusIfNeeded: vi.fn(),
    scrollPathIntoView: vi.fn(),
    createConicGradient: vi.fn(),
    filter: 'none',
    roundRect: vi.fn(),
    reset: vi.fn(),
  } as unknown as CanvasRenderingContext2D;
}

/**
 * Setup canvas mock
 */
function setupCanvasMock(): void {
  const originalGetContext = HTMLCanvasElement.prototype.getContext;
  
  HTMLCanvasElement.prototype.getContext = function(
    contextId: string,
    options?: any
  ): RenderingContext | null {
    if (contextId === '2d') {
      const ctx = createMockContext2D();
      (ctx as any).canvas = this;
      return ctx;
    }
    return originalGetContext.call(this, contextId, options);
  } as typeof HTMLCanvasElement.prototype.getContext;

  HTMLCanvasElement.prototype.toDataURL = function() {
    return 'data:image/png;base64,mock';
  };

  HTMLCanvasElement.prototype.toBlob = function(callback: BlobCallback) {
    callback(new Blob(['mock'], { type: 'image/png' }));
  };
}

/**
 * Create a mock container element
 */
function createContainer(width: number = 800, height: number = 600): HTMLDivElement {
  const container = document.createElement('div');
  container.style.width = `${width}px`;
  container.style.height = `${height}px`;
  Object.defineProperty(container, 'getBoundingClientRect', {
    value: () => ({
      width,
      height,
      top: 0,
      left: 0,
      right: width,
      bottom: height,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }),
  });
  document.body.appendChild(container);
  return container;
}

/**
 * Arbitrary generators
 */
const dimensionArb = fc.integer({ min: 50, max: 500 });
const colorArb = fc.stringMatching(/^#[0-9a-f]{6}$/).map((s) => s.toLowerCase());
const historyLimitArb = fc.integer({ min: 1, max: 100 });

describe('Editor Property Tests - Initialization (Property 1)', () => {
  let container: HTMLDivElement;
  let editor: Editor | null = null;

  beforeEach(() => {
    setupCanvasMock();
    container = createContainer();
  });

  afterEach(() => {
    if (editor && !editor.isDestroyed) {
      editor.destroy();
    }
    editor = null;
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });

  /**
   * Property 1.1: Canvas should be created inside container
   */
  it('should create canvas inside container for any valid config', () => {
    fc.assert(
      fc.property(
        dimensionArb,
        dimensionArb,
        colorArb,
        (width, height, backgroundColor) => {
          // Clean up previous editor
          if (editor && !editor.isDestroyed) {
            editor.destroy();
          }

          const options: EditorOptions = {
            container,
            width,
            height,
            backgroundColor,
          };

          editor = new Editor(options);

          // Canvas should be created in container
          const canvas = container.querySelector('canvas');
          expect(canvas).not.toBeNull();
          expect(canvas).toBe(editor.canvas);
        }
      ),
      { numRuns: 20 }
    );
  });

  /**
   * Property 1.2: Canvas dimensions should match config
   */
  it('should set canvas dimensions according to config', () => {
    fc.assert(
      fc.property(dimensionArb, dimensionArb, (width, height) => {
        if (editor && !editor.isDestroyed) {
          editor.destroy();
        }

        const options: EditorOptions = {
          container,
          width,
          height,
        };

        editor = new Editor(options);

        expect(editor.width).toBe(width);
        expect(editor.height).toBe(height);
      }),
      { numRuns: 20 }
    );
  });

  /**
   * Property 1.3: History limit should be applied correctly
   */
  it('should apply history limit from config', () => {
    fc.assert(
      fc.property(historyLimitArb, (historyLimit) => {
        if (editor && !editor.isDestroyed) {
          editor.destroy();
        }

        const options: EditorOptions = {
          container,
          historyLimit,
        };

        editor = new Editor(options);
        const config = editor.getConfig();

        expect(config.historyLimit).toBe(historyLimit);
      }),
      { numRuns: 20 }
    );
  });

  /**
   * Property 1.4: Editor should not be ready before image load
   */
  it('should not be ready before image load', () => {
    fc.assert(
      fc.property(dimensionArb, dimensionArb, (width, height) => {
        if (editor && !editor.isDestroyed) {
          editor.destroy();
        }

        editor = new Editor({
          container,
          width,
          height,
        });

        expect(editor.isReady).toBe(false);
      }),
      { numRuns: 20 }
    );
  });

  /**
   * Property 1.5: Context should be available after initialization
   */
  it('should have valid 2D context after initialization', () => {
    fc.assert(
      fc.property(dimensionArb, dimensionArb, (width, height) => {
        if (editor && !editor.isDestroyed) {
          editor.destroy();
        }

        editor = new Editor({
          container,
          width,
          height,
        });

        expect(editor.ctx).toBeDefined();
      }),
      { numRuns: 20 }
    );
  });

  /**
   * Property 1.6: Current tool should be null initially
   */
  it('should have null current tool initially', () => {
    fc.assert(
      fc.property(dimensionArb, dimensionArb, (width, height) => {
        if (editor && !editor.isDestroyed) {
          editor.destroy();
        }

        editor = new Editor({
          container,
          width,
          height,
        });

        expect(editor.currentTool).toBeNull();
      }),
      { numRuns: 20 }
    );
  });
});


/**
 * Feature: image-editor-plugin, Property 2: 编辑器销毁清理
 * Validates: Requirements 1.5
 * 
 * 对于任意已初始化的编辑器实例，调用 destroy 方法后，所有事件监听器应该被移除，
 * Canvas 元素应该被清理，内存应该被释放。
 */
describe('Editor Property Tests - Destroy Cleanup (Property 2)', () => {
  let container: HTMLDivElement;
  let editor: Editor | null = null;

  beforeEach(() => {
    setupCanvasMock();
    container = createContainer();
  });

  afterEach(() => {
    if (editor && !editor.isDestroyed) {
      editor.destroy();
    }
    editor = null;
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });

  /**
   * Property 2.1: Canvas should be removed from container after destroy
   */
  it('should remove canvas from container after destroy', () => {
    fc.assert(
      fc.property(dimensionArb, dimensionArb, (width, height) => {
        if (editor && !editor.isDestroyed) {
          editor.destroy();
        }

        editor = new Editor({
          container,
          width,
          height,
        });

        // Canvas should exist before destroy
        expect(container.querySelector('canvas')).not.toBeNull();

        editor.destroy();

        // Canvas should be removed after destroy
        expect(container.querySelector('canvas')).toBeNull();
      }),
      { numRuns: 20 }
    );
  });

  /**
   * Property 2.2: Editor should be marked as destroyed after destroy
   */
  it('should be marked as destroyed after destroy', () => {
    fc.assert(
      fc.property(dimensionArb, dimensionArb, (width, height) => {
        if (editor && !editor.isDestroyed) {
          editor.destroy();
        }

        editor = new Editor({
          container,
          width,
          height,
        });

        expect(editor.isDestroyed).toBe(false);

        editor.destroy();

        expect(editor.isDestroyed).toBe(true);
      }),
      { numRuns: 20 }
    );
  });

  /**
   * Property 2.3: Destroy should be idempotent (calling multiple times should not throw)
   */
  it('should be idempotent - multiple destroy calls should not throw', () => {
    fc.assert(
      fc.property(dimensionArb, dimensionArb, (width, height) => {
        if (editor && !editor.isDestroyed) {
          editor.destroy();
        }

        editor = new Editor({
          container,
          width,
          height,
        });

        // Multiple destroy calls should not throw
        expect(() => {
          editor!.destroy();
          editor!.destroy();
          editor!.destroy();
        }).not.toThrow();

        expect(editor.isDestroyed).toBe(true);
      }),
      { numRuns: 20 }
    );
  });

  /**
   * Property 2.4: Operations should throw after destroy
   */
  it('should throw when operations are called after destroy', () => {
    fc.assert(
      fc.property(dimensionArb, dimensionArb, (width, height) => {
        if (editor && !editor.isDestroyed) {
          editor.destroy();
        }

        editor = new Editor({
          container,
          width,
          height,
        });

        editor.destroy();

        // Operations should throw after destroy
        expect(() => editor!.undo()).toThrow('Editor is destroyed');
        expect(() => editor!.redo()).toThrow('Editor is destroyed');
        expect(() => editor!.setTool('test')).toThrow('Editor is destroyed');
        expect(() => editor!.reset()).toThrow('Editor is destroyed');
        expect(() => editor!.clear()).toThrow('Editor is destroyed');
      }),
      { numRuns: 20 }
    );
  });

  /**
   * Property 2.5: Destroy event should be emitted before cleanup
   */
  it('should emit destroy event before cleanup', () => {
    fc.assert(
      fc.property(dimensionArb, dimensionArb, (width, height) => {
        if (editor && !editor.isDestroyed) {
          editor.destroy();
        }

        editor = new Editor({
          container,
          width,
          height,
        });

        let destroyEventEmitted = false;
        editor.on('destroy', () => {
          destroyEventEmitted = true;
        });

        editor.destroy();

        expect(destroyEventEmitted).toBe(true);
      }),
      { numRuns: 20 }
    );
  });

  /**
   * Property 2.6: Event listeners should be cleared after destroy
   */
  it('should clear event listeners after destroy', () => {
    fc.assert(
      fc.property(dimensionArb, dimensionArb, (width, height) => {
        if (editor && !editor.isDestroyed) {
          editor.destroy();
        }

        editor = new Editor({
          container,
          width,
          height,
        });

        const eventManager = editor.getEventManager();
        
        // Add some listeners
        const handler = vi.fn();
        editor.on('ready', handler);
        editor.on('error', handler);

        expect(eventManager.hasListeners('ready')).toBe(true);
        expect(eventManager.hasListeners('error')).toBe(true);

        editor.destroy();

        // Listeners should be cleared
        expect(eventManager.hasListeners('ready')).toBe(false);
        expect(eventManager.hasListeners('error')).toBe(false);
      }),
      { numRuns: 20 }
    );
  });
});
