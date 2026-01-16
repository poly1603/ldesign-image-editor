/**
 * useEditorExport composable - Provides image export methods
 * 
 * @example
 * ```vue
 * <script setup>
 * import { useEditorExport } from '@ldesign/image-editor-vue';
 * 
 * const { 
 *   exportImage,
 *   toPNG,
 *   toJPEG,
 *   toWebP,
 *   toBase64,
 *   toBlob,
 *   download,
 *   copyToClipboard,
 * } = useEditorExport(editor);
 * </script>
 * ```
 */

import { type Ref } from 'vue';
import type { Editor, ExportOptions } from '@ldesign/image-editor';

/**
 * Export format type
 */
export type ExportFormat = 'png' | 'jpeg' | 'jpg' | 'webp';

/**
 * useEditorExport return type
 */
export interface UseEditorExportReturn {
  /** Export with full options */
  exportImage: (options?: ExportOptions) => Promise<string | Blob | File | ArrayBuffer | undefined>;
  /** Export to PNG data URL */
  toPNG: () => string | undefined;
  /** Export to JPEG data URL */
  toJPEG: (quality?: number) => string | undefined;
  /** Export to WebP data URL */
  toWebP: (quality?: number) => string | undefined;
  /** Export to base64 with format */
  toBase64: (format?: ExportFormat, quality?: number) => string | undefined;
  /** Export to Blob */
  toBlob: (type?: string, quality?: number) => Promise<Blob | null | undefined>;
  /** Download image */
  download: (filename?: string, options?: ExportOptions) => Promise<void>;
  /** Copy to clipboard */
  copyToClipboard: () => Promise<void>;
  /** Get export size estimate */
  getExportSize: (options?: ExportOptions) => Promise<number | undefined>;
  /** Get image info */
  getImageInfo: () => { width: number; height: number; aspectRatio: number } | undefined;
  /** Get data URL */
  toDataURL: (type?: string, quality?: number) => string | undefined;
}

/**
 * Composable for image export operations
 * 
 * @param editorRef - Ref to Editor instance
 * @returns Export methods
 */
export function useEditorExport(
  editorRef: Ref<Editor | null>
): UseEditorExportReturn {
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
   * Export with full options
   */
  const exportImage = async (options?: ExportOptions) => {
    return withEditor((editor) => editor.export(options));
  };

  /**
   * Export to PNG data URL
   */
  const toPNG = () => {
    return withEditor((editor) => editor.toPNG());
  };

  /**
   * Export to JPEG data URL
   */
  const toJPEG = (quality = 0.92) => {
    return withEditor((editor) => editor.toJPEG(quality));
  };

  /**
   * Export to WebP data URL
   */
  const toWebP = (quality = 0.92) => {
    return withEditor((editor) => editor.toWebP(quality));
  };

  /**
   * Export to base64 with format
   */
  const toBase64 = (format: ExportFormat = 'png', quality = 0.92) => {
    return withEditor((editor) => editor.toBase64(format, quality));
  };

  /**
   * Export to Blob
   */
  const toBlob = async (type = 'image/png', quality?: number) => {
    return withEditor((editor) => editor.toBlob(type, quality));
  };

  /**
   * Download image
   */
  const download = async (filename = 'image', options?: ExportOptions) => {
    await withEditor((editor) => editor.download(filename, options));
  };

  /**
   * Copy to clipboard
   */
  const copyToClipboard = async () => {
    await withEditor((editor) => editor.copyToClipboard());
  };

  /**
   * Get export size estimate
   */
  const getExportSize = async (options?: ExportOptions) => {
    return withEditor((editor) => editor.getExportSize(options));
  };

  /**
   * Get image info
   */
  const getImageInfo = () => {
    return withEditor((editor) => editor.getImageInfo());
  };

  /**
   * Get data URL
   */
  const toDataURL = (type = 'image/png', quality?: number) => {
    return withEditor((editor) => editor.toDataURL(type, quality));
  };

  return {
    exportImage,
    toPNG,
    toJPEG,
    toWebP,
    toBase64,
    toBlob,
    download,
    copyToClipboard,
    getExportSize,
    getImageInfo,
    toDataURL,
  };
}
