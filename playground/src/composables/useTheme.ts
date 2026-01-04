/**
 * Shared theme composable
 * Uses localStorage to persist theme across pages
 */

import { ref, watch } from 'vue';

export type Theme = 'light' | 'dark';

// Global reactive theme state
const currentTheme = ref<Theme>(getStoredTheme());

// Get theme from localStorage or default to dark
function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem('image-editor-theme');
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  // Check system preference
  if (window.matchMedia?.('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
}

// Watch and persist theme changes
watch(currentTheme, (newTheme) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('image-editor-theme', newTheme);
  }
});

export function useTheme() {
  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark';
  };

  const setTheme = (theme: Theme) => {
    currentTheme.value = theme;
  };

  return {
    theme: currentTheme,
    toggleTheme,
    setTheme,
  };
}
