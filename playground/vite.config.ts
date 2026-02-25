import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// GitHub Pages 部署时会通过环境变量传入 base 路径
const base = process.env.VITE_BASE_URL || './';

export default defineConfig({
  base,
  plugins: [vue()],
  resolve: {
    alias: [
      // CSS alias must come before the package alias for correct resolution
      { find: '@ldesign/image-editor-vue/style.css', replacement: resolve(__dirname, '../packages/vue/dist/style.css') },
      { find: '@ldesign/image-editor-vue', replacement: resolve(__dirname, '../packages/vue/src/index.ts') },
      { find: '@ldesign/image-editor', replacement: resolve(__dirname, '../packages/core/src/index.ts') },
      { find: '@', replacement: resolve(__dirname, 'src') },
    ],
  },
  server: {
    port: 3001,
    open: true,
    host: true,
  },
});
