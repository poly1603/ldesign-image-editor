<script setup lang="ts">
/**
 * Vue Demo - 演示 @ldesign/image-editor-vue 组件用法
 * 与 Native Demo 保持一致的UI和功能
 */
import { ref, computed, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { ImageEditor } from '@ldesign/image-editor-vue';
import { MosaicPlugin, TextPlugin, FilterPlugin } from '@ldesign/image-editor';
import type { ToolName } from '@ldesign/image-editor';
import { ChevronLeft, Upload, Sun, Moon, Save, X, Download, Copy, Check, CloudUpload, Settings, Sliders } from 'lucide-vue-next';
import { useTheme } from '@/composables/useTheme';

// 编辑器组件 ref
const editorRef = ref<InstanceType<typeof ImageEditor> | null>(null);

// 图片源
const imageSrc = ref<string | undefined>(undefined);

// 主题
const { theme: currentTheme, toggleTheme } = useTheme();

// 工具栏配置（与Native示例一致）
const toolbarConfig = [
  { group: '缩放控件', items: [
    { id: 'zoomOut', name: '缩小' },
    { id: 'zoomIn', name: '放大' },
    { id: 'reset', name: '重置' },
  ]},
  { group: '绘图工具', items: [
    { id: 'move', name: '移动' },
    { id: 'pen', name: '画笔' },
    { id: 'rect', name: '矩形' },
    { id: 'circle', name: '圆形' },
    { id: 'arrow', name: '箭头' },
    { id: 'line', name: '直线' },
    { id: 'triangle', name: '三角形' },
    { id: 'text', name: '文字' },
    { id: 'mosaic', name: '马赛克' },
    { id: 'eraser', name: '橡皮擦' },
  ]},
  { group: '图像工具', items: [
    { id: 'crop', name: '裁剪' },
    { id: 'filter', name: '滤镜' },
  ]},
  { group: '历史记录', items: [
    { id: 'undo', name: '撤销' },
    { id: 'redo', name: '重做' },
  ]},
  { group: '导出', items: [
    { id: 'export', name: '导出' },
  ]},
];

// 启用的工具
const enabledTools = ref<string[]>([
  'zoomOut', 'zoomIn', 'reset',
  'move', 'pen', 'rect', 'circle', 'arrow', 'line', 'triangle', 'mosaic', 'eraser',
  'crop', 'filter',
  'undo', 'redo',
  'export',
]);

// 面板状态
const activePanel = ref<'tools' | 'settings' | null>(null);
const showToolPanel = computed({
  get: () => activePanel.value === 'tools',
  set: (v) => activePanel.value = v ? 'tools' : null
});
const showSettingsPanel = computed({
  get: () => activePanel.value === 'settings',
  set: (v) => activePanel.value = v ? 'settings' : null
});

// 编辑器设置
const editorSettings = ref({
  autoHide: true,
  historyLimit: 50,
  responsive: true,
  primaryColor: '#667eea',
});

// 插件配置
const plugins = [MosaicPlugin, TextPlugin, FilterPlugin];

// 获取禁用的工具列表
const getDisabledTools = (): ToolName[] => {
  const allToolIds: ToolName[] = [
    'zoomOut', 'zoomIn', 'reset',
    'move', 'pen', 'rect', 'circle', 'arrow', 'line', 'triangle', 'text', 'mosaic', 'eraser',
    'crop', 'filter',
    'undo', 'redo',
    'export',
  ];
  return allToolIds.filter(id => !enabledTools.value.includes(id));
};

// 编辑器选项
const editorOptions = computed(() => ({
  historyLimit: 50,
  responsive: true,
  toolbar: {
    theme: currentTheme.value,
    autoHide: true,
    disabledTools: getDisabledTools(),
  },
}));

// 切换工具启用状态
const toggleTool = (toolId: string) => {
  const index = enabledTools.value.indexOf(toolId);
  if (index > -1) {
    enabledTools.value.splice(index, 1);
  } else {
    enabledTools.value.push(toolId);
  }
  // 更新编辑器的禁用工具列表
  const editor = editorRef.value?.editor;
  if (editor) {
    const toolbar = (editor as any)._toolbar;
    toolbar?.setDisabledTools(getDisabledTools());
  }
};

// 更新主题色
const updatePrimaryColor = (color: string) => {
  editorSettings.value.primaryColor = color;
  const editor = editorRef.value?.editor;
  if (editor) {
    const toolbar = (editor as any)._toolbar;
    toolbar?.setPrimaryColor(color);
  }
};

// 关闭面板
const closePanels = () => {
  activePanel.value = null;
};

// 预览对话框状态
const showPreview = ref(false);
const previewImage = ref('');
const previewBlob = ref<Blob | null>(null);
const imageInfo = ref({ width: 0, height: 0, size: '' });
const copied = ref(false);
const selectedFormat = ref<'png' | 'jpeg'>('png');
const jpegQuality = ref(0.92);
const isUploading = ref(false);

// 上传图片
const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    imageSrc.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
  input.value = '';
};

