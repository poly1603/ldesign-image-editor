# @ldesign/image-editor

一个功能强大的图片编辑器库，支持标注、裁剪、马赛克、滤镜等功能。提供原生 JavaScript 和 Vue 组件两种使用方式。

[![CI](https://github.com/user/image-editor/actions/workflows/ci.yml/badge.svg)](https://github.com/user/image-editor/actions/workflows/ci.yml)
[![Deploy](https://github.com/user/image-editor/actions/workflows/deploy.yml/badge.svg)](https://github.com/user/image-editor/actions/workflows/deploy.yml)

## ✨ 特性

- 🎨 **绘图工具** - 画笔、矩形、圆形、箭头、直线、三角形
- ✂️ **图片裁剪** - 带遮罩和平滑动画效果
- 🔲 **马赛克打码** - 可调笔刷和色块大小
- 🔤 **文字标注** - 支持字体、大小、颜色、样式
- 🎛️ **滤镜调整** - 亮度、对比度、饱和度
- 🧵 **橡皮擦** - 像素/形状两种擦除模式
- ↩️ **撤销/重做** - 完整的历史记录支持
- 🌓 **主题切换** - 亮色/暗色主题
- ⌨️ **快捷键** - 高效的键盘操作
- 📱 **响应式** - 支持触屏和手势操作
- 💾 **多格式导出** - PNG/JPEG/WebP，支持 Base64/Blob/File

---

## 📦 安装

### NPM / PNPM / Yarn

```bash
# npm
npm install @ldesign/image-editor

# pnpm
pnpm add @ldesign/image-editor

# yarn
yarn add @ldesign/image-editor
```

### UMD（浏览器直接引入）

通过 CDN 引入 UMD 产物，无需构建工具：

```html
<!DOCTYPE html>
<html>
<head>
  <title>Image Editor Demo</title>
  <style>
    #editor-container {
      width: 100%;
      height: 600px;
      background: #1a1a1a;
    }
  </style>
</head>
<body>
  <div id="editor-container"></div>
  <button id="export-btn">导出图片</button>

  <!-- 引入 UMD 产物 -->
  <script src="https://unpkg.com/@ldesign/image-editor/dist/index.umd.js"></script>
  
  <script>
    // UMD 模块暴露全局变量 ImageEditorCore
    const { Editor, MosaicPlugin, TextPlugin, FilterPlugin } = ImageEditorCore;

    // 创建编辑器实例
    const editor = new Editor({
      container: '#editor-container',
      plugins: [MosaicPlugin, TextPlugin, FilterPlugin],
      toolbar: {
        theme: 'dark',
        autoHide: true,
      },
    });

    // 加载图片
    editor.loadImage('https://example.com/image.jpg');

    // 导出图片
    document.getElementById('export-btn').onclick = async () => {
      const dataUrl = await editor.export({ format: 'png', type: 'base64' });
      console.log('导出成功:', dataUrl);
    };
  </script>
</body>
</html>
```

**本地文件引入：**

```html
<!-- 如果你下载了库到本地 -->
<script src="./node_modules/@ldesign/image-editor/dist/index.umd.js"></script>
```

**Vue 组件（可选）：**

```bash
npm install @ldesign/image-editor-vue
```

---

## 🚀 快速开始

### ES Module 方式

```typescript
import { Editor, MosaicPlugin, TextPlugin, FilterPlugin } from '@ldesign/image-editor';

// 创建编辑器
const editor = new Editor({
  container: '#editor-container',  // 容器元素或 CSS 选择器
  plugins: [MosaicPlugin, TextPlugin, FilterPlugin],
  toolbar: {
    theme: 'dark',
    autoHide: true,
  },
});

// 加载图片
await editor.loadImage('https://example.com/image.jpg');

// 导出图片
const blob = await editor.export({
  format: 'png',
  type: 'blob',
});
```

### Vue 3 集成

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Editor, MosaicPlugin, TextPlugin, FilterPlugin } from '@ldesign/image-editor';

const containerRef = ref<HTMLDivElement | null>(null);
let editor: Editor | null = null;

onMounted(() => {
  editor = new Editor({
    container: containerRef.value!,
    plugins: [MosaicPlugin, TextPlugin, FilterPlugin],
    toolbar: {
      theme: 'dark',
      autoHide: true,
    },
  });
});

// 从 File 对象加载图片
const loadFromFile = async (file: File) => {
  const reader = new FileReader();
  reader.onload = (e) => editor?.loadImage(e.target?.result as string);
  reader.readAsDataURL(file);
};

// 从 URL 加载图片
const loadFromUrl = async (url: string) => {
  await editor?.loadImage(url);
};

// 导出编辑后的图片
const exportImage = async () => {
  const result = await editor?.export({
    format: 'png',
    type: 'blob',
  });
  return result;
};

onUnmounted(() => editor?.destroy());
</script>

<template>
  <div ref="containerRef" class="editor-container" />
</template>

<style>
.editor-container {
  width: 100%;
  height: 600px;
  background: #1a1a1a;
}
</style>
```

### React 集成

```tsx
import { useEffect, useRef } from 'react';
import { Editor, MosaicPlugin, TextPlugin, FilterPlugin } from '@ldesign/image-editor';

export function ImageEditorComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Editor | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      editorRef.current = new Editor({
        container: containerRef.current,
        plugins: [MosaicPlugin, TextPlugin, FilterPlugin],
        toolbar: { theme: 'dark' },
      });
    }

    return () => {
      editorRef.current?.destroy();
    };
  }, []);

  const handleExport = async () => {
    const blob = await editorRef.current?.export({ format: 'png', type: 'blob' });
    if (blob) {
      // 处理导出的 Blob
      const url = URL.createObjectURL(blob as Blob);
      window.open(url);
    }
  };

  return (
    <div>
      <div ref={containerRef} style={{ width: '100%', height: 600 }} />
      <button onClick={handleExport}>导出图片</button>
    </div>
  );
}
```

---

## 📷 加载图片

### 从 URL 加载

```typescript
// 从网络 URL 加载
await editor.loadImage('https://example.com/image.jpg');

