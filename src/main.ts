import '@fontsource/inter';
import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import Button from './uikit/button.vue';
import Input from './uikit/input.vue';
import Checkbox from './uikit/checkbox.vue';
import Radio from './uikit/radio.vue';
import Select from './uikit/select.vue';
import Alert from './uikit/alert.vue';
import Loader from './uikit/loader.vue';
import Modal from './uikit/modal.vue';
import Table from './uikit/table.vue';
import router from './router';

const pinia = createPinia();
const app = createApp(App);

declare module 'vue' {
  interface GlobalComponents {
    AppButton: typeof Button;
    AppInput: typeof Input;
    AppCheckbox: typeof Checkbox;
    AppRadio: typeof Radio;
    AppSelect: typeof Select;
    AppAlert: typeof Alert;
    AppLoader: typeof Loader;
    AppModal: typeof Modal;
    AppTable: typeof Table;
  }
}

app
  .component('AppButton', Button)
  .component('AppInput', Input)
  .component('AppCheckbox', Checkbox)
  .component('AppRadio', Radio)
  .component('AppSelect', Select)
  .component('AppAlert', Alert)
  .component('AppLoader', Loader)
  .component('AppModal', Modal)
  .component('AppTable', Table)
  .use(pinia)
  .use(router)
  .mount('#app');
