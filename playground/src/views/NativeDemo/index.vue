<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { Editor, MosaicPlugin, TextPlugin, FilterPlugin, Toolbar, ToolName } from '@ldesign/image-editor';
import { ChevronLeft, Upload, Sun, Moon, Save, X, Download, Copy, Check, CloudUpload, Settings, Sliders } from 'lucide-vue-next';
import { useTheme } from '@/composables/useTheme';

const containerRef = ref<HTMLDivElement | null>(null);
let editor: Editor | null = null;
let toolbar: Toolbar | null = null;

const { theme: currentTheme, toggleTheme } = useTheme();

// Panel visibility state
const activePanel = ref<'tools' | 'settings' | null>(null);
const showPluginPanel = computed({
  get: () => activePanel.value === 'tools',
  set: (v) => activePanel.value = v ? 'tools' : null
});
const showSettingsPanel = computed({
  get: () => activePanel.value === 'settings',
  set: (v) => activePanel.value = v ? 'settings' : null
});

// All toolbar buttons (grouped for UI)
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
    { id: 'text', name: '文字', plugin: TextPlugin },
    { id: 'mosaic', name: '马赛克', plugin: MosaicPlugin },
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

// All enabled tools (default: all enabled except text)
const enabledTools = ref<string[]>([
  'zoomOut', 'zoomIn', 'reset',
  'move', 'pen', 'rect', 'circle', 'arrow', 'line', 'triangle', 'mosaic', 'eraser',
  'crop', 'filter',
  'undo', 'redo',
  'export',
]);

// Editor settings
const editorSettings = ref({
  autoHide: true,
  historyLimit: 50,
  responsive: true,
  primaryColor: '#667eea',
});

// Plugins
const allPlugins = [MosaicPlugin, TextPlugin, FilterPlugin];

// Preview dialog state
const showPreview = ref(false);
const previewImage = ref('');
const previewBlob = ref<Blob | null>(null);
const imageInfo = ref({ width: 0, height: 0, size: '' });
const copied = ref(false);
const codeCopied = ref(false);
const selectedFormat = ref<'png' | 'jpeg'>('png');
const jpegQuality = ref(0.92);
const isUploading = ref(false);
const exportTab = ref<'base64' | 'dataurl' | 'blob'>('base64');

// Get disabled tools based on enabled tools
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

const initEditor = () => {
  if (!containerRef.value) return;
  
  // Destroy existing editor
  if (editor) {
    editor.destroy();
  }
  
  // Create editor - load all plugins, use disabledTools to control UI visibility
  editor = new Editor({
    container: containerRef.value,
    plugins: allPlugins,
    historyLimit: 50,
    responsive: true,
    toolbar: {
      theme: currentTheme.value,
      autoHide: true,
      disabledTools: getDisabledTools(),
    },
  });
  
  toolbar = (editor as any)._toolbar;
};

onMounted(() => {
  initEditor();
});

// Watch theme changes
watch(currentTheme, (newTheme) => {
  toolbar?.setTheme(newTheme);
  // Update placeholder theme
  if (!toolbar?.hasImage()) {
    toolbar?.showPlaceholder();
  }
});

// Toggle tool visibility (no reinitialize needed)
const toggleTool = (toolId: string) => {
  const index = enabledTools.value.indexOf(toolId);
  if (index > -1) {
    enabledTools.value.splice(index, 1);
  } else {
    enabledTools.value.push(toolId);
  }
  // Just update disabled tools - no need to reinitialize
  toolbar?.setDisabledTools(getDisabledTools());
};

// Apply primary color
const updatePrimaryColor = (color: string) => {
  editorSettings.value.primaryColor = color;
  toolbar?.setPrimaryColor(color);
};

// Close panels when clicking outside
const closePanels = () => {
  activePanel.value = null;
};

onUnmounted(() => {
  editor?.destroy();
});

// File upload
const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file || !editor) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    const dataUrl = e.target?.result as string;
    await editor?.loadImage(dataUrl);
  };
  reader.readAsDataURL(file);
  input.value = '';
};

// Drag and drop
const handleDrop = async (event: DragEvent) => {
  event.preventDefault();
  const file = event.dataTransfer?.files?.[0];
  if (!file?.type.startsWith('image/') || !editor) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    const dataUrl = e.target?.result as string;
    await editor?.loadImage(dataUrl);
  };
  reader.readAsDataURL(file);
};

