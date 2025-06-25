import '@fontsource/inter';
import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';

import AppAlert from './uikit/app-alert.vue';
import AppButton from './uikit/app-button.vue';
import AppInput from './uikit/app-input.vue';
import AppModal from './uikit/app-modal.vue';
import AppSelect from './uikit/app-select.vue';
import AppTable from './uikit/app-table.vue';
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
