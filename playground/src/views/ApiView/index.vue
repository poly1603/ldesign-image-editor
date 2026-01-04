<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ChevronLeft, Sun, Moon, Settings, Layers, Palette, Grid3x3 } from 'lucide-vue-next';
import { useTheme } from '@/composables/useTheme';

const { theme: currentTheme, toggleTheme } = useTheme();

// API Reference data
const editorOptions = [
  { name: 'container', type: 'HTMLElement | string', required: true, default: '-', desc: '编辑器容器元素或选择器' },
  { name: 'image', type: 'string | HTMLImageElement', required: false, default: '-', desc: '初始图片（URL 或元素）。不传则显示占位图' },
  { name: 'width', type: 'number', required: false, default: 'auto', desc: '画布宽度' },
  { name: 'height', type: 'number', required: false, default: 'auto', desc: '画布高度' },
  { name: 'backgroundColor', type: 'string', required: false, default: 'transparent', desc: '画布背景色' },
  { name: 'plugins', type: 'PluginConstructor[]', required: false, default: '[]', desc: '启用的插件列表' },
  { name: 'historyLimit', type: 'number', required: false, default: '50', desc: '历史记录最大数量' },
  { name: 'responsive', type: 'boolean', required: false, default: 'true', desc: '是否响应式' },
  { name: 'deviceType', type: "'auto' | 'pc' | 'mobile'", required: false, default: "'auto'", desc: '设备类型' },
  { name: 'toolbar', type: 'boolean | ToolbarConfig', required: false, default: 'true', desc: '工具栏配置' },
];

const toolbarOptions = [
  { name: 'zoom', type: 'boolean', default: 'true', desc: '显示缩放控件（放大、缩小、重置）' },
  { name: 'tools', type: 'boolean', default: 'true', desc: '显示工具按钮（画笔、形状等）' },
  { name: 'history', type: 'boolean', default: 'true', desc: '显示撤销/重做按钮' },
  { name: 'export', type: 'boolean', default: 'true', desc: '显示导出按钮' },
  { name: 'theme', type: "'light' | 'dark' | 'auto'", default: "'dark'", desc: '主题模式' },
  { name: 'primaryColor', type: 'string', default: "'#667eea'", desc: '主题色（按钮高亮等）' },
  { name: 'autoHide', type: 'boolean', default: 'true', desc: '无图片时自动隐藏工具栏' },
  { name: 'disabledTools', type: 'ToolName[]', default: '[]', desc: '禁用的工具列表' },
  { name: 'placeholderText', type: 'string', default: "'点击上传或拖放图片'", desc: '占位图主文字' },
  { name: 'placeholderSubText', type: 'string', default: "'支持 PNG、JPG、GIF 等格式'", desc: '占位图副文字' },
  { name: 'placeholderWidth', type: 'number', default: '800', desc: '占位图宽度' },
  { name: 'placeholderHeight', type: 'number', default: '600', desc: '占位图高度' },
  { name: 'locale', type: "'zh-CN' | 'en-US'", default: "'zh-CN'", desc: '界面语言' },
  { name: 'enableKeyboardShortcuts', type: 'boolean', default: 'true', desc: '启用快捷键' },
  { name: 'enableExportDialog', type: 'boolean', default: 'true', desc: '启用导出对话框' },
];

const exportOptions = [
  { name: 'format', type: "'png' | 'jpeg' | 'webp'", default: "'png'", desc: '导出图片格式' },
  { name: 'type', type: "'base64' | 'blob' | 'file'", default: "'base64'", desc: '返回数据类型' },
  { name: 'quality', type: 'number (0-1)', default: '0.92', desc: 'JPEG/WebP 压缩质量' },
  { name: 'width', type: 'number', default: '-', desc: '导出宽度（缩放）' },
  { name: 'height', type: 'number', default: '-', desc: '导出高度（缩放）' },
  { name: 'fileName', type: 'string', default: "'image'", desc: '文件名（type 为 file 时）' },
];

const editorMethods = [
  { name: 'loadImage(source)', returns: 'Promise<void>', desc: '加载图片，支持 URL、Base64、HTMLImageElement' },
  { name: 'export(options?)', returns: 'Promise<string|Blob|File>', desc: '导出编辑后的图片' },
  { name: 'undo()', returns: 'void', desc: '撤销上一步操作' },
  { name: 'redo()', returns: 'void', desc: '重做被撤销的操作' },
  { name: 'canUndo()', returns: 'boolean', desc: '是否可以撤销' },
  { name: 'canRedo()', returns: 'boolean', desc: '是否可以重做' },
  { name: 'setTool(name)', returns: 'void', desc: '设置当前工具' },
  { name: 'getTool(name)', returns: 'Plugin | undefined', desc: '获取插件实例' },
  { name: 'use(PluginClass)', returns: 'Editor', desc: '注册插件' },
  { name: 'destroy()', returns: 'void', desc: '销毁编辑器实例' },
];

