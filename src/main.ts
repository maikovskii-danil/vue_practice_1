import '@fontsource/inter';
import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';

import router from './router';
import * as UIFramework from '@maikovskii-danil/ui-framework-vue';

const pinia = createPinia();
const app = createApp(App);

Object.keys(UIFramework).forEach((key: keyof typeof UIFramework) => {
  if (typeof key === 'string') {
    app.component(key, UIFramework[key]);
  }
});

app.use(pinia).use(router).mount('#app');
