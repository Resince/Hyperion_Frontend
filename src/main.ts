import { createApp } from 'vue'
// import './style.css'
import '@/assets/index.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/router.ts'

createApp(App).use(router).use(ElementPlus).mount('#app')