// 从本地路径加载（开发环境）
await editor.loadImage('/assets/image.png');
```

### 从 File 对象加载（文件上传）

```typescript
// HTML: <input type="file" id="file-input" accept="image/*" />

const fileInput = document.getElementById('file-input') as HTMLInputElement;
fileInput.addEventListener('change', async (e) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    // 方法1: 使用 FileReader 转为 DataURL
    const reader = new FileReader();
    reader.onload = (event) => {
      editor.loadImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    // 方法2: 使用 URL.createObjectURL
    const objectUrl = URL.createObjectURL(file);
    await editor.loadImage(objectUrl);
    URL.revokeObjectURL(objectUrl); // 释放内存
  }
});
```

### 从 Base64 加载

```typescript
const base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...';
await editor.loadImage(base64);
```

### 从 HTMLImageElement 加载

```typescript
const img = new Image();
img.onload = () => {
  editor.loadImage(img);
};
img.src = 'https://example.com/image.jpg';
```

### 从 Canvas 加载

```typescript
const sourceCanvas = document.getElementById('source-canvas') as HTMLCanvasElement;
const dataUrl = sourceCanvas.toDataURL('image/png');
await editor.loadImage(dataUrl);
```

### 从剪贴板粘贴

```typescript
document.addEventListener('paste', async (e) => {
  const items = e.clipboardData?.items;
  if (!items) return;

  for (const item of items) {
    if (item.type.startsWith('image/')) {
      const blob = item.getAsFile();
      if (blob) {
        const objectUrl = URL.createObjectURL(blob);
        await editor.loadImage(objectUrl);
        URL.revokeObjectURL(objectUrl);
      }
      break;
    }
  }
});
```

---

## 💾 导出/获取编辑后的图片

### 导出为 Base64

```typescript
// 默认导出为 PNG Base64
const base64 = await editor.export();
// 结果: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."

// 指定格式
const jpegBase64 = await editor.export({
  format: 'jpeg',
  type: 'base64',
  quality: 0.9,  // JPEG/WebP 质量 0-1
});

