/**
 * Feature: image-editor-plugin, Property 8: 撤销/重做往返
 * Validates: Requirements 6.1, 6.2, 6.3
 * 
 * 对于任意编辑操作序列，执行操作后撤销应该恢复到操作前的状态；
 * 撤销后重做应该恢复到撤销前的状态（往返属性）。
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { HistoryManager } from '../../src/managers/HistoryManager';

/**
 * Mock ImageData interface for testing (jsdom doesn't have full ImageData support)
 */
interface MockImageData {
  data: Uint8ClampedArray;
  width: number;
  height: number;
}

/**
 * Create a mock ImageData for testing
 */
function createMockImageData(width: number, height: number, fillValue: number): MockImageData {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let i = 0; i < data.length; i++) {
    data[i] = fillValue;
  }
  return { data, width, height };
}

/**
 * Compare two ImageData objects
 */
function imageDataEquals(a: MockImageData, b: MockImageData): boolean {
  if (a.width !== b.width || a.height !== b.height) {
    return false;
  }
  for (let i = 0; i < a.data.length; i++) {
    if (a.data[i] !== b.data[i]) {
      return false;
    }
  }
  return true;
}

/**
 * Arbitrary generator for history state (without id and timestamp)
 */
const historyStateArb = fc.record({
  imageData: fc.integer({ min: 1, max: 100 }).chain((size) =>
    fc.integer({ min: 0, max: 255 }).map((fillValue) =>
      createMockImageData(size, size, fillValue) as unknown as ImageData
    )
  ),
  toolName: fc.constantFrom('mosaic', 'text', 'filter', 'crop', 'draw'),
  description: fc.option(fc.string({ minLength: 1, maxLength: 50 }), { nil: undefined }),
});

