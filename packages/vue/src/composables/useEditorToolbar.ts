/**
 * useEditorToolbar composable - Manages toolbar state and methods
 * 
 * @example
 * ```vue
 * <script setup>
 * import { useEditorToolbar } from '@ldesign/image-editor-vue';
 * 
 * const { 
 *   theme, 
 *   primaryColor, 
 *   disabledTools,
 *   setTheme,
 *   setPrimaryColor,
 *   setDisabledTools,
 *   toggleTool,
 * } = useEditorToolbar(editor);
 * </script>
 * ```
 */

import { ref, watch, type Ref } from 'vue';
import type { Editor } from '@ldesign/image-editor';

/**
 * Toolbar theme type
 */
export type ToolbarTheme = 'light' | 'dark' | 'auto';

/**
 * useEditorToolbar return type
 */
export interface UseEditorToolbarReturn {
  /** Current theme */
  theme: Ref<ToolbarTheme>;
  /** Current primary color */
  primaryColor: Ref<string>;
  /** List of disabled tools */
  disabledTools: Ref<string[]>;
  /** Whether toolbar is visible */
  isVisible: Ref<boolean>;
  /** Set theme */
  setTheme: (theme: ToolbarTheme) => void;
  /** Set primary color */
  setPrimaryColor: (color: string) => void;
  /** Set disabled tools */
  setDisabledTools: (tools: string[]) => void;
  /** Toggle a specific tool's enabled state */
  toggleTool: (toolName: string) => void;
  /** Enable a specific tool */
  enableTool: (toolName: string) => void;
  /** Disable a specific tool */
  disableTool: (toolName: string) => void;
  /** Show toolbar */
  show: () => void;
  /** Hide toolbar */
  hide: () => void;
}

/**
 * useEditorToolbar options
 */
export interface UseEditorToolbarOptions {
  /** Initial theme */
  theme?: ToolbarTheme;
  /** Initial primary color */
  primaryColor?: string;
  /** Initial disabled tools */
  disabledTools?: string[];
}

/**
 * Composable for managing editor toolbar state
 * 
 * @param editorRef - Ref to Editor instance
 * @param options - Initial options
 * @returns Toolbar state and methods
 */
export function useEditorToolbar(
  editorRef: Ref<Editor | null>,
  options: UseEditorToolbarOptions = {}
): UseEditorToolbarReturn {
  // Reactive state
  const theme = ref<ToolbarTheme>(options.theme || 'dark');
  const primaryColor = ref(options.primaryColor || '#667eea');
  const disabledTools = ref<string[]>(options.disabledTools || []);
  const isVisible = ref(true);

  /**
   * Get toolbar instance from editor
   */
  const getToolbar = () => {
    if (!editorRef.value) return null;
    return (editorRef.value as any)._toolbar || editorRef.value.getToolbar?.();
  };

  /**
   * Set toolbar theme
   */
  const setTheme = (newTheme: ToolbarTheme) => {
    theme.value = newTheme;
    const toolbar = getToolbar();
    toolbar?.setTheme?.(newTheme);
  };

  /**
   * Set primary color
   */
  const setPrimaryColor = (color: string) => {
    primaryColor.value = color;
    const toolbar = getToolbar();
    toolbar?.setPrimaryColor?.(color);
  };

  /**
   * Set disabled tools list
   */
  const setDisabledTools = (tools: string[]) => {
    disabledTools.value = [...tools];
    const toolbar = getToolbar();
    toolbar?.setDisabledTools?.(tools);
  };

  /**
   * Toggle a specific tool's enabled state
   */
  const toggleTool = (toolName: string) => {
    const index = disabledTools.value.indexOf(toolName);
    if (index > -1) {
      disabledTools.value.splice(index, 1);
    } else {
      disabledTools.value.push(toolName);
    }
    const toolbar = getToolbar();
    toolbar?.setDisabledTools?.(disabledTools.value);
  };

  /**
   * Enable a specific tool
   */
  const enableTool = (toolName: string) => {
    const index = disabledTools.value.indexOf(toolName);
    if (index > -1) {
      disabledTools.value.splice(index, 1);
      const toolbar = getToolbar();
      toolbar?.setDisabledTools?.(disabledTools.value);
    }
  };

  /**
   * Disable a specific tool
   */
  const disableTool = (toolName: string) => {
    if (!disabledTools.value.includes(toolName)) {
      disabledTools.value.push(toolName);
      const toolbar = getToolbar();
      toolbar?.setDisabledTools?.(disabledTools.value);
    }
  };

  /**
   * Show toolbar
   */
  const show = () => {
    isVisible.value = true;
    const toolbar = getToolbar();
    toolbar?.show?.();
  };

  /**
   * Hide toolbar
   */
  const hide = () => {
    isVisible.value = false;
    const toolbar = getToolbar();
    toolbar?.hide?.();
  };

  // Sync theme when editor changes
  watch(
    () => editorRef.value,
    (newEditor) => {
      if (newEditor) {
        const toolbar = getToolbar();
        if (toolbar) {
          toolbar.setTheme?.(theme.value);
          toolbar.setPrimaryColor?.(primaryColor.value);
          toolbar.setDisabledTools?.(disabledTools.value);
        }
      }
    }
  );

  return {
    theme,
    primaryColor,
    disabledTools,
    isVisible,
    setTheme,
    setPrimaryColor,
    setDisabledTools,
    toggleTool,
    enableTool,
    disableTool,
    show,
    hide,
  };
}
