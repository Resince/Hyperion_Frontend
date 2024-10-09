import { createRouter, createWebHistory } from "vue-router";
import routes from "./router";
import store from "../store";

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(_to, _from, _savedPosition) {
        // 始终滚动到顶部
        return { top: 0 };
    },
});

// 路由守卫，让没有登录的登录
router.beforeEach(async (to, _from) => {
    console.log(to.fullPath);

    const isAuthenticated = true;
    if (store.getters.gRole === "") {
        await store.dispatch("initUserInfoAction");
    }
    const role = store.getters.gRole;
    console.log(role);
    console.log(to.fullPath);

    if (
        // 需要鉴权的页面
        to.meta.role &&
        // 但是没有登录
        !isAuthenticated &&
        // 避免无限重定向
        to.path != "/login"
    ) {
        return { name: "LoginRegister" };
    } else if (
        // 登录鉴权
        // 需要鉴权
        to.meta.role &&
        // 没有权限
        role != to.meta.role
    ) {
        console.log("没有权限");
        return { name: "404" };
    }
});

export default router;
