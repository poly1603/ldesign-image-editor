<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ChevronLeft, Copy, Check, Sun, Moon, FileText } from 'lucide-vue-next';
import { ref, onMounted, computed } from 'vue';
import { useTheme } from '@/composables/useTheme';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import bash from 'highlight.js/lib/languages/bash';

// Register languages
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('javascript', typescript);
hljs.registerLanguage('bash', bash);

const { theme: currentTheme, toggleTheme } = useTheme();
const copiedId = ref<string | null>(null);

// Highlight code
const highlight = (code: string, lang = 'typescript') => {
  try {
    return hljs.highlight(code, { language: lang }).value;
  } catch {
    return code;
  }
};

const copyCode = async (code: string, id: string) => {
  try {
    await navigator.clipboard.writeText(code);
    copiedId.value = id;
    setTimeout(() => { copiedId.value = null; }, 2000);
  } catch (err) {
    console.error('Copy failed:', err);
  }
};

// Code examples
const installCode = `# 从私有 npm registry 安装
npm install @ldesign/image-editor --registry=http://npm.longrise.cn:6286/
# or
pnpm add @ldesign/image-editor --registry=http://npm.longrise.cn:6286/`;

const basicJsCode = `import { Editor, MosaicPlugin } from '@ldesign/image-editor';

// 创建编辑器 - 简单模式
const editor = new Editor({
  container: '#editor-container',
  plugins: [MosaicPlugin],
});

// 加载图片后工具栏自动显示
const input = document.querySelector('input[type="file"]');
input.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (file) {
    const dataUrl = await readFile(file);
    await editor.loadImage(dataUrl);
  }
});`;

const fullJsCode = `import { 
  Editor, 
  MosaicPlugin, 
  TextPlugin, 
  FilterPlugin 
} from '@ldesign/image-editor';

const editor = new Editor({
  container: '#editor-container',
  // 不传 image 则显示占位图，工具栏隐藏
  plugins: [MosaicPlugin, TextPlugin, FilterPlugin],
  historyLimit: 50,
  responsive: true,
  toolbar: {
    theme: 'dark',        // 'light' | 'dark' | 'auto'
    autoHide: true,       // 无图片时隐藏工具栏
    primaryColor: '#667eea',
    disabledTools: ['arrow'], // 禁用箭头工具
  },
});

// 导出图片
const blob = await editor.export({
  format: 'png',      // 'png' | 'jpeg'
  type: 'blob',       // 'base64' | 'blob' | 'file'
  quality: 0.92,      // JPEG 质量
});

// 上传到服务器
const formData = new FormData();
formData.append('file', blob, 'image.png');
await fetch('/api/upload', { method: 'POST', body: formData });`;

const vueCode = `<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Editor, MosaicPlugin, TextPlugin, Toolbar } from '@ldesign/image-editor';

const containerRef = ref<HTMLDivElement | null>(null);
let editor: Editor | null = null;
let toolbar: Toolbar | null = null;

onMounted(() => {
  editor = new Editor({
    container: containerRef.value!,
    plugins: [MosaicPlugin, TextPlugin],
    toolbar: {
      theme: 'dark',
      autoHide: true,
    },
  });
  
  // 获取工具栏引用用于主题切换
  toolbar = (editor as any)._toolbar;
});

// 切换主题
const switchTheme = (theme: 'light' | 'dark') => {
  toolbar?.setTheme(theme);
  if (!toolbar?.hasImage()) {
    toolbar?.showPlaceholder();
  }
};

// 加载图片
const loadImage = async (file: File) => {
  const reader = new FileReader();
  reader.onload = async (e) => {
    await editor?.loadImage(e.target?.result as string);
  };
  reader.readAsDataURL(file);
};

onUnmounted(() => {
  editor?.destroy();
});
<\/script>

<template>
  <div ref="containerRef" class="editor-container" />
</template>`;