// 拖放处理
const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  const file = event.dataTransfer?.files?.[0];
  if (!file?.type.startsWith('image/')) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    imageSrc.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
};

// 保存导出
const handleSave = async () => {
  if (!editorRef.value) return;
  await exportWithFormat();
  showPreview.value = true;
};

const exportWithFormat = async () => {
  if (!editorRef.value) return;
  
  try {
    const format = selectedFormat.value;
    const quality = format === 'jpeg' ? jpegQuality.value : undefined;
    
    const dataUrl = await editorRef.value.export({ format, type: 'base64', quality }) as string;
    previewImage.value = dataUrl;
    
    previewBlob.value = await editorRef.value.export({ format, type: 'blob', quality }) as Blob;
    
    const width = editorRef.value.width?.value ?? 0;
    const height = editorRef.value.height?.value ?? 0;
    imageInfo.value = {
      width,
      height,
      size: formatFileSize(previewBlob.value.size),
    };
  } catch (err) {
    console.error('导出失败:', err);
  }
};

watch([selectedFormat, jpegQuality], () => {
  if (showPreview.value) exportWithFormat();
});

// 监听主题变化，更新编辑器主题
watch(currentTheme, (newTheme) => {
  syncEditorTheme(newTheme);
});

// 同步编辑器主题
const syncEditorTheme = (theme: 'light' | 'dark') => {
  const editor = editorRef.value?.editor;
  if (editor) {
    const toolbar = (editor as any)._toolbar;
    toolbar?.setTheme(theme);
  }
};

// 编辑器准备就绪时同步主题
const onEditorReady = () => {
  syncEditorTheme(currentTheme.value);
};

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};

const downloadImage = () => {
  if (!previewImage.value) return;
  const ext = selectedFormat.value === 'jpeg' ? 'jpg' : 'png';
  const link = document.createElement('a');
  link.href = previewImage.value;
  link.download = `image-${Date.now()}.${ext}`;
  link.click();
};

const copyToClipboard = async () => {
  if (!previewBlob.value) return;
  
  try {
    const mimeType = selectedFormat.value === 'jpeg' ? 'image/jpeg' : 'image/png';
    await navigator.clipboard.write([new ClipboardItem({ [mimeType]: previewBlob.value })]);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 2000);
  } catch (err) {
    console.error('复制失败:', err);
  }
};

const closePreview = () => {
  showPreview.value = false;
  previewImage.value = '';
  previewBlob.value = null;
};

