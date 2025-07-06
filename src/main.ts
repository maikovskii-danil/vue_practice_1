import '@fontsource/inter';
import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';

import router from './router';
import * as UIFramework from '@maikovskii-danil/ui-framework-vue';

const pinia = createPinia();
const app = createApp(App);

const isUIFrameworkKey = (
  key: unknown,
): key is keyof typeof UIFramework & string =>
  typeof key === 'string' && key in UIFramework;

Object.keys(UIFramework).forEach((key: keyof typeof UIFramework) => {
  if (isUIFrameworkKey(key)) {
    app.component(key, UIFramework[key]);
  }
});

app.use(pinia).use(router).mount('#app');
