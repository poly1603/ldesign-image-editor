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

// 图片源 - 通过 v-model 或 :image 绑定
const imageSrc = ref<string | undefined>(undefined);

// 插件配置
const plugins = [MosaicPlugin, TextPlugin, FilterPlugin];

// 禁用的工具列表
const disabledTools: ToolName[] = ['triangle', 'arrow'];

// 编辑器选项
const editorOptions = {
  historyLimit: 50,
  responsive: true,
  toolbar: {
    theme: 'dark',
    primaryColor: '#667eea',
    autoHide: true,
    disabledTools,
  },
};

// 编辑器就绪回调
const onEditorReady = (e: { width: number; height: number }) => {
  console.log('Editor ready:', e.width, 'x', e.height);
};

// 工具切换回调
const onToolChange = (e: { tool: string; prevTool: string | null }) => {
  console.log('Tool changed:', e.prevTool, '->', e.tool);
};

// 加载图片
const loadImage = (file: File) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    imageSrc.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
};

// 导出图片
const exportImage = async () => {
  if (!editorRef.value) return;
  
  const blob = await editorRef.value.export({ 
    format: 'png', 
    type: 'blob' 
  });
  
  return blob;
};

// 撤销/重做
const undo = () => editorRef.value?.undo();
const redo = () => editorRef.value?.redo();
</script>

<template>
  <div class="editor-wrapper">
    <ImageEditor
      ref="editorRef"
      :image="imageSrc"
      :plugins="plugins"
      :options="editorOptions"
      @ready="onEditorReady"
      @tool-change="onToolChange"
      @image-loaded="(e) => console.log('Image loaded:', e)"
      @history-change="(e) => console.log('History:', e)"
    />
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

**ImageEditor 组件 Props：**

| Prop | 类型 | 说明 |
|------|------|------|
| `image` | `string` | 图片 URL 或 Base64 |
| `width` | `number` | 画布宽度 |
| `height` | `number` | 画布高度 |
| `plugins` | `PluginConstructor[]` | 启用的插件列表 |
| `options` | `object` | 编辑器配置选项 |

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

**通过 ref 访问的方法/属性：**

```typescript
// 方法
editorRef.value?.loadImage(src)      // 加载图片
editorRef.value?.export(options)     // 导出图片
editorRef.value?.undo()              // 撤销
editorRef.value?.redo()              // 重做
editorRef.value?.setTool(name)       // 设置工具

// 响应式属性
editorRef.value?.editor              // Editor 实例
editorRef.value?.isReady             // 是否就绪
editorRef.value?.isLoading           // 是否加载中
editorRef.value?.canUndo             // 是否可撤销
editorRef.value?.canRedo             // 是否可重做
editorRef.value?.width               // 画布宽度
editorRef.value?.height              // 画布高度
editorRef.value?.currentTool         // 当前工具
```

---

### 4️⃣ Vue 3 - Hook 模式（Composable）

使用 `useImageEditor` hook 进行更灵活的控制。

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useImageEditor } from '@ldesign/image-editor-vue';
import { MosaicPlugin, TextPlugin, FilterPlugin } from '@ldesign/image-editor';
import type { ToolName } from '@ldesign/image-editor';

// 容器引用
const containerRef = ref<HTMLDivElement | null>(null);

// 禁用的工具列表
const disabledTools: ToolName[] = ['triangle', 'arrow'];

// 使用 useImageEditor hook
const {
  editor,         // Editor 实例 (shallowRef)
  isReady,        // 是否就绪
  isLoading,      // 是否加载中
  error,          // 错误信息
  width,          // 画布宽度
  height,         // 画布高度
  currentTool,    // 当前工具
  canUndo,        // 是否可撤销
  canRedo,        // 是否可重做
  init,           // 初始化编辑器
  loadImage,      // 加载图片
  exportImage,    // 导出图片
  undo,           // 撤销
  redo,           // 重做
  setTool,        // 设置工具
  destroy,        // 销毁
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

// 初始化编辑器
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
  reader.onload = (e) => {
    loadImage(e.target?.result as string);
  };
  reader.readAsDataURL(file);
};

// 导出图片
const handleExport = async () => {
  const blob = await exportImage({ format: 'png', type: 'blob' });
  console.log('Exported:', blob);
  
  // 下载
  if (blob) {
    const url = URL.createObjectURL(blob as Blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'image.png';
    a.click();
    URL.revokeObjectURL(url);
  }
};
</script>

<template>
  <div class="editor-page">
    <div class="toolbar">
      <input type="file" accept="image/*" @change="handleFileUpload" />
      <button @click="undo" :disabled="!canUndo">撤销</button>
      <button @click="redo" :disabled="!canRedo">重做</button>
      <button @click="handleExport" :disabled="!isReady">导出</button>
      <span v-if="isReady">{{ width }} × {{ height }}</span>
      <span v-if="isLoading">加载中...</span>
      <span v-if="error" class="error">{{ error.message }}</span>
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

.error {
  color: #ff6b6b;
}
</style>
```

**useImageEditor 返回值：**

| 属性/方法 | 类型 | 说明 |
|-----------|------|------|
| `editor` | `Ref<Editor \| null>` | Editor 实例 |
| `isReady` | `Ref<boolean>` | 编辑器是否就绪 |
| `isLoading` | `Ref<boolean>` | 是否正在加载 |
| `error` | `Ref<Error \| null>` | 错误信息 |
| `currentTool` | `Ref<string \| null>` | 当前选中工具 |
| `canUndo` | `Ref<boolean>` | 是否可撤销 |
| `canRedo` | `Ref<boolean>` | 是否可重做 |
| `width` | `Ref<number>` | 画布宽度 |
| `height` | `Ref<number>` | 画布高度 |
| `init` | `(container: HTMLElement) => void` | 初始化编辑器 |
| `loadImage` | `(source: string) => Promise<void>` | 加载图片 |
| `exportImage` | `(options?) => Promise<string \| Blob \| File>` | 导出图片 |
| `undo` | `() => void` | 撤销 |
| `redo` | `() => void` | 重做 |
| `setTool` | `(tool: string) => void` | 设置当前工具 |
| `destroy` | `() => void` | 销毁编辑器 |

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
