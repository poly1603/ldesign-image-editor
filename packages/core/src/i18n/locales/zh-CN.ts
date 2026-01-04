/**
 * 中文语言包 (Simplified Chinese)
 */
export const zhCN = {
  // Tool names
  'tool.move': '移动',
  'tool.pen': '画笔',
  'tool.rect': '矩形',
  'tool.circle': '圆形',
  'tool.arrow': '箭头',
  'tool.line': '直线',
  'tool.triangle': '三角形',
  'tool.text': '文字',
  'tool.mosaic': '马赛克',
  'tool.eraser': '橡皮擦',
  'tool.crop': '裁剪',
  'tool.filter': '滤镜',

  // Zoom controls
  'zoom.in': '放大',
  'zoom.out': '缩小',
  'zoom.reset': '重置视图',
  'zoom.fitScreen': '适应屏幕',

  // History controls
  'history.undo': '撤销',
  'history.redo': '重做',

  // Export
  'export.button': '导出',
  'export.title': '导出图片',
  'export.format': '格式',
  'export.quality': '质量',
  'export.size': '尺寸',
  'export.original': '原始尺寸',
  'export.custom': '自定义',
  'export.width': '宽度',
  'export.height': '高度',
  'export.keepRatio': '保持比例',
  'export.watermark': '水印',
  'export.watermarkText': '文字水印',
  'export.watermarkImage': '图片水印',
  'export.preview': '预览',
  'export.download': '下载',
  'export.cancel': '取消',

  // Panels
  'panel.draw': '绘图设置',
  'panel.strokeWidth': '线宽',
  'panel.strokeColor': '颜色',
  'panel.fillColor': '填充颜色',
  'panel.strokeStyle': '线条样式',
  'panel.solid': '实线',
  'panel.dashed': '虚线',
  'panel.dotted': '点线',
  'panel.fill': '填充',
  'panel.stroke': '描边',
  'panel.both': '描边+填充',

  'panel.mosaic': '马赛克设置',
  'panel.brushSize': '笔刷大小',
  'panel.blockSize': '色块大小',

  'panel.text': '文字设置',
  'panel.textHint': '点击图片添加文字',
  'panel.fontSize': '字号',
  'panel.fontFamily': '字体',
  'panel.fontStyle': '样式',
  'panel.bold': '粗体',
  'panel.italic': '斜体',
  'panel.underline': '下划线',
  'panel.textStroke': '文字描边',
  'panel.textStrokeWidth': '描边宽度',
  'panel.textStrokeColor': '描边颜色',

  'panel.eraser': '橡皮擦设置',
  'panel.eraserSize': '橡皮擦大小',
  'panel.eraserMode': '擦除模式',
  'panel.eraserShape': '擦除形状',
  'panel.eraserPixel': '擦除像素',

  // Filter
  'filter.title': '滤镜调整',
  'filter.brightness': '亮度',
  'filter.contrast': '对比度',
  'filter.saturation': '饱和度',
  'filter.blur': '模糊',
  'filter.grayscale': '灰度',
  'filter.sepia': '复古',
  'filter.invert': '反色',
  'filter.presets': '预设滤镜',
  'filter.preset.original': '原图',
  'filter.preset.vintage': '复古',
  'filter.preset.cold': '冷色',
  'filter.preset.warm': '暖色',
  'filter.preset.grayscale': '黑白',
  'filter.reset': '重置',
  'filter.apply': '应用',

  // Crop
  'crop.title': '裁剪',
  'crop.ratio': '裁剪比例',
  'crop.free': '自由',
  'crop.square': '正方形 1:1',
  'crop.ratio43': '标准 4:3',
  'crop.ratio169': '宽屏 16:9',
  'crop.ratio32': '横幅 3:2',
  'crop.rotate': '旋转',
  'crop.rotateLeft': '逆时针90°',
  'crop.rotateRight': '顺时针90°',
  'crop.flipH': '水平翻转',
  'crop.flipV': '垂直翻转',
  'crop.apply': '应用裁剪',
  'crop.cancel': '取消',

  // Ruler & Grid
  'ruler.show': '显示标尺',
  'ruler.hide': '隐藏标尺',
  'grid.show': '显示网格',
  'grid.hide': '隐藏网格',

  // Context Menu
  'context.copy': '复制',
  'context.paste': '粘贴',
  'context.delete': '删除',
  'context.bringToFront': '置于顶层',
  'context.sendToBack': '置于底层',
  'context.bringForward': '上移一层',
  'context.sendBackward': '下移一层',
  'context.duplicate': '复制图层',

  // Messages
  'message.exportSuccess': '导出成功',
  'message.exportFailed': '导出失败',
  'message.loadImageFailed': '加载图片失败',
  'message.noImageLoaded': '请先加载图片',
  'message.cropApplied': '裁剪已应用',
  'message.filterApplied': '滤镜已应用',
  'message.copied': '已复制',
  'message.pasted': '已粘贴',

  // Placeholder
  'placeholder.title': '点击或拖拽图片到此处',
  'placeholder.subtitle': '支持 JPG、PNG、WebP 格式',

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

export type LocaleMessages = typeof zhCN;
