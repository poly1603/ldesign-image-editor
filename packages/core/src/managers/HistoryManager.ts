/**
 * History Manager - Handles undo/redo functionality
 * Requirements: 6.1, 6.2, 6.3, 6.5
 */

import type { HistoryState, HistoryManagerInterface } from '../types/editor.types';

/**
 * Generate a unique ID for history states
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * HistoryManager class - Manages undo/redo history
 * Requirements: 6.1, 6.2, 6.3, 6.5
 */
export class HistoryManager implements HistoryManagerInterface {
  /** History states stack */
  states: HistoryState[] = [];
  /** Current position in history */
  currentIndex: number = -1;
  /** Maximum number of history states */
  limit: number;
  /** Listeners for history changes */
  private listeners: Set<(canUndo: boolean, canRedo: boolean) => void> = new Set();

  /**
   * Create a new HistoryManager instance
   * @param limit - Maximum number of history states (default: 50)
   */
  constructor(limit: number = 50) {
    this.limit = Math.max(1, limit);
  }

  /**
   * Push a new state to history
   * Requirements: 6.1 - Record operations to history stack
   * @param state - State to push (without id and timestamp)
   */
  push(state: Omit<HistoryState, 'id' | 'timestamp'>): void {
    // Remove any states after current index (discard redo history)
    if (this.currentIndex < this.states.length - 1) {
      this.states = this.states.slice(0, this.currentIndex + 1);
    }

    // Create new state with id and timestamp
    const newState: HistoryState = {
      ...state,
      id: generateId(),
      timestamp: Date.now(),
    };

    // Add new state
    this.states.push(newState);
    this.currentIndex = this.states.length - 1;

    // Enforce limit - remove oldest states if exceeded
    // Requirements: 6.5 - History record limit control
    while (this.states.length > this.limit) {
      this.states.shift();
      this.currentIndex--;
    }

    this.notifyListeners();
  }


  /**
   * Undo to previous state
   * Requirements: 6.2 - Restore to previous state
   * @returns Previous state or null if cannot undo
   */
  undo(): HistoryState | null {
    if (!this.canUndo()) {
      return null;
    }

    this.currentIndex--;
    this.notifyListeners();
    return this.states[this.currentIndex];
  }

  /**
   * Redo to next state
   * Requirements: 6.3 - Restore to next state
   * @returns Next state or null if cannot redo
   */
  redo(): HistoryState | null {
    if (!this.canRedo()) {
      return null;
    }

    this.currentIndex++;
    this.notifyListeners();
    return this.states[this.currentIndex];
  }

  /**
   * Check if undo is available
   * Requirements: 6.4 - No operation when history stack is empty
   * @returns True if can undo
   */
  canUndo(): boolean {
    return this.currentIndex > 0;
  }

  /**
   * Check if redo is available
   * @returns True if can redo
   */
  canRedo(): boolean {
    return this.currentIndex < this.states.length - 1;
  }

  /**
   * Get current state
   * @returns Current state or null if no states
   */
  getCurrentState(): HistoryState | null {
    if (this.currentIndex < 0 || this.currentIndex >= this.states.length) {
      return null;
    }
    return this.states[this.currentIndex];
  }

  /**
   * Get the number of states in history
   * @returns Number of states
   */
  getLength(): number {
    return this.states.length;
  }

  /**
   * Clear all history
   */
  clear(): void {
    this.states = [];
    this.currentIndex = -1;
    this.notifyListeners();
  }

