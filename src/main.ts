import { createApp } from 'vue'
import '@/assets/index.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/router.ts'
import store from './store'

createApp(App).use(router).use(ElementPlus).use(store).mount('#app')

