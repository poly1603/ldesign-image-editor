/**
 * KeyboardManager - Handles keyboard shortcuts
 */

export interface ShortcutConfig {
  /** Key code or key name */
  key: string;
  /** Ctrl/Command key required */
  ctrl?: boolean;
  /** Shift key required */
  shift?: boolean;
  /** Alt key required */
  alt?: boolean;
  /** Callback function */
  handler: (e: KeyboardEvent) => void;
  /** Description for UI display */
  description?: string;
  /** Whether to prevent default browser behavior */
  preventDefault?: boolean;
  /** Whether shortcut is enabled */
  enabled?: boolean;
}

export interface ShortcutGroup {
  name: string;
  shortcuts: Map<string, ShortcutConfig>;
}

/**
 * Generate a unique key for a shortcut combination
 */
function getShortcutKey(config: Omit<ShortcutConfig, 'handler' | 'description'>): string {
  const parts: string[] = [];
  if (config.ctrl) parts.push('ctrl');
  if (config.alt) parts.push('alt');
  if (config.shift) parts.push('shift');
  parts.push(config.key.toLowerCase());
  return parts.join('+');
}

/**
 * KeyboardManager - Manages keyboard shortcuts registration and handling
 */
export class KeyboardManager {
  private shortcuts: Map<string, ShortcutConfig> = new Map();
  private groups: Map<string, ShortcutGroup> = new Map();
  private enabled: boolean = true;
  private target: HTMLElement | Document;
  private boundHandler: (e: KeyboardEvent) => void;

  constructor(target: HTMLElement | Document = document) {
    this.target = target;
    this.boundHandler = this.handleKeyDown.bind(this);
    this.attach();
  }

  /**
   * Attach keyboard event listener
   */
  attach(): void {
    this.target.addEventListener('keydown', this.boundHandler as EventListener);
  }

  /**
   * Detach keyboard event listener
   */
  detach(): void {
    this.target.removeEventListener('keydown', this.boundHandler as EventListener);
  }

  /**
   * Enable/disable all shortcuts
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  /**
   * Check if keyboard manager is enabled
   */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Register a keyboard shortcut
   * @param config - Shortcut configuration
   * @param group - Optional group name
   * @returns Unregister function
   */
  register(config: ShortcutConfig, group?: string): () => void {
    const key = getShortcutKey(config);
    
    // Check for conflicts
    if (this.shortcuts.has(key)) {
      console.warn(`Keyboard shortcut "${key}" is already registered. Overwriting.`);
    }

    const fullConfig: ShortcutConfig = {
      ...config,
      enabled: config.enabled !== false,
      preventDefault: config.preventDefault !== false,
    };

    this.shortcuts.set(key, fullConfig);

    // Add to group if specified
    if (group) {
      if (!this.groups.has(group)) {
        this.groups.set(group, { name: group, shortcuts: new Map() });
      }
      this.groups.get(group)!.shortcuts.set(key, fullConfig);
    }

    // Return unregister function
    return () => this.unregister(key);
  }

  /**
   * Register multiple shortcuts at once
   * @param configs - Array of shortcut configs
   * @param group - Optional group name
   */
  registerMultiple(configs: ShortcutConfig[], group?: string): () => void {
    const unregisters = configs.map(config => this.register(config, group));
    return () => unregisters.forEach(fn => fn());
  }

  /**
   * Unregister a shortcut
   * @param key - Shortcut key string
   */
  unregister(key: string): void {
    this.shortcuts.delete(key);
    // Remove from all groups
    this.groups.forEach(group => {
      group.shortcuts.delete(key);
    });
  }

  /**
   * Unregister all shortcuts in a group
   * @param groupName - Group name
   */
  unregisterGroup(groupName: string): void {
    const group = this.groups.get(groupName);
    if (group) {
      group.shortcuts.forEach((_, key) => {
        this.shortcuts.delete(key);
      });
      this.groups.delete(groupName);
    }
  }

  /**
   * Enable/disable a specific shortcut
   * @param key - Shortcut key string
   * @param enabled - Enable state
   */
  setShortcutEnabled(key: string, enabled: boolean): void {
    const shortcut = this.shortcuts.get(key);
    if (shortcut) {
      shortcut.enabled = enabled;
    }
  }

  /**
   * Get all registered shortcuts
   */
  getShortcuts(): Map<string, ShortcutConfig> {
    return new Map(this.shortcuts);
  }

  /**
   * Get shortcuts for a specific group
   */
  getGroupShortcuts(groupName: string): Map<string, ShortcutConfig> | undefined {
    return this.groups.get(groupName)?.shortcuts;
  }

  /**
   * Handle keydown event
   */
  private handleKeyDown(e: KeyboardEvent): void {
    if (!this.enabled) return;

    // Skip if in input/textarea/contenteditable
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable
    ) {
      // Allow Escape to work even in inputs
      if (e.key !== 'Escape') {
        return;
      }
    }