const toolbarOptionsCode = `interface ToolbarConfig {
  zoom?: boolean;           // 缩放控件
  tools?: boolean;          // 工具按钮
  history?: boolean;        // 撤销/重做
  export?: boolean;         // 导出按钮
  theme?: 'light' | 'dark' | 'auto';
  primaryColor?: string;    // 主题色
  autoHide?: boolean;       // 无图片时隐藏
  disabledTools?: ToolName[]; // 禁用的工具
  placeholderText?: string;   // 占位图文字
  placeholderSubText?: string; // 占位图副文字
  placeholderWidth?: number;  // 占位图宽度
  placeholderHeight?: number; // 占位图高度
}

type ToolName = 
  | 'move' | 'pen' | 'rect' | 'circle' | 'arrow' | 'line' | 'triangle'
  | 'text' | 'mosaic' | 'eraser' | 'crop' | 'filter'
  | 'zoomIn' | 'zoomOut' | 'reset'
  | 'undo' | 'redo' | 'export';`;

const apiMethodsCode = `// Editor 实例方法
editor.loadImage(source)     // 加载图片
editor.export(options)       // 导出图片
editor.undo()               // 撤销
editor.redo()               // 重做
editor.canUndo()            // 是否可撤销
editor.canRedo()            // 是否可重做
editor.setTool(name)        // 设置当前工具
editor.getTool(name)        // 获取插件实例
editor.saveToHistory(desc)  // 手动保存历史
editor.getImageInfo()       // 获取图片尺寸
editor.destroy()            // 销毁编辑器

// Toolbar 实例方法 (通过 editor._toolbar 获取)
toolbar.setTheme(theme)     // 设置主题 ('light'|'dark'|'auto')
toolbar.getTheme()          // 获取当前主题
toolbar.setPrimaryColor(color) // 设置主题色
toolbar.showPlaceholder()   // 显示占位图
toolbar.hasImage()          // 是否有真实图片
toolbar.isToolbarVisible()  // 工具栏是否可见
toolbar.setToolbarVisible(visible) // 控制工具栏显隐`;
</script>

