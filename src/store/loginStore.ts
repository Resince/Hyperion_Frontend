import { IRootState } from "@/types/index.ts";
import { ILogin, ILoginRes } from "@/types/login";
import { Module } from "vuex";
import { removeToken, setToken } from "@/utils/cache";
import CryptoJS from "crypto-js";
import { reqLogin } from "@/api/loginRegisterApi";
import { ElMessage } from "element-plus";
import { FormInstance } from "element-plus";
import router from "@/router/index";

interface ILoginPayload {
    form: FormInstance | undefined;
    payload: ILogin;
}

const loginModule: Module<ILoginRes, IRootState> = {
    namespaced: true,
    state() {
        return {
            token: "",
            role: "",
        };
    },
    mutations: {
        changeState(state, payload: ILoginRes) {
            state.token = payload.token;
            setToken(payload.token);
        },
        logout(state) {
            state.token = "";
            removeToken();
        },
    },
    actions: {
        async loginAction(
            { commit, dispatch },
            { form, payload }: ILoginPayload
        ) {
            if (!form || !payload.tel || !payload.pass || !payload.role) {
                ElMessage.error("请填写完整信息");
                return;
            }
            // 表单验证
            const valid = await form.validate();
            if (valid) {
                // 密码md5加密
                payload.pass = CryptoJS.MD5(payload.pass).toString();
                // 处理请求
                const loginRes = await reqLogin(payload);
                if (loginRes.code !== 0 || !loginRes.data) {
                    return;
                }
                commit("changeState", loginRes.data);
                commit("changeRole", loginRes.data.role, { root: true });
                await dispatch("initUserInfoAction", { root: true });
                // 跳转
                let pushPath = "";
                switch (payload.role) {
                    case "ADMIN":
                        pushPath = "/admin/merchantmanage";
                        break;
                    case "MERCHANT":
                        pushPath = "/merchant";
                        break;
                    case "CONSUMER":
                        pushPath = "/consumer/home/new";
                        break;
                }
                router.push(pushPath);
            } else {
                ElMessage.error("格式错误");
            }
        },
        async loginAdminAction({ commit, dispatch }, payload: ILogin) {
            payload.pass = CryptoJS.MD5(payload.pass).toString();
            const loginRes = await reqLogin(payload);
            if (loginRes.code !== 0 || !loginRes.data) {
                return;
            }
            commit("changeState", loginRes.data);
            commit("changeRole", loginRes.data.role, { root: true });
            await dispatch("initUserInfoAction", { root: true });
            router.push({ name: "UserManage" });
        },
    },
};
export default loginModule;
