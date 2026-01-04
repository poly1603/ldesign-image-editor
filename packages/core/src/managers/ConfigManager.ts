/**
 * Config Manager - Handles configuration merging and runtime updates
 * Requirements: 10.1, 10.5 - Configuration system
 */

import type { EditorConfig, DeepPartial } from '../types/config.types';
import { DEFAULT_EDITOR_CONFIG } from '../constants/defaults';

/**
 * ConfigManager class - Manages editor configuration
 * Requirements: 10.1, 10.5
 */
export class ConfigManager {
  private config: Required<EditorConfig>;
  private listeners: Set<(config: Required<EditorConfig>) => void> = new Set();

  /**
   * Create a new ConfigManager instance
   * @param userConfig - User provided configuration
   */
  constructor(userConfig?: DeepPartial<EditorConfig>) {
    this.config = this.mergeConfig(DEFAULT_EDITOR_CONFIG, userConfig);
  }

  /**
   * Deep merge two configuration objects
   * User config values override default values
   * @param defaultConfig - Default configuration
   * @param userConfig - User configuration
   * @returns Merged configuration
   */
  private mergeConfig(
    defaultConfig: Required<EditorConfig>,
    userConfig?: DeepPartial<EditorConfig>
  ): Required<EditorConfig> {
    if (!userConfig) {
      return { ...defaultConfig };
    }

    const result = { ...defaultConfig };

    for (const key of Object.keys(userConfig) as (keyof EditorConfig)[]) {
      const userValue = userConfig[key];
      if (userValue !== undefined) {
        (result as Record<string, unknown>)[key] = userValue;
      }
    }

    return result;
  }


  /**
   * Get the current configuration
   * @returns Current configuration
   */
  getConfig(): Required<EditorConfig> {
    return { ...this.config };
  }

  /**
   * Get a specific configuration value
   * @param key - Configuration key
   * @returns Configuration value
   */
  get<K extends keyof EditorConfig>(key: K): Required<EditorConfig>[K] {
    return this.config[key];
  }

  /**
   * Update configuration at runtime
   * Requirements: 10.5 - Runtime configuration update
   * @param updates - Partial configuration updates
   */
  update(updates: DeepPartial<EditorConfig>): void {
    const oldConfig = { ...this.config };
    this.config = this.mergeConfig(this.config, updates);

    // Notify listeners if config changed
    if (JSON.stringify(oldConfig) !== JSON.stringify(this.config)) {
      this.notifyListeners();
    }
  }

  /**
   * Set a specific configuration value
   * @param key - Configuration key
   * @param value - Configuration value
   */
  set<K extends keyof EditorConfig>(
    key: K,
    value: Required<EditorConfig>[K]
  ): void {
    if (this.config[key] !== value) {
      this.config[key] = value;
      this.notifyListeners();
    }
  }

  /**
   * Reset configuration to defaults
   * @param userConfig - Optional user config to apply after reset
   */
  reset(userConfig?: DeepPartial<EditorConfig>): void {
    this.config = this.mergeConfig(DEFAULT_EDITOR_CONFIG, userConfig);
    this.notifyListeners();
  }

  /**
   * Subscribe to configuration changes
   * @param listener - Callback function
   * @returns Unsubscribe function
   */
  onChange(
    listener: (config: Required<EditorConfig>) => void
  ): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify all listeners of configuration changes
   */
  private notifyListeners(): void {
    const currentConfig = this.getConfig();
    for (const listener of this.listeners) {
      try {
        listener(currentConfig);
      } catch (error) {
        console.error('Error in config change listener:', error);
      }
    }
  }

  /**
   * Destroy the config manager and clean up resources
   */
  destroy(): void {
    this.listeners.clear();
  }
}