  /**
   * Subscribe to history changes
   * @param listener - Callback function
   * @returns Unsubscribe function
   */
  onChange(listener: (canUndo: boolean, canRedo: boolean) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify all listeners of history changes
   */
  private notifyListeners(): void {
    const canUndo = this.canUndo();
    const canRedo = this.canRedo();
    for (const listener of this.listeners) {
      try {
        listener(canUndo, canRedo);
      } catch (error) {
        console.error('Error in history change listener:', error);
      }
    }
  }
  
  /**
   * Get history information
   * @returns Object containing history stats
   */
  getHistoryInfo(): {
    totalStates: number;
    currentIndex: number;
    undoCount: number;
    redoCount: number;
    limit: number;
    memoryEstimate: number;
  } {
    // Estimate memory usage (rough calculation based on ImageData size)
    let memoryEstimate = 0;
    for (const state of this.states) {
      memoryEstimate += state.imageData.data.length;
    }
    
    return {
      totalStates: this.states.length,
      currentIndex: this.currentIndex,
      undoCount: this.currentIndex,
      redoCount: this.states.length - 1 - this.currentIndex,
      limit: this.limit,
      memoryEstimate,
    };
  }

  /**
   * Get state at specific index
   * @param index - Index of state to get
   * @returns State at index or null if invalid
   */
  getStateAt(index: number): HistoryState | null {
    if (index < 0 || index >= this.states.length) {
      return null;
    }
    return this.states[index];
  }

  /**
   * Go to specific state by index
   * @param index - Target state index
   * @returns State at index or null if invalid
   */
  goToState(index: number): HistoryState | null {
    if (index < 0 || index >= this.states.length) {
      return null;
    }
    
    this.currentIndex = index;
    this.notifyListeners();
    return this.states[this.currentIndex];
  }

  /**
   * Get all states (useful for debugging/display)
   * @returns Array of history states
   */
  getAllStates(): HistoryState[] {
    return [...this.states];
  }

  /**
   * Check if a specific state is the current state
   * @param id - State ID to check
   * @returns True if state is current
   */
  isCurrentState(id: string): boolean {
    const current = this.getCurrentState();
    return current?.id === id;
  }
  
  /**
   * Start a batch operation (groups multiple operations as one undo step)
   * @returns Batch ID
   */
  private batchId: string | null = null;
  private batchStartIndex: number = -1;
  
  startBatch(): string {
    if (this.batchId) {
      throw new Error('Batch operation already in progress');
    }
    this.batchId = generateId();
    this.batchStartIndex = this.currentIndex;
    return this.batchId;
  }
  
  /**
   * End a batch operation (combines all operations since startBatch into one)
   * @param batchId - Batch ID from startBatch
   * @param description - Description for the combined operation
   */
  endBatch(batchId: string, description?: string): void {
    if (this.batchId !== batchId) {
      throw new Error('Invalid batch ID');
    }
    
    // If there were operations during the batch, combine them
    if (this.currentIndex > this.batchStartIndex) {
      // Get the state before batch started
      const startIndex = Math.max(0, this.batchStartIndex);
      
      // Remove intermediate states
      if (this.currentIndex > startIndex + 1) {
        const intermediateCount = this.currentIndex - startIndex - 1;
        this.states.splice(startIndex + 1, intermediateCount);
        this.currentIndex = startIndex + 1;
      }
      
      // Update the final state description
      if (description && this.states[this.currentIndex]) {
        this.states[this.currentIndex].description = description;
      }
    }
    
    this.batchId = null;
    this.batchStartIndex = -1;
    this.notifyListeners();
  }
  
  /**
   * Cancel a batch operation (discards all operations since startBatch)
   * @param batchId - Batch ID from startBatch
   */
  cancelBatch(batchId: string): void {
    if (this.batchId !== batchId) {
      throw new Error('Invalid batch ID');
    }
    
    // Restore to state before batch started
    if (this.currentIndex > this.batchStartIndex && this.batchStartIndex >= 0) {
      this.states = this.states.slice(0, this.batchStartIndex + 1);
      this.currentIndex = this.batchStartIndex;
    }
    
    this.batchId = null;
    this.batchStartIndex = -1;
    this.notifyListeners();
  }
  
  /**
   * Check if a batch operation is in progress
   * @returns True if batch is active
   */
  isBatchActive(): boolean {
    return this.batchId !== null;
  }
  
  /**
   * Set the history limit
   * @param limit - New limit (minimum 1)
   */
  setLimit(limit: number): void {
    this.limit = Math.max(1, limit);
    
    // Trim history if exceeds new limit
    while (this.states.length > this.limit) {
      this.states.shift();
      this.currentIndex = Math.max(0, this.currentIndex - 1);
    }
    
    this.notifyListeners();
  }

  /**
   * Destroy the history manager and clean up resources
   */
  destroy(): void {
    this.batchId = null;
    this.batchStartIndex = -1;
    this.clear();
    this.listeners.clear();
  }
}
