/**
 * ExportDialog - Advanced export options dialog
 */

import { icons } from './icons';
import type { I18n } from '../i18n';
import { getI18n } from '../i18n';
import type { ExportFormat, ExportDataType } from '../types/config.types';

export interface ExportDialogOptions {
  /** Initial format */
  format?: ExportFormat;
  /** Initial quality */
  quality?: number;
  /** Original canvas width */
  width: number;
  /** Original canvas height */
  height: number;
  /** Enable watermark */
  enableWatermark?: boolean;
  /** i18n instance */
  i18n?: I18n;
  /** Canvas element for size estimation */
  canvas?: HTMLCanvasElement;
  /** Show copy to clipboard option */
  enableClipboard?: boolean;
}

export interface ExportDialogResult {
  format: ExportFormat;
  quality: number;
  width: number;
  height: number;
  /** Data type for export */
  dataType: ExportDataType;
  /** Action: download, copy, or custom */
  action: 'download' | 'copy' | 'custom';
  watermark?: {
    text?: string;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
    opacity?: number;
  };
  /** Preserve transparency */
  preserveTransparency?: boolean;
  /** Background color for non-transparent formats */
  backgroundColor?: string;
}

/**
 * ExportDialog - Modal dialog for export options
 */
export class ExportDialog {
  private overlay: HTMLElement | null = null;
  private dialog: HTMLElement | null = null;
  private i18n: I18n;
  private options: ExportDialogOptions;
  
  // State
  private format: ExportFormat = 'png';
  private quality: number = 0.92;
  private width: number;
  private height: number;
  private keepRatio: boolean = true;
  private aspectRatio: number;
  private watermarkText: string = '';
  private watermarkEnabled: boolean = false;
  private preserveTransparency: boolean = true;
  private backgroundColor: string = '#ffffff';
  private estimatedSize: string = '';
  
  // Callbacks
  private resolvePromise: ((result: ExportDialogResult | null) => void) | null = null;

  constructor(options: ExportDialogOptions) {
    this.options = options;
    this.i18n = options.i18n || getI18n();
    
    this.format = options.format || 'png';
    this.quality = options.quality || 0.92;
    this.width = options.width;
    this.height = options.height;
    this.aspectRatio = options.width / options.height;
  }

  /**
   * Show dialog and return promise with result
   */
  show(): Promise<ExportDialogResult | null> {
    return new Promise((resolve) => {
      this.resolvePromise = resolve;
      this.createDialog();
    });
  }

