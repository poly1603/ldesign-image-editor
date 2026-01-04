# @ldesign/image-editor

专业的图片编辑器库，支持标注、滤镜、裁剪等功能。零依赖，轻量级，开箱即用。

## ✨ 特性

- 🎨 **丰富的绘图工具** - 画笔、矩形、圆形、箭头、直线、三角形
- 📝 **文字标注** - 支持字体、大小、颜色、粗体/斜体/下划线
- 🔲 **马赛克打码** - 可调节笔刷和色块大小
- 🧹 **智能橡皮擦** - 像素模式恢复原图，形状模式删除标注
- ✂️ **图片裁剪** - 自由裁剪区域，实时预览
- 🎭 **滤镜预设** - 灰度、怀旧、反色、暖色、冷色、鲜艳、复古
- ↩️ **历史记录** - 撤销/重做操作
- 📱 **触摸支持** - 双指缩放和平移
- 🎯 **主题切换** - 支持亮色/暗色/自动主题
- 📦 **零依赖** - 纯 TypeScript 实现，~230KB (gzip ~53KB)

## 📦 安装

从私有 npm registry 安装：

```bash
# npm
npm install @ldesign/image-editor --registry=http://npm.longrise.cn:6286/

# pnpm
pnpm add @ldesign/image-editor --registry=http://npm.longrise.cn:6286/

# yarn
yarn add @ldesign/image-editor --registry=http://npm.longrise.cn:6286/
```

配置 `.npmrc` 以简化安装：

```ini
@ldesign:registry=http://npm.longrise.cn:6286/
```

然后直接：

```bash
pnpm add @ldesign/image-editor
```

## 🚀 快速开始

### 基础用法

```typescript
import { Editor, MosaicPlugin, TextPlugin, FilterPlugin } from '@ldesign/image-editor';

// 创建编辑器
const editor = new Editor({
  container: '#editor-container',
  plugins: [MosaicPlugin, TextPlugin, FilterPlugin],
});

// 加载图片
await editor.loadImage('path/to/image.jpg');

// 导出图片
const blob = await editor.export({ format: 'png', type: 'blob' });
```

### Vue 3 用法

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Editor, MosaicPlugin, TextPlugin, FilterPlugin, Toolbar } from '@ldesign/image-editor';

const containerRef = ref<HTMLDivElement | null>(null);
let editor: Editor | null = null;
let toolbar: Toolbar | null = null;

onMounted(() => {
  editor = new Editor({
    container: containerRef.value!,
    plugins: [MosaicPlugin, TextPlugin, FilterPlugin],
    toolbar: {
      theme: 'dark',
      autoHide: true,
    },
  });
  
  toolbar = (editor as any)._toolbar;
});

// 上传图片
const handleUpload = async (file: File) => {
  const reader = new FileReader();
  reader.onload = async (e) => {
    await editor?.loadImage(e.target?.result as string);
  };
  reader.readAsDataURL(file);
};

// 保存图片
const handleSave = async () => {
  const blob = await editor?.export({ format: 'png', type: 'blob' });
  // 上传或下载...
};

onUnmounted(() => editor?.destroy());
</script>

<template>
  <div ref="containerRef" style="width: 100%; height: 600px;" />
</template>
```

## 📖 API 文档

### EditorOptions

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `container` | `HTMLElement \| string` | - | **必填** 编辑器容器 |
| `image` | `string \| HTMLImageElement` | - | 初始图片 |
| `plugins` | `PluginConstructor[]` | `[]` | 启用的插件 |
| `historyLimit` | `number` | `50` | 历史记录限制 |
| `responsive` | `boolean` | `true` | 响应式布局 |
| `toolbar` | `boolean \| ToolbarConfig` | `true` | 工具栏配置 |

### ToolbarConfig

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `theme` | `'light' \| 'dark' \| 'auto'` | `'dark'` | 主题模式 |
| `primaryColor` | `string` | `'#667eea'` | 主题色 |
| `autoHide` | `boolean` | `true` | 无图片时自动隐藏 |
| `disabledTools` | `ToolName[]` | `[]` | 禁用的工具 |
| `placeholderText` | `string` | `'点击上传或拖放图片'` | 占位图文字 |
| `placeholderSubText` | `string` | `'支持 PNG、JPG 等格式'` | 占位图副文字 |

### ToolName 类型

```typescript
type ToolName = 
  // 绘图工具
  | 'move' | 'pen' | 'rect' | 'circle' | 'arrow' | 'line' | 'triangle' 
  | 'text' | 'mosaic' | 'eraser' | 'crop' | 'filter'
  // 缩放控件
  | 'zoomIn' | 'zoomOut' | 'reset'
  // 历史记录
  | 'undo' | 'redo'
  // 导出
  | 'export';
```

### ExportOptions

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `format` | `'png' \| 'jpeg'` | `'png'` | 图片格式 |
| `type` | `'base64' \| 'blob' \| 'file'` | `'base64'` | 返回类型 |
| `quality` | `number` | `0.92` | JPEG 质量 (0-1) |
| `filename` | `string` | `'image'` | 文件名 (type='file') |

### Editor 方法

```typescript
// 加载图片
editor.loadImage(source: string | HTMLImageElement, isUserImage?: boolean): Promise<void>

