import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles/variables.css';
import './assets/styles/main.css';

// Import Vue component styles
import '@ldesign/image-editor-vue/style.css';

const app = createApp(App);

app.use(router);
app.mount('#app');
