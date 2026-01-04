import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ImageEditorVue',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'vue-demi', '@ldesign/image-editor'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          'vue-demi': 'VueDemi',
          '@ldesign/image-editor': 'LDesignImageEditor',
        },
      },
    },
    sourcemap: true,
    minify: 'esbuild',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
});
