<script setup lang="ts">
/**
 * CodePreview Component
 * Displays code snippets with syntax highlighting, expand/collapse, and copy functionality
 * Requirements: 9.1
 */
import { ref, computed } from 'vue';

const props = withDefaults(defineProps<{
  /** Code content to display */
  code: string;
  /** Programming language for syntax highlighting hint */
  language?: string;
  /** Maximum lines to show before collapsing */
  maxLines?: number;
  /** Whether to show line numbers */
  showLineNumbers?: boolean;
}>(), {
  language: 'typescript',
  maxLines: 10,
  showLineNumbers: false,
});

const isExpanded = ref(false);
const isCopied = ref(false);

const lines = computed(() => props.code.split('\n'));

const displayCode = computed(() => {
  if (isExpanded.value) {
    return props.code;
  }
  if (lines.value.length > props.maxLines) {
    return lines.value.slice(0, props.maxLines).join('\n') + '\n...';
  }
  return props.code;
});

const hasMoreLines = computed(() => {
  return lines.value.length > props.maxLines;
});

const lineCount = computed(() => lines.value.length);

const displayLineNumbers = computed(() => {
  if (!props.showLineNumbers) return [];
  const count = isExpanded.value ? lineCount.value : Math.min(lineCount.value, props.maxLines);
  return Array.from({ length: count }, (_, i) => i + 1);
});

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code);
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy code:', err);
  }
};

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

// Language display names
const languageDisplayName = computed(() => {
  const names: Record<string, string> = {
    typescript: 'TypeScript',
    javascript: 'JavaScript',
    vue: 'Vue',
    html: 'HTML',
    css: 'CSS',
    json: 'JSON',
    bash: 'Bash',
    shell: 'Shell',
  };
  return names[props.language] || props.language;
});
</script>

<template>
  <div class="code-preview">
    <div class="code-header">
      <div class="header-left">
        <span class="language-tag">{{ languageDisplayName }}</span>
        <span v-if="hasMoreLines" class="line-count">{{ lineCount }} 行</span>
      </div>
      <div class="header-right">
        <button 
          class="header-btn copy-btn"
          @click="copyCode"
          :title="isCopied ? '已复制!' : '复制代码'"
        >
          <span v-if="isCopied">✓ 已复制</span>
          <span v-else>📋 复制</span>
        </button>
        <button 
          v-if="hasMoreLines" 
          class="header-btn expand-btn"
          @click="toggleExpand"
        >
          {{ isExpanded ? '收起 ▲' : '展开 ▼' }}
        </button>
      </div>
    </div>
    <div class="code-body">
      <div v-if="showLineNumbers" class="line-numbers">
        <span v-for="num in displayLineNumbers" :key="num" class="line-number">{{ num }}</span>
        <span v-if="!isExpanded && hasMoreLines" class="line-number">...</span>
      </div>
      <pre class="code-content"><code :class="`language-${language}`">{{ displayCode }}</code></pre>
    </div>
  </div>
</template>

<style scoped>
.code-preview {
  background: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
  font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #2d2d2d;
  border-bottom: 1px solid #3d3d3d;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.language-tag {
  color: #9cdcfe;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 2px 8px;
  background: rgba(156, 220, 254, 0.1);
  border-radius: 4px;
}

.line-count {
  color: #666;
  font-size: 0.7rem;
}

.header-btn {
  background: transparent;
  border: 1px solid #444;
  color: #aaa;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
  font-family: inherit;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.header-btn:hover {
  background: #3d3d3d;
  border-color: #555;
  color: #ddd;
}

.copy-btn {
  min-width: 70px;
}

.code-body {
  display: flex;
  overflow-x: auto;
}

.line-numbers {
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  background: #252525;
  border-right: 1px solid #3d3d3d;
  user-select: none;
}

.line-number {
  padding: 0 12px;
  color: #555;
  font-size: 0.8rem;
  line-height: 1.5;
  text-align: right;
  min-width: 40px;
}

.code-content {
  flex: 1;
  margin: 0;
  padding: 12px 16px;
  overflow-x: auto;
  font-size: 0.85rem;
  line-height: 1.5;
  color: #d4d4d4;
  white-space: pre;
}

.code-content code {
  font-family: inherit;
}

/* Basic syntax highlighting colors */
.code-content :deep(.keyword) {
  color: #569cd6;
}

.code-content :deep(.string) {
  color: #ce9178;
}

.code-content :deep(.comment) {
  color: #6a9955;
}

.code-content :deep(.function) {
  color: #dcdcaa;
}

.code-content :deep(.number) {
  color: #b5cea8;
}

/* Scrollbar styling */
.code-body::-webkit-scrollbar,
.code-content::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

.code-body::-webkit-scrollbar-track,
.code-content::-webkit-scrollbar-track {
  background: #1e1e1e;
}

.code-body::-webkit-scrollbar-thumb,
.code-content::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 4px;
}

.code-body::-webkit-scrollbar-thumb:hover,
.code-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
