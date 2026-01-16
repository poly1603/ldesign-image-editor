# @ldesign/image-editor Playground

一个功能完善的图片编辑器 Playground 演示应用，展示 `@ldesign/image-editor` 的各种使用方式。

## 🌐 在线演示

访问 [Playground Demo](https://ldesign-image-editor.vercel.app) 查看在线演示。

---

## 🚀 本地运行

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm --filter @ldesign/image-editor-playground dev

# 构建
pnpm --filter @ldesign/image-editor-playground build

# 预览构建结果
pnpm --filter @ldesign/image-editor-playground preview
```

---

## 📖 使用方式

Playground 演示了以下几种使用方式：

### 1️⃣ 原生 JavaScript - ES Module

适用于使用现代打包工具（Vite、Webpack、Rollup 等）的项目。

```typescript
import { Editor, MosaicPlugin, TextPlugin, FilterPlugin } from '@ldesign/image-editor';
import type { ToolName } from '@ldesign/image-editor';

// 禁用的工具列表
const disabledTools: ToolName[] = ['triangle', 'arrow'];

// 创建编辑器实例
const editor = new Editor({
  container: '#editor-container',  // 容器元素或 CSS 选择器
  plugins: [MosaicPlugin, TextPlugin, FilterPlugin],
  historyLimit: 50,
  responsive: true,
  toolbar: {
    theme: 'dark',          // 'light' | 'dark' | 'auto'
    primaryColor: '#667eea',
    autoHide: true,
    disabledTools,
  },
});

// 加载图片
await editor.loadImage('https://example.com/image.jpg');

// 导出图片
const blob = await editor.export({
  format: 'png',    // 'png' | 'jpeg' | 'webp'
  type: 'blob',     // 'base64' | 'blob' | 'file'
  quality: 0.92,    // JPEG/WebP 质量 (0-1)
});

// 监听事件
editor.on('ready', ({ width, height }) => {
  console.log('编辑器就绪:', width, 'x', height);
});

editor.on('history-change', ({ canUndo, canRedo }) => {
  console.log('可撤销:', canUndo, '可重做:', canRedo);
});

// 销毁编辑器
editor.destroy();
```

### 2️⃣ 原生 JavaScript - UMD（浏览器直接引入）

无需构建工具，直接在 HTML 中引入使用。

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

  <!-- 通过 CDN 引入 UMD 产物 -->
  <script src="https://unpkg.com/@ldesign/image-editor/dist/index.umd.js"></script>
  
  <script>
    // UMD 模块暴露全局变量 ImageEditorCore
    const { Editor, MosaicPlugin, TextPlugin, FilterPlugin } = ImageEditorCore;

    // 创建编辑器实例
    const editor = new Editor({
      container: '#editor-container',
      plugins: [MosaicPlugin, TextPlugin, FilterPlugin],
      historyLimit: 50,
      responsive: true,
      toolbar: {
        theme: 'dark',
        primaryColor: '#667eea',
        autoHide: true,
        disabledTools: ['triangle', 'arrow'],
      },
    });

    // 加载图片
    editor.loadImage('https://example.com/image.jpg');

    // 导出图片
    document.getElementById('export-btn').onclick = async () => {
      const blob = await editor.export({
        format: 'png',
        type: 'blob',
      });
      
      // 下载
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'image.png';
      a.click();
      URL.revokeObjectURL(url);
    };

    // 监听事件
    editor.on('image-loaded', ({ width, height }) => {
      console.log('图片加载完成:', width, 'x', height);
    });
  </script>
</body>
</html>
```

**本地文件引入：**

```html
<script src="./node_modules/@ldesign/image-editor/dist/index.umd.js"></script>
```

---

### 3️⃣ Vue 3 - 组件模式（推荐）

使用 `@ldesign/image-editor-vue` 提供的 `ImageEditor` 组件。

```bash
# 安装 Vue 组件库
npm install @ldesign/image-editor-vue @ldesign/image-editor
```

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { ImageEditor } from '@ldesign/image-editor-vue';
import { MosaicPlugin, TextPlugin, FilterPlugin } from '@ldesign/image-editor';
import type { ToolName } from '@ldesign/image-editor';

// 编辑器组件引用
const editorRef = ref<InstanceType<typeof ImageEditor> | null>(null);

// 图片源
const imageSrc = ref<string | undefined>(undefined);

// 插件配置
const plugins = [MosaicPlugin, TextPlugin, FilterPlugin];

// 禁用的工具列表
const disabledTools: ToolName[] = ['triangle', 'arrow'];

// 编辑器就绪回调
const onEditorReady = (e: { width: number; height: number }) => {
  console.log('Editor ready:', e.width, 'x', e.height);
};

// 加载图片
const loadImage = (file: File) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    imageSrc.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
};

