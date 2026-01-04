/**
 * English language pack (US)
 */
import type { LocaleMessages } from './zh-CN';

export const enUS: LocaleMessages = {
  // Tool names
  'tool.move': 'Move',
  'tool.pen': 'Pen',
  'tool.rect': 'Rectangle',
  'tool.circle': 'Circle',
  'tool.arrow': 'Arrow',
  'tool.line': 'Line',
  'tool.triangle': 'Triangle',
  'tool.text': 'Text',
  'tool.mosaic': 'Mosaic',
  'tool.eraser': 'Eraser',
  'tool.crop': 'Crop',
  'tool.filter': 'Filter',

  // Zoom controls
  'zoom.in': 'Zoom In',
  'zoom.out': 'Zoom Out',
  'zoom.reset': 'Reset View',
  'zoom.fitScreen': 'Fit to Screen',

  // History controls
  'history.undo': 'Undo',
  'history.redo': 'Redo',

  // Export
  'export.button': 'Export',
  'export.title': 'Export Image',
  'export.format': 'Format',
  'export.quality': 'Quality',
  'export.size': 'Size',
  'export.original': 'Original Size',
  'export.custom': 'Custom',
  'export.width': 'Width',
  'export.height': 'Height',
  'export.keepRatio': 'Keep Ratio',
  'export.watermark': 'Watermark',
  'export.watermarkText': 'Text Watermark',
  'export.watermarkImage': 'Image Watermark',
  'export.preview': 'Preview',
  'export.download': 'Download',
  'export.cancel': 'Cancel',

  // Panels
  'panel.draw': 'Drawing Settings',
  'panel.strokeWidth': 'Stroke Width',
  'panel.strokeColor': 'Color',
  'panel.fillColor': 'Fill Color',
  'panel.strokeStyle': 'Stroke Style',
  'panel.solid': 'Solid',
  'panel.dashed': 'Dashed',
  'panel.dotted': 'Dotted',
  'panel.fill': 'Fill',
  'panel.stroke': 'Stroke',
  'panel.both': 'Stroke + Fill',

  'panel.mosaic': 'Mosaic Settings',
  'panel.brushSize': 'Brush Size',
  'panel.blockSize': 'Block Size',

  'panel.text': 'Text Settings',
  'panel.textHint': 'Click on image to add text',
  'panel.fontSize': 'Font Size',
  'panel.fontFamily': 'Font',
  'panel.fontStyle': 'Style',
  'panel.bold': 'Bold',
  'panel.italic': 'Italic',
  'panel.underline': 'Underline',
  'panel.textStroke': 'Text Stroke',
  'panel.textStrokeWidth': 'Stroke Width',
  'panel.textStrokeColor': 'Stroke Color',

  'panel.eraser': 'Eraser Settings',
  'panel.eraserSize': 'Eraser Size',
  'panel.eraserMode': 'Eraser Mode',
  'panel.eraserShape': 'Erase Shapes',
  'panel.eraserPixel': 'Erase Pixels',

  // Filter
  'filter.title': 'Filter Adjustments',
  'filter.brightness': 'Brightness',
  'filter.contrast': 'Contrast',
  'filter.saturation': 'Saturation',
  'filter.blur': 'Blur',
  'filter.grayscale': 'Grayscale',
  'filter.sepia': 'Sepia',
  'filter.invert': 'Invert',
  'filter.presets': 'Preset Filters',
  'filter.preset.original': 'Original',
  'filter.preset.vintage': 'Vintage',
  'filter.preset.cold': 'Cold',
  'filter.preset.warm': 'Warm',
  'filter.preset.grayscale': 'B&W',
  'filter.reset': 'Reset',
  'filter.apply': 'Apply',

  // Crop
  'crop.title': 'Crop',
  'crop.ratio': 'Aspect Ratio',
  'crop.free': 'Free',
  'crop.square': 'Square 1:1',
  'crop.ratio43': 'Standard 4:3',
  'crop.ratio169': 'Wide 16:9',
  'crop.ratio32': 'Photo 3:2',
  'crop.rotate': 'Rotate',
  'crop.rotateLeft': 'Rotate Left 90°',
  'crop.rotateRight': 'Rotate Right 90°',
  'crop.flipH': 'Flip Horizontal',
  'crop.flipV': 'Flip Vertical',
  'crop.apply': 'Apply Crop',
  'crop.cancel': 'Cancel',

  // Ruler & Grid
  'ruler.show': 'Show Rulers',
  'ruler.hide': 'Hide Rulers',
  'grid.show': 'Show Grid',
  'grid.hide': 'Hide Grid',

  // Context Menu
  'context.copy': 'Copy',
  'context.paste': 'Paste',
  'context.delete': 'Delete',
  'context.bringToFront': 'Bring to Front',
  'context.sendToBack': 'Send to Back',
  'context.bringForward': 'Bring Forward',
  'context.sendBackward': 'Send Backward',
  'context.duplicate': 'Duplicate',

  // Messages
  'message.exportSuccess': 'Export successful',
  'message.exportFailed': 'Export failed',
  'message.loadImageFailed': 'Failed to load image',
  'message.noImageLoaded': 'Please load an image first',
  'message.cropApplied': 'Crop applied',
  'message.filterApplied': 'Filter applied',
  'message.copied': 'Copied',
  'message.pasted': 'Pasted',

  // Placeholder
  'placeholder.title': 'Click or drag image here',
  'placeholder.subtitle': 'Supports JPG, PNG, WebP formats',

  // Keyboard shortcuts hints
  'shortcut.undo': 'Ctrl+Z',
  'shortcut.redo': 'Ctrl+Y',
  'shortcut.copy': 'Ctrl+C',
  'shortcut.paste': 'Ctrl+V',
  'shortcut.delete': 'Delete',
  'shortcut.escape': 'Esc',
  'shortcut.zoomIn': '+',
  'shortcut.zoomOut': '-',
};
