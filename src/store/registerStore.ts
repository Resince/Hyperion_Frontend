import { IRootState } from "@/types/index.ts";
import { Module } from "vuex";
import { IRegister, IRegisterRes } from "@/types/register";
import { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
import { reqRegister } from "@/api/loginRegisterApi";
import CryptoJS from "crypto-js";
import router from "@/router/index";

interface IRegisterPayload {
    form: FormInstance | undefined;
    payload: IRegister;
}

const registerModule: Module<IRegisterRes, IRootState> = {
    namespaced: true,
    state() {
        return {
            id: 0,
            tel: "",
            name: "",
            email: "",
            states: "",
            last_login: "",
        };
    },
    mutations: {
        changeId(state, id: number) {
            state.id = id;
        },
        changeTelephone(state, tel: string) {
            state.tel = tel;
        },
        changeName(state, name: string) {
            state.name = name;
        },
        changeEmail(state, email: string) {
            state.email = email;
        },
        changeState(state, states: string) {
            state.states = states;
        },
        changeLastLogin(state, last_login: string) {
            state.last_login = last_login;
        },
    },
    actions: {
        async registerAction({ commit }, { form, payload }: IRegisterPayload) {
            if (
                !form ||
                !payload.telephone ||
                !payload.name ||
                !payload.password ||
                !payload.email ||
                !payload.role
            ) {
                ElMessage.error("请填写完整信息");
                return;
            }
            // 表单验证
            const valid = await form.validate();
            if (valid) {
                // 密码md5加密
                payload.password = CryptoJS.MD5(payload.password).toString();
                // 处理请求
                try {
                    const regesiterRes = await reqRegister(payload);
                    if (regesiterRes.code !== 0 || !regesiterRes.data) {
                        return;
                    }
                    commit("changeId", regesiterRes.data.id);
                    commit("changeTelephone", regesiterRes.data.tel);
                    commit("changeName", regesiterRes.data.name);
                    commit("changeEmail", regesiterRes.data.email);
                    commit("changeState", regesiterRes.data.states);
                    commit("changeLastLogin", regesiterRes.data.last_login);
                } catch (error) {
                    console.log(error);
                }
                // 跳转
                router.push("/login");
            } else {
                ElMessage.error("格式错误");
            }
        },
    },
    getters: {},
};
export default registerModule;