<template>
  <div class="docs-page" :class="`theme-${currentTheme}`">
    <header class="docs-header">
      <RouterLink to="/" class="back-btn">
        <ChevronLeft :size="20" />
        <span>返回</span>
      </RouterLink>
      <h1 class="title">使用文档</h1>
      <RouterLink to="/api" class="nav-link">
        <FileText :size="16" />
        <span>API 参考</span>
      </RouterLink>
      <button class="theme-btn" @click="toggleTheme">
        <Sun v-if="currentTheme === 'dark'" :size="18" />
        <Moon v-else :size="18" />
      </button>
    </header>
    
    <main class="docs-content">
      <section class="docs-section">
        <h2>安装</h2>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(installCode, 'install')">
            <Check v-if="copiedId === 'install'" :size="16" />
            <Copy v-else :size="16" />
          </button>
          <pre><code class="hljs" v-html="highlight(installCode, 'bash')"></code></pre>
        </div>
      </section>
      
      <section class="docs-section">
        <h2>原生 JavaScript 使用</h2>
        <h3>基础用法</h3>
        <p>最简单的使用方式，只需指定容器和插件：</p>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(basicJsCode, 'basic-js')">
            <Check v-if="copiedId === 'basic-js'" :size="16" />
            <Copy v-else :size="16" />
          </button>
          <pre><code class="hljs" v-html="highlight(basicJsCode)"></code></pre>
        </div>
        
        <h3>完整配置</h3>
        <p>包含所有可配置选项的完整示例：</p>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(fullJsCode, 'full-js')">
            <Check v-if="copiedId === 'full-js'" :size="16" />
            <Copy v-else :size="16" />
          </button>
          <pre><code class="hljs" v-html="highlight(fullJsCode)"></code></pre>
        </div>
      </section>
      
      <section class="docs-section">
        <h2>Vue 3 使用</h2>
        <p>在 Vue 组件中使用编辑器：</p>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(vueCode, 'vue')">
            <Check v-if="copiedId === 'vue'" :size="16" />
            <Copy v-else :size="16" />
          </button>
          <pre><code class="hljs" v-html="highlight(vueCode)"></code></pre>
        </div>
      </section>
      
      <section class="docs-section">
        <h2>工具栏配置</h2>
        <p>工具栏支持以下配置选项：</p>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(toolbarOptionsCode, 'toolbar')">
            <Check v-if="copiedId === 'toolbar'" :size="16" />
            <Copy v-else :size="16" />
          </button>
          <pre><code class="hljs" v-html="highlight(toolbarOptionsCode)"></code></pre>
        </div>
      </section>
      
      <section class="docs-section">
        <h2>API 方法</h2>
        <p>Editor 和 Toolbar 提供的主要方法：</p>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(apiMethodsCode, 'api')">
            <Check v-if="copiedId === 'api'" :size="16" />
            <Copy v-else :size="16" />
          </button>
          <pre><code class="hljs" v-html="highlight(apiMethodsCode)"></code></pre>
        </div>
      </section>
      
      <section class="docs-section">
        <h2>裁剪功能</h2>
        <p>选择裁剪工具后，可以拖动裁剪框调整区域。裁剪框外部会显示半透明遮罩。</p>
        <ul class="feature-list">
          <li>✅ 点击裁剪工具进入裁剪模式</li>
          <li>✅ 拖动裁剪框边缘或角调整大小</li>
          <li>✅ 工具栏会显示「取消」和「确认裁剪」按钮</li>
          <li>✅ 确认裁剪后带有平滑过渡动画</li>
          <li>✅ 支持撤销恢复裁剪前的状态</li>
        </ul>
      </section>
      
      <section class="docs-section">
        <h2>可用插件</h2>
        <div class="plugin-list">
          <div class="plugin-card">
            <h4>MosaicPlugin</h4>
            <p>马赛克打码功能，支持调整笔刷大小和色块大小</p>
          </div>
          <div class="plugin-card">
            <h4>TextPlugin</h4>
            <p>文字添加功能，支持自定义字体大小和颜色</p>
          </div>
          <div class="plugin-card">
            <h4>FilterPlugin</h4>
            <p>图片滤镜功能，调整亮度、对比度、饱和度</p>
          </div>
        </div>
      </section>
      
      <section class="docs-section">
        <h2>功能特性</h2>
        <ul class="feature-list">
          <li>✅ 自动显示/隐藏工具栏（无图片时隐藏）</li>
          <li>✅ 亮色/暗色主题切换</li>
          <li>✅ 可配置的工具栏（禁用特定工具）</li>
          <li>✅ 绘图工具（画笔、矩形、圆形、箭头、直线、三角形）</li>
          <li>✅ 形状图层支持（可选择、移动、删除）</li>
          <li>✅ 马赛克工具（可调笔刷和色块大小）</li>
          <li>✅ 橡皮擦工具（像素/形状模式）</li>
          <li>✅ 图片裁剪（带遮罩和动画效果）</li>
          <li>✅ 滤镜调整（亮度、对比度、饱和度）</li>
          <li>✅ 撤销/重做历史记录</li>
          <li>✅ 图片导出（PNG/JPEG/WebP，可调质量）</li>
          <li>✅ 多种导出格式（Base64、Blob、File）</li>
          <li>✅ 响应式设计</li>
          <li>✅ 快捷键支持</li>
        </ul>
      </section>
    </main>
  </div>
</template>

<style scoped>
.docs-page {
  min-height: 100vh;
  transition: background 0.2s, color 0.2s;
}

.docs-page.theme-dark {
  background: #1a1a1a;
  color: #e0e0e0;
}

.docs-page.theme-light {
  background: #f8f9fa;
  color: #333;
}

.docs-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 24px;
  border-bottom: 1px solid;
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(10px);
}

.docs-page.theme-dark .docs-header {
  background: rgba(26, 26, 26, 0.9);
  border-color: rgba(255, 255, 255, 0.1);
}

.docs-page.theme-light .docs-header {
  background: rgba(248, 249, 250, 0.9);
  border-color: rgba(0, 0, 0, 0.1);
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.15s;
}

.docs-page.theme-dark .back-btn {
  color: rgba(255, 255, 255, 0.7);
}

.docs-page.theme-light .back-btn {
  color: rgba(0, 0, 0, 0.7);
}

.back-btn:hover {
  background: rgba(128, 128, 128, 0.15);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  text-decoration: none;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.15s;
  background: rgba(102, 126, 234, 0.1);
}

.docs-page.theme-dark .nav-link {
  color: #667eea;
}

.docs-page.theme-light .nav-link {
  color: #5a67d8;
}

.nav-link:hover {
  background: rgba(102, 126, 234, 0.2);
}

.title {
  flex: 1;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.theme-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
}

.docs-page.theme-dark .theme-btn {
  color: rgba(255, 255, 255, 0.7);
}

.docs-page.theme-light .theme-btn {
  color: rgba(0, 0, 0, 0.7);
}

