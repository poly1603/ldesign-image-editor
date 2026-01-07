/**
 * Color utility functions for the image editor
 */

import { clamp } from './math.utils';

/**
 * RGB color interface
 */
export interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * RGBA color interface
 */
export interface RGBA extends RGB {
  a: number;
}

/**
 * HSL color interface
 */
export interface HSL {
  h: number;
  s: number;
  l: number;
}

/**
 * HSLA color interface
 */
export interface HSLA extends HSL {
  a: number;
}

/**
 * HSV color interface
 */
export interface HSV {
  h: number;
  s: number;
  v: number;
}

/**
 * Parse hex color string to RGB
 * @param hex - Hex color string (with or without #)
 * @returns RGB object or null if invalid
 */
export function hexToRgb(hex: string): RGB | null {
  // Remove # if present
  const cleanHex = hex.replace(/^#/, '');
  
  // Support short format (#RGB) and long format (#RRGGBB)
  let r: number, g: number, b: number;
  
  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.slice(0, 2), 16);
    g = parseInt(cleanHex.slice(2, 4), 16);
    b = parseInt(cleanHex.slice(4, 6), 16);
  } else {
    return null;
  }
  
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return null;
  }
  
  return { r, g, b };
}

/**
 * Parse hex color string with alpha to RGBA
 * @param hex - Hex color string (with or without #, optional alpha)
 * @returns RGBA object or null if invalid
 */
export function hexToRgba(hex: string): RGBA | null {
  const cleanHex = hex.replace(/^#/, '');
  
  let r: number, g: number, b: number, a: number = 255;
  
  if (cleanHex.length === 4) {
    // #RGBA format
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
    a = parseInt(cleanHex[3] + cleanHex[3], 16);
  } else if (cleanHex.length === 8) {
    // #RRGGBBAA format
    r = parseInt(cleanHex.slice(0, 2), 16);
    g = parseInt(cleanHex.slice(2, 4), 16);
    b = parseInt(cleanHex.slice(4, 6), 16);
    a = parseInt(cleanHex.slice(6, 8), 16);
  } else {
    // Try parsing as RGB
    const rgb = hexToRgb(hex);
    if (!rgb) return null;
    return { ...rgb, a: 1 };
  }
  
  if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
    return null;
  }
  
  return { r, g, b, a: a / 255 };
}

/**
 * Convert RGB to hex string
 * @param rgb - RGB object
 * @returns Hex color string with #
 */
export function rgbToHex(rgb: RGB): string {
  const r = clamp(Math.round(rgb.r), 0, 255);
  const g = clamp(Math.round(rgb.g), 0, 255);
  const b = clamp(Math.round(rgb.b), 0, 255);
  
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

/**
 * Convert RGBA to hex string with alpha
 * @param rgba - RGBA object
 * @returns Hex color string with # including alpha
 */
export function rgbaToHex(rgba: RGBA): string {
  const r = clamp(Math.round(rgba.r), 0, 255);
  const g = clamp(Math.round(rgba.g), 0, 255);
  const b = clamp(Math.round(rgba.b), 0, 255);
  const a = clamp(Math.round(rgba.a * 255), 0, 255);
  
  return '#' + [r, g, b, a].map(x => x.toString(16).padStart(2, '0')).join('');
}

/**
 * Convert RGB to HSL
 * @param rgb - RGB object
 * @returns HSL object (h: 0-360, s: 0-100, l: 0-100)
 */
export function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  
  let h = 0;
  let s = 0;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Convert HSL to RGB
 * @param hsl - HSL object (h: 0-360, s: 0-100, l: 0-100)
 * @returns RGB object
 */
export function hslToRgb(hsl: HSL): RGB {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;
  
  let r: number, g: number, b: number;
  
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Convert RGB to HSV
 * @param rgb - RGB object
 * @returns HSV object (h: 0-360, s: 0-100, v: 0-100)
 */
export function rgbToHsv(rgb: RGB): HSV {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  
  if (max !== min) {
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

/**
 * Convert HSV to RGB
 * @param hsv - HSV object (h: 0-360, s: 0-100, v: 0-100)
 * @returns RGB object
 */
export function hsvToRgb(hsv: HSV): RGB {
  const h = hsv.h / 360;
  const s = hsv.s / 100;
  const v = hsv.v / 100;
  
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  
  let r: number, g: number, b: number;
  
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
    default: r = 0; g = 0; b = 0;
  }
  
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Parse any color string to RGBA
 * @param color - Color string (hex, rgb, rgba, hsl, hsla, or named)
 * @returns RGBA object or null if invalid
 */
export function parseColor(color: string): RGBA | null {
  const trimmed = color.trim().toLowerCase();
  
  // Hex format
  if (trimmed.startsWith('#')) {
    return hexToRgba(trimmed);
  }
  
  // RGB/RGBA format
  const rgbMatch = trimmed.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)$/);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10),
      g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10),
      a: rgbMatch[4] !== undefined ? parseFloat(rgbMatch[4]) : 1,
    };
  }
  
  // HSL/HSLA format
  const hslMatch = trimmed.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*(?:,\s*([\d.]+))?\s*\)$/);
  if (hslMatch) {
    const rgb = hslToRgb({
      h: parseInt(hslMatch[1], 10),
      s: parseInt(hslMatch[2], 10),
      l: parseInt(hslMatch[3], 10),
    });
    return {
      ...rgb,
      a: hslMatch[4] !== undefined ? parseFloat(hslMatch[4]) : 1,
    };
  }
  
  // Named colors (common ones)
  const namedColors: Record<string, string> = {
    white: '#ffffff',
    black: '#000000',
    red: '#ff0000',
    green: '#00ff00',
    blue: '#0000ff',
    yellow: '#ffff00',
    cyan: '#00ffff',
    magenta: '#ff00ff',
    orange: '#ffa500',
    purple: '#800080',
    pink: '#ffc0cb',
    gray: '#808080',
    grey: '#808080',
    transparent: '#00000000',
  };
  
  if (namedColors[trimmed]) {
    return hexToRgba(namedColors[trimmed]);
  }
  
  return null;
}