const toolbarMethods = [
  { name: 'setTheme(theme)', returns: 'void', desc: '设置主题（light/dark/auto）' },
  { name: 'getTheme()', returns: 'string', desc: '获取当前主题' },
  { name: 'setPrimaryColor(color)', returns: 'void', desc: '设置主题色' },
  { name: 'setDisabledTools(tools)', returns: 'void', desc: '动态设置禁用的工具列表' },
  { name: 'getDisabledTools()', returns: 'ToolName[]', desc: '获取当前禁用的工具列表' },
  { name: 'showPlaceholder()', returns: 'void', desc: '显示占位图（并隐藏工具栏）' },
  { name: 'hasImage()', returns: 'boolean', desc: '是否已加载真实图片' },
  { name: 'isToolbarVisible()', returns: 'boolean', desc: '工具栏是否可见' },
  { name: 'setToolbarVisible(visible)', returns: 'void', desc: '手动控制工具栏显示/隐藏' },
  { name: 'toggleCropTool()', returns: 'void', desc: '切换裁剪模式' },
  { name: 'applyCrop()', returns: 'Promise<void>', desc: '确认裁剪' },
];

const editorEvents = [
  { name: 'ready', data: '{ width, height }', desc: '编辑器初始化完成' },
  { name: 'image-loaded', data: '{ width, height }', desc: '图片加载完成' },
  { name: 'history-change', data: '{ canUndo, canRedo }', desc: '历史状态变化' },
  { name: 'tool-change', data: '{ tool, prevTool }', desc: '当前工具变化' },
  { name: 'before-export', data: '{ options }', desc: '导出前触发' },
  { name: 'after-export', data: '{ data }', desc: '导出完成后触发' },
  { name: 'error', data: '{ error }', desc: '发生错误' },
  { name: 'destroy', data: 'void', desc: '编辑器销毁' },
];

const toolNames = [
  // 绘图工具
  'move', 'pen', 'rect', 'circle', 'arrow', 'line', 'triangle', 'text', 'mosaic', 'eraser', 'crop', 'filter',
  // 缩放控件
  'zoomIn', 'zoomOut', 'reset',
  // 历史记录
  'undo', 'redo',
  // 导出
  'export',
];

const plugins = [
  { name: 'MosaicPlugin', desc: '马赛克打码功能，支持调整笔刷和色块大小', tools: 'mosaic' },
  { name: 'TextPlugin', desc: '文字添加功能，支持字体、大小、颜色、样式', tools: 'text' },
  { name: 'FilterPlugin', desc: '图片滤镜，调整亮度、对比度、饱和度', tools: 'filter' },
];

const shortcuts = [
  { key: 'V', desc: '移动工具' },
  { key: 'P', desc: '画笔工具' },
  { key: 'R', desc: '矩形工具' },
  { key: 'O', desc: '圆形工具' },
  { key: 'A', desc: '箭头工具' },
  { key: 'L', desc: '直线工具' },
  { key: 'T', desc: '文字工具' },
  { key: 'M', desc: '马赛克工具' },
  { key: 'E', desc: '橡皮擦工具' },
  { key: 'C', desc: '裁剪工具' },
  { key: 'F', desc: '滤镜工具' },
  { key: 'Ctrl+Z', desc: '撤销' },
  { key: 'Ctrl+Y', desc: '重做' },
  { key: 'Ctrl+S', desc: '导出' },
  { key: '+/-', desc: '缩放' },
  { key: '0', desc: '重置视图' },
  { key: 'Delete', desc: '删除选中形状' },
];
</script>