// Save and preview
const handleSave = async () => {
  if (!editor) return;
  await exportWithFormat();
  showPreview.value = true;
};

// Export with selected format
const exportWithFormat = async () => {
  if (!editor) return;
  
  try {
    const format = selectedFormat.value;
    const quality = format === 'jpeg' ? jpegQuality.value : undefined;
    
    // Get image as base64
    const dataUrl = await editor.export({ 
      format, 
      type: 'base64',
      quality 
    }) as string;
    previewImage.value = dataUrl;
    
    // Also get as blob for upload
    previewBlob.value = await editor.export({ 
      format, 
      type: 'blob',
      quality 
    }) as Blob;
    
    // Calculate image info
    const info = editor.getImageInfo();
    imageInfo.value = {
      width: info.width,
      height: info.height,
      size: formatFileSize(previewBlob.value.size),
    };
  } catch (err) {
    console.error('Failed to export image:', err);
  }
};

// Watch format changes
watch([selectedFormat, jpegQuality], () => {
  if (showPreview.value) {
    exportWithFormat();
  }
});

// Format file size
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};

// Format number with commas
const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

// Get export data preview based on selected tab
const getExportPreview = (): string => {
  if (!previewImage.value) return '';
  
  switch (exportTab.value) {
    case 'base64':
      // Remove data URL prefix to get pure base64
      const base64 = previewImage.value.split(',')[1] || '';
      return base64.substring(0, 80) + '...';
    case 'dataurl':
      return previewImage.value.substring(0, 80) + '...';
    case 'blob':
      if (previewBlob.value) {
        return `Blob { size: ${previewBlob.value.size}, type: "${previewBlob.value.type}" }`;
      }
      return 'No blob available';
    default:
      return '';
  }
};

