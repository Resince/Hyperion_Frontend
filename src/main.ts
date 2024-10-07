import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./router/index.ts";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "@/styles/index.css";
import "@/styles/common.scss";
import store from "./store";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.use(router).use(store);
store.dispatch("initUserInfoAction");
app.use(ElementPlus).mount("#app");
