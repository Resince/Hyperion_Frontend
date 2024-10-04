import { createStore, Store, useStore as useVuexStore } from "vuex";
import { IRootState, IRootWithModule } from "@/types/index";
import loginModule from "./loginRegister/login";
import registerModule from "./loginRegister/register";

const store = createStore<IRootState>({
    state() {
        return {
            id: 0,
            name: "",
            role: "",
        };
    },
    mutations: {},
    actions: {},
    modules: {
        loginModule,
        registerModule,
    },
});

export function useStore(): Store<IRootWithModule> {
    return useVuexStore();
}

export default store;