// Copy export data to clipboard
const copyExportData = async () => {
  if (!previewImage.value) return;
  
  let textToCopy = '';
  
  switch (exportTab.value) {
    case 'base64':
      // Copy full data URL so it can be opened directly in browser
      textToCopy = previewImage.value;
      break;
    case 'dataurl':
      textToCopy = previewImage.value;
      break;
    case 'blob':
      // For blob, copy the code to create it
      textToCopy = `// Convert Data URL to Blob
const dataUrl = '...'  // 粘贴你的 Data URL
const response = await fetch(dataUrl);
const blob = await response.blob();
// blob.size: ${previewBlob.value?.size || 0}
// blob.type: "${previewBlob.value?.type || ''}" `;
      break;
  }
  
  try {
    await navigator.clipboard.writeText(textToCopy);
    codeCopied.value = true;
    setTimeout(() => { codeCopied.value = false; }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

// Download image
const downloadImage = () => {
  if (!previewImage.value) return;
  const ext = selectedFormat.value === 'jpeg' ? 'jpg' : 'png';
  const link = document.createElement('a');
  link.href = previewImage.value;
  link.download = `image-${Date.now()}.${ext}`;
  link.click();
};

// Copy to clipboard
const copyToClipboard = async () => {
  if (!previewBlob.value) return;
  
  try {
    // Use the blob directly
    const mimeType = selectedFormat.value === 'jpeg' ? 'image/jpeg' : 'image/png';
    await navigator.clipboard.write([
      new ClipboardItem({ [mimeType]: previewBlob.value })
    ]);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

// Close preview
const closePreview = () => {
  showPreview.value = false;
  previewImage.value = '';
  previewBlob.value = null;
};

// Upload to server - complete example
const uploadToServer = async () => {
  if (!previewBlob.value || !previewImage.value) return;
  
  isUploading.value = true;
  
  try {
    const ext = selectedFormat.value === 'jpeg' ? 'jpg' : 'png';
    const fileName = `image-${Date.now()}.${ext}`;
    
    // Demo: show both upload methods
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
      <h1 class="title">图片编辑器 - Native Demo</h1>
      
      <!-- Tool selector -->
      <div class="panel-trigger">
        <button class="header-btn" :class="{ active: showPluginPanel }" @click.stop="showPluginPanel = !showPluginPanel">
          <Settings :size="18" />
          <span>工具配置</span>
        </button>
        <Transition name="panel-fade">
          <div v-if="showPluginPanel" class="config-panel" :class="`theme-${currentTheme}`" @click.stop>
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
      
      <!-- Settings panel -->
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
    
    <!-- Preview Dialog -->
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
            
            <!-- Format selection -->
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
            
            <!-- JPEG quality slider -->
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
                <span class="info-label">文件大小</span>
                <span class="info-value">{{ imageInfo.size }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">MIME 类型</span>
                <span class="info-value">image/{{ selectedFormat === 'jpeg' ? 'jpeg' : 'png' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Base64 长度</span>
                <span class="info-value">{{ formatNumber(previewImage.length) }} 字符</span>
              </div>
            </div>
            
            <!-- Export data section -->
            <div class="export-data-section">
              <div class="export-data-header">
                <span class="export-data-title">导出数据</span>
              </div>
              <div class="export-data-tabs">
                <button 
                  class="export-tab" 
                  :class="{ active: exportTab === 'base64' }" 
                  @click="exportTab = 'base64'"
                >Base64</button>
                <button 
                  class="export-tab" 
                  :class="{ active: exportTab === 'dataurl' }" 
                  @click="exportTab = 'dataurl'"
                >Data URL</button>
                <button 
                  class="export-tab" 
                  :class="{ active: exportTab === 'blob' }" 
                  @click="exportTab = 'blob'"
                >Blob</button>
              </div>
              <div class="export-data-content">
                <code class="export-code">{{ getExportPreview() }}</code>
                <button class="copy-code-btn" @click="copyExportData">
                  <Check v-if="codeCopied" :size="14" />
                  <Copy v-else :size="14" />
                </button>
              </div>
            </div>
          </div>
          
          <div class="preview-actions">
            <button class="action-btn" @click="copyToClipboard" :disabled="!previewBlob">
              <Check v-if="copied" :size="18" />
              <Copy v-else :size="18" />
              <span>{{ copied ? '已复制图片' : '复制图片' }}</span>
            </button>
            <button class="action-btn" @click="downloadImage" :disabled="!previewImage">
              <Download :size="18" />
              <span>下载 {{ selectedFormat.toUpperCase() }}</span>
            </button>
            <button class="action-btn primary" @click="uploadToServer" :disabled="!previewBlob || isUploading">
              <CloudUpload :size="18" />
              <span>{{ isUploading ? '上传中...' : '上传到服务器' }}</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>
    
    <main
      ref="containerRef"
      class="editor-container"
      @drop.prevent="handleDrop"
      @dragover.prevent
    />
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 10px;
}

.preview-dialog.theme-dark .preview-info {
  background: rgba(255, 255, 255, 0.05);
}

.preview-dialog.theme-light .preview-info {
  background: rgba(0, 0, 0, 0.03);
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.info-label {
  font-size: 12px;
  opacity: 0.6;
}

.info-value {
  font-size: 12px;
  font-weight: 500;
  font-family: monospace;
}

/* Export data section */
.export-data-section {
  margin-bottom: 16px;
  border-radius: 10px;
  overflow: hidden;
}

.preview-dialog.theme-dark .export-data-section {
  background: rgba(255, 255, 255, 0.05);
}

.preview-dialog.theme-light .export-data-section {
  background: rgba(0, 0, 0, 0.03);
}

.export-data-header {
  padding: 10px 12px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.15);
}

.export-data-title {
  font-size: 12px;
  font-weight: 600;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.export-data-tabs {
  display: flex;
  padding: 8px 12px;
  gap: 6px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.1);
}

.export-tab {
  padding: 6px 12px;
  background: transparent;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
}

.preview-dialog.theme-dark .export-tab {
  color: rgba(255, 255, 255, 0.6);
}

.preview-dialog.theme-light .export-tab {
  color: rgba(0, 0, 0, 0.6);
}

.export-tab:hover {
  background: rgba(128, 128, 128, 0.15);
}

.export-tab.active {
  background: #667eea;
  color: #fff;
}

.export-data-content {
  position: relative;
  padding: 12px;
}

.export-code {
  display: block;
  font-size: 11px;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  word-break: break-all;
  line-height: 1.5;
  opacity: 0.8;
}

.copy-code-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: rgba(128, 128, 128, 0.2);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
}

.preview-dialog.theme-dark .copy-code-btn {
  color: rgba(255, 255, 255, 0.7);
}

.preview-dialog.theme-light .copy-code-btn {
  color: rgba(0, 0, 0, 0.6);
}

.copy-code-btn:hover {
  background: rgba(128, 128, 128, 0.35);
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
