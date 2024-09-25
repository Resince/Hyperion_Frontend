import { createStore } from 'vuex';

export default createStore({
    state: {
        token: '',
        name: '',
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setName(state, name) {
            state.name = name;
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
