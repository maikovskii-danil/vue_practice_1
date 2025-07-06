import '@fontsource/inter';
import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';

import {
  AppAlert,
  AppButton,
  AppInput,
  AppModal,
  AppSelect,
  AppTable,
} from '@maikovskii-danil/ui-framework-vue';
import router from './router';

const pinia = createPinia();
const app = createApp(App);

app
  .component('AppButton', AppButton)
  .component('AppInput', AppInput)
  .component('AppSelect', AppSelect)
  .component('AppAlert', AppAlert)
  .component('AppModal', AppModal)
  .component('AppTable', AppTable)
  .use(pinia)
  .use(router)
  .mount('#app');
