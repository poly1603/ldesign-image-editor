/**
 * @image-editor/core
 * Core library for image editor plugin - zero dependencies
 */

// Types
export type {
  EditorOptions,
  EditorInterface,
  HistoryState,
  HistoryManagerInterface,
} from './types/editor.types';

export type {
  Plugin,
  PluginConstructor,
  PluginContext,
  TextLayer,
  MosaicPluginInterface,
  TextPluginInterface,
  FilterPluginInterface,
} from './types/plugin.types';

export type {
  EditorEvents,
  EventHandler,
  EventListenerOptions,
  PointerEventData,
  GestureEventData,
  EventEmitter,
} from './types/event.types';

export type {
  ExportFormat,
  ExportDataType,
  DeviceType,
  ExportOptions,
  MosaicConfig,
  TextConfig,
  FilterConfig,
  EditorConfig,
  DeepPartial,
} from './types/config.types';

// Constants
export {
  DEFAULT_EDITOR_CONFIG,
  DEFAULT_MOSAIC_CONFIG,
  DEFAULT_TEXT_CONFIG as DEFAULT_TEXT_STYLE,
  DEFAULT_FILTER_CONFIG,
  DEFAULT_EXPORT_OPTIONS,
} from './constants/defaults';

export {
  EDITOR_EVENTS,
  PLUGIN_EVENTS,
  CANVAS_EVENTS,
} from './constants/events';

// DOM utilities
export {
  getElement,
  createCanvas,
  getContext2D,
  getElementRect,
  getRelativeCoordinates,
  setCanvasSize,
  clearCanvas,
  fillCanvas,
  setStyles,
  removeElement,
  isInViewport,
} from './utils/dom.utils';

// Image utilities
export {
  loadImage,
  getImageDimensions,
  calculateAspectRatioFit,
  safeCalculateAspectRatioFit,
  drawImageToCanvas,
  getImageData,
  putImageData,
  cloneImageData,
  createImageData,
  canvasToDataURL,
  canvasToBlob,
  createScaledCanvas,
  cropCanvas,
  rotateCanvas,
  flipCanvas,
} from './utils/image.utils';
export type { LoadImageOptions } from './utils/image.utils';

// Event utilities
export {
  normalizePointerEvent,
  getTouchDistance,
  getTouchCenter,
  createPinchEvent,
  createPanEvent,
  throttle,
  debounce,
  preventDefault,
  stopPropagation,
  addEventListenerWithCleanup,
} from './utils/event.utils';

// Device utilities
export {
  isTouchDevice,
  isMobileDevice,
  isIOSDevice,
  isAndroidDevice,
  detectDeviceType,
  getResolvedDeviceType,
  getDevicePixelRatio,
  supportsPassiveEvents,
  getPassiveOptions,
  getNonPassiveOptions,
  supportsPointerEvents,
  getViewportDimensions,
} from './utils/device.utils';

// Export utilities
export {
  exportImage,
  exportToPNG,
  exportToJPEG,
  exportToWebP,
  downloadImage,
  copyImageToClipboard,
  isClipboardSupported,
  isFormatSupported,
  getSupportedFormats,
  dataUrlToBlob,
  blobToDataUrl,
  estimateFileSize,
  formatFileSize,
  getImageInfo,
  getMimeType,
  supportsTransparency,
  supportsQuality,
} from './utils/export.utils';
export { createPlaceholder } from './utils/placeholder';
export type { PlaceholderOptions } from './utils/placeholder';

// Math utilities
export {
  clamp,
  lerp,
  inverseLerp,
  remap,
  distance,
  distanceSquared,
  angle,
  angleDegrees,
  degreesToRadians,
  radiansToDegrees,
  normalizeAngle,
  rotatePoint,
  midpoint,
  isPointInRect,
  isPointInCircle,
  doRectsIntersect,
  getRectsIntersection,
  scaleRectFromCenter,
  roundTo,
  smoothstep,
  smootherstep,
  randomRange,
  randomInt,
} from './utils/math.utils';
export type { Point as MathPoint, Rect as MathRect } from './utils/math.utils';

// Color utilities
export {
  hexToRgb,
  hexToRgba,
  rgbToHex,
  rgbaToHex,
  rgbToHsl,
  hslToRgb,
  rgbToHsv,
  hsvToRgb,
  parseColor,
  rgbaToCss,
  mixColors,
  lighten,
  darken,
  saturate,
  desaturate,
  getComplementary,
  invertColor,
  toGrayscale,
  getLuminance,
  getContrastRatio,
  isLightColor,
  getContrastingTextColor,
} from './utils/color.utils';
export type {
  RGB,
  RGBA,
  HSL,
  HSLA,
  HSV,
} from './utils/color.utils';

// Managers
export { EventManager } from './managers/EventManager';
export type { ExtendedEventListenerOptions } from './managers/EventManager';
export { ConfigManager } from './managers/ConfigManager';
export { HistoryManager } from './managers/HistoryManager';
export { PluginManager } from './managers/PluginManager';
export { KeyboardManager, createEditorShortcuts } from './managers/KeyboardManager';
export type { ShortcutConfig, ShortcutGroup } from './managers/KeyboardManager';

// Core
export { Editor } from './core/Editor';
export { Canvas } from './core/Canvas';

// Plugins
export { BasePlugin } from './plugins/base/BasePlugin';

export { MosaicPlugin } from './plugins/mosaic/MosaicPlugin';
export {
  applyMosaicToRegion,
  applyMosaicAlongPath,
  applyMosaicToCircularRegion,
  interpolatePoints,
} from './plugins/mosaic/mosaic.utils';

export { TextPlugin } from './plugins/text/TextPlugin';
export { TextLayerManager, DEFAULT_TEXT_CONFIG } from './plugins/text/TextLayer';
export {
  buildFontString,
  measureText,
  getTextBoundingBox,
  isPointInTextLayer,
  findTextLayerAtPoint,
  renderTextLayer,
  renderAllTextLayers,
} from './plugins/text/text.utils';

export { FilterPlugin } from './plugins/filter/FilterPlugin';
export {
  applyBrightness,
  applyContrast,
  applySaturation,
  applyBlur,
  applyGrayscale,
  applySepia,
  applyInvert,
} from './plugins/filter/filters';

// UI Components
export { Toolbar } from './ui/Toolbar';
export type { ToolbarOptions, ToolName } from './ui/Toolbar';
export { icons } from './ui/icons';
export type { IconName } from './ui/icons';
export { injectStyles, toolbarStyles } from './ui/toolbar.styles';
export { ShapeLayerManager } from './ui/ShapeLayer';
export type { Shape, ShapeType, ShapeStyle, Point, PenShape, RectShape, CircleShape, ArrowShape, TextShape, LineShape, TriangleShape } from './ui/ShapeLayer';

// Crop Tool
export { CropTool, applyCropToCanvas } from './ui/CropTool';
export type { CropToolOptions, CropRect, CropRatio } from './ui/CropTool';

// Context Menu
export { ContextMenu, createShapeMenuItems } from './ui/ContextMenu';
export type { MenuItemConfig, ContextMenuOptions } from './ui/ContextMenu';

// Export Dialog
export { ExportDialog, applyWatermark } from './ui/ExportDialog';
export type { ExportDialogOptions, ExportDialogResult } from './ui/ExportDialog';

// Rulers
export { Rulers, createRulers } from './ui/Rulers';
export type { RulersOptions } from './ui/Rulers';

// i18n
export { I18n, getI18n, t, zhCN, enUS } from './i18n';
export type { SupportedLocale, LocaleKey, LocaleMessages } from './i18n';

// Version
export const VERSION = '0.2.0';
