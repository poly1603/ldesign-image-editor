/**
 * Plugin Manager - Handles plugin registration, activation, and lifecycle
 * Requirements: 2.1, 2.2, 2.3, 2.4
 */

import type { Plugin, PluginConstructor, PluginContext } from '../types/plugin.types';

/**
 * PluginManager class - Manages plugin lifecycle
 * Requirements: 2.1, 2.2, 2.3, 2.4
 */
export class PluginManager {
  /** Registered plugins map */
  private plugins: Map<string, Plugin> = new Map();
  /** Currently active plugin name */
  private activePluginName: string | null = null;
  /** Plugin context for installation */
  private context: PluginContext | null = null;
  /** Listeners for plugin changes */
  private listeners: Set<(pluginName: string | null, prevPluginName: string | null) => void> = new Set();

  /**
   * Set the plugin context
   * @param context - Plugin context
   */
  setContext(context: PluginContext): void {
    this.context = context;
  }

  /**
   * Register a plugin
   * Requirements: 2.1 - Add plugin to available tools list
   * @param PluginClass - Plugin constructor
   * @returns The plugin manager instance for chaining
   */
  register(PluginClass: PluginConstructor): this {
    if (!this.context) {
      throw new Error('Plugin context not set. Call setContext() first.');
    }

    const plugin = new PluginClass();
    const name = plugin.name;

    if (this.plugins.has(name)) {
      console.warn(`Plugin "${name}" is already registered. Skipping.`);
      return this;
    }

    // Install the plugin
    plugin.install(this.context);
    this.plugins.set(name, plugin);

    return this;
  }


  /**
   * Unregister a plugin
   * @param name - Plugin name
   * @returns True if plugin was unregistered
   */
  unregister(name: string): boolean {
    const plugin = this.plugins.get(name);
    if (!plugin) {
      return false;
    }

    // Deactivate if active
    if (this.activePluginName === name) {
      this.deactivate(name);
    }

    // Destroy the plugin
    plugin.destroy();
    this.plugins.delete(name);

    return true;
  }

  /**
   * Activate a plugin
   * Requirements: 2.3 - Call plugin's activate method with editor context
   * @param name - Plugin name
   * @returns True if plugin was activated
   */
  activate(name: string): boolean {
    const plugin = this.plugins.get(name);
    if (!plugin) {
      console.warn(`Plugin "${name}" not found.`);
      return false;
    }

    const prevPluginName = this.activePluginName;

    // Deactivate current plugin if different
    if (this.activePluginName && this.activePluginName !== name) {
      this.deactivate(this.activePluginName);
    }

    // Activate the new plugin
    plugin.activate();
    this.activePluginName = name;

    // Notify listeners
    this.notifyListeners(name, prevPluginName);

    return true;
  }

  /**
   * Deactivate a plugin
   * Requirements: 2.4 - Call plugin's deactivate method for cleanup
   * @param name - Plugin name
   * @returns True if plugin was deactivated
   */
  deactivate(name: string): boolean {
    const plugin = this.plugins.get(name);
    if (!plugin) {
      return false;
    }

    if (this.activePluginName === name) {
      plugin.deactivate();
      const prevPluginName = this.activePluginName;
      this.activePluginName = null;
      this.notifyListeners(null, prevPluginName);
    }

    return true;
  }

  /**
   * Get a plugin by name
   * @param name - Plugin name
   * @returns Plugin instance or undefined
   */
  get(name: string): Plugin | undefined {
    return this.plugins.get(name);
  }

  /**
   * Get the currently active plugin
   * @returns Active plugin or null
   */
  getActive(): Plugin | null {
    if (!this.activePluginName) {
      return null;
    }
    return this.plugins.get(this.activePluginName) || null;
  }

  /**
   * Get the name of the currently active plugin
   * @returns Active plugin name or null
   */
  getActiveName(): string | null {
    return this.activePluginName;
  }

  /**
   * Check if a plugin is registered
   * @param name - Plugin name
   * @returns True if plugin is registered
   */
  has(name: string): boolean {
    return this.plugins.has(name);
  }

  /**
   * Check if a plugin is active
   * @param name - Plugin name
   * @returns True if plugin is active
   */
  isActive(name: string): boolean {
    return this.activePluginName === name;
  }

  /**
   * Get all registered plugin names
   * @returns Array of plugin names
   */
  getNames(): string[] {
    return Array.from(this.plugins.keys());
  }

  /**
   * Get all registered plugins
   * @returns Array of plugins
   */
  getAll(): Plugin[] {
    return Array.from(this.plugins.values());
  }

  /**
   * Subscribe to plugin activation changes
   * @param listener - Callback function
   * @returns Unsubscribe function
   */
  onChange(listener: (pluginName: string | null, prevPluginName: string | null) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify all listeners of plugin changes
   */
  private notifyListeners(pluginName: string | null, prevPluginName: string | null): void {
    for (const listener of this.listeners) {
      try {
        listener(pluginName, prevPluginName);
      } catch (error) {
        console.error('Error in plugin change listener:', error);
      }
    }
  }

  /**
   * Destroy all plugins and clean up resources
   */
  destroy(): void {
    // Deactivate active plugin
    if (this.activePluginName) {
      this.deactivate(this.activePluginName);
    }

    // Destroy all plugins
    for (const plugin of this.plugins.values()) {
      plugin.destroy();
    }

    this.plugins.clear();
    this.listeners.clear();
    this.context = null;
  }
}