// 用于显示
const img = document.createElement('img');
img.src = base64 as string;
document.body.appendChild(img);
```

### 导出为 Blob

```typescript
const blob = await editor.export({
  format: 'png',
  type: 'blob',
});

// 创建下载链接
const url = URL.createObjectURL(blob as Blob);
const link = document.createElement('a');
link.href = url;
link.download = 'edited-image.png';
link.click();
URL.revokeObjectURL(url);

// 用于上传到服务器
const formData = new FormData();
formData.append('image', blob as Blob, 'image.png');
await fetch('/api/upload', { method: 'POST', body: formData });
```

### 导出为 File 对象

```typescript
const file = await editor.export({
  format: 'png',
  type: 'file',
  fileName: 'my-edited-image',  // 不需要扩展名，会自动添加
});

// file 是一个 File 对象，可直接用于上传
const formData = new FormData();
formData.append('file', file as File);
```

### 指定导出尺寸（缩放）

```typescript
// 导出指定宽度，高度按比例缩放
const scaled = await editor.export({
  format: 'png',
  type: 'blob',
  width: 800,
});

// 导出指定宽高（可能会拉伸）
const fixed = await editor.export({
  format: 'jpeg',
  type: 'blob',
  width: 1920,
  height: 1080,
  quality: 0.85,
});
```

### 导出为 WebP 格式

```typescript
const webp = await editor.export({
  format: 'webp',
  type: 'blob',
  quality: 0.8,
});
```

### 完整导出示例

```typescript
// 下载按钮处理
document.getElementById('download-btn').onclick = async () => {
  try {
    const blob = await editor.export({
      format: 'png',
      type: 'blob',
    });

    // 触发下载
    const url = URL.createObjectURL(blob as Blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `image-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('导出失败:', error);
  }
};

// 上传到服务器
document.getElementById('upload-btn').onclick = async () => {
  const blob = await editor.export({ format: 'jpeg', type: 'blob', quality: 0.9 });
  
  const formData = new FormData();
  formData.append('image', blob as Blob, 'image.jpg');
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });
  
  const result = await response.json();
  console.log('上传成功:', result.url);
};
```

---

## ⚙️ 配置选项

### EditorOptions

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `container` | `HTMLElement \| string` | - | **必填**，容器元素或选择器 |
| `image` | `string \| HTMLImageElement` | - | 初始图片，不传则显示占位图 |
| `width` | `number` | auto | 画布宽度 |
| `height` | `number` | auto | 画布高度 |
| `backgroundColor` | `string` | `'transparent'` | 画布背景色 |
| `plugins` | `PluginConstructor[]` | `[]` | 启用的插件列表 |
| `historyLimit` | `number` | `50` | 历史记录最大数量 |
| `responsive` | `boolean` | `true` | 是否响应式 |
| `toolbar` | `boolean \| ToolbarConfig` | `true` | 工具栏配置 |

### ToolbarConfig

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `theme` | `'light' \| 'dark' \| 'auto'` | `'dark'` | 主题模式 |
| `primaryColor` | `string` | `'#667eea'` | 主题色 |
| `autoHide` | `boolean` | `true` | 无图片时自动隐藏工具栏 |
| `disabledTools` | `ToolName[]` | `[]` | 禁用的工具列表 |
| `zoom` | `boolean` | `true` | 显示缩放控件 |
| `tools` | `boolean` | `true` | 显示工具按钮 |
| `history` | `boolean` | `true` | 显示撤销/重做按钮 |
| `export` | `boolean` | `true` | 显示导出按钮 |
| `placeholderText` | `string` | `'点击上传或拖放图片'` | 占位图主文字 |
| `placeholderSubText` | `string` | `'支持 PNG、JPG、GIF 等格式'` | 占位图副文字 |

### ExportOptions

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `format` | `'png' \| 'jpeg' \| 'webp'` | `'png'` | 导出格式 |
| `type` | `'base64' \| 'blob' \| 'file'` | `'base64'` | 返回数据类型 |
| `quality` | `number` | `0.92` | JPEG/WebP 压缩质量 (0-1) |
| `width` | `number` | - | 导出宽度（缩放） |
| `height` | `number` | - | 导出高度（缩放） |
| `fileName` | `string` | `'image'` | 文件名（type 为 file 时） |

### ToolName 可选值

可用于 `disabledTools` 配置：

```typescript
type ToolName = 
  | 'move'      // 移动/选择工具
  | 'pen'       // 画笔
  | 'rect'      // 矩形
  | 'circle'    // 圆形
  | 'arrow'     // 箭头
  | 'line'      // 直线
  | 'triangle'  // 三角形
  | 'text'      // 文字
  | 'mosaic'    // 马赛克
  | 'eraser'    // 橡皮擦
  | 'crop'      // 裁剪
  | 'filter'    // 滤镜
  | 'zoomIn'    // 放大
  | 'zoomOut'   // 缩小
  | 'reset'     // 重置视图
  | 'undo'      // 撤销
  | 'redo'      // 重做
  | 'export';   // 导出
```

**示例：禁用部分工具**

```typescript
const editor = new Editor({
  container: '#editor',
  toolbar: {
    disabledTools: ['triangle', 'arrow', 'filter'],  // 禁用三角形、箭头、滤镜
  },
});

// 运行时动态禁用
const toolbar = (editor as any)._toolbar;
toolbar.setDisabledTools(['mosaic', 'text']);
```

---

## 📚 API

### Editor 方法

```typescript
// ========== 图片操作 ==========

// 加载图片
await editor.loadImage(source: string | HTMLImageElement);

// 导出图片
const result = await editor.export(options?: ExportOptions);

// ========== 历史记录 ==========

// 撤销
editor.undo();

// 重做
editor.redo();

// 检查是否可撤销/重做
editor.canUndo();  // boolean
editor.canRedo();  // boolean

// ========== 工具操作 ==========

// 设置当前工具
editor.setTool('pen');  // 'pen' | 'rect' | 'circle' | 'arrow' | 'mosaic' | 'text' | null

// 获取工具实例
const mosaicPlugin = editor.getTool('mosaic');

// ========== 插件 ==========

// 注册插件（链式调用）
editor.use(MosaicPlugin).use(TextPlugin);

// ========== 生命周期 ==========

// 销毁编辑器（释放资源）
editor.destroy();
```

### Toolbar 方法

通过 `(editor as any)._toolbar` 获取 Toolbar 实例：

```typescript
const toolbar = (editor as any)._toolbar;

// ========== 主题 ==========
toolbar.setTheme('dark');       // 'light' | 'dark' | 'auto'
toolbar.getTheme();             // 获取当前主题

// ========== 主题色 ==========
toolbar.setPrimaryColor('#667eea');

// ========== 工具控制 ==========
toolbar.setDisabledTools(['arrow', 'triangle']);  // 禁用指定工具
toolbar.getDisabledTools();                       // 获取已禁用工具列表

// ========== 工具栏可见性 ==========
toolbar.setToolbarVisible(true);   // 显示/隐藏工具栏
toolbar.isToolbarVisible();        // 检查工具栏是否可见

// ========== 占位图 ==========
toolbar.showPlaceholder();  // 显示占位图
toolbar.hasImage();         // 检查是否有真实图片

// ========== 裁剪工具 ==========
toolbar.toggleCropTool();   // 切换裁剪模式
toolbar.applyCrop();        // 应用裁剪
```

### Canvas 属性

```typescript
// 获取画布元素
const canvas = editor.canvas;  // HTMLCanvasElement

// 获取 2D 上下文
const ctx = editor.ctx;  // CanvasRenderingContext2D

// 获取尺寸
const width = editor.width;
const height = editor.height;
```

---

## 📡 事件监听

```typescript
// 编辑器就绪
editor.on('ready', ({ width, height }) => {
  console.log('编辑器已就绪', width, height);
});

// 图片加载完成
editor.on('image-loaded', ({ width, height }) => {
  console.log('图片已加载', width, height);
});

// 历史记录变化
editor.on('history-change', ({ canUndo, canRedo }) => {
  console.log('可撤销:', canUndo, '可重做:', canRedo);
});

// 工具切换
editor.on('tool-change', ({ tool, prevTool }) => {
  console.log('工具切换:', prevTool, '->', tool);
});

// 导出前
editor.on('before-export', ({ options }) => {
  console.log('即将导出', options);
});

// 导出后
editor.on('after-export', ({ data }) => {
  console.log('导出完成', data);
});

// 错误
editor.on('error', ({ error }) => {
  console.error('发生错误:', error);
});

// 销毁
editor.on('destroy', () => {
  console.log('编辑器已销毁');
});

// 移除事件监听
const handler = ({ width, height }) => console.log(width, height);
editor.on('image-loaded', handler);
editor.off('image-loaded', handler);
```

---

## 🔌 插件

| 插件 | 工具名 | 说明 |
|------|--------|------|
| `MosaicPlugin` | `mosaic` | 马赛克打码，支持调整笔刷和色块大小 |
| `TextPlugin` | `text` | 文字添加，支持字体、大小、颜色、样式 |
| `FilterPlugin` | `filter` | 图片滤镜，调整亮度、对比度、饱和度 |

**使用插件：**

```typescript
import { Editor, MosaicPlugin, TextPlugin, FilterPlugin } from '@ldesign/image-editor';

const editor = new Editor({
  container: '#editor',
  plugins: [MosaicPlugin, TextPlugin, FilterPlugin],
});

// 或动态注册
editor.use(MosaicPlugin);
```

---

## ⌨️ 快捷键

| 快捷键 | 功能 |
|--------|------|
| `V` | 移动工具 |
| `P` | 画笔工具 |
| `R` | 矩形工具 |
| `O` | 圆形工具 |
| `A` | 箭头工具 |
| `L` | 直线工具 |
| `T` | 文字工具 |
| `M` | 马赛克工具 |
| `E` | 橡皮擦工具 |
| `C` | 裁剪工具 |
| `F` | 滤镜工具 |
| `Ctrl+Z` | 撤销 |
| `Ctrl+Y` / `Ctrl+Shift+Z` | 重做 |
| `Ctrl+S` | 导出 |
| `+` / `=` | 放大 |
| `-` | 缩小 |
| `0` | 重置视图 |
| `Delete` / `Backspace` | 删除选中形状 |
| `Escape` | 取消当前操作 |

---

## 🎨 自定义主题

```typescript
// 使用内置主题
const editor = new Editor({
  container: '#editor',
  toolbar: {
    theme: 'dark',  // 'light' | 'dark' | 'auto'
  },
});

// 自定义主题色
const editor = new Editor({
  container: '#editor',
  toolbar: {
    theme: 'dark',
    primaryColor: '#ff6b6b',  // 自定义主色调
  },
});

// 运行时切换
const toolbar = (editor as any)._toolbar;
toolbar.setTheme('light');
toolbar.setPrimaryColor('#4ecdc4');
```

---

## 🛠️ 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm --filter @ldesign/image-editor dev
pnpm --filter @ldesign/image-editor-playground dev

# 构建
pnpm --filter @ldesign/image-editor build
pnpm --filter @ldesign/image-editor-vue build

# 测试
pnpm --filter @ldesign/image-editor test
```

---

## 📁 项目结构

```
image-editor/
├── packages/
│   ├── core/          # 核心库 @ldesign/image-editor
│   │   ├── src/
│   │   │   ├── core/       # 核心类 (Editor, Canvas)
│   │   │   ├── managers/   # 管理器 (Event, History, Plugin)
│   │   │   ├── plugins/    # 插件 (Mosaic, Text, Filter)
│   │   │   ├── ui/         # UI 组件 (Toolbar, CropTool)
│   │   │   ├── utils/      # 工具函数
│   │   │   └── types/      # TypeScript 类型定义
│   │   └── dist/
│   │       ├── index.es.js   # ES Module 产物
│   │       └── index.umd.js  # UMD 产物 (全局变量: ImageEditorCore)
│   └── vue/           # Vue 组件 @ldesign/image-editor-vue
├── playground/        # 演示应用
└── .github/
    └── workflows/     # CI/CD 工作流
```

---

## 📄 License

MIT