// 导出图片
editor.export(options?: ExportOptions): Promise<string | Blob | File>

// 撤销/重做
editor.undo(): void
editor.redo(): void
editor.canUndo(): boolean
editor.canRedo(): boolean

// 工具
editor.setTool(name: string): void
editor.getTool(name: string): Plugin | undefined

// 其他
editor.getImageInfo(): { width: number; height: number }
editor.destroy(): void
```

### Toolbar 方法

```typescript
// 获取工具栏引用
const toolbar = (editor as any)._toolbar;

// 主题
toolbar.setTheme(theme: 'light' | 'dark' | 'auto'): void
toolbar.getTheme(): string

// 主题色
toolbar.setPrimaryColor(color: string): void

// 工具控制
toolbar.setDisabledTools(tools: ToolName[]): void
toolbar.getDisabledTools(): ToolName[]

// 状态
toolbar.showPlaceholder(): void
toolbar.hasImage(): boolean
toolbar.isToolbarVisible(): boolean
toolbar.setToolbarVisible(visible: boolean): void
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
```

## 🔧 插件

### MosaicPlugin

马赛克打码功能，支持调节笔刷和色块大小。

### TextPlugin

文字标注功能，支持：
- 字体选择（默认、衬线、等宽、手写、微软雅黑、宋体、楷体）
- 字号调节
- 颜色选择
- 粗体/斜体/下划线

### FilterPlugin

图片滤镜功能，支持：
- 预设滤镜：灰度、怀旧、反色、暖色、冷色、鲜艳、复古
- 手动调节：亮度、对比度、饱和度、模糊

## 📝 完整示例

```typescript
import { Editor, MosaicPlugin, TextPlugin, FilterPlugin } from '@ldesign/image-editor';

// 创建编辑器
const editor = new Editor({
  container: document.getElementById('editor')!,
  plugins: [MosaicPlugin, TextPlugin, FilterPlugin],
  historyLimit: 100,
  toolbar: {
    theme: 'auto',
    primaryColor: '#667eea',
    autoHide: true,
    disabledTools: [], // 启用所有工具
  },
});

const toolbar = (editor as any)._toolbar;

// 文件上传
document.getElementById('upload')!.addEventListener('change', async (e) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = async (e) => {
    await editor.loadImage(e.target?.result as string);
  };
  reader.readAsDataURL(file);
});

// 拖放上传
document.getElementById('editor')!.addEventListener('drop', async (e) => {
  e.preventDefault();
  const file = e.dataTransfer?.files?.[0];
  if (!file?.type.startsWith('image/')) return;
  
  const reader = new FileReader();
  reader.onload = async (e) => {
    await editor.loadImage(e.target?.result as string);
  };
  reader.readAsDataURL(file);
});

// 保存图片
document.getElementById('save')!.addEventListener('click', async () => {
  // 方式1: Blob 上传
  const blob = await editor.export({ format: 'png', type: 'blob' });
  const formData = new FormData();
  formData.append('file', blob, `image-${Date.now()}.png`);
  await fetch('/api/upload', { method: 'POST', body: formData });
  
  // 方式2: Base64 上传
  const base64 = await editor.export({ format: 'jpeg', type: 'base64', quality: 0.8 });
  await fetch('/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: base64 }),
  });
  
  // 方式3: 下载
  const link = document.createElement('a');
  link.href = base64;
  link.download = 'image.jpg';
  link.click();
});

// 切换主题
document.getElementById('theme')!.addEventListener('click', () => {
  const current = toolbar.getTheme();
  toolbar.setTheme(current === 'dark' ? 'light' : 'dark');
  if (!toolbar.hasImage()) {
    toolbar.showPlaceholder(); // 刷新占位图主题
  }
});

// 监听事件
editor.on('image-loaded', ({ width, height }) => {
  console.log(`图片已加载: ${width}x${height}`);
});

editor.on('history-change', ({ canUndo, canRedo }) => {
  document.getElementById('undo')!.disabled = !canUndo;
  document.getElementById('redo')!.disabled = !canRedo;
});

// 销毁
window.addEventListener('beforeunload', () => {
  editor.destroy();
});
```

## 🎯 工具快捷键

| 快捷键 | 功能 |
|--------|------|
| `V` | 移动工具 |
| `P` | 画笔 |
| `R` | 矩形 |
| `O` | 圆形 |
| `A` | 箭头 |
| `L` | 直线 |
| `T` | 文字 |
| `M` | 马赛克 |
| `E` | 橡皮擦 |
| `C` | 裁剪 |
| `F` | 滤镜 |
| `Ctrl+Z` | 撤销 |
| `Ctrl+Y` | 重做 |
| `Ctrl+S` | 导出 |
| `+` / `-` | 放大/缩小 |
| `0` | 重置视图 |
| `Delete` | 删除选中形状 |

## 📄 License

MIT © LDesign Team