// 导出图片 - 多种方式
const exportImage = async () => {
  if (!editorRef.value) return;
  
  // 方式1: 快捷导出
  const pngUrl = editorRef.value.toPNG();
  const jpegUrl = editorRef.value.toJPEG(0.8);
  
  // 方式2: 完整导出选项
  const blob = await editorRef.value.export({ format: 'png', type: 'blob' });
  
  // 方式3: 一键下载
  await editorRef.value.download('my-image', { format: 'png' });
  
  return blob;
};

// 图像变换
const handleTransform = () => {
  editorRef.value?.rotateRight();      // 顺时针旋转 90°
  editorRef.value?.flipHorizontal();   // 水平翻转
};

// 动态修改工具栏
const updateToolbar = () => {
  editorRef.value?.setTheme('light');
  editorRef.value?.setPrimaryColor('#ff6b6b');
  editorRef.value?.disableTool('mosaic');
};
</script>

<template>
  <div class="editor-wrapper">
    <!-- 新简化 API: 直接传递 props -->
    <ImageEditor
      ref="editorRef"
      :image="imageSrc"
      :plugins="plugins"
      theme="dark"
      primary-color="#667eea"
      :disabled-tools="disabledTools"
      :history-limit="50"
      responsive
      @ready="onEditorReady"
      @tool-change="(e) => console.log('Tool:', e.tool)"
      @history-change="(e) => console.log('History:', e)"
    >
      <!-- 可选: 自定义插槽 -->
      <template #toolbar="{ currentTool, undo, redo, canUndo, canRedo }">
        <!-- 自定义工具栏 -->
      </template>
      <template #actions="{ download, copyToClipboard, isReady }">
        <!-- 自定义操作按钮 -->
      </template>
    </ImageEditor>
  </div>
</template>

<style scoped>
.editor-wrapper {
  width: 100%;
  height: 600px;
  background: #1a1a1a;
}
</style>
```

**ImageEditor 组件 Props（新简化 API）：**

| Prop | 类型 | 说明 |
|------|------|------|
| `image` | `string` | 图片 URL 或 Base64 |
| `width` | `number` | 画布宽度 |
| `height` | `number` | 画布高度 |
| `plugins` | `PluginConstructor[]` | 启用的插件列表 |
| `theme` | `'light' \| 'dark' \| 'auto'` | 工具栏主题 |
| `primaryColor` | `string` | 主题色 |
| `disabledTools` | `string[]` | 禁用的工具列表 |
| `historyLimit` | `number` | 历史记录数 |
| `backgroundColor` | `string` | 背景色 |
| `responsive` | `boolean` | 是否响应式 |
| `toolbarDisabled` | `boolean` | 禁用工具栏 |
| `defaultTool` | `string` | 图片加载后默认选中的工具 |
| `options` | `object` | 完整配置对象 |

**ImageEditor 组件 Events：**

| Event | Payload | 说明 |
|-------|---------|------|
| `ready` | `{ width, height }` | 编辑器就绪 |
| `error` | `{ error }` | 发生错误 |
| `tool-change` | `{ tool, prevTool }` | 工具切换 |
| `history-change` | `{ canUndo, canRedo }` | 历史记录变化 |
| `image-loaded` | `{ width, height }` | 图片加载完成 |
| `before-export` | `{ options }` | 导出前 |
| `after-export` | `{ data }` | 导出后 |
| `destroy` | - | 编辑器销毁 |
| `transform` | `{ type, ... }` | 变换操作 |

**通过 ref 访问的方法/属性：**

```typescript
// ✅ 核心方法
editorRef.value?.loadImage(src)      // 加载图片
editorRef.value?.export(options)     // 导出图片
editorRef.value?.undo()              // 撤销
editorRef.value?.redo()              // 重做
editorRef.value?.setTool(name)       // 设置工具

// ✅ 响应式属性
editorRef.value?.editor              // Editor 实例
editorRef.value?.isReady             // 是否就绪
editorRef.value?.isLoading           // 是否加载中
editorRef.value?.canUndo             // 是否可撤销
editorRef.value?.canRedo             // 是否可重做
editorRef.value?.width               // 画布宽度
editorRef.value?.height              // 画布高度
editorRef.value?.currentTool         // 当前工具

// ✅ 工具栏控制 (新增)
editorRef.value?.setTheme(theme)         // 设置主题
editorRef.value?.setPrimaryColor(color)  // 设置主题色
editorRef.value?.setDisabledTools(tools) // 设置禁用工具
editorRef.value?.toggleTool(name)        // 切换工具启用
editorRef.value?.enableTool(name)        // 启用工具
editorRef.value?.disableTool(name)       // 禁用工具

