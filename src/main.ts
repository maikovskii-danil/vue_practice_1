import '@fontsource/inter';
import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';

import AppAlert from './uikit/app-alert.vue';
import AppButton from './uikit/app-button.vue';
import AppCheckbox from './uikit/app-checkbox.vue';
import AppInput from './uikit/app-input.vue';
import AppLoader from './uikit/app-loader.vue';
import AppModal from './uikit/app-modal.vue';
import AppRadio from './uikit/app-radio.vue';
import AppSelect from './uikit/app-select.vue';
import AppTable from './uikit/app-table.vue';
import router from './router';

const pinia = createPinia();
const app = createApp(App);

declare module 'vue' {
  interface GlobalComponents {
    AppButton: typeof AppButton;
    AppInput: typeof AppInput;
    AppCheckbox: typeof AppCheckbox;
    AppRadio: typeof AppRadio;
    AppSelect: typeof AppSelect;
    AppAlert: typeof AppAlert;
    AppLoader: typeof AppLoader;
    AppModal: typeof AppModal;
    AppTable: typeof AppTable;
  }
}

app
  .component('AppButton', AppButton)
  .component('AppInput', AppInput)
  .component('AppCheckbox', AppCheckbox)
  .component('AppRadio', AppRadio)
  .component('AppSelect', AppSelect)
  .component('AppAlert', AppAlert)
  .component('AppLoader', AppLoader)
  .component('AppModal', AppModal)
  .component('AppTable', AppTable)
  .use(pinia)
  .use(router)
  .mount('#app');