  /**
   * Hide dialog
   */
  hide(): void {
    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
      this.dialog = null;
    }
  }

  /**
   * Create dialog elements
   */
  private createDialog(): void {
    const t = (key: string) => this.i18n.t(key as any);
    
    this.overlay = document.createElement('div');
    this.overlay.className = 'ie-export-overlay';
    
    this.dialog = document.createElement('div');
    this.dialog.className = 'ie-export-dialog';
    
    this.dialog.innerHTML = `
      <div class="ie-export-header">
        <span class="ie-export-title">${t('export.title')}</span>
        <button class="ie-export-close" data-action="close">${icons.close}</button>
      </div>
      
      <div class="ie-export-body">
        <!-- Format -->
        <div class="ie-export-section">
          <label class="ie-export-label">${t('export.format')}</label>
          <div class="ie-export-format-buttons">
            <button class="ie-export-format-btn ${this.format === 'png' ? 'active' : ''}" data-format="png" title="Lossless, supports transparency">PNG</button>
            <button class="ie-export-format-btn ${this.format === 'jpeg' ? 'active' : ''}" data-format="jpeg" title="Lossy compression, smaller file size">JPG</button>
            <button class="ie-export-format-btn ${this.format === 'webp' ? 'active' : ''}" data-format="webp" title="Modern format, good compression">WebP</button>
            <button class="ie-export-format-btn ${this.format === 'gif' ? 'active' : ''}" data-format="gif" title="Limited colors, small file size">GIF</button>
          </div>
        </div>
        
        <!-- Transparency (only for png/webp/gif) -->
        <div class="ie-export-section ie-transparency-section" style="display:${this.supportsTransparency() ? 'block' : 'none'}">
          <label class="ie-export-label">
            <input type="checkbox" data-check="transparency" ${this.preserveTransparency ? 'checked' : ''}>
            ${t('export.preserveTransparency') || 'Preserve transparency'}
          </label>
          <div class="ie-bg-color-row" style="display:${!this.preserveTransparency ? 'flex' : 'none'}">
            <span style="color:var(--ie-text-muted);font-size:12px;">Background:</span>
            <input type="color" class="ie-color-input" value="${this.backgroundColor}" data-input="bg-color">
          </div>
        </div>
        
        <!-- Size -->
        <div class="ie-export-section">
          <label class="ie-export-label">${t('export.size')}</label>
          <div class="ie-export-size-inputs">
            <input type="number" class="ie-export-input" data-input="width" value="${this.width}" min="1" max="10000">
            <span style="color:var(--ie-text-muted)">×</span>
            <input type="number" class="ie-export-input" data-input="height" value="${this.height}" min="1" max="10000">
            <button class="ie-export-link-btn ${this.keepRatio ? 'active' : ''}" data-action="toggle-ratio" title="${t('export.keepRatio')}">
              ${icons.layers}
            </button>
          </div>
        </div>
        
        <!-- Quality (only for jpeg/webp) -->
        <div class="ie-export-section ie-quality-section" style="display:${this.format === 'png' ? 'none' : 'block'}">
          <label class="ie-export-label">${t('export.quality')}</label>
          <div class="ie-export-quality">
            <input type="range" class="ie-range-slider ie-export-quality-slider" data-slider="quality" 
                   min="0.1" max="1" step="0.01" value="${this.quality}">
            <span class="ie-export-quality-value" data-value="quality">${Math.round(this.quality * 100)}%</span>
          </div>
        </div>
        
        <!-- Watermark -->
        ${this.options.enableWatermark ? `
        <div class="ie-export-section">
          <label class="ie-export-label">
            <input type="checkbox" data-check="watermark" ${this.watermarkEnabled ? 'checked' : ''}>
            ${t('export.watermark')}
          </label>
          <div class="ie-watermark-options" style="display:${this.watermarkEnabled ? 'block' : 'none'}">
            <input type="text" class="ie-export-input" data-input="watermark-text" 
                   placeholder="${t('export.watermarkText')}" value="${this.watermarkText}">
          </div>
        </div>
        ` : ''}
        
        <!-- Preview -->
        <div class="ie-export-section">
          <label class="ie-export-label">${t('export.preview')}</label>
          <div class="ie-export-preview">
            <div style="color:var(--ie-text-muted);font-size:12px;">${this.width} × ${this.height} px</div>
            <div class="ie-export-size" style="color:var(--ie-text-muted);font-size:11px;margin-top:4px;" data-value="file-size">Calculating...</div>
          </div>
        </div>
      </div>
      
      <div class="ie-export-footer">
        <button class="ie-export-cancel" data-action="cancel">${t('export.cancel')}</button>
        ${this.options.enableClipboard !== false ? `
        <button class="ie-export-copy" data-action="copy" title="Copy to clipboard">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          ${t('export.copy') || 'Copy'}
        </button>
        ` : ''}
        <button class="ie-export-download" data-action="export">${icons.download} ${t('export.download')}</button>
      </div>
    `;
    
    this.overlay.appendChild(this.dialog);
    document.body.appendChild(this.overlay);
    
    this.setupEvents();
  }

  /**
   * Setup event listeners
   */
  private setupEvents(): void {
    if (!this.dialog) return;
    
    // Close button
    this.dialog.querySelector('[data-action="close"]')?.addEventListener('click', () => {
      this.cancel();
    });
    
    // Cancel button
    this.dialog.querySelector('[data-action="cancel"]')?.addEventListener('click', () => {
      this.cancel();
    });
    
    // Export button
    this.dialog.querySelector('[data-action="export"]')?.addEventListener('click', () => {
      this.confirm();
    });
    
    // Format buttons
    this.dialog.querySelectorAll('[data-format]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setFormat(btn.getAttribute('data-format') as ExportFormat);
      });
    });
    
    // Size inputs
    const widthInput = this.dialog.querySelector('[data-input="width"]') as HTMLInputElement;
    const heightInput = this.dialog.querySelector('[data-input="height"]') as HTMLInputElement;
    
    widthInput?.addEventListener('input', () => {
      this.width = parseInt(widthInput.value) || this.options.width;
      if (this.keepRatio) {
        this.height = Math.round(this.width / this.aspectRatio);
        heightInput.value = String(this.height);
      }
      this.updatePreview();
    });
    
    heightInput?.addEventListener('input', () => {
      this.height = parseInt(heightInput.value) || this.options.height;
      if (this.keepRatio) {
        this.width = Math.round(this.height * this.aspectRatio);
        widthInput.value = String(this.width);
      }
      this.updatePreview();
    });
    
    // Keep ratio toggle
    this.dialog.querySelector('[data-action="toggle-ratio"]')?.addEventListener('click', (e) => {
      this.keepRatio = !this.keepRatio;
      (e.currentTarget as HTMLElement).classList.toggle('active', this.keepRatio);
    });
    
    // Quality slider
    const qualitySlider = this.dialog.querySelector('[data-slider="quality"]') as HTMLInputElement;
    qualitySlider?.addEventListener('input', () => {
      this.quality = parseFloat(qualitySlider.value);
      const valueEl = this.dialog!.querySelector('[data-value="quality"]');
      if (valueEl) valueEl.textContent = `${Math.round(this.quality * 100)}%`;
      this.updateEstimatedSize();
    });
    
    // Transparency checkbox
    this.dialog.querySelector('[data-check="transparency"]')?.addEventListener('change', (e) => {
      this.preserveTransparency = (e.target as HTMLInputElement).checked;
      const bgRow = this.dialog!.querySelector('.ie-bg-color-row') as HTMLElement;
      if (bgRow) bgRow.style.display = this.preserveTransparency ? 'none' : 'flex';
      this.updateEstimatedSize();
    });
    
    // Background color
    this.dialog.querySelector('[data-input="bg-color"]')?.addEventListener('input', (e) => {
      this.backgroundColor = (e.target as HTMLInputElement).value;
    });
    
    // Copy button
    this.dialog.querySelector('[data-action="copy"]')?.addEventListener('click', () => {
      this.copyToClipboard();
    });
    
    // Watermark checkbox
    this.dialog.querySelector('[data-check="watermark"]')?.addEventListener('change', (e) => {
      this.watermarkEnabled = (e.target as HTMLInputElement).checked;
      const opts = this.dialog!.querySelector('.ie-watermark-options') as HTMLElement;
      if (opts) opts.style.display = this.watermarkEnabled ? 'block' : 'none';
    });
    
    // Watermark text
    this.dialog.querySelector('[data-input="watermark-text"]')?.addEventListener('input', (e) => {
      this.watermarkText = (e.target as HTMLInputElement).value;
    });
    
    // Close on overlay click
    this.overlay?.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.cancel();
      }
    });
    
    // Close on Escape
    document.addEventListener('keydown', this.handleKeyDown);
  }

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      this.cancel();
    } else if (e.key === 'Enter') {
      this.confirm();
    }
  };

  /**
   * Check if current format supports transparency
   */
  private supportsTransparency(): boolean {
    return this.format === 'png' || this.format === 'webp' || this.format === 'gif';
  }

  /**
   * Set export format
   */
  private setFormat(format: ExportFormat): void {
    this.format = format;
    
    // Update buttons
    this.dialog?.querySelectorAll('[data-format]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-format') === format);
    });
    
    // Show/hide quality section (not for png/gif)
    const qualitySection = this.dialog?.querySelector('.ie-quality-section') as HTMLElement;
    if (qualitySection) {
      qualitySection.style.display = (format === 'png' || format === 'gif') ? 'none' : 'block';
    }
    
    // Show/hide transparency section
    const transparencySection = this.dialog?.querySelector('.ie-transparency-section') as HTMLElement;
    if (transparencySection) {
      transparencySection.style.display = this.supportsTransparency() ? 'block' : 'none';
    }
    
    this.updateEstimatedSize();
  }

  /**
   * Update preview
   */
  private updatePreview(): void {
    const preview = this.dialog?.querySelector('.ie-export-preview');
    if (preview) {
      preview.innerHTML = `
        <div style="color:var(--ie-text-muted);font-size:12px;">${this.width} × ${this.height} px</div>
        <div class="ie-export-size" style="color:var(--ie-text-muted);font-size:11px;margin-top:4px;" data-value="file-size">${this.estimatedSize || 'Calculating...'}</div>
      `;
    }
    this.updateEstimatedSize();
  }
  
  /**
   * Update estimated file size
   */
  private async updateEstimatedSize(): Promise<void> {
    if (!this.options.canvas) {
      this.estimatedSize = '';
      return;
    }
    
    try {
      // Create a temporary scaled canvas
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = this.width;
      tempCanvas.height = this.height;
      const ctx = tempCanvas.getContext('2d');
      if (!ctx) return;
      
      // Handle background for non-transparent formats
      if (!this.supportsTransparency() || !this.preserveTransparency) {
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, this.width, this.height);
      }
      ctx.drawImage(this.options.canvas, 0, 0, this.width, this.height);
      
      // Get blob to estimate size
      const format = this.format === 'jpg' ? 'jpeg' : this.format;
      const blob = await new Promise<Blob | null>((resolve) => {
        tempCanvas.toBlob(resolve, `image/${format}`, this.quality);
      });
      
      if (blob) {
        this.estimatedSize = this.formatSize(blob.size);
        const sizeEl = this.dialog?.querySelector('[data-value="file-size"]');
        if (sizeEl) sizeEl.textContent = `~${this.estimatedSize}`;
      }
    } catch (err) {
      console.warn('Failed to estimate file size:', err);
    }
  }
  
  /**
   * Format file size for display
   */
  private formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }
  
  /**
   * Copy to clipboard action
   */
  private async copyToClipboard(): Promise<void> {
    if (!this.options.canvas) return;
    
    try {
      const canvas = this.options.canvas;
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, 'image/png', 1);
      });
      
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        
        // Show success feedback
        const copyBtn = this.dialog?.querySelector('[data-action="copy"]') as HTMLButtonElement;
        if (copyBtn) {
          const originalText = copyBtn.innerHTML;
          copyBtn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copied!`;
          copyBtn.style.background = 'var(--ie-success, #22c55e)';
          setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = '';
          }, 2000);
        }
      }
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  }

  /**
   * Cancel and close
   */
  private cancel(): void {
    document.removeEventListener('keydown', this.handleKeyDown);
    this.hide();
    this.resolvePromise?.(null);
  }

  /**
   * Confirm and return result (download action)
   */
  private confirm(): void {
    this.finishWithAction('download');
  }
  
  /**
   * Finish dialog with specified action
   */
  private finishWithAction(action: 'download' | 'copy' | 'custom'): void {
    document.removeEventListener('keydown', this.handleKeyDown);
    
    const result: ExportDialogResult = {
      format: this.format,
      quality: this.quality,
      width: this.width,
      height: this.height,
      dataType: 'base64',
      action,
      preserveTransparency: this.preserveTransparency,
      backgroundColor: this.backgroundColor,
    };
    
    if (this.watermarkEnabled && this.watermarkText) {
      result.watermark = {
        text: this.watermarkText,
        position: 'bottom-right',
        opacity: 0.5,
      };
    }
    
    this.hide();
    this.resolvePromise?.(result);
  }

  /**
   * Destroy dialog
   */
  destroy(): void {
    document.removeEventListener('keydown', this.handleKeyDown);
    this.hide();
    this.resolvePromise = null;
  }
}

/**
 * Apply watermark to canvas
 */
export function applyWatermark(
  canvas: HTMLCanvasElement,
  watermark: NonNullable<ExportDialogResult['watermark']>
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx || !watermark.text) return;
  
  ctx.save();
  
  // Set watermark style
  const fontSize = Math.max(12, Math.min(canvas.width, canvas.height) * 0.03);
  ctx.font = `${fontSize}px sans-serif`;
  ctx.fillStyle = `rgba(255, 255, 255, ${watermark.opacity || 0.5})`;
  ctx.strokeStyle = `rgba(0, 0, 0, ${(watermark.opacity || 0.5) * 0.5})`;
  ctx.lineWidth = 1;
  
  // Calculate position
  const metrics = ctx.measureText(watermark.text);
  const padding = fontSize;
  let x: number, y: number;
  
  switch (watermark.position) {
    case 'top-left':
      x = padding;
      y = padding + fontSize;
      break;
    case 'top-right':
      x = canvas.width - metrics.width - padding;
      y = padding + fontSize;
      break;
    case 'bottom-left':
      x = padding;
      y = canvas.height - padding;
      break;
    case 'center':
      x = (canvas.width - metrics.width) / 2;
      y = canvas.height / 2;
      break;
    case 'bottom-right':
    default:
      x = canvas.width - metrics.width - padding;
      y = canvas.height - padding;
      break;
  }
  
  // Draw watermark with stroke for visibility
  ctx.strokeText(watermark.text, x, y);
  ctx.fillText(watermark.text, x, y);
  
  ctx.restore();
}