.theme-btn:hover {
  background: rgba(128, 128, 128, 0.15);
}

.docs-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 24px;
}

.docs-section {
  margin-bottom: 48px;
}

.docs-section h2 {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #667eea;
}

.docs-section h3 {
  font-size: 18px;
  font-weight: 500;
  margin: 24px 0 12px;
}

.docs-section p {
  margin: 0 0 12px;
  line-height: 1.6;
  opacity: 0.85;
}

.code-block {
  position: relative;
  margin: 16px 0;
  border-radius: 10px;
  overflow: hidden;
}

.docs-page.theme-dark .code-block {
  background: #2d2d2d;
}

.docs-page.theme-light .code-block {
  background: #f1f3f5;
}

.code-block pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
}

.code-block code {
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.6;
}

/* Syntax highlighting colors - use :deep() for scoped styles */
.code-block :deep(.hljs-keyword),
.code-block :deep(.hljs-selector-tag),
.code-block :deep(.hljs-built_in) {
  color: #c678dd;
}

.code-block :deep(.hljs-string),
.code-block :deep(.hljs-attribute) {
  color: #98c379;
}

.code-block :deep(.hljs-number),
.code-block :deep(.hljs-literal) {
  color: #d19a66;
}

.code-block :deep(.hljs-comment) {
  color: #7f848e;
  font-style: italic;
}

.code-block :deep(.hljs-title),
.code-block :deep(.hljs-section),
.code-block :deep(.hljs-selector-id) {
  color: #61afef;
}

.code-block :deep(.hljs-variable),
.code-block :deep(.hljs-template-variable),
.code-block :deep(.hljs-params) {
  color: #e06c75;
}

.code-block :deep(.hljs-type),
.code-block :deep(.hljs-class .hljs-title) {
  color: #e5c07b;
}

.code-block :deep(.hljs-function) {
  color: #61afef;
}

.code-block :deep(.hljs-meta) {
  color: #56b6c2;
}

.docs-page.theme-light .code-block :deep(.hljs-keyword),
.docs-page.theme-light .code-block :deep(.hljs-selector-tag),
.docs-page.theme-light .code-block :deep(.hljs-built_in) {
  color: #a626a4;
}

.docs-page.theme-light .code-block :deep(.hljs-string),
.docs-page.theme-light .code-block :deep(.hljs-attribute) {
  color: #50a14f;
}

.docs-page.theme-light .code-block :deep(.hljs-number),
.docs-page.theme-light .code-block :deep(.hljs-literal) {
  color: #986801;
}

.docs-page.theme-light .code-block :deep(.hljs-comment) {
  color: #a0a1a7;
}

.docs-page.theme-light .code-block :deep(.hljs-title),
.docs-page.theme-light .code-block :deep(.hljs-section),
.docs-page.theme-light .code-block :deep(.hljs-selector-id) {
  color: #4078f2;
}

.docs-page.theme-light .code-block :deep(.hljs-variable),
.docs-page.theme-light .code-block :deep(.hljs-template-variable),
.docs-page.theme-light .code-block :deep(.hljs-params) {
  color: #e45649;
}

.docs-page.theme-light .code-block :deep(.hljs-type),
.docs-page.theme-light .code-block :deep(.hljs-class .hljs-title) {
  color: #c18401;
}

.copy-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(128, 128, 128, 0.2);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
}

.docs-page.theme-dark .copy-btn {
  color: rgba(255, 255, 255, 0.6);
}

.docs-page.theme-light .copy-btn {
  color: rgba(0, 0, 0, 0.6);
}

.copy-btn:hover {
  background: rgba(128, 128, 128, 0.3);
}

.plugin-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.plugin-card {
  padding: 16px;
  border-radius: 10px;
  transition: transform 0.15s;
}

.docs-page.theme-dark .plugin-card {
  background: #2d2d2d;
}

.docs-page.theme-light .plugin-card {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.plugin-card:hover {
  transform: translateY(-2px);
}

.plugin-card h4 {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 600;
  color: #667eea;
}

.plugin-card p {
  margin: 0;
  font-size: 14px;
  opacity: 0.75;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 16px 0;
}

.feature-list li {
  padding: 8px 0;
  font-size: 15px;
  line-height: 1.5;
}
</style>
