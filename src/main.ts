import '@fontsource/inter';
import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';

import {
  AppAlert,
  AppButton,
  AppDropdown,
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
    AppAlert: typeof AppAlert;
    AppButton: typeof AppButton;
    AppDropdown: typeof AppDropdown;
    AppInput: typeof AppInput;
    AppSelect: typeof AppSelect;
    AppModal: typeof AppModal;
    AppTable: typeof AppTable;
  }
}

app
  .component('AppAlert', AppAlert)
  .component('AppButton', AppButton)
  .component('AppDropdown', AppDropdown)
  .component('AppInput', AppInput)
  .component('AppSelect', AppSelect)
  .component('AppModal', AppModal)
  .component('AppTable', AppTable)
  .use(pinia)
  .use(router)
  .mount('#app');
