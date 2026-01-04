/**
 * Unit tests for DOM utility functions
 * Requirements: 8.5
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  getElement,
  createCanvas,
  getElementRect,
  getRelativeCoordinates,
  setCanvasSize,
  setStyles,
  removeElement,
} from '../../src/utils/dom.utils';

describe('DOM Utils', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    container.id = 'test-container';
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('getElement', () => {
    it('should return element when given HTMLElement', () => {
      const result = getElement(container);
      expect(result).toBe(container);
    });

    it('should return element when given valid selector', () => {
      const result = getElement('#test-container');
      expect(result).toBe(container);
    });

    it('should return null when given invalid selector', () => {
      const result = getElement('#non-existent');
      expect(result).toBeNull();
    });
  });

  describe('createCanvas', () => {
    it('should create canvas with specified dimensions', () => {
      const canvas = createCanvas(800, 600);
      expect(canvas).toBeInstanceOf(HTMLCanvasElement);
      expect(canvas.width).toBe(800);
      expect(canvas.height).toBe(600);
    });
  });

  describe('getElementRect', () => {
    it('should return bounding rect of element', () => {
      const rect = getElementRect(container);
      expect(typeof rect.width).toBe('number');
      expect(typeof rect.height).toBe('number');
      expect(typeof rect.top).toBe('number');
      expect(typeof rect.left).toBe('number');
    });
  });

  describe('getRelativeCoordinates', () => {
    it('should calculate coordinates relative to element', () => {
      // Mock element position
      Object.defineProperty(container, 'getBoundingClientRect', {
        value: () => ({ left: 100, top: 50, width: 200, height: 150 }),
      });

      const mockEvent = { clientX: 150, clientY: 100 } as MouseEvent;
      const coords = getRelativeCoordinates(mockEvent, container);

      expect(coords.x).toBe(50);
      expect(coords.y).toBe(50);
    });
  });

  describe('setCanvasSize', () => {
    it('should set canvas dimensions', () => {
      const canvas = createCanvas(100, 100);
      setCanvasSize(canvas, 200, 150);
      expect(canvas.width).toBe(200);
      expect(canvas.height).toBe(150);
    });
  });

  describe('setStyles', () => {
    it('should apply styles to element', () => {
      setStyles(container, { width: '100px', height: '50px' });
      expect(container.style.width).toBe('100px');
      expect(container.style.height).toBe('50px');
    });
  });

  describe('removeElement', () => {
    it('should remove element from DOM', () => {
      const child = document.createElement('div');
      container.appendChild(child);
      
      expect(container.contains(child)).toBe(true);
      removeElement(child);
      expect(container.contains(child)).toBe(false);
    });
  });
});