// ✅ 图像变换 (新增)
editorRef.value?.rotate(degrees)         // 旋转
editorRef.value?.rotateLeft()            // 左旋 90°
editorRef.value?.rotateRight()           // 右旋 90°
editorRef.value?.flipHorizontal()        // 水平翻转
editorRef.value?.flipVertical()          // 垂直翻转
editorRef.value?.crop(x, y, w, h)        // 裁剪
editorRef.value?.resize(w, h)            // 调整大小
editorRef.value?.scale(factor)           // 缩放
editorRef.value?.reset()                 // 重置

// ✅ 快捷导出 (新增)
editorRef.value?.toPNG()                 // 导出 PNG
editorRef.value?.toJPEG(quality)         // 导出 JPEG
editorRef.value?.toWebP(quality)         // 导出 WebP
editorRef.value?.toBase64(format)        // 导出 Base64
editorRef.value?.download(name, opts)    // 一键下载
editorRef.value?.copyToClipboard()       // 复制到剪贴板
editorRef.value?.getImageInfo()          // 获取图片信息
```

---

### 4️⃣ Vue 3 - Hook 模式（Composables）

使用多个 composables 进行更灵活的控制。

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { 
  useImageEditor,
  useEditorToolbar,
  useEditorTransform,
  useEditorExport,
} from '@ldesign/image-editor-vue';
import { MosaicPlugin, TextPlugin, FilterPlugin } from '@ldesign/image-editor';
import type { ToolName } from '@ldesign/image-editor';

const containerRef = ref<HTMLDivElement | null>(null);
const disabledTools: ToolName[] = ['triangle', 'arrow'];

// 1️⃣ 核心 Hook - 编辑器生命周期管理
const {
  editor,
  isReady,
  isLoading,
  error,
  width,
  height,
  canUndo,
  canRedo,
  init,
  loadImage,
  exportImage,
  undo,
  redo,
  setTool,
} = useImageEditor({
  plugins: [MosaicPlugin, TextPlugin, FilterPlugin],
  options: {
    historyLimit: 50,
    responsive: true,
    toolbar: {
      theme: 'dark',
      primaryColor: '#667eea',
      autoHide: true,
      disabledTools,
    },
  },
});

// 2️⃣ 工具栏 Hook - 动态控制工具栏
const {
  theme,
  primaryColor,
  setTheme,
  setPrimaryColor,
  toggleTool,
  enableTool,
  disableTool,
} = useEditorToolbar(editor, {
  theme: 'dark',
  primaryColor: '#667eea',
  disabledTools,
});

// 3️⃣ 变换 Hook - 图像变换操作
const {
  rotate,
  rotateLeft,
  rotateRight,
  flipHorizontal,
  flipVertical,
  crop,
  resize,
  scale,
  reset,
} = useEditorTransform(editor);

// 4️⃣ 导出 Hook - 多种导出方式
const {
  toPNG,
  toJPEG,
  toWebP,
  toBase64,
  download,
  copyToClipboard,
  getImageInfo,
} = useEditorExport(editor);

// 初始化
onMounted(() => {
  if (containerRef.value) {
    init(containerRef.value);
  }
});

// 上传图片
const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => loadImage(e.target?.result as string);
  reader.readAsDataURL(file);
};

// 快速导出
const handleQuickExport = () => {
  const dataUrl = toPNG();        // PNG
  const jpegUrl = toJPEG(0.8);    // JPEG with quality
  const info = getImageInfo();    // Get dimensions
  console.log('Size:', info?.width, 'x', info?.height);
};

// 变换操作
const handleTransform = () => {
  rotateRight();      // 旋转 90°
  flipHorizontal();   // 水平翻转
  scale(0.5);         // 缩小到 50%
};

// 一键下载/复制
const handleDownload = () => download('my-image', { format: 'png' });
const handleCopy = () => copyToClipboard();
</script>

<template>
  <div class="editor-page">
    <div class="toolbar">
      <input type="file" accept="image/*" @change="handleFileUpload" />
      <button @click="undo" :disabled="!canUndo">撤销</button>
      <button @click="redo" :disabled="!canRedo">重做</button>
      <button @click="rotateRight">旋转</button>
      <button @click="flipHorizontal">翻转</button>
      <button @click="handleDownload" :disabled="!isReady">下载</button>
      <button @click="handleCopy" :disabled="!isReady">复制</button>
      <span v-if="isReady">{{ width }} × {{ height }}</span>
    </div>
    <div ref="containerRef" class="editor-container" />
  </div>
</template>

<style scoped>
.editor-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.toolbar {
  display: flex;
  gap: 8px;
  padding: 12px;
  background: #2d2d2d;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  color: #fff;
}
.toolbar button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.editor-container {
  flex: 1;
  background: #1a1a1a;
}
</style>
```

