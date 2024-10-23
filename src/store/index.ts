import { createStore, Store, useStore as useVuexStore } from "vuex";
import { IRootState, IStoreType, IUserListReq } from "@/types/index";
import loginModule from "./loginStore";
import registerModule from "./registerStore";
import { getCache, getToken, setCache } from "@/utils/cache";
import {
    updateUserInfoAPI,
    getUserInfoAPI,
    deleteUserApi,
    getUserListApi,
} from "@/api/userinfoApi";
import ShoppingListModule from "./shoppingListStore";
import goodsStoreModule from "./goodStore";
import tableStoreModule from "./componentStore/tableStore";
import addressStoreModule from "./addressStore";
import orderStoreModule from "./orderStore";

const store = createStore<IRootState>({
    state() {
        return {
            name: "",
            tel: "",
            email: "",
            role: "",
        };
    },
    mutations: {
        changeName(state, name: string) {
            state.name = name;
        },
        changeTel(state, tel: string) {
            state.tel = tel;
        },
        changeEmail(state, email: string) {
            state.email = email;
        },
        changeRole(state, role: string) {
            setCache("role", role);
            state.role = role;
        },
    },
    actions: {
        async initUserInfoAction({ commit }) {
            console.log("initUserInfoAction");
            const token = getToken();
            const role = getCache("role");
            if (!token || !role) {
                return;
            }
            const res = await getUserInfoAPI();
            if (res.code !== 0 || !res.data) {
                return;
            }
            commit("changeName", res.data.name);
            commit("changeTel", res.data.tel);
            commit("changeEmail", res.data.email);
            commit("changeRole", role);
        },
        async updateUserInfoAction(
            { commit },
            payload: { name: string; tel: string; email: string }
        ) {
            const res = await updateUserInfoAPI(payload);
            if (res.code !== 0) {
                return;
            }
            commit("changeName", payload.name);
            commit("changeTel", payload.tel);
            commit("changeEmail", payload.email);
        },
        async deleteUserAction({}, payload: { id: number }) {
            const res = await deleteUserApi(payload.id);
            if (res.code !== 0) {
                return;
            }
        },
        async getUserListAction({}, payload: IUserListReq) {
            const res = await getUserListApi(payload);
            if (res.code !== 0) {
                return;
            }
            return res.data;
        },
    },
    getters: {
        gRole(state) {
            return state.role;
        },
        gName(state) {
            return state.name;
        },
        gTel(state) {
            return state.tel;
        },
        gEmail(state) {
            return state.email;
        },
    },
    modules: {
        loginModule,
        registerModule,
        ShoppingListModule,
        goodsStoreModule,
        tableStoreModule,
        addressStoreModule,
        orderStoreModule,
    },
});

export function useStore(): Store<IStoreType> {
    return useVuexStore();
}

export default store;