<template>
  <div class="api-page" :class="`theme-${currentTheme}`">
    <header class="api-header">
      <RouterLink to="/" class="back-btn">
        <ChevronLeft :size="20" />
        <span>返回</span>
      </RouterLink>
      <h1 class="title">API 参考</h1>
      <RouterLink to="/docs" class="nav-link">使用文档</RouterLink>
      <button class="theme-btn" @click="toggleTheme">
        <Sun v-if="currentTheme === 'dark'" :size="18" />
        <Moon v-else :size="18" />
      </button>
    </header>
    
    <main class="api-content">
      <!-- Editor Options -->
      <section class="api-section">
        <div class="section-header">
          <Settings :size="24" />
          <h2>EditorOptions</h2>
        </div>
        <p>创建编辑器时的配置选项</p>
        <div class="table-wrapper">
          <div class="api-table">
            <div class="table-header">
              <span>属性</span>
              <span>类型</span>
              <span>默认值</span>
              <span>描述</span>
            </div>
            <div v-for="item in editorOptions" :key="item.name" class="table-row">
              <span class="prop-name">{{ item.name }}<span v-if="item.required" class="required">*</span></span>
              <span class="prop-type">{{ item.type }}</span>
              <span class="prop-default">{{ item.default }}</span>
              <span class="prop-desc">{{ item.desc }}</span>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Toolbar Options -->
      <section class="api-section">
        <div class="section-header">
          <Grid3x3 :size="24" />
          <h2>ToolbarConfig</h2>
        </div>
        <p>工具栏配置选项（传入 EditorOptions.toolbar）</p>
        <div class="table-wrapper">
          <div class="api-table">
            <div class="table-header">
              <span>属性</span>
              <span>类型</span>
              <span>默认值</span>
              <span>描述</span>
            </div>
            <div v-for="item in toolbarOptions" :key="item.name" class="table-row">
              <span class="prop-name">{{ item.name }}</span>
              <span class="prop-type">{{ item.type }}</span>
              <span class="prop-default">{{ item.default }}</span>
              <span class="prop-desc">{{ item.desc }}</span>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Export Options -->
      <section class="api-section">
        <div class="section-header">
          <Palette :size="24" />
          <h2>ExportOptions</h2>
        </div>
        <p>导出图片时的选项（传入 editor.export()）</p>
        <div class="table-wrapper">
          <div class="api-table">
            <div class="table-header">
              <span>属性</span>
              <span>类型</span>
              <span>默认值</span>
              <span>描述</span>
            </div>
            <div v-for="item in exportOptions" :key="item.name" class="table-row">
              <span class="prop-name">{{ item.name }}</span>
              <span class="prop-type">{{ item.type }}</span>
              <span class="prop-default">{{ item.default }}</span>
              <span class="prop-desc">{{ item.desc }}</span>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Editor Methods -->
      <section class="api-section">
        <h2>Editor 方法</h2>
        <div class="table-wrapper">
          <div class="api-table methods">
            <div class="table-header">
              <span>方法</span>
              <span>返回值</span>
              <span>描述</span>
            </div>
            <div v-for="item in editorMethods" :key="item.name" class="table-row">
              <span class="method-name">{{ item.name }}</span>
              <span class="method-returns">{{ item.returns }}</span>
              <span class="method-desc">{{ item.desc }}</span>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Toolbar Methods -->
      <section class="api-section">
        <h2>Toolbar 方法</h2>
        <p class="note">通过 <code>(editor as any)._toolbar</code> 获取 Toolbar 实例</p>
        <div class="table-wrapper">
          <div class="api-table methods">
            <div class="table-header">
              <span>方法</span>
              <span>返回值</span>
              <span>描述</span>
            </div>
            <div v-for="item in toolbarMethods" :key="item.name" class="table-row">
              <span class="method-name">{{ item.name }}</span>
              <span class="method-returns">{{ item.returns }}</span>
              <span class="method-desc">{{ item.desc }}</span>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Events -->
      <section class="api-section">
        <h2>事件</h2>
        <p>使用 <code>editor.on(event, handler)</code> 监听事件</p>
        <div class="table-wrapper">
          <div class="api-table methods">
            <div class="table-header">
              <span>事件名</span>
              <span>数据</span>
              <span>描述</span>
            </div>
            <div v-for="item in editorEvents" :key="item.name" class="table-row">
              <span class="event-name">{{ item.name }}</span>
              <span class="event-data">{{ item.data }}</span>
              <span class="event-desc">{{ item.desc }}</span>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Tool Names -->
      <section class="api-section">
        <div class="section-header">
          <Layers :size="24" />
          <h2>ToolName</h2>
        </div>
        <p>可用的工具名称（用于 disabledTools 配置）</p>
        <div class="tool-tags">
          <span v-for="tool in toolNames" :key="tool" class="tool-tag">{{ tool }}</span>
        </div>
      </section>
      
      <!-- Plugins -->
      <section class="api-section">
        <h2>插件列表</h2>
        <div class="table-wrapper">
          <div class="api-table">
            <div class="table-header">
              <span>插件名</span>
              <span>关联工具</span>
              <span>描述</span>
            </div>
            <div v-for="item in plugins" :key="item.name" class="table-row">
              <span class="plugin-name">{{ item.name }}</span>
              <span class="plugin-tools">{{ item.tools }}</span>
              <span class="plugin-desc">{{ item.desc }}</span>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Keyboard Shortcuts -->
      <section class="api-section">
        <h2>快捷键</h2>
        <p>默认启用的键盘快捷键</p>
        <div class="shortcut-grid">
          <div v-for="item in shortcuts" :key="item.key" class="shortcut-item">
            <kbd class="shortcut-key">{{ item.key }}</kbd>
            <span class="shortcut-desc">{{ item.desc }}</span>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.api-page {
  min-height: 100vh;
  transition: background 0.2s, color 0.2s;
}