**可用的 Composables：**

| Composable | 说明 |
|------------|------|
| `useImageEditor` | 核心 Hook，管理编辑器生命周期 |
| `useEditorEvents` | 事件订阅 Hook |
| `useEditorToolbar` | 工具栏控制 Hook |
| `useEditorTransform` | 图像变换 Hook |
| `useEditorExport` | 导出功能 Hook |

**useEditorToolbar 返回值：**

| 属性/方法 | 类型 | 说明 |
|-----------|------|------|
| `theme` | `Ref<ToolbarTheme>` | 当前主题 |
| `primaryColor` | `Ref<string>` | 主题色 |
| `disabledTools` | `Ref<string[]>` | 禁用工具列表 |
| `setTheme` | `(theme) => void` | 设置主题 |
| `setPrimaryColor` | `(color) => void` | 设置主题色 |
| `toggleTool` | `(name) => void` | 切换工具启用 |
| `enableTool` | `(name) => void` | 启用工具 |
| `disableTool` | `(name) => void` | 禁用工具 |

**useEditorTransform 返回值：**

| 方法 | 说明 |
|------|------|
| `rotate(degrees)` | 旋转指定角度 |
| `rotateLeft()` | 逆时针旋转 90° |
| `rotateRight()` | 顺时针旋转 90° |
| `flipHorizontal()` | 水平翻转 |
| `flipVertical()` | 垂直翻转 |
| `crop(x, y, w, h)` | 裁剪 |
| `resize(w, h)` | 调整大小 |
| `scale(factor)` | 缩放 |
| `reset()` | 重置到原图 |

**useEditorExport 返回值：**

| 方法 | 说明 |
|------|------|
| `toPNG()` | 导出 PNG data URL |
| `toJPEG(quality?)` | 导出 JPEG data URL |
| `toWebP(quality?)` | 导出 WebP data URL |
| `toBase64(format?, quality?)` | 导出 Base64 |
| `toBlob(type?, quality?)` | 导出 Blob |
| `download(name?, options?)` | 一键下载 |
| `copyToClipboard()` | 复制到剪贴板 |
| `getImageInfo()` | 获取图片信息 |

---

## 🔧 配置选项

### 完整配置示例

```typescript
const editor = new Editor({
  // 必填：容器元素
  container: '#editor-container',
  
  // 可选：初始图片
  image: 'https://example.com/image.jpg',
  
  // 可选：画布尺寸（不设置则自适应容器）
  width: 800,
  height: 600,
  
  // 可选：画布背景色
  backgroundColor: 'transparent',
  
  // 可选：启用的插件
  plugins: [MosaicPlugin, TextPlugin, FilterPlugin],
  
  // 可选：历史记录最大数量
  historyLimit: 50,
  
  // 可选：是否响应式
  responsive: true,
  
  // 可选：工具栏配置
  toolbar: {
    theme: 'dark',              // 'light' | 'dark' | 'auto'
    primaryColor: '#667eea',    // 主题色
    autoHide: true,             // 无图片时自动隐藏
    zoom: true,                 // 显示缩放控件
    tools: true,                // 显示工具按钮
    history: true,              // 显示撤销/重做
    export: true,               // 显示导出按钮
    disabledTools: [            // 禁用的工具
      'triangle',
      'arrow',
    ],
    defaultTool: 'pen',         // 图片加载后默认选中画笔工具
    placeholderText: '点击上传或拖放图片',
    placeholderSubText: '支持 PNG、JPG、GIF 等格式',
  },
});
```

### 可禁用的工具

```typescript
type ToolName = 
  | 'move'      // 移动/选择
  | 'pen'       // 画笔
  | 'rect'      // 矩形
  | 'circle'    // 圆形
  | 'arrow'     // 箭头
  | 'line'      // 直线
  | 'triangle'  // 三角形
  | 'text'      // 文字（需要 TextPlugin）
  | 'mosaic'    // 马赛克（需要 MosaicPlugin）
  | 'eraser'    // 橡皮擦
  | 'crop'      // 裁剪
  | 'filter'    // 滤镜（需要 FilterPlugin）
  | 'zoomIn'    // 放大
  | 'zoomOut'   // 缩小
  | 'reset'     // 重置视图
  | 'undo'      // 撤销
  | 'redo'      // 重做
  | 'export';   // 导出
```

---

## 📦 部署

### 部署到 Vercel

```bash
# 首次部署
pnpm --filter @ldesign/image-editor-playground deploy

# 部署到生产环境
pnpm --filter @ldesign/image-editor-playground deploy:prod
```

### 手动部署

1. 构建项目：
```bash
pnpm --filter @ldesign/image-editor-playground build
```

2. 将 `playground/dist` 目录部署到任意静态托管服务。

---

## 📄 License

MIT
