import { createStore } from 'vuex';
import { UserInfo } from '@/types/user';
import {ref} from "vue";

const userInfo = ref<UserInfo | null>(null);

export default createStore({
    state: {
        userInfo: userInfo.value,
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        }
    },
    actions: {
        saveUserInfo({ commit }, userInfo) {
            commit('setUserInfo', userInfo);
        }
    },
    getters: {
        getToken: (state) => state.userInfo?.token
    }
});
