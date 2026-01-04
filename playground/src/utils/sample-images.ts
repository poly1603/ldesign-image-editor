/**
 * Sample images for playground demos
 */

export interface SampleImage {
  id: string;
  name: string;
  url: string;
  thumbnail?: string;
}

/**
 * Get sample images for demo purposes
 * These are placeholder URLs - actual images will be added later
 */
export const sampleImages: SampleImage[] = [
  {
    id: 'sample-1',
    name: '示例图片 1',
    url: '/images/sample-1.jpg',
  },
  {
    id: 'sample-2',
    name: '示例图片 2',
    url: '/images/sample-2.jpg',
  },
  {
    id: 'sample-3',
    name: '示例图片 3',
    url: '/images/sample-3.jpg',
  },
];

export interface PlaceholderOptions {
  width?: number;
  height?: number;
  text?: string;
  subText?: string;
  theme?: 'light' | 'dark';
  showIcon?: boolean;
}

/**
 * Create a placeholder image data URL with theme support
 */
export function createPlaceholderImage(options: PlaceholderOptions = {}): string;
export function createPlaceholderImage(
  width?: number,
  height?: number,
  text?: string
): string;
export function createPlaceholderImage(
  widthOrOptions: number | PlaceholderOptions = 400,
  height: number = 300,
  text: string = '点击上传或拖放图片'
): string {
  // Handle overloaded parameters
  let options: PlaceholderOptions;
  if (typeof widthOrOptions === 'object') {
    options = widthOrOptions;
  } else {
    options = { width: widthOrOptions, height, text };
  }

  const {
    width: w = 800,
    height: h = 600,
    text: mainText = '点击上传或拖放图片',
    subText = '支持 PNG、JPG、GIF 等格式',
    theme = 'dark',
    showIcon = true,
  } = options;

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Theme colors
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1a1a1a' : '#f0f0f0';
  const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const iconColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)';
  const textColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)';
  const subTextColor = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)';
  
  // Background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, w, h);
  
  // Dashed border
  const padding = 40;
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 8]);
  ctx.strokeRect(padding, padding, w - padding * 2, h - padding * 2);
  ctx.setLineDash([]);
  
  const centerY = h / 2;
  
  // Upload icon
  if (showIcon) {
    const iconX = w / 2;
    const iconY = centerY - 50;
    
    ctx.strokeStyle = iconColor;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Simple folder/image icon
    const boxW = 80;
    const boxH = 60;
    const boxX = iconX - boxW / 2;
    const boxY = iconY - boxH / 2;
    
    // Rounded rectangle (folder/frame)
    const radius = 8;
    ctx.beginPath();
    ctx.moveTo(boxX + radius, boxY);
    ctx.lineTo(boxX + boxW - radius, boxY);
    ctx.quadraticCurveTo(boxX + boxW, boxY, boxX + boxW, boxY + radius);
    ctx.lineTo(boxX + boxW, boxY + boxH - radius);
    ctx.quadraticCurveTo(boxX + boxW, boxY + boxH, boxX + boxW - radius, boxY + boxH);
    ctx.lineTo(boxX + radius, boxY + boxH);
    ctx.quadraticCurveTo(boxX, boxY + boxH, boxX, boxY + boxH - radius);
    ctx.lineTo(boxX, boxY + radius);
    ctx.quadraticCurveTo(boxX, boxY, boxX + radius, boxY);
    ctx.stroke();
    
    // Mountain icon inside (represents image)
    ctx.beginPath();
    ctx.moveTo(boxX + 15, boxY + boxH - 15);
    ctx.lineTo(boxX + 30, boxY + 25);
    ctx.lineTo(boxX + 45, boxY + boxH - 20);
    ctx.lineTo(boxX + 55, boxY + 30);
    ctx.lineTo(boxX + boxW - 15, boxY + boxH - 15);
    ctx.stroke();
    
    // Sun circle
    ctx.beginPath();
    ctx.arc(boxX + boxW - 22, boxY + 18, 8, 0, Math.PI * 2);
    ctx.stroke();
    
    // Plus sign (add image)
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(iconX, iconY + 55);
    ctx.lineTo(iconX, iconY + 75);
    ctx.moveTo(iconX - 10, iconY + 65);
    ctx.lineTo(iconX + 10, iconY + 65);
    ctx.stroke();
  }
  
  // Main text
  ctx.fillStyle = textColor;
  ctx.font = '500 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(mainText, w / 2, centerY + 40);
  
  // Sub text
  if (subText) {
    ctx.fillStyle = subTextColor;
    ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(subText, w / 2, centerY + 70);
  }
  
  return canvas.toDataURL('image/png');
}