const uploadToServer = async () => {
  if (!previewBlob.value || !previewImage.value) return;
  
  isUploading.value = true;
  
  try {
    const ext = selectedFormat.value === 'jpeg' ? 'jpg' : 'png';
    const fileName = `image-${Date.now()}.${ext}`;
    
    alert(`上传方式 1️⃣ FormData (推荐):

const formData = new FormData();
formData.append('file', blob, '${fileName}');

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData,
});

上传方式 2️⃣ Base64:

const base64 = '${previewImage.value.substring(0, 50)}...';

const response = await fetch('/api/upload', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    image: base64,
    filename: '${fileName}',
  }),
});

图片信息:
- 文件名: ${fileName}
- 格式: ${selectedFormat.value.toUpperCase()}
- 大小: ${imageInfo.value.size}
- Base64 长度: ${previewImage.value.length} 字符`);
  } catch (err) {
    console.error('Upload failed:', err);
    alert('上传失败: ' + (err as Error).message);
  } finally {
    isUploading.value = false;
  }
};
</script>

<template>
  <div class="editor-page" :class="`theme-${currentTheme}`" @click="closePanels">
    <header class="editor-header" @click.stop>
      <RouterLink to="/" class="back-btn">
        <ChevronLeft :size="20" />
        <span>返回</span>
      </RouterLink>
      <h1 class="title">图片编辑器 - Vue Demo</h1>
      
      <!-- 工具选择器 -->
      <div class="panel-trigger">
        <button class="header-btn" :class="{ active: showToolPanel }" @click.stop="showToolPanel = !showToolPanel">
          <Settings :size="18" />
          <span>工具配置</span>
        </button>
        <Transition name="panel-fade">
          <div v-if="showToolPanel" class="config-panel" :class="`theme-${currentTheme}`" @click.stop>
            <div class="panel-header">
              <span class="panel-title">工具栏配置</span>
            </div>
            <div class="panel-body">
              <div v-for="group in toolbarConfig" :key="group.group" class="config-group">
                <div class="group-label">{{ group.group }}</div>
                <div class="toggle-list">
                  <div v-for="item in group.items" :key="item.id" class="toggle-item" @click="toggleTool(item.id)">
                    <span class="toggle-name">{{ item.name }}</span>
                    <div class="toggle-switch" :class="{ on: enabledTools.includes(item.id) }">
                      <div class="toggle-thumb"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
      
      <!-- 设置面板 -->
      <div class="panel-trigger">
        <button class="header-btn" :class="{ active: showSettingsPanel }" @click.stop="showSettingsPanel = !showSettingsPanel">
          <Sliders :size="18" />
          <span>属性</span>
        </button>
        <Transition name="panel-fade">
          <div v-if="showSettingsPanel" class="config-panel settings-panel" :class="`theme-${currentTheme}`" @click.stop>
            <div class="panel-header">
              <span class="panel-title">编辑器属性</span>
            </div>
            <div class="panel-body">
              <div class="setting-item">
                <span class="setting-label">主题色</span>
                <div class="color-picker-row">
                  <input type="color" v-model="editorSettings.primaryColor" @input="updatePrimaryColor(editorSettings.primaryColor)" class="color-input" />
                  <span class="color-value">{{ editorSettings.primaryColor }}</span>
                </div>
              </div>
              <div class="setting-item">
                <span class="setting-label">自动隐藏工具栏</span>
                <div class="toggle-switch" :class="{ on: editorSettings.autoHide }" @click="editorSettings.autoHide = !editorSettings.autoHide">
                  <div class="toggle-thumb"></div>
                </div>
              </div>
              <div class="setting-item">
                <span class="setting-label">响应式布局</span>
                <div class="toggle-switch" :class="{ on: editorSettings.responsive }" @click="editorSettings.responsive = !editorSettings.responsive">
                  <div class="toggle-thumb"></div>
                </div>
              </div>
              <div class="setting-item">
                <span class="setting-label">历史记录数</span>
                <div class="range-row">
                  <input type="range" v-model.number="editorSettings.historyLimit" min="10" max="100" step="10" class="range-slider" />
                  <span class="range-value">{{ editorSettings.historyLimit }}</span>
                </div>
              </div>
              <div class="setting-hint">部分属性需重新初始化才能生效</div>
            </div>
          </div>
        </Transition>
      </div>
      
      <button class="theme-btn" @click.stop="toggleTheme" :title="currentTheme === 'dark' ? '切换亮色主题' : '切换暗色主题'">
        <Sun v-if="currentTheme === 'dark'" :size="18" />
        <Moon v-else :size="18" />
      </button>
      <label class="upload-btn" @click.stop>
        <input type="file" accept="image/*" @change="handleFileUpload" hidden />
        <Upload :size="18" />
        <span>上传图片</span>
      </label>
      <button class="save-btn" @click.stop="handleSave">
        <Save :size="18" />
        <span>保存</span>
      </button>
    </header>
    
    <!-- 预览对话框 -->
    <Teleport to="body">
      <div v-if="showPreview" class="preview-overlay" @click.self="closePreview">
        <div class="preview-dialog" :class="`theme-${currentTheme}`">
          <div class="preview-header">
            <h2>图片预览</h2>
            <button class="close-btn" @click="closePreview">
              <X :size="20" />
            </button>
          </div>
          
          <div class="preview-content">
            <div class="preview-image-wrapper">
              <img :src="previewImage" alt="Preview" class="preview-image" />
            </div>
            
            <div class="format-selector">
              <label class="format-option">
                <input type="radio" v-model="selectedFormat" value="png" />
                <span class="format-label">PNG</span>
                <span class="format-desc">无损压缩，支持透明</span>
              </label>
              <label class="format-option">
                <input type="radio" v-model="selectedFormat" value="jpeg" />
                <span class="format-label">JPG</span>
                <span class="format-desc">文件更小，适合照片</span>
              </label>
            </div>
            
            <div v-if="selectedFormat === 'jpeg'" class="quality-slider">
              <span class="quality-label">质量: {{ Math.round(jpegQuality * 100) }}%</span>
              <input type="range" v-model.number="jpegQuality" min="0.1" max="1" step="0.05" />
            </div>
            
            <div class="preview-info">
              <div class="info-item">
                <span class="info-label">尺寸</span>
                <span class="info-value">{{ imageInfo.width }} × {{ imageInfo.height }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">大小</span>
                <span class="info-value">{{ imageInfo.size }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">格式</span>
                <span class="info-value">{{ selectedFormat.toUpperCase() }}</span>
              </div>
            </div>
          </div>
          
          <div class="preview-actions">
            <button class="action-btn" @click="copyToClipboard" :disabled="!previewBlob">
              <Check v-if="copied" :size="18" />
              <Copy v-else :size="18" />
              <span>{{ copied ? '已复制' : '复制' }}</span>
            </button>
            <button class="action-btn" @click="downloadImage" :disabled="!previewImage">
              <Download :size="18" />
              <span>下载</span>
            </button>
            <button class="action-btn primary" @click="uploadToServer" :disabled="!previewBlob || isUploading">
              <CloudUpload :size="18" />
              <span>{{ isUploading ? '上传中...' : '上传到服务器' }}</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>
    
    <!-- Vue 组件方式使用编辑器 -->
    <main
      class="editor-container"
      @drop.prevent="handleDrop"
      @dragover.prevent
    >
      <ImageEditor
        ref="editorRef"
        :image="imageSrc"
        :plugins="plugins"
        :options="editorOptions"
        @ready="onEditorReady"
      />
    </main>
  </div>
</template>

<style scoped>
.editor-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  /* Default to dark theme to prevent flash */
  background: #1e1e1e;
  transition: background 0.2s;
}

/* Dark theme (default) */
.editor-page.theme-dark {
  background: #1e1e1e;
}

.editor-page.theme-dark .editor-header {
  background: #2d2d2d;
  border-color: rgba(255,255,255,0.1);
}

.editor-page.theme-dark .back-btn,
.editor-page.theme-dark .theme-btn {
  color: rgba(255,255,255,0.7);
}

.editor-page.theme-dark .back-btn:hover,
.editor-page.theme-dark .theme-btn:hover {
  background: rgba(255,255,255,0.1);
  color: #fff;
}

.editor-page.theme-dark .title {
  color: #fff;
}

/* Light theme */
.editor-page.theme-light {
  background: #f5f5f5;
}

.editor-page.theme-light .editor-header {
  background: #fff;
  border-color: rgba(0,0,0,0.1);
}

.editor-page.theme-light .back-btn,
.editor-page.theme-light .theme-btn {
  color: rgba(0,0,0,0.7);
}

.editor-page.theme-light .back-btn:hover,
.editor-page.theme-light .theme-btn:hover {
  background: rgba(0,0,0,0.08);
  color: #000;
}

.editor-page.theme-light .title {
  color: #333;
}

.editor-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 16px;
  border-bottom: 1px solid;
  transition: background 0.2s, border-color 0.2s;
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

.title {
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  transition: color 0.2s;
}

.upload-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: #667eea;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.15s;
}

