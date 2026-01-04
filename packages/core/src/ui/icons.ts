/**
 * SVG Icons - Lucide-style icons for the toolbar
 */

const createSvg = (paths: string, size = 20): string => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  ${paths}
</svg>`.trim();

export const icons = {
  // Move/Hand
  move: createSvg(`
    <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/>
    <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/>
    <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/>
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
  `),

  // Brush/Pencil
  brush: createSvg(`
    <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/>
    <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/>
  `),

  // Text/Type
  type: createSvg(`
    <polyline points="4 7 4 4 20 4 20 7"/>
    <line x1="9" y1="20" x2="15" y2="20"/>
    <line x1="12" y1="4" x2="12" y2="20"/>
  `),

  // Zoom In
  zoomIn: createSvg(`
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    <line x1="11" y1="8" x2="11" y2="14"/>
    <line x1="8" y1="11" x2="14" y2="11"/>
  `),

  // Zoom Out
  zoomOut: createSvg(`
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    <line x1="8" y1="11" x2="14" y2="11"/>
  `),

  // Undo
  undo: createSvg(`
    <path d="M3 7v6h6"/>
    <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>
  `),

  // Redo
  redo: createSvg(`
    <path d="M21 7v6h-6"/>
    <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/>
  `),

  // Download
  download: createSvg(`
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  `),

  // Reset/RotateCcw
  reset: createSvg(`
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  `),

  // Plus
  plus: createSvg(`
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  `),

  // Minus
  minus: createSvg(`
    <line x1="5" y1="12" x2="19" y2="12"/>
  `),

  // Check
  check: createSvg(`
    <polyline points="20 6 9 17 4 12"/>
  `),

  // X/Close
  close: createSvg(`
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  `),

  // Upload
  upload: createSvg(`
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  `),

  // Settings/Sliders
  settings: createSvg(`
    <line x1="4" y1="21" x2="4" y2="14"/>
    <line x1="4" y1="10" x2="4" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12" y2="3"/>
    <line x1="20" y1="21" x2="20" y2="16"/>
    <line x1="20" y1="12" x2="20" y2="3"/>
    <line x1="1" y1="14" x2="7" y2="14"/>
    <line x1="9" y1="8" x2="15" y2="8"/>
    <line x1="17" y1="16" x2="23" y2="16"/>
  `),

  // Pen/Pencil (free draw)
  pen: createSvg(`
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
    <path d="m15 5 4 4"/>
  `),

  // Rectangle/Square
  rect: createSvg(`
    <rect x="3" y="3" width="18" height="18" rx="2"/>
  `),

  // Circle
  circle: createSvg(`
    <circle cx="12" cy="12" r="10"/>
  `),

  // Arrow
  arrow: createSvg(`
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  `),

  // Mosaic/Blur
  mosaic: createSvg(`
    <circle cx="12" cy="12" r="3"/>
    <circle cx="12" cy="12" r="6" opacity="0.6"/>
    <circle cx="12" cy="12" r="9" opacity="0.3"/>
  `),

  // Crop
  crop: createSvg(`
    <path d="M6 2v14a2 2 0 0 0 2 2h14"/>
    <path d="M18 22V8a2 2 0 0 0-2-2H2"/>
  `),

  // Filter/Adjustments
  filter: createSvg(`
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2a10 10 0 0 0 0 20"/>
    <path d="M12 2a10 10 0 0 1 0 20"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
  `),

  // Eraser
  eraser: createSvg(`
    <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/>
    <path d="M22 21H7"/>
    <path d="m5 11 9 9"/>
  `),

  // Line
  line: createSvg(`
    <path d="M4 20L20 4"/>
  `),

  // Triangle
  triangle: createSvg(`
    <path d="M12 3L22 21H2L12 3Z"/>
  `),

  // Rotate Left
  rotateLeft: createSvg(`
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  `),

  // Rotate Right
  rotateRight: createSvg(`
    <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
    <path d="M21 3v5h-5"/>
  `),

  // Flip Horizontal
  flipH: createSvg(`
    <path d="M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3"/>
    <path d="M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"/>
    <line x1="12" y1="2" x2="12" y2="22"/>
  `),

  // Flip Vertical
  flipV: createSvg(`
    <path d="M3 8V5a2 2 0 0 1 2-2h14c1.1 0 2 .9 2 2v3"/>
    <path d="M3 16v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
  `),

  // Ruler
  ruler: createSvg(`
    <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/>
    <path d="m14.5 12.5 2-2"/>
    <path d="m11.5 9.5 2-2"/>
    <path d="m8.5 6.5 2-2"/>
    <path d="m17.5 15.5 2-2"/>
  `),

  // Grid
  grid: createSvg(`
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <line x1="3" y1="9" x2="21" y2="9"/>
    <line x1="3" y1="15" x2="21" y2="15"/>
    <line x1="9" y1="3" x2="9" y2="21"/>
    <line x1="15" y1="3" x2="15" y2="21"/>
  `),

  // Sun (for brightness)
  sun: createSvg(`
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2"/>
    <path d="M12 20v2"/>
    <path d="m4.93 4.93 1.41 1.41"/>
    <path d="m17.66 17.66 1.41 1.41"/>
    <path d="M2 12h2"/>
    <path d="M20 12h2"/>
    <path d="m6.34 17.66-1.41 1.41"/>
    <path d="m19.07 4.93-1.41 1.41"/>
  `),

  // Contrast
  contrast: createSvg(`
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2a10 10 0 0 1 0 20z"/>
  `),

  // Image (for presets)
  image: createSvg(`
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="9" cy="9" r="2"/>
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
  `),

  // Layers
  layers: createSvg(`
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  `),

  // Bold
  bold: createSvg(`
    <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
    <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
  `),

  // Italic
  italic: createSvg(`
    <line x1="19" y1="4" x2="10" y2="4"/>
    <line x1="14" y1="20" x2="5" y2="20"/>
    <line x1="15" y1="4" x2="9" y2="20"/>
  `),

  // Underline
  underline: createSvg(`
    <path d="M6 4v6a6 6 0 0 0 12 0V4"/>
    <line x1="4" y1="20" x2="20" y2="20"/>
  `),

  // Dashed line
  dashed: createSvg(`
    <line x1="3" y1="12" x2="8" y2="12" stroke-dasharray="5,5"/>
    <line x1="11" y1="12" x2="16" y2="12" stroke-dasharray="5,5"/>
    <line x1="19" y1="12" x2="21" y2="12"/>
  `),

  // Fill
  fill: createSvg(`
    <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"/>
    <path d="m5 2 5 5"/>
    <path d="M2 13h15"/>
    <path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z"/>
  `),

  // Copy
  copy: createSvg(`
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
  `),

  // Clipboard/Paste
  paste: createSvg(`
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
  `),

  // Trash/Delete
  trash: createSvg(`
    <path d="M3 6h18"/>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
  `),

  // Watermark
  watermark: createSvg(`
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
    <path d="m9 12 2 2 4-4"/>
  `),

  // More/Menu
  more: createSvg(`
    <circle cx="12" cy="12" r="1"/>
    <circle cx="19" cy="12" r="1"/>
    <circle cx="5" cy="12" r="1"/>
  `),
};

export type IconName = keyof typeof icons;
