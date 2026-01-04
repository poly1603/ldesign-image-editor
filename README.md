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

## 📦 安装

```bash
# npm
npm install @ldesign/image-editor

# pnpm
pnpm add @ldesign/image-editor

# yarn
yarn add @ldesign/image-editor
```

**Vue 组件（可选）：**

```bash
npm install @ldesign/image-editor-vue
```

## 🚀 快速开始

### 原生 JavaScript

```typescript
import { Editor, MosaicPlugin, TextPlugin } from '@ldesign/image-editor';

// 创建编辑器
const editor = new Editor({
  container: '#editor-container',
  plugins: [MosaicPlugin, TextPlugin],
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

### Vue 3

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Editor, MosaicPlugin, TextPlugin } from '@ldesign/image-editor';

const containerRef = ref<HTMLDivElement | null>(null);
let editor: Editor | null = null;

onMounted(() => {
  editor = new Editor({
    container: containerRef.value!,
    plugins: [MosaicPlugin, TextPlugin],
    toolbar: {
      theme: 'dark',
      autoHide: true,
    },
  });
});

const loadImage = async (file: File) => {
  const reader = new FileReader();
  reader.onload = (e) => editor?.loadImage(e.target?.result as string);
  reader.readAsDataURL(file);
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

## 📚 API

### Editor 方法

```typescript
// 加载图片
await editor.loadImage(source: string | HTMLImageElement);

// 导出图片
const result = await editor.export(options?: ExportOptions);

// 撤销/重做
editor.undo();
editor.redo();
editor.canUndo(); // boolean
editor.canRedo(); // boolean

// 工具操作
editor.setTool(name: string);
editor.getTool(name: string);

// 注册插件
editor.use(PluginClass);

// 销毁
editor.destroy();
```

### Toolbar 方法

通过 `(editor as any)._toolbar` 获取 Toolbar 实例：

```typescript
const toolbar = (editor as any)._toolbar;

// 主题
toolbar.setTheme('dark');
toolbar.getTheme();

// 主题色
toolbar.setPrimaryColor('#667eea');

// 禁用工具
toolbar.setDisabledTools(['arrow', 'triangle']);
toolbar.getDisabledTools();

// 可见性
toolbar.setToolbarVisible(true);
toolbar.isToolbarVisible();

// 占位图
toolbar.showPlaceholder();
toolbar.hasImage();

// 裁剪
toolbar.toggleCropTool();
toolbar.applyCrop();
```

### 事件

```typescript
editor.on('ready', ({ width, height }) => {});
editor.on('image-loaded', ({ width, height }) => {});
editor.on('history-change', ({ canUndo, canRedo }) => {});
editor.on('tool-change', ({ tool, prevTool }) => {});
editor.on('before-export', ({ options }) => {});
editor.on('after-export', ({ data }) => {});
editor.on('error', ({ error }) => {});
editor.on('destroy', () => {});
```

## 🔌 插件

| 插件 | 工具名 | 说明 |
|------|--------|------|
| `MosaicPlugin` | `mosaic` | 马赛克打码，支持调整笔刷和色块大小 |
| `TextPlugin` | `text` | 文字添加，支持字体、大小、颜色、样式 |
| `FilterPlugin` | `filter` | 图片滤镜，调整亮度、对比度、饱和度 |

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
| `Ctrl+Y` | 重做 |
| `Ctrl+S` | 导出 |
| `+` / `-` | 缩放 |
| `0` | 重置视图 |
| `Delete` | 删除选中形状 |

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

## 📁 项目结构

```
image-editor/
├── packages/
│   ├── core/          # 核心库 @ldesign/image-editor
│   └── vue/           # Vue 组件 @ldesign/image-editor-vue
├── playground/        # 演示应用
└── .github/
    └── workflows/     # CI/CD 工作流
```

## 📄 License

MIT
