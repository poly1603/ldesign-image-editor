/**
 * Toolbar CSS styles
 */

export const toolbarStyles = `
/* Default (Dark theme) variables */
.ie-editor-wrapper {
  --ie-bg: #1e1e1e;
  --ie-canvas-bg: #1a1a1a;
  --ie-toolbar-bg: #2d2d2d;
  --ie-toolbar-border: rgba(255,255,255,0.1);
  --ie-btn-color: rgba(255,255,255,0.7);
  --ie-btn-hover-bg: rgba(255,255,255,0.1);
  --ie-btn-hover-color: #fff;
  --ie-btn-active-bg: #667eea;
  --ie-btn-active-color: #fff;
  --ie-text-color: #fff;
  --ie-text-muted: rgba(255,255,255,0.5);
  --ie-divider: rgba(255,255,255,0.1);
  --ie-panel-bg: #333;
  --ie-input-bg: #222;
  --ie-input-border: #444;
  --ie-shadow: rgba(0,0,0,0.4);
  --ie-radius: 8px;
  --ie-transition: 0.15s ease;
  
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: var(--ie-bg);
  color: var(--ie-text-color);
  user-select: none;
  box-sizing: border-box;
  overflow: visible;
}

/* Light theme */
.ie-editor-wrapper.ie-theme-light {
  --ie-bg: #f5f5f5;
  --ie-canvas-bg: #f5f5f5;
  --ie-toolbar-bg: #ffffff;
  --ie-toolbar-border: rgba(0,0,0,0.1);
  --ie-btn-color: rgba(0,0,0,0.7);
  --ie-btn-hover-bg: rgba(0,0,0,0.08);
  --ie-btn-hover-color: #000;
  --ie-btn-active-bg: #667eea;
  --ie-btn-active-color: #fff;
  --ie-text-color: #333;
  --ie-text-muted: rgba(0,0,0,0.5);
  --ie-divider: rgba(0,0,0,0.1);
  --ie-panel-bg: #ffffff;
  --ie-input-bg: #f0f0f0;
  --ie-input-border: #ddd;
  --ie-shadow: rgba(0,0,0,0.15);
}

.ie-canvas-container {
  position: relative;
  flex: 1;
  width: 100%;
  min-height: 0;
  overflow: hidden;
  background: var(--ie-canvas-bg);
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ie-canvas-container.grabbing {
  cursor: grabbing !important;
}

.ie-canvas-container.tool-draw {
  cursor: crosshair;
}

.ie-canvas-container.tool-text {
  cursor: text;
}

.ie-canvas-container.tool-move {
  cursor: grab;
}

.ie-canvas-container.tool-move.grabbing {
  cursor: grabbing;
}

.ie-canvas-viewport {
  transform-origin: center center;
  transition: none;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
  backface-visibility: hidden;
}

.ie-canvas-viewport canvas {
  display: block;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

.ie-toolbar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 16px;
  background: var(--ie-toolbar-bg);
  border-top: 1px solid var(--ie-toolbar-border);
  flex-shrink: 0;
  transition: height 0.3s ease, padding 0.3s ease, opacity 0.3s ease, border-width 0.3s ease;
  overflow: visible;
}

.ie-toolbar.ie-toolbar-hidden {
  height: 0;
  padding: 0;
  border-top-width: 0;
  opacity: 0;
  pointer-events: none;
  overflow: hidden;
}

.ie-toolbar-group {
  display: flex;
  align-items: center;
  gap: 4px;
}

.ie-toolbar-divider {
  width: 1px;
  height: 24px;
  background: var(--ie-divider);
  margin: 0 6px;
}

.ie-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: var(--ie-btn-color);
  cursor: pointer;
  transition: all var(--ie-transition);
}

.ie-btn:hover:not(:disabled) {
  background: var(--ie-btn-hover-bg);
  color: var(--ie-btn-hover-color);
}

.ie-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ie-btn.active {
  background: var(--ie-btn-active-bg);
  color: var(--ie-btn-active-color);
}

.ie-btn svg {
  width: 20px;
  height: 20px;
}

.ie-btn-export {
  width: auto;
  padding: 0 14px;
  gap: 6px;
  background: var(--ie-btn-active-bg);
  color: #fff;
  font-size: 13px;
}

.ie-btn-export:hover:not(:disabled) {
  background: var(--ie-btn-active-bg);
  filter: brightness(0.9);
}

.ie-btn-export span {
  font-weight: 500;
}

.ie-zoom-text {
  min-width: 50px;
  text-align: center;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  color: var(--ie-text-muted);
}

/* Settings Panel */
.ie-panel {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(0);
  margin-bottom: 12px;
  width: 240px;
  padding: 16px;
  background: var(--ie-panel-bg);
  border: 1px solid var(--ie-toolbar-border);
  border-radius: 12px;
  box-shadow: 0 8px 32px var(--ie-shadow), 0 0 0 1px rgba(255,255,255,0.05) inset;
  z-index: 100;
  opacity: 1;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.ie-panel.ie-panel-hidden {
  opacity: 0;
  transform: translateX(-50%) translateY(8px);
  pointer-events: none;
}

.ie-panel::before {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 12px;
  height: 12px;
  background: var(--ie-panel-bg);
  border-right: 1px solid var(--ie-toolbar-border);
  border-bottom: 1px solid var(--ie-toolbar-border);
}

.ie-panel-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--ie-text-color);
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--ie-divider);
}

.ie-panel-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.ie-panel-row:last-child {
  margin-bottom: 0;
}

.ie-panel-label {
  font-size: 12px;
  color: var(--ie-text-muted);
}

.ie-panel-value {
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  color: var(--ie-text-muted);
  min-width: 36px;
  text-align: center;
}

.ie-size-control {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--ie-input-bg);
  padding: 4px 6px;
  border-radius: 8px;
}

.ie-size-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: var(--ie-btn-color);
  cursor: pointer;
  transition: all 0.15s;
}

.ie-size-btn:hover {
  background: var(--ie-btn-hover-bg);
  color: var(--ie-btn-hover-color);
}

.ie-size-btn:active {
  transform: scale(0.95);
}

.ie-size-btn svg {
  width: 14px;
  height: 14px;
}

.ie-slider {
  flex: 1;
  height: 4px;
  appearance: none;
  background: var(--ie-btn-hover-bg);
  border-radius: 2px;
  outline: none;
}

.ie-slider::-webkit-slider-thumb {
  appearance: none;
  width: 14px;
  height: 14px;
  background: var(--ie-btn-active-bg);
  border-radius: 50%;
  cursor: pointer;
}

/* Range slider for mosaic panel */
.ie-slider-row {
  flex-wrap: wrap;
  gap: 10px;
}

.ie-slider-row .ie-panel-label {
  width: 60px;
  flex-shrink: 0;
}

.ie-slider-row .ie-panel-value {
  width: 32px;
  text-align: center;
  background: var(--ie-input-bg);
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 11px;
}

.ie-range-slider {
  flex: 1;
  min-width: 80px;
  height: 6px;
  appearance: none;
  background: var(--ie-divider);
  border-radius: 3px;
  outline: none;
  cursor: pointer;
}

.ie-range-slider::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  background: var(--ie-btn-active-bg);
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.ie-range-slider::-webkit-slider-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 3px 10px rgba(0,0,0,0.3);
}

.ie-range-slider::-webkit-slider-thumb:active {
  transform: scale(1.05);
}

.ie-range-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: var(--ie-btn-active-bg);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.ie-color-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ie-color-input {
  width: 36px;
  height: 28px;
  padding: 3px;
  border: 2px solid var(--ie-input-border);
  border-radius: 6px;
  background: var(--ie-input-bg);
  cursor: pointer;
  transition: border-color 0.15s;
}

.ie-color-input:hover {
  border-color: var(--ie-btn-active-bg);
}

.ie-color-hex {
  font-size: 11px;
  font-family: 'SF Mono', Monaco, monospace;
  color: var(--ie-text-muted);
  text-transform: uppercase;
}

/* Text Input */
.ie-text-input-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.5);
  z-index: 200;
}

.ie-text-input-box {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: var(--ie-panel-bg);
  border-radius: var(--ie-radius);
  box-shadow: 0 4px 20px var(--ie-shadow);
}

.ie-text-field {
  width: 200px;
  padding: 10px 12px;
  background: var(--ie-input-bg);
  border: 1px solid var(--ie-input-border);
  border-radius: 6px;
  color: var(--ie-text-color);
  font-size: 14px;
  outline: none;
}

.ie-text-field:focus {
  border-color: var(--ie-btn-active-bg);
}

.ie-text-confirm {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  background: var(--ie-btn-active-bg);
  border: none;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
}

.ie-text-confirm:hover {
  filter: brightness(0.9);
}

.ie-text-confirm svg {
  width: 18px;
  height: 18px;
}

/* Zoom badge */
.ie-zoom-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 8px;
  background: rgba(0,0,0,0.6);
  border-radius: 4px;
  font-size: 11px;
  color: #fff;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.ie-zoom-badge.ie-zoom-badge-hidden {
  opacity: 0;
}

/* Custom brush cursor */
.ie-brush-cursor {
  position: absolute;
  pointer-events: none;
  border: 2px solid var(--ie-btn-active-bg);
  border-radius: 50%;
  background: color-mix(in srgb, var(--ie-btn-active-bg) 15%, transparent);
  transform: translate(-50%, -50%);
  z-index: 100;
  transition: width 0.1s, height 0.1s;
}

.ie-canvas-container.tool-brush {
  cursor: none;
}

.ie-canvas-container.tool-draw {
  cursor: crosshair;
}

/* Inline text editing */
.ie-inline-text-container {
  position: absolute;
  z-index: 200;
  transform: translate(-2px, -50%);
}

.ie-inline-text-input {
  min-width: 20px;
  max-width: 400px;
  padding: 4px 8px;
  background: var(--ie-panel-bg);
  border: 2px solid var(--ie-btn-active-bg);
  border-radius: 4px;
  outline: none;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.3;
  cursor: text;
}

.ie-inline-text-input:empty:before {
  content: attr(data-placeholder);
  color: var(--ie-text-muted);
  pointer-events: none;
}

/* Text style floating bar */
.ie-text-style-bar {
  position: absolute;
  z-index: 201;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  background: var(--ie-toolbar-bg);
  border: 1px solid var(--ie-toolbar-border);
  border-radius: 6px;
  box-shadow: 0 4px 12px var(--ie-shadow);
}

.ie-style-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 4px;
  color: var(--ie-btn-color);
  cursor: pointer;
  transition: all 0.15s;
}

.ie-style-btn:hover {
  background: var(--ie-btn-hover-bg);
  color: var(--ie-btn-hover-color);
}

.ie-style-btn svg {
  width: 16px;
  height: 16px;
}

.ie-style-confirm {
  background: #667eea;
  color: #fff;
}

.ie-style-confirm:hover {
  background: #5a6fd6;
}

.ie-style-value {
  min-width: 28px;
  text-align: center;
  font-size: 12px;
  color: var(--ie-btn-color);
  font-variant-numeric: tabular-nums;
}

.ie-style-color {
  width: 28px;
  height: 28px;
  padding: 2px;
  border: none;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
}

.ie-style-divider {
  width: 1px;
  height: 20px;
  background: var(--ie-divider);
  margin: 0 4px;
}

.ie-panel-text-hint {
  width: auto;
  min-width: 120px;
}

/* ========== Crop Tool ========== */
.ie-crop-overlay {
  position: absolute;
  inset: 0;
  z-index: 500;
  background: transparent;
}

.ie-crop-mask {
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  pointer-events: none;
}

.ie-crop-box {
  position: absolute;
  border: 2px solid #fff;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.3), 0 0 10px rgba(0,0,0,0.3);
  cursor: move;
}

.ie-crop-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.ie-crop-grid-h,
.ie-crop-grid-v {
  position: absolute;
  background: rgba(255,255,255,0.3);
}

.ie-crop-grid-h {
  left: 0;
  right: 0;
  height: 1px;
}

.ie-crop-grid-h:nth-child(1) { top: 33.33%; }
.ie-crop-grid-h:nth-child(2) { top: 66.66%; }

.ie-crop-grid-v {
  top: 0;
  bottom: 0;
  width: 1px;
}

.ie-crop-grid-v:nth-child(3) { left: 33.33%; }
.ie-crop-grid-v:nth-child(4) { left: 66.66%; }

.ie-crop-handle {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.3);
  border-radius: 2px;
}

.ie-crop-handle-nw { top: -6px; left: -6px; cursor: nw-resize; }
.ie-crop-handle-n { top: -6px; left: 50%; margin-left: -6px; cursor: n-resize; }
.ie-crop-handle-ne { top: -6px; right: -6px; cursor: ne-resize; }
.ie-crop-handle-e { top: 50%; right: -6px; margin-top: -6px; cursor: e-resize; }
.ie-crop-handle-se { bottom: -6px; right: -6px; cursor: se-resize; }
.ie-crop-handle-s { bottom: -6px; left: 50%; margin-left: -6px; cursor: s-resize; }
.ie-crop-handle-sw { bottom: -6px; left: -6px; cursor: sw-resize; }
.ie-crop-handle-w { top: 50%; left: -6px; margin-top: -6px; cursor: w-resize; }

.ie-crop-panel {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: var(--ie-toolbar-bg);
  border-radius: var(--ie-radius);
  box-shadow: 0 4px 20px var(--ie-shadow);
}

.ie-crop-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ie-crop-label {
  font-size: 12px;
  color: var(--ie-text-muted);
  margin-right: 4px;
}

.ie-crop-buttons {
  display: flex;
  gap: 4px;
}

.ie-crop-btn {
  padding: 6px 12px;
  background: var(--ie-btn-hover-bg);
  border: none;
  border-radius: 4px;
  color: var(--ie-btn-color);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
}

.ie-crop-btn:hover {
  background: var(--ie-btn-hover-bg);
  color: var(--ie-btn-hover-color);
}

.ie-crop-btn.active {
  background: var(--ie-btn-active-bg);
  color: #fff;
}

.ie-crop-btn-icon {
  width: 32px;
  padding: 6px;
}

.ie-crop-btn-icon svg {
  width: 18px;
  height: 18px;
}

.ie-crop-btn-cancel {
  background: transparent;
  border: 1px solid var(--ie-divider);
}

.ie-crop-btn-apply {
  background: var(--ie-btn-active-bg);
  color: #fff;
  display: flex;
  align-items: center;
  gap: 4px;
}

.ie-crop-btn-apply svg {
  width: 14px;
  height: 14px;
}

.ie-crop-actions {
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  padding: 8px 12px;
  background: var(--ie-toolbar-bg);
  border-radius: var(--ie-radius);
  box-shadow: 0 4px 12px var(--ie-shadow);
}

/* Crop toolbar buttons */
.ie-crop-action-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.ie-crop-toolbar-btn {
  width: auto !important;
  padding: 0 12px !important;
  gap: 4px;
  font-size: 13px;
}

.ie-crop-toolbar-btn span {
  font-weight: 500;
}

.ie-crop-toolbar-cancel {
  background: transparent;
  border: 1px solid var(--ie-divider);
}

.ie-crop-toolbar-cancel:hover {
  background: var(--ie-btn-hover-bg);
}

.ie-crop-toolbar-confirm {
  background: #10b981 !important;
  color: #fff !important;
}

.ie-crop-toolbar-confirm:hover {
  filter: brightness(0.9);
}

/* ========== Filter Panel ========== */
.ie-filter-panel {
  width: 280px;
}

.ie-filter-slider-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.ie-filter-slider-row:last-child {
  margin-bottom: 0;
}

.ie-filter-slider-label {
  width: 50px;
  font-size: 11px;
  color: var(--ie-text-muted);
}

.ie-filter-slider-value {
  width: 36px;
  font-size: 11px;
  text-align: right;
  color: var(--ie-text-muted);
  font-variant-numeric: tabular-nums;
}

.ie-filter-presets {
  display: flex;
  gap: 6px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--ie-divider);
}

.ie-filter-preset {
  flex: 1;
  padding: 6px 4px;
  background: var(--ie-btn-hover-bg);
  border: none;
  border-radius: 4px;
  color: var(--ie-btn-color);
  font-size: 10px;
  cursor: pointer;
  transition: all 0.15s;
}

.ie-filter-preset:hover {
  background: var(--ie-btn-hover-bg);
  color: var(--ie-btn-hover-color);
}

.ie-filter-preset.active {
  background: var(--ie-btn-active-bg);
  color: #fff;
}

.ie-filter-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.ie-filter-actions button {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.ie-filter-reset {
  background: var(--ie-btn-hover-bg);
  color: var(--ie-btn-color);
}

.ie-filter-apply {
  background: var(--ie-btn-active-bg);
  color: #fff;
}

/* ========== Context Menu ========== */
.ie-context-menu {
  position: fixed;
  min-width: 160px;
  padding: 6px 0;
  background: var(--ie-panel-bg, #2d2d2d);
  border: 1px solid var(--ie-toolbar-border, rgba(255,255,255,0.1));
  border-radius: 6px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  z-index: 10000;
}

.ie-context-menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  color: var(--ie-text-color, #fff);
  font-size: 13px;
  cursor: pointer;
  transition: background 0.1s;
}

.ie-context-menu-item:hover:not(.disabled) {
  background: var(--ie-btn-hover-bg, rgba(255,255,255,0.1));
}

.ie-context-menu-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ie-context-menu-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  color: var(--ie-text-muted, rgba(255,255,255,0.5));
}

.ie-context-menu-icon svg {
  width: 16px;
  height: 16px;
}

.ie-context-menu-label {
  flex: 1;
}

.ie-context-menu-shortcut {
  font-size: 11px;
  color: var(--ie-text-muted, rgba(255,255,255,0.5));
}

.ie-context-menu-divider {
  height: 1px;
  margin: 6px 12px;
  background: var(--ie-divider, rgba(255,255,255,0.1));
}

/* ========== Export Dialog ========== */
.ie-export-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.6);
  z-index: 10000;
}

.ie-export-dialog {
  width: 420px;
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  background: var(--ie-panel-bg, #2d2d2d);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
}

.ie-export-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--ie-divider, rgba(255,255,255,0.1));
}

.ie-export-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--ie-text-color, #fff);
}

.ie-export-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: var(--ie-btn-color, rgba(255,255,255,0.7));
  cursor: pointer;
}

.ie-export-close:hover {
  background: var(--ie-btn-hover-bg, rgba(255,255,255,0.1));
}

.ie-export-close svg {
  width: 18px;
  height: 18px;
}

.ie-export-body {
  padding: 20px;
}

.ie-export-section {
  margin-bottom: 20px;
}

.ie-export-section:last-child {
  margin-bottom: 0;
}

.ie-export-label {
  display: block;
  margin-bottom: 8px;
  font-size: 12px;
  color: var(--ie-text-muted, rgba(255,255,255,0.5));
}

.ie-export-format-buttons {
  display: flex;
  gap: 8px;
}

.ie-export-format-btn {
  flex: 1;
  padding: 10px;
  background: var(--ie-btn-hover-bg, rgba(255,255,255,0.1));
  border: 2px solid transparent;
  border-radius: 6px;
  color: var(--ie-btn-color, rgba(255,255,255,0.7));
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;
}

.ie-export-format-btn:hover {
  background: var(--ie-btn-hover-bg, rgba(255,255,255,0.15));
}

.ie-export-format-btn.active {
  border-color: var(--ie-btn-active-bg, #667eea);
  color: var(--ie-btn-active-bg, #667eea);
}

.ie-export-size-inputs {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ie-export-input {
  flex: 1;
  padding: 10px 12px;
  background: var(--ie-input-bg, #222);
  border: 1px solid var(--ie-input-border, #444);
  border-radius: 6px;
  color: var(--ie-text-color, #fff);
  font-size: 14px;
}

.ie-export-input:focus {
  outline: none;
  border-color: var(--ie-btn-active-bg, #667eea);
}

.ie-export-link-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: transparent;
  border: 1px solid var(--ie-input-border, #444);
  border-radius: 6px;
  color: var(--ie-btn-color, rgba(255,255,255,0.7));
  cursor: pointer;
}

.ie-export-link-btn.active {
  background: var(--ie-btn-active-bg, #667eea);
  border-color: var(--ie-btn-active-bg, #667eea);
  color: #fff;
}

.ie-export-quality {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ie-export-quality-slider {
  flex: 1;
}

.ie-export-quality-value {
  min-width: 40px;
  text-align: right;
  font-size: 13px;
  color: var(--ie-text-muted, rgba(255,255,255,0.5));
}

.ie-export-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  background: var(--ie-input-bg, #222);
  border-radius: 6px;
  overflow: hidden;
}

.ie-export-preview img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.ie-export-footer {
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid var(--ie-divider, rgba(255,255,255,0.1));
}

.ie-export-footer button {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.ie-export-cancel {
  background: var(--ie-btn-hover-bg, rgba(255,255,255,0.1));
  color: var(--ie-btn-color, rgba(255,255,255,0.7));
}

.ie-export-download {
  background: var(--ie-btn-active-bg, #667eea);
  color: #fff;
}

/* ========== Eraser Tool ========== */
.ie-panel-eraser {
  width: 200px;
}

.ie-eraser-mode {
  display: flex;
  gap: 6px;
  margin-top: 8px;
}

.ie-eraser-mode-btn {
  flex: 1;
  padding: 8px;
  background: var(--ie-btn-hover-bg);
  border: none;
  border-radius: 4px;
  color: var(--ie-btn-color);
  font-size: 11px;
  cursor: pointer;
}

.ie-eraser-mode-btn.active {
  background: var(--ie-btn-active-bg);
  color: #fff;
}

/* ========== Tooltip ========== */
.ie-tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 14px;
  background: var(--ie-panel-bg);
  border: 1px solid var(--ie-toolbar-border);
  border-radius: 8px;
  box-shadow: 0 4px 16px var(--ie-shadow);
  white-space: nowrap;
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.2s 0.3s, visibility 0.2s 0.3s;
}

.ie-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: var(--ie-panel-bg);
}

.ie-btn:hover .ie-tooltip {
  opacity: 1;
  visibility: visible;
  transition-delay: 0.3s;
}

.ie-tooltip-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--ie-text-color);
  margin-bottom: 2px;
}

.ie-tooltip-desc {
  font-size: 11px;
  color: var(--ie-text-muted);
  margin-bottom: 4px;
}

.ie-tooltip-shortcut {
  display: inline-block;
  padding: 2px 6px;
  background: var(--ie-btn-hover-bg);
  border-radius: 4px;
  font-size: 10px;
  font-family: monospace;
  color: var(--ie-text-muted);
}

/* Filter panel button styles */
.ie-btn-row {
  display: flex;
  gap: 10px;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid var(--ie-divider);
}

.ie-btn-apply,
.ie-btn-reset {
  flex: 1;
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}

.ie-btn-apply {
  background: var(--ie-btn-active-bg);
  color: #fff;
}

.ie-btn-apply:hover {
  filter: brightness(1.05);
  transform: translateY(-1px);
}

.ie-btn-apply:active {
  transform: translateY(0);
}

.ie-btn-reset {
  background: var(--ie-btn-hover-bg);
  color: var(--ie-btn-color);
}

.ie-btn-reset:hover {
  background: var(--ie-divider);
}

/* Mode button group */
.ie-btn-group {
  display: flex;
  gap: 6px;
  background: var(--ie-input-bg);
  padding: 4px;
  border-radius: 8px;
}

.ie-mode-btn {
  padding: 8px 14px;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: var(--ie-btn-color);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
}

.ie-mode-btn.active {
  background: var(--ie-btn-active-bg);
  color: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

.ie-mode-btn:hover:not(.active) {
  background: var(--ie-btn-hover-bg);
}

/* Filter panel specific */
.ie-panel-filter {
  width: 300px;
}

/* Filter presets grid */
.ie-filter-presets {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--ie-divider);
}

.ie-filter-preset {
  padding: 10px 6px;
  background: var(--ie-btn-hover-bg);
  border: 2px solid transparent;
  border-radius: 8px;
  color: var(--ie-btn-color);
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  text-align: center;
}

.ie-filter-preset:hover {
  background: var(--ie-divider);
  transform: translateY(-1px);
}

.ie-filter-preset.active {
  border-color: var(--ie-btn-active-bg);
  background: rgba(102, 126, 234, 0.15);
  color: var(--ie-btn-active-bg);
}

/* Font select in text style bar */
.ie-style-select {
  padding: 4px 8px;
  background: var(--ie-input-bg);
  border: 1px solid var(--ie-input-border);
  border-radius: 4px;
  color: var(--ie-text-color);
  font-size: 12px;
  cursor: pointer;
  outline: none;
}

.ie-style-select:focus {
  border-color: var(--ie-btn-active-bg);
}

/* ========== Drop zone indicator ========== */
.ie-drop-zone {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: rgba(102, 126, 234, 0.1);
  border: 2px dashed var(--ie-btn-active-bg);
  border-radius: 12px;
  z-index: 1000;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.ie-drop-zone.active {
  opacity: 1;
}

.ie-drop-zone-icon {
  width: 48px;
  height: 48px;
  color: var(--ie-btn-active-bg);
  animation: ie-drop-bounce 0.6s ease infinite;
}

.ie-drop-zone-icon svg {
  width: 100%;
  height: 100%;
}

.ie-drop-zone-text {
  font-size: 15px;
  font-weight: 500;
  color: var(--ie-btn-active-bg);
}

.ie-drop-zone-hint {
  font-size: 12px;
  color: var(--ie-text-muted);
}

@keyframes ie-drop-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

/* ========== Touch improvements ========== */
@media (pointer: coarse) {
  .ie-btn {
    width: 44px;
    height: 44px;
  }
  
  .ie-tooltip {
    display: none;
  }
  
  .ie-crop-handle {
    width: 20px;
    height: 20px;
  }
  
  .ie-crop-handle-nw { top: -10px; left: -10px; }
  .ie-crop-handle-n { top: -10px; margin-left: -10px; }
  .ie-crop-handle-ne { top: -10px; right: -10px; }
  .ie-crop-handle-e { margin-top: -10px; right: -10px; }
  .ie-crop-handle-se { bottom: -10px; right: -10px; }
  .ie-crop-handle-s { bottom: -10px; margin-left: -10px; }
  .ie-crop-handle-sw { bottom: -10px; left: -10px; }
  .ie-crop-handle-w { margin-top: -10px; left: -10px; }
}
`;

export function injectStyles(): void {
  if (typeof document === 'undefined') return;
  
  const styleId = 'ie-toolbar-styles';
  if (document.getElementById(styleId)) return;
  
  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = toolbarStyles;
  document.head.appendChild(style);
}
