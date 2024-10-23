import { IRootState } from "@/types";
import { IAddressReq, IAddressState } from "@/types/address";
import { Module } from "vuex";
import {
    reqAddAddress,
    reqAddressDetail,
    reqAddressList,
    reqAreaList,
    reqDeleteAddress,
    reqSetdefault,
    reqUpdateAddress,
} from "@/api/addressApi";

const addressStoreModule: Module<IAddressState, IRootState> = {
    namespaced: true,
    state() {
        return {
            addressList: [],
        };
    },
    mutations: {
        changeAddressList(state, addressList) {
            state.addressList = addressList;
        },
    },
    actions: {
        async getAddressDetailAction({}, id: number) {
            const res = await reqAddressDetail(id);
            if (res.code !== 0 || !res.data) {
                return;
            }
            return res.data;
        },
        async reqAddressListAction({ commit }) {
            const res = await reqAddressList();
            if (res.code !== 0 || !res.data) {
                return;
            }
            commit("changeAddressList", res.data);
            return res.data;
        },
        async reqAreaListAction({}, id?: number) {
            const res = await reqAreaList(id);
            if (res.code !== 0 || !res.data) {
                return;
            }
            return res.data;
        },
        async resSetDefaultAction({}, id: number) {
            const res = await reqSetdefault(id);
            if (res.code !== 0 || !res.data) {
                return;
            }
            return res.data;
        },
        async resAddAddressAction({ dispatch }, props: IAddressReq) {
            const res = await reqAddAddress(props);
            if (res.code !== 0 || !res.data) {
                return;
            }
            await dispatch("reqAddressListAction");
            return res.data;
        },
        async resUpdateAddressAction(
            { dispatch },
            { props, id }: { props: IAddressReq; id: number }
        ) {
            const res = await reqUpdateAddress(props, id);
            if (res.code !== 0 || !res.data) {
                return;
            }
            await dispatch("reqAddressListAction");
            return res.data;
        },
        async resDeleteAddressAction({ dispatch }, id: number) {
            const res = await reqDeleteAddress(id);
            if (res.code !== 0 || !res.data) {
                return;
            }
            console.log(id);

            await dispatch("reqAddressListAction");
            return res.data;
        },
    },
    getters: {
        gAddressList(state) {
            return state.addressList;
        },
    },
};

export default addressStoreModule;