.api-page.theme-dark {
  background: #1a1a1a;
  color: #e0e0e0;
}

.api-page.theme-light {
  background: #f8f9fa;
  color: #333;
}

.api-header {
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

.api-page.theme-dark .api-header {
  background: rgba(26, 26, 26, 0.9);
  border-color: rgba(255, 255, 255, 0.1);
}

.api-page.theme-light .api-header {
  background: rgba(248, 249, 250, 0.9);
  border-color: rgba(0, 0, 0, 0.1);
}

.back-btn, .nav-link {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.15s;
  font-size: 14px;
}

.api-page.theme-dark .back-btn,
.api-page.theme-dark .nav-link {
  color: rgba(255, 255, 255, 0.7);
}

.api-page.theme-light .back-btn,
.api-page.theme-light .nav-link {
  color: rgba(0, 0, 0, 0.7);
}

.back-btn:hover, .nav-link:hover {
  background: rgba(128, 128, 128, 0.15);
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

.api-page.theme-dark .theme-btn {
  color: rgba(255, 255, 255, 0.7);
}

.api-page.theme-light .theme-btn {
  color: rgba(0, 0, 0, 0.7);
}

.api-content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 24px;
}

.api-section {
  margin-bottom: 48px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  color: #667eea;
}

.api-section h2 {
  font-size: 22px;
  font-weight: 600;
  margin: 0;
}

.api-section > p {
  margin: 0 0 16px;
  opacity: 0.75;
}

.api-section .note {
  font-size: 13px;
  padding: 8px 12px;
  border-radius: 6px;
  margin-bottom: 16px;
}

.api-page.theme-dark .note {
  background: rgba(102, 126, 234, 0.15);
}

.api-page.theme-light .note {
  background: rgba(102, 126, 234, 0.1);
}

.note code {
  background: rgba(0,0,0,0.2);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}

.table-wrapper {
  overflow-x: auto;
}

.api-table {
  display: grid;
  grid-template-columns: minmax(150px, 1fr) minmax(140px, 1fr) minmax(100px, 0.8fr) minmax(200px, 2fr);
  gap: 1px;
  border-radius: 10px;
  overflow: hidden;
  font-size: 13px;
}

.api-table.methods {
  grid-template-columns: minmax(200px, 1.5fr) minmax(150px, 1fr) minmax(200px, 2fr);
}

.table-header {
  display: contents;
}

.table-header > span {
  padding: 12px 16px;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.api-page.theme-dark .table-header > span {
  background: #333;
  color: rgba(255,255,255,0.6);
}

.api-page.theme-light .table-header > span {
  background: #e9ecef;
  color: rgba(0,0,0,0.6);
}

.table-row {
  display: contents;
}

.table-row > span {
  padding: 12px 16px;
  display: flex;
  align-items: center;
}

.api-page.theme-dark .table-row > span {
  background: #2a2a2a;
  border-bottom: 1px solid #333;
}

.api-page.theme-light .table-row > span {
  background: #fff;
  border-bottom: 1px solid #e9ecef;
}

.prop-name, .method-name, .event-name, .plugin-name {
  font-weight: 500;
  color: #667eea;
  font-family: 'Fira Code', monospace;
}

.prop-type, .method-returns, .event-data, .plugin-tools {
  font-family: 'Fira Code', monospace;
  font-size: 12px;
  opacity: 0.8;
}

.prop-default {
  font-family: 'Fira Code', monospace;
  font-size: 12px;
}

.api-page.theme-dark .prop-default {
  color: #98c379;
}

.api-page.theme-light .prop-default {
  color: #50a14f;
}

.required {
  color: #e06c75;
  margin-left: 2px;
}

.tool-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tool-tag {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-family: 'Fira Code', monospace;
}

.api-page.theme-dark .tool-tag {
  background: #333;
  color: #98c379;
}

.api-page.theme-light .tool-tag {
  background: #e9ecef;
  color: #50a14f;
}

.shortcut-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
  margin-top: 16px;
}

.shortcut-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 8px;
}

.api-page.theme-dark .shortcut-item {
  background: #2a2a2a;
}

.api-page.theme-light .shortcut-item {
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.shortcut-key {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  padding: 4px 8px;
  border-radius: 6px;
  font-family: 'Fira Code', monospace;
  font-size: 12px;
  font-weight: 600;
}

.api-page.theme-dark .shortcut-key {
  background: #333;
  color: #e5c07b;
  border: 1px solid #444;
}

.api-page.theme-light .shortcut-key {
  background: #f1f3f5;
  color: #c18401;
  border: 1px solid #dee2e6;
}

.shortcut-desc {
  font-size: 13px;
  opacity: 0.85;
}
</style>