.upload-btn:hover,
.save-btn:hover {
  filter: brightness(0.9);
}

.save-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: #10b981;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.15s;
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

/* Panel Trigger */
.panel-trigger {
  position: relative;
}

.header-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: transparent;
  border: 1px solid rgba(128, 128, 128, 0.25);
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s;
}

.editor-page.theme-dark .header-btn {
  color: rgba(255, 255, 255, 0.7);
}

.editor-page.theme-light .header-btn {
  color: rgba(0, 0, 0, 0.7);
}

.header-btn:hover {
  background: rgba(128, 128, 128, 0.1);
  border-color: rgba(128, 128, 128, 0.4);
}

.header-btn.active {
  background: rgba(102, 126, 234, 0.15);
  border-color: #667eea;
  color: #667eea;
}

/* Config Panel */
.config-panel {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 280px;
  max-height: 420px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05);
  z-index: 100;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.config-panel.settings-panel {
  min-width: 260px;
}

.config-panel.theme-dark {
  background: #2a2a2a;
  color: #fff;
}

.config-panel.theme-light {
  background: #fff;
  color: #333;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);
}

.panel-header {
  padding: 14px 16px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.15);
}

.panel-title {
  font-size: 13px;
  font-weight: 600;
  opacity: 0.8;
}

.panel-body {
  padding: 12px 16px;
  overflow-y: auto;
  flex: 1;
}

