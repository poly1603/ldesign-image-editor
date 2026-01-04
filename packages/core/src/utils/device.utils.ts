/**
 * Device detection utility functions
 * Requirements: 8.5 - Device type auto-switching
 */

import type { DeviceType } from '../types';

/**
 * Check if the device is a touch device
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-expect-error - msMaxTouchPoints is IE specific
    navigator.msMaxTouchPoints > 0
  );
}

/**
 * Check if the device is a mobile device based on user agent
 */
export function isMobileDevice(): boolean {
  if (typeof navigator === 'undefined') {
    return false;
  }
  const userAgent = navigator.userAgent.toLowerCase();
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    userAgent
  );
}

/**
 * Check if the device is an iOS device
 */
export function isIOSDevice(): boolean {
  if (typeof navigator === 'undefined') {
    return false;
  }
  return /iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase());
}

/**
 * Check if the device is an Android device
 */
export function isAndroidDevice(): boolean {
  if (typeof navigator === 'undefined') {
    return false;
  }
  return /android/i.test(navigator.userAgent.toLowerCase());
}


/**
 * Detect device type automatically
 */
export function detectDeviceType(): 'pc' | 'mobile' {
  if (isMobileDevice() || isTouchDevice()) {
    return 'mobile';
  }
  return 'pc';
}

/**
 * Get resolved device type based on configuration
 */
export function getResolvedDeviceType(deviceType: DeviceType): 'pc' | 'mobile' {
  if (deviceType === 'auto') {
    return detectDeviceType();
  }
  return deviceType;
}

/**
 * Get device pixel ratio
 */
export function getDevicePixelRatio(): number {
  if (typeof window === 'undefined') {
    return 1;
  }
  return window.devicePixelRatio || 1;
}

/**
 * Check if the browser supports passive event listeners
 */
export function supportsPassiveEvents(): boolean {
  let passiveSupported = false;
  try {
    const options = {
      get passive() {
        passiveSupported = true;
        return false;
      },
    };
    // @ts-expect-error - Testing passive support
    window.addEventListener('test', null, options);
    // @ts-expect-error - Testing passive support
    window.removeEventListener('test', null, options);
  } catch {
    passiveSupported = false;
  }
  return passiveSupported;
}

/**
 * Get passive event listener options
 */
export function getPassiveOptions(): AddEventListenerOptions | boolean {
  return supportsPassiveEvents() ? { passive: true } : false;
}

/**
 * Get non-passive event listener options (for preventing default)
 */
export function getNonPassiveOptions(): AddEventListenerOptions | boolean {
  return supportsPassiveEvents() ? { passive: false } : false;
}

/**
 * Check if the browser supports pointer events
 */
export function supportsPointerEvents(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return 'PointerEvent' in window;
}

/**
 * Get viewport dimensions
 */
export function getViewportDimensions(): { width: number; height: number } {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}
