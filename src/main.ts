import '@fontsource/roboto'
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import Button from './uikit/button.vue'
import Input from './uikit/input.vue'
import Checkbox from './uikit/checkbox.vue'
import Radio from './uikit/radio.vue'
import Select from './uikit/select.vue'
import Alert from './uikit/alert.vue'
import Loader from './uikit/loader.vue'
import Modal from './uikit/modal.vue'

const app = createApp(App)

app.component('AppButton', Button)
app.component('AppInput', Input)
app.component('AppCheckbox', Checkbox)
app.component('AppRadio', Radio)
app.component('AppSelect', Select)
app.component('AppAlert', Alert)
app.component('AppLoader', Loader)
app.component('AppModal', Modal)

app.mount('#app')
