import { createStore, Store, useStore as useVuexStore } from "vuex";
import { IRootState, IStoreType } from "@/types/index";
import loginModule from "./loginStore";
import registerModule from "./registerStore";
import { getCache, getToken, setCache } from "@/utils/cache";
import { updateUserInfoAPI, getUserInfoAPI } from "@/api/userinfoApi";
import { ElMessage } from "element-plus";
import ShoppingListMudule from "./shoppingListStore";
import goodsStoreMudule from "./goodStore";

const store = createStore<IRootState>({
    state() {
        return {
            id: 0,
            name: "",
            tel: "",
            email: "",
            role: "",
        };
    },
    mutations: {
        changeId(state, id: number) {
            setCache("id", id);
            state.id = id;
        },
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
            const id = getCache("id");
            const token = getToken();
            const role = getCache("role");
            if (!token || !id || !role) {
                return;
            }
            const res = await getUserInfoAPI(id);
            if (res.code !== 0 || !res.data) {
                return;
            }
            commit("changeId", res.data.id);
            commit("changeName", res.data.name);
            commit("changeTel", res.data.tel);
            commit("changeEmail", res.data.email);
            commit("changeRole", role);
        },
        async updateUserInfoAction({ commit }, payload: IRootState) {
            const res = await updateUserInfoAPI(payload);
            if (res.code !== 0) {
                return;
            }
            commit("changeName", payload.name);
            commit("changeTel", payload.tel);
            commit("changeEmail", payload.email);
        },
    },
    getters: {
        gRole(state) {
            return state.role;
        },
        gId(state) {
            return state.id;
        },
    },
    modules: {
        loginModule,
        registerModule,
        ShoppingListMudule,
        goodsStoreMudule,
    },
});

export function useStore(): Store<IStoreType> {
    return useVuexStore();
}

export default store;
