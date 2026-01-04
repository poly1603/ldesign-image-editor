/**
 * Internationalization (i18n) system for the image editor
 */
import { zhCN, type LocaleMessages } from './locales/zh-CN';
import { enUS } from './locales/en-US';

export type SupportedLocale = 'zh-CN' | 'en-US';

export type LocaleKey = keyof LocaleMessages;

/** Available locale packs */
const locales: Record<SupportedLocale, LocaleMessages> = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

/**
 * I18n class - Manages internationalization
 */
export class I18n {
  private locale: SupportedLocale;
  private messages: LocaleMessages;
  private fallbackMessages: LocaleMessages;

  constructor(locale: SupportedLocale = 'zh-CN') {
    this.locale = locale;
    this.messages = locales[locale] || zhCN;
    this.fallbackMessages = zhCN;
  }

  /**
   * Get translated message by key
   * @param key - Message key
   * @param params - Optional parameters for interpolation
   * @returns Translated message
   */
  t(key: LocaleKey, params?: Record<string, string | number>): string {
    let message = this.messages[key] || this.fallbackMessages[key] || key;
    
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        message = message.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      });
    }
    
    return message;
  }

  /**
   * Set current locale
   * @param locale - Locale code
   */
  setLocale(locale: SupportedLocale): void {
    if (locales[locale]) {
      this.locale = locale;
      this.messages = locales[locale];
    }
  }

  /**
   * Get current locale
   * @returns Current locale code
   */
  getLocale(): SupportedLocale {
    return this.locale;
  }

  /**
   * Get all supported locales
   * @returns Array of supported locale codes
   */
  getSupportedLocales(): SupportedLocale[] {
    return Object.keys(locales) as SupportedLocale[];
  }

  /**
   * Add or extend a locale
   * @param locale - Locale code
   * @param messages - Messages to add/merge
   */
  extendLocale(locale: SupportedLocale, messages: Partial<LocaleMessages>): void {
    if (locales[locale]) {
      locales[locale] = { ...locales[locale], ...messages };
      if (this.locale === locale) {
        this.messages = locales[locale];
      }
    }
  }

  /**
   * Register a new locale
   * @param locale - Locale code
   * @param messages - Full message set
   */
  registerLocale(locale: string, messages: LocaleMessages): void {
    (locales as Record<string, LocaleMessages>)[locale] = messages;
  }

  /**
   * Detect browser locale and return supported locale
   * @returns Detected or default locale
   */
  static detectLocale(): SupportedLocale {
    if (typeof navigator === 'undefined') {
      return 'zh-CN';
    }
    
    const browserLocale = navigator.language || (navigator as any).userLanguage || 'zh-CN';
    
    // Check for exact match
    if (browserLocale in locales) {
      return browserLocale as SupportedLocale;
    }
    
    // Check for language prefix match
    const lang = browserLocale.split('-')[0];
    if (lang === 'zh') return 'zh-CN';
    if (lang === 'en') return 'en-US';
    
    return 'zh-CN';
  }
}

// Export types and locales
export { zhCN, enUS };
export type { LocaleMessages };

// Default instance
let defaultI18n: I18n | null = null;

/**
 * Get or create default i18n instance
 * @param locale - Optional locale to set
 * @returns I18n instance
 */
export function getI18n(locale?: SupportedLocale): I18n {
  if (!defaultI18n) {
    defaultI18n = new I18n(locale || I18n.detectLocale());
  } else if (locale) {
    defaultI18n.setLocale(locale);
  }
  return defaultI18n;
}

/**
 * Shorthand translation function using default instance
 * @param key - Message key
 * @param params - Optional parameters
 * @returns Translated message
 */
export function t(key: LocaleKey, params?: Record<string, string | number>): string {
  return getI18n().t(key, params);
}
