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

declare module 'vue' {
  interface GlobalComponents {
    AppButton: typeof AppButton;
    AppInput: typeof AppInput;
    AppSelect: typeof AppSelect;
    AppAlert: typeof AppAlert;
    AppModal: typeof AppModal;
    AppTable: typeof AppTable;
  }
}

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
