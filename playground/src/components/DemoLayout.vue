<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps<{
  title: string;
  description?: string;
}>();
</script>

<template>
  <div class="demo-layout">
    <header class="demo-header">
      <RouterLink to="/" class="back-link">← 返回首页</RouterLink>
      <div class="demo-title">
        <h1>{{ title }}</h1>
        <p v-if="description">{{ description }}</p>
      </div>
    </header>

    <main class="demo-main">
      <section class="editor-section">
        <slot name="editor" />
      </section>

      <aside class="controls-section">
        <slot name="controls" />
      </aside>
    </main>
  </div>
</template>

<style scoped>
.demo-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
}

.demo-header {
  background: white;
  padding: 16px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  gap: 24px;
}

.back-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.back-link:hover {
  color: #764ba2;
}

.demo-title h1 {
  font-size: 1.5rem;
  margin: 0;
  color: #333;
}

.demo-title p {
  margin: 4px 0 0;
  color: #666;
  font-size: 0.9rem;
}

.demo-main {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px;
  padding: 24px;
}

.editor-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.controls-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  height: fit-content;
}

@media (max-width: 900px) {
  .demo-main {
    grid-template-columns: 1fr;
  }
}
</style>
