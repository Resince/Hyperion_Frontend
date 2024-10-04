import { IRootState } from "@/types/index.ts";
import { ILogin, ILoginRes } from "@/types/loginRegister/login";
import { Module } from "vuex";
import { setToken } from "@/utils/token";
import CryptoJS from "crypto-js";
import { reqLogin } from "@/api/loginRegister";
import { ElMessage } from "element-plus";
import { getError } from "@/utils/errorTable";
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
            id: 0,
            tel: "",
            token: "",
        };
    },
    mutations: {
        changeId(state, id: number) {
            state.id = id;
        },
        changeTel(state, tel: string) {
            state.tel = tel;
        },
        changeToken(state, token: string) {
            // 设置本地token
            setToken(token);
            state.token = token;
        },
    },
    actions: {
        async loginAction({ commit }, { form, payload }: ILoginPayload) {
            if (!form || !payload.tel || !payload.password || !payload.role) {
                ElMessage.error("请填写完整信息");
                return;
            }
            // 表单验证
            const valid = await form.validate();
            if (valid) {
                // 密码md5加密
                payload.password = CryptoJS.MD5(payload.password).toString();
                // 处理请求
                const loginRes = await reqLogin(payload);
                console.log("loginRes", loginRes);
                if (loginRes.code !== 0) {
                    console.log("loginRes.code", loginRes.code);
                    const message = getError(loginRes.code.toString());
                    ElMessage.error(message);
                    return;
                }
                commit("changeId", loginRes.data.id);
                commit("changeTel", loginRes.data.tel);
                commit("changeToken", loginRes.data.token);
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
                        pushPath = "/consumer/home/:new";
                        break;
                    default:
                        break;
                }
                router.push(pushPath);
            } else {
                ElMessage.error("格式错误");
            }
        },
    },
    getters: {},
};
export default loginModule;