/* Custom scrollbar */
.panel-body::-webkit-scrollbar {
  width: 6px;
}

.panel-body::-webkit-scrollbar-track {
  background: transparent;
}

.panel-body::-webkit-scrollbar-thumb {
  background: rgba(128, 128, 128, 0.3);
  border-radius: 3px;
}

.panel-body::-webkit-scrollbar-thumb:hover {
  background: rgba(128, 128, 128, 0.5);
}

/* Config Group */
.config-group {
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.1);
}

.config-group:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.group-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.5;
  margin-bottom: 10px;
}

/* Toggle List */
.toggle-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.toggle-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;
}

.config-panel.theme-dark .toggle-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.config-panel.theme-light .toggle-item:hover {
  background: rgba(0, 0, 0, 0.03);
}

.toggle-name {
  font-size: 13px;
}

/* Toggle Switch */
.toggle-switch {
  position: relative;
  width: 36px;
  height: 20px;
  background: rgba(128, 128, 128, 0.3);
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;
}

.toggle-switch.on {
  background: #667eea;
}

.toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.toggle-switch.on .toggle-thumb {
  transform: translateX(16px);
}

/* Settings Panel Items */
.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid rgba(128, 128, 128, 0.1);
}

.setting-item:last-of-type {
  border-bottom: none;
}

.setting-label {
  font-size: 13px;
}

.color-picker-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-input {
  width: 32px;
  height: 24px;
  padding: 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: transparent;
}

.color-input::-webkit-color-swatch-wrapper {
  padding: 0;
}

.color-input::-webkit-color-swatch {
  border: none;
  border-radius: 4px;
}

.color-value {
  font-size: 11px;
  font-family: monospace;
  opacity: 0.6;
  text-transform: uppercase;
}

.range-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.range-slider {
  width: 80px;
  height: 4px;
  appearance: none;
  background: rgba(128, 128, 128, 0.3);
  border-radius: 2px;
  outline: none;
}