/**
 * Convert RGBA to CSS string
 * @param rgba - RGBA object
 * @returns CSS color string
 */
export function rgbaToCss(rgba: RGBA): string {
  if (rgba.a === 1) {
    return `rgb(${Math.round(rgba.r)}, ${Math.round(rgba.g)}, ${Math.round(rgba.b)})`;
  }
  return `rgba(${Math.round(rgba.r)}, ${Math.round(rgba.g)}, ${Math.round(rgba.b)}, ${rgba.a})`;
}

/**
 * Mix two colors together
 * @param color1 - First color (RGBA)
 * @param color2 - Second color (RGBA)
 * @param weight - Weight of second color (0-1)
 * @returns Mixed color
 */
export function mixColors(color1: RGBA, color2: RGBA, weight: number = 0.5): RGBA {
  const w = clamp(weight, 0, 1);
  return {
    r: Math.round(color1.r * (1 - w) + color2.r * w),
    g: Math.round(color1.g * (1 - w) + color2.g * w),
    b: Math.round(color1.b * (1 - w) + color2.b * w),
    a: color1.a * (1 - w) + color2.a * w,
  };
}

/**
 * Lighten a color
 * @param color - RGBA color
 * @param amount - Amount to lighten (0-1)
 * @returns Lightened color
 */
export function lighten(color: RGBA, amount: number): RGBA {
  const hsl = rgbToHsl(color);
  hsl.l = clamp(hsl.l + amount * 100, 0, 100);
  return { ...hslToRgb(hsl), a: color.a };
}

/**
 * Darken a color
 * @param color - RGBA color
 * @param amount - Amount to darken (0-1)
 * @returns Darkened color
 */
export function darken(color: RGBA, amount: number): RGBA {
  return lighten(color, -amount);
}

/**
 * Saturate a color
 * @param color - RGBA color
 * @param amount - Amount to saturate (0-1)
 * @returns Saturated color
 */
export function saturate(color: RGBA, amount: number): RGBA {
  const hsl = rgbToHsl(color);
  hsl.s = clamp(hsl.s + amount * 100, 0, 100);
  return { ...hslToRgb(hsl), a: color.a };
}

/**
 * Desaturate a color
 * @param color - RGBA color
 * @param amount - Amount to desaturate (0-1)
 * @returns Desaturated color
 */
export function desaturate(color: RGBA, amount: number): RGBA {
  return saturate(color, -amount);
}

/**
 * Get the complementary color
 * @param color - RGBA color
 * @returns Complementary color
 */
export function getComplementary(color: RGBA): RGBA {
  const hsl = rgbToHsl(color);
  hsl.h = (hsl.h + 180) % 360;
  return { ...hslToRgb(hsl), a: color.a };
}

/**
 * Calculate relative luminance of a color
 * @param color - RGB color
 * @returns Luminance value (0-1)
 */
export function getLuminance(color: RGB): number {
  const sRGB = [color.r, color.g, color.b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

/**
 * Calculate contrast ratio between two colors
 * @param color1 - First color
 * @param color2 - Second color
 * @returns Contrast ratio (1-21)
 */
export function getContrastRatio(color1: RGB, color2: RGB): number {
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if a color is light or dark
 * @param color - RGB color
 * @returns True if color is light
 */
export function isLightColor(color: RGB): boolean {
  return getLuminance(color) > 0.5;
}

/**
 * Get an appropriate text color (black or white) for a background
 * @param bgColor - Background color
 * @returns 'black' or 'white'
 */
export function getContrastingTextColor(bgColor: RGB): 'black' | 'white' {
  return isLightColor(bgColor) ? 'black' : 'white';
}

/**
 * Convert a color to grayscale
 * @param color - RGBA color
 * @returns Grayscale color
 */
export function toGrayscale(color: RGBA): RGBA {
  const gray = Math.round(0.299 * color.r + 0.587 * color.g + 0.114 * color.b);
  return { r: gray, g: gray, b: gray, a: color.a };
}

/**
 * Invert a color
 * @param color - RGBA color
 * @returns Inverted color
 */
export function invertColor(color: RGBA): RGBA {
  return {
    r: 255 - color.r,
    g: 255 - color.g,
    b: 255 - color.b,
    a: color.a,
  };
}
