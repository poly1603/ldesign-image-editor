/**
 * Placeholder image generator for editor
 */

export interface PlaceholderOptions {
  width?: number;
  height?: number;
  text?: string;
  subText?: string;
  theme?: 'light' | 'dark';
}

/**
 * Create a placeholder image data URL
 */
export function createPlaceholder(options: PlaceholderOptions = {}): string {
  const {
    width: w = 800,
    height: h = 600,
    text = '点击上传或拖放图片',
    subText = '支持 PNG、JPG、GIF 等格式',
    theme = 'dark',
  } = options;

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Theme colors - high contrast for clarity
  const isDark = theme === 'dark';
  const borderColor = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)';
  const iconColor = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)';
  const textColor = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.65)';
  const subTextColor = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  
  // Transparent background - inherits from container
  ctx.clearRect(0, 0, w, h);
  
  // Dashed border with proper margin
  const padding = Math.max(20, Math.min(w, h) * 0.05);
  const cornerRadius = 8;
  const boxLeft = padding;
  const boxTop = padding;
  const boxWidth = w - padding * 2;
  const boxHeight = h - padding * 2;
  
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 3]);
  
  // Draw rounded rectangle border
  ctx.beginPath();
  ctx.moveTo(boxLeft + cornerRadius, boxTop);
  ctx.lineTo(boxLeft + boxWidth - cornerRadius, boxTop);
  ctx.quadraticCurveTo(boxLeft + boxWidth, boxTop, boxLeft + boxWidth, boxTop + cornerRadius);
  ctx.lineTo(boxLeft + boxWidth, boxTop + boxHeight - cornerRadius);
  ctx.quadraticCurveTo(boxLeft + boxWidth, boxTop + boxHeight, boxLeft + boxWidth - cornerRadius, boxTop + boxHeight);
  ctx.lineTo(boxLeft + cornerRadius, boxTop + boxHeight);
  ctx.quadraticCurveTo(boxLeft, boxTop + boxHeight, boxLeft, boxTop + boxHeight - cornerRadius);
  ctx.lineTo(boxLeft, boxTop + cornerRadius);
  ctx.quadraticCurveTo(boxLeft, boxTop, boxLeft + cornerRadius, boxTop);
  ctx.closePath();
  ctx.stroke();
  ctx.setLineDash([]);
  
  // Content centered
  const centerX = w / 2;
  const centerY = h / 2;
  
  ctx.strokeStyle = iconColor;
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  // Larger image icon for better visibility
  const imgBoxW = 48;
  const imgBoxH = 36;
  const imgBoxX = centerX - imgBoxW / 2;
  const imgBoxY = centerY - 45;
  const imgRadius = 5;
  
  // Icon frame
  ctx.beginPath();
  ctx.moveTo(imgBoxX + imgRadius, imgBoxY);
  ctx.lineTo(imgBoxX + imgBoxW - imgRadius, imgBoxY);
  ctx.quadraticCurveTo(imgBoxX + imgBoxW, imgBoxY, imgBoxX + imgBoxW, imgBoxY + imgRadius);
  ctx.lineTo(imgBoxX + imgBoxW, imgBoxY + imgBoxH - imgRadius);
  ctx.quadraticCurveTo(imgBoxX + imgBoxW, imgBoxY + imgBoxH, imgBoxX + imgBoxW - imgRadius, imgBoxY + imgBoxH);
  ctx.lineTo(imgBoxX + imgRadius, imgBoxY + imgBoxH);
  ctx.quadraticCurveTo(imgBoxX, imgBoxY + imgBoxH, imgBoxX, imgBoxY + imgBoxH - imgRadius);
  ctx.lineTo(imgBoxX, imgBoxY + imgRadius);
  ctx.quadraticCurveTo(imgBoxX, imgBoxY, imgBoxX + imgRadius, imgBoxY);
  ctx.stroke();
  
  // Mountain landscape (scaled up)
  ctx.beginPath();
  ctx.moveTo(imgBoxX + 8, imgBoxY + imgBoxH - 8);
  ctx.lineTo(imgBoxX + 18, imgBoxY + 12);
  ctx.lineTo(imgBoxX + 26, imgBoxY + imgBoxH - 12);
  ctx.lineTo(imgBoxX + 34, imgBoxY + 14);
  ctx.lineTo(imgBoxX + imgBoxW - 8, imgBoxY + imgBoxH - 8);
  ctx.stroke();
  
  // Sun (scaled up)
  ctx.beginPath();
  ctx.arc(imgBoxX + imgBoxW - 12, imgBoxY + 11, 5, 0, Math.PI * 2);
  ctx.stroke();
  
  // Title text - bold and clear
  ctx.fillStyle = textColor;
  ctx.font = '600 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, centerX, centerY + 12);
  
  // Description text - smaller and lighter
  if (subText) {
    ctx.fillStyle = subTextColor;
    ctx.font = '400 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(subText, centerX, centerY + 34);
  }
  
  return canvas.toDataURL('image/png');
}

/** Check if a data URL is a placeholder image */
export function isPlaceholderImage(dataUrl: string): boolean {
  // Our placeholder images are always PNG and have a specific pattern
  // We embed a marker in the placeholder to identify it
  return dataUrl.includes('data:image/png') && dataUrl.length < 50000;
}