.range-slider::-webkit-slider-thumb {
  appearance: none;
  width: 14px;
  height: 14px;
  background: #667eea;
  border-radius: 50%;
  cursor: pointer;
}

.range-value {
  min-width: 28px;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  text-align: right;
  opacity: 0.7;
}

.setting-hint {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(128, 128, 128, 0.1);
  font-size: 11px;
  opacity: 0.5;
  text-align: center;
}

/* Panel transition */
.panel-fade-enter-active,
.panel-fade-leave-active {
  transition: opacity 0.15s, transform 0.15s;
}

.panel-fade-enter-from,
.panel-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.editor-container {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  /* Default to dark theme to prevent flash */
  background: #1a1a1a;
}

.editor-page.theme-light .editor-container {
  background: #f5f5f5;
}

/* Preview Dialog */
.preview-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.preview-dialog {
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.preview-dialog.theme-dark {
  background: #2d2d2d;
  color: #fff;
}

.preview-dialog.theme-light {
  background: #fff;
  color: #333;
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.2);
}

.preview-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
}

.preview-dialog.theme-dark .close-btn {
  color: rgba(255, 255, 255, 0.6);
}

.preview-dialog.theme-light .close-btn {
  color: rgba(0, 0, 0, 0.6);
}

.close-btn:hover {
  background: rgba(128, 128, 128, 0.2);
}

.preview-content {
  padding: 20px;
  overflow: auto;
  flex: 1;
}

.preview-image-wrapper {
  display: flex;
  justify-content: center;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
}

.preview-dialog.theme-dark .preview-image-wrapper {
  background: rgba(0, 0, 0, 0.3);
}

.preview-dialog.theme-light .preview-image-wrapper {
  background: #f5f5f5;
}

.preview-image {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 8px;
}

/* Format selector */
.format-selector {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.format-option {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s;
}

.preview-dialog.theme-dark .format-option {
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid transparent;
}

.preview-dialog.theme-light .format-option {
  background: rgba(0, 0, 0, 0.03);
  border: 2px solid transparent;
}

.format-option:has(input:checked) {
  border-color: #667eea;
}

.preview-dialog.theme-dark .format-option:has(input:checked) {
  background: rgba(102, 126, 234, 0.15);
}

.preview-dialog.theme-light .format-option:has(input:checked) {
  background: rgba(102, 126, 234, 0.1);
}

.format-option input {
  display: none;
}

.format-label {
  font-size: 15px;
  font-weight: 600;
}

.format-desc {
  font-size: 12px;
  opacity: 0.6;
}

/* Quality slider */
.quality-slider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding: 12px 16px;
  border-radius: 10px;
}

.preview-dialog.theme-dark .quality-slider {
  background: rgba(255, 255, 255, 0.05);
}

.preview-dialog.theme-light .quality-slider {
  background: rgba(0, 0, 0, 0.03);
}

.quality-label {
  font-size: 13px;
  white-space: nowrap;
}

.quality-slider input[type="range"] {
  flex: 1;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: rgba(128, 128, 128, 0.3);
  border-radius: 2px;
  outline: none;
}

.quality-slider input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: #667eea;
  border-radius: 50%;
  cursor: pointer;
}

.preview-info {
  display: flex;
  gap: 24px;
  justify-content: center;
  margin-top: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.info-label {
  font-size: 12px;
  opacity: 0.6;
}

.info-value {
  font-size: 14px;
  font-weight: 500;
}

.preview-actions {
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid rgba(128, 128, 128, 0.2);
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s;
}

.preview-dialog.theme-dark .action-btn {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.preview-dialog.theme-light .action-btn {
  background: rgba(0, 0, 0, 0.06);
  color: #333;
}

.action-btn:hover {
  filter: brightness(1.1);
}

.action-btn.primary {
  background: #667eea;
  color: #fff;
}

.action-btn.primary:hover {
  filter: brightness(0.9);
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
