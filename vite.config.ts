import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        // 设置文件./src路径为 @
        alias: [
            {
                find: "@",
                replacement: resolve(__dirname, "./src"),
            },
        ],
    },
    css: {
        preprocessorOptions: {
            scss: {
                javascriptEnabled: true,
                silenceDeprecations: ["legacy-js-api"],
                additionalData: '@import "./src/styles/variables.scss";',
            },
        },
    },
});
