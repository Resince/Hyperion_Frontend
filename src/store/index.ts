import { createStore } from 'vuex';

export default createStore({
    state: {
        token: ''
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        }
    },
    actions: {
        saveToken({ commit }, token) {
            commit('setToken', token);
        }
    },
    getters: {
        getToken: (state) => state.token
    }
});