describe('HistoryManager Property Tests', () => {
  /**
   * Property 8: 撤销/重做往返
   * 执行操作后撤销应该恢复到操作前的状态
   */
  it('should restore to previous state after undo', () => {
    fc.assert(
      fc.property(
        fc.array(historyStateArb, { minLength: 2, maxLength: 10 }),
        (states) => {
          const manager = new HistoryManager(100);
          
          // Push all states
          for (const state of states) {
            manager.push(state);
          }
          
          // Get the state before last operation
          const lastIndex = manager.currentIndex;
          const stateBeforeLast = manager.states[lastIndex - 1];
          
          // Undo
          const undoneState = manager.undo();
          
          // Should return the previous state
          expect(undoneState).not.toBeNull();
          expect(undoneState!.id).toBe(stateBeforeLast.id);
          expect(imageDataEquals(
            undoneState!.imageData as unknown as MockImageData, 
            stateBeforeLast.imageData as unknown as MockImageData
          )).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });


  /**
   * Property 8: 撤销/重做往返
   * 撤销后重做应该恢复到撤销前的状态
   */
  it('should restore to state before undo after redo (round-trip)', () => {
    fc.assert(
      fc.property(
        fc.array(historyStateArb, { minLength: 2, maxLength: 10 }),
        (states) => {
          const manager = new HistoryManager(100);
          
          // Push all states
          for (const state of states) {
            manager.push(state);
          }
          
          // Get the current state before undo
          const stateBeforeUndo = manager.getCurrentState();
          
          // Undo then redo
          manager.undo();
          const redoneState = manager.redo();
          
          // Should return to the same state
          expect(redoneState).not.toBeNull();
          expect(redoneState!.id).toBe(stateBeforeUndo!.id);
          expect(imageDataEquals(
            redoneState!.imageData as unknown as MockImageData, 
            stateBeforeUndo!.imageData as unknown as MockImageData
          )).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Multiple undo/redo round-trips should be consistent
   */
  it('should maintain consistency through multiple undo/redo cycles', () => {
    fc.assert(
      fc.property(
        fc.array(historyStateArb, { minLength: 3, maxLength: 10 }),
        fc.integer({ min: 1, max: 5 }),
        (states, cycles) => {
          const manager = new HistoryManager(100);
          
          // Push all states
          for (const state of states) {
            manager.push(state);
          }
          
          // Get initial state
          const initialState = manager.getCurrentState();
          
          // Perform multiple undo/redo cycles
          for (let i = 0; i < cycles; i++) {
            if (manager.canUndo()) {
              manager.undo();
            }
            if (manager.canRedo()) {
              manager.redo();
            }
          }
          
          // Should return to initial state
          const finalState = manager.getCurrentState();
          expect(finalState!.id).toBe(initialState!.id);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Undo should not be possible when at the beginning
   */
  it('should not allow undo when at the beginning of history', () => {
    fc.assert(
      fc.property(historyStateArb, (state) => {
        const manager = new HistoryManager(100);
        
        // Push single state
        manager.push(state);
        
        // Should not be able to undo (only one state)
        expect(manager.canUndo()).toBe(false);
        expect(manager.undo()).toBeNull();
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Redo should not be possible when at the end
   */
  it('should not allow redo when at the end of history', () => {
    fc.assert(
      fc.property(
        fc.array(historyStateArb, { minLength: 1, maxLength: 10 }),
        (states) => {
          const manager = new HistoryManager(100);
          
          // Push all states
          for (const state of states) {
            manager.push(state);
          }
          
          // Should not be able to redo (at the end)
          expect(manager.canRedo()).toBe(false);
          expect(manager.redo()).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: New operation after undo should discard redo history
   */
  it('should discard redo history when new operation is performed after undo', () => {
    fc.assert(
      fc.property(
        fc.array(historyStateArb, { minLength: 3, maxLength: 10 }),
        historyStateArb,
        (states, newState) => {
          const manager = new HistoryManager(100);
          
          // Push all states
          for (const state of states) {
            manager.push(state);
          }
          
          // Undo once
          manager.undo();
          
          // Push new state
          manager.push(newState);
          
          // Should not be able to redo anymore
          expect(manager.canRedo()).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });
});


/**
 * Feature: image-editor-plugin, Property 9: 历史记录上限
 * Validates: Requirements 6.5
 * 
 * 对于任意配置的历史记录上限 N，当执行超过 N 次操作时，
 * 历史栈大小应该保持为 N，且最早的记录应该被移除。
 */
describe('HistoryManager Limit Property Tests', () => {
  /**
   * Property 9: 历史记录上限
   * 历史栈大小应该保持为配置的上限
   */
  it('should maintain history size at or below the configured limit', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 20 }), // limit
        fc.integer({ min: 1, max: 50 }), // number of operations
        (limit, numOperations) => {
          const manager = new HistoryManager(limit);
          
          // Push multiple states
          for (let i = 0; i < numOperations; i++) {
            manager.push({
              imageData: createMockImageData(10, 10, i % 256) as unknown as ImageData,
              toolName: 'test',
              description: `Operation ${i}`,
            });
          }
          
          // History size should never exceed limit
          expect(manager.getLength()).toBeLessThanOrEqual(limit);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 9: 历史记录上限
   * 当超过上限时，最早的记录应该被移除
   */
  it('should remove oldest records when limit is exceeded', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2, max: 10 }), // limit
        (limit) => {
          const manager = new HistoryManager(limit);
          const numOperations = limit + 5; // Exceed limit by 5
          
          // Push states with unique identifiers
          for (let i = 0; i < numOperations; i++) {
            manager.push({
              imageData: createMockImageData(10, 10, i) as unknown as ImageData,
              toolName: 'test',
              description: `Operation ${i}`,
            });
          }
          
          // History size should be exactly at limit
          expect(manager.getLength()).toBe(limit);
          
          // The oldest states (0 to numOperations - limit - 1) should be removed
          // The remaining states should be from (numOperations - limit) to (numOperations - 1)
          const expectedFirstDescription = `Operation ${numOperations - limit}`;
          expect(manager.states[0].description).toBe(expectedFirstDescription);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Current index should remain valid after limit enforcement
   */
  it('should maintain valid current index after limit enforcement', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 20 }), // limit
        fc.integer({ min: 1, max: 50 }), // number of operations
        (limit, numOperations) => {
          const manager = new HistoryManager(limit);
          
          // Push multiple states
          for (let i = 0; i < numOperations; i++) {
            manager.push({
              imageData: createMockImageData(10, 10, i % 256) as unknown as ImageData,
              toolName: 'test',
            });
          }
          
          // Current index should be valid
          expect(manager.currentIndex).toBeGreaterThanOrEqual(0);
          expect(manager.currentIndex).toBeLessThan(manager.getLength());
          
          // Current index should point to the last state
          expect(manager.currentIndex).toBe(manager.getLength() - 1);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Limit of 1 should only keep the most recent state
   */
  it('should only keep most recent state when limit is 1', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2, max: 20 }), // number of operations
        (numOperations) => {
          const manager = new HistoryManager(1);
          
          // Push multiple states
          for (let i = 0; i < numOperations; i++) {
            manager.push({
              imageData: createMockImageData(10, 10, i) as unknown as ImageData,
              toolName: 'test',
              description: `Operation ${i}`,
            });
          }
          
          // Should only have 1 state
          expect(manager.getLength()).toBe(1);
          
          // Should be the last operation
          expect(manager.states[0].description).toBe(`Operation ${numOperations - 1}`);
          
          // Should not be able to undo
          expect(manager.canUndo()).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });
});