    const key = getShortcutKey({
      key: e.key,
      ctrl: e.ctrlKey || e.metaKey, // Support both Ctrl and Cmd (Mac)
      shift: e.shiftKey,
      alt: e.altKey,
    });

    const shortcut = this.shortcuts.get(key);
    
    if (shortcut && shortcut.enabled !== false) {
      if (shortcut.preventDefault !== false) {
        e.preventDefault();
      }
      shortcut.handler(e);
    }
  }

  /**
   * Format shortcut for display (e.g., "Ctrl+Z")
   */
  static formatShortcut(config: Partial<ShortcutConfig>): string {
    const parts: string[] = [];
    const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    
    if (config.ctrl) parts.push(isMac ? '⌘' : 'Ctrl');
    if (config.alt) parts.push(isMac ? '⌥' : 'Alt');
    if (config.shift) parts.push(isMac ? '⇧' : 'Shift');
    
    if (config.key) {
      // Format special keys
      const keyMap: Record<string, string> = {
        ' ': 'Space',
        'ArrowUp': '↑',
        'ArrowDown': '↓',
        'ArrowLeft': '←',
        'ArrowRight': '→',
        'Escape': 'Esc',
        'Delete': 'Del',
        'Backspace': '⌫',
      };
      parts.push(keyMap[config.key] || config.key.toUpperCase());
    }
    
    return parts.join('+');
  }

  /**
   * Destroy the keyboard manager
   */
  destroy(): void {
    this.detach();
    this.shortcuts.clear();
    this.groups.clear();
  }
}

/**
 * Default editor shortcuts configuration
 */
export function createEditorShortcuts(handlers: {
  undo?: () => void;
  redo?: () => void;
  copy?: () => void;
  paste?: () => void;
  delete?: () => void;
  escape?: () => void;
  zoomIn?: () => void;
  zoomOut?: () => void;
  zoomReset?: () => void;
  selectTool?: (tool: string | null) => void;
  save?: () => void;
}): ShortcutConfig[] {
  const shortcuts: ShortcutConfig[] = [];

  if (handlers.undo) {
    shortcuts.push({
      key: 'z',
      ctrl: true,
      handler: handlers.undo,
      description: 'Undo',
    });
  }

  if (handlers.redo) {
    shortcuts.push({
      key: 'y',
      ctrl: true,
      handler: handlers.redo,
      description: 'Redo',
    });
    // Also support Ctrl+Shift+Z
    shortcuts.push({
      key: 'z',
      ctrl: true,
      shift: true,
      handler: handlers.redo,
      description: 'Redo',
    });
  }

  if (handlers.copy) {
    shortcuts.push({
      key: 'c',
      ctrl: true,
      handler: handlers.copy,
      description: 'Copy',
    });
  }

  if (handlers.paste) {
    shortcuts.push({
      key: 'v',
      ctrl: true,
      handler: handlers.paste,
      description: 'Paste',
    });
  }

  if (handlers.delete) {
    shortcuts.push({
      key: 'Delete',
      handler: handlers.delete,
      description: 'Delete',
    });
    shortcuts.push({
      key: 'Backspace',
      handler: handlers.delete,
      description: 'Delete',
    });
  }

  if (handlers.escape) {
    shortcuts.push({
      key: 'Escape',
      handler: handlers.escape,
      description: 'Cancel / Deselect',
    });
  }

  if (handlers.zoomIn) {
    shortcuts.push({
      key: '=',
      ctrl: true,
      handler: handlers.zoomIn,
      description: 'Zoom In',
    });
    shortcuts.push({
      key: '+',
      ctrl: true,
      handler: handlers.zoomIn,
      description: 'Zoom In',
    });
  }

  if (handlers.zoomOut) {
    shortcuts.push({
      key: '-',
      ctrl: true,
      handler: handlers.zoomOut,
      description: 'Zoom Out',
    });
  }

  if (handlers.zoomReset) {
    shortcuts.push({
      key: '0',
      ctrl: true,
      handler: handlers.zoomReset,
      description: 'Reset Zoom',
    });
  }

  if (handlers.selectTool) {
    // Number keys 1-9 for tool selection
    const tools = [null, 'pen', 'rect', 'circle', 'arrow', 'text', 'mosaic', 'eraser', 'crop'];
    tools.forEach((tool, index) => {
      if (index < 10) {
        shortcuts.push({
          key: String(index),
          handler: () => handlers.selectTool!(tool),
          description: `Select ${tool || 'Move'} tool`,
        });
      }
    });
  }

  if (handlers.save) {
    shortcuts.push({
      key: 's',
      ctrl: true,
      handler: handlers.save,
      description: 'Save / Export',
    });
  }

  return shortcuts;
}
