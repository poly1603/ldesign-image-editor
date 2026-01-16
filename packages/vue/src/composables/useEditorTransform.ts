/**
 * useEditorTransform composable - Provides image transformation methods
 * 
 * @example
 * ```vue
 * <script setup>
 * import { useEditorTransform } from '@ldesign/image-editor-vue';
 * 
 * const { 
 *   rotate,
 *   rotateLeft,
 *   rotateRight,
 *   flipHorizontal,
 *   flipVertical,
 *   crop,
 *   resize,
 *   scale,
 * } = useEditorTransform(editor);
 * </script>
 * ```
 */

import { type Ref } from 'vue';
import type { Editor } from '@ldesign/image-editor';

/**
 * useEditorTransform return type
 */
export interface UseEditorTransformReturn {
  /** Rotate by degrees */
  rotate: (degrees: number) => void;
  /** Rotate 90° left (counter-clockwise) */
  rotateLeft: () => void;
  /** Rotate 90° right (clockwise) */
  rotateRight: () => void;
  /** Rotate 180° */
  rotate180: () => void;
  /** Flip horizontally (mirror) */
  flipHorizontal: () => void;
  /** Flip vertically */
  flipVertical: () => void;
  /** Crop to region */
  crop: (x: number, y: number, width: number, height: number) => void;
  /** Resize to dimensions */
  resize: (width: number, height: number, maintainAspectRatio?: boolean) => void;
  /** Scale by factor */
  scale: (factor: number) => void;
  /** Fit to max dimensions */
  fit: (maxWidth: number, maxHeight: number) => void;
  /** Reset to original */
  reset: () => void;
  /** Clear canvas */
  clear: () => void;
}

/**
 * Composable for image transformation operations
 * 
 * @param editorRef - Ref to Editor instance
 * @returns Transform methods
 */
export function useEditorTransform(
  editorRef: Ref<Editor | null>
): UseEditorTransformReturn {
  /**
   * Ensure editor is available
   */
  const withEditor = <T>(fn: (editor: Editor) => T): T | undefined => {
    if (!editorRef.value) {
      console.warn('Editor not initialized');
      return undefined;
    }
    return fn(editorRef.value);
  };

  /**
   * Rotate by degrees
   */
  const rotate = (degrees: number) => {
    withEditor((editor) => editor.rotate(degrees));
  };

  /**
   * Rotate 90° left (counter-clockwise)
   */
  const rotateLeft = () => {
    withEditor((editor) => editor.rotateLeft());
  };

  /**
   * Rotate 90° right (clockwise)
   */
  const rotateRight = () => {
    withEditor((editor) => editor.rotateRight());
  };

  /**
   * Rotate 180°
   */
  const rotate180 = () => {
    withEditor((editor) => editor.rotate180());
  };

  /**
   * Flip horizontally (mirror)
   */
  const flipHorizontal = () => {
    withEditor((editor) => editor.flipHorizontal());
  };

  /**
   * Flip vertically
   */
  const flipVertical = () => {
    withEditor((editor) => editor.flipVertical());
  };

  /**
   * Crop to region
   */
  const crop = (x: number, y: number, width: number, height: number) => {
    withEditor((editor) => editor.crop(x, y, width, height));
  };

  /**
   * Resize to dimensions
   */
  const resize = (width: number, height: number, maintainAspectRatio = false) => {
    withEditor((editor) => editor.resize(width, height, maintainAspectRatio));
  };

  /**
   * Scale by factor
   */
  const scale = (factor: number) => {
    withEditor((editor) => editor.scale(factor));
  };

  /**
   * Fit to max dimensions while maintaining aspect ratio
   */
  const fit = (maxWidth: number, maxHeight: number) => {
    withEditor((editor) => editor.fit(maxWidth, maxHeight));
  };

  /**
   * Reset to original image
   */
  const reset = () => {
    withEditor((editor) => editor.reset());
  };

  /**
   * Clear canvas
   */
  const clear = () => {
    withEditor((editor) => editor.clear());
  };

  return {
    rotate,
    rotateLeft,
    rotateRight,
    rotate180,
    flipHorizontal,
    flipVertical,
    crop,
    resize,
    scale,
    fit,
    reset,
    clear,
  };
}
