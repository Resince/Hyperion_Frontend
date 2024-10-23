import {
    getshoppingList as gShoppingList,
    postShoppingList as pShoppingList,
    deleteShoppingList as dShoppingList,
    updateShoppingList as uShoppingList,
} from "@/api/shoppingListApi";
import { IRootState } from "@/types";
import { IgoodsDetail } from "@/types/goods";
import {
    IShoppingListReq,
    IShoppingListItem,
    IShoppingListType,
} from "@/types/shoppingList";
import { Module } from "vuex";

const ShoppingListModule: Module<IShoppingListType, IRootState> = {
    namespaced: true,
    state() {
        return {
            shoppingList: [],
            orderList: new Set<number>(),
        };
    },
    mutations: {
        initeShoppingList(state, shoppingList: IShoppingListItem[]) {
            state.shoppingList = shoppingList;
        },
        deleteItem(state, id: number) {
            state.shoppingList = state.shoppingList.filter(
                (item) => item.id !== id
            );
        },
        addShoppingList(
            state,
            payload: { goodDetails: IgoodsDetail; quantity: number }
        ) {
            state.shoppingList.push({
                id: payload.goodDetails.id,
                quantity: payload.quantity,
            });
        },
        changeShoppingList(state, shoppingListItem: IShoppingListReq) {
            state.shoppingList = state.shoppingList.map((item) => {
                if (item.id === shoppingListItem.id) {
                    item.quantity = shoppingListItem.quantity;
                }
                return item;
            });
        },
        changeOrderList(state, list: Set<number>) {
            state.orderList = list;
        },
    },
    actions: {
        async getShoppingList({ commit }) {
            // 请求购物车列表
            const res = await gShoppingList();
            if (res.code !== 0) {
                return;
            }
            commit("initeShoppingList", res.data);
            return res.data;
        },
        async postShoppingList(
            { commit },
            payload: { goodDetails: IgoodsDetail; quantity: number }
        ) {
            // 添加物品到购物车
            if (!payload.goodDetails.id || !payload.quantity) {
                return;
            }
            const res = await pShoppingList(
                payload.goodDetails.id,
                payload.quantity
            );
            if (res.code !== 0) {
                return;
            }
            commit("addShoppingList", payload);
        },
        async deleteShoppingList({ commit }, payload: { id: number }) {
            // 删除购物车
            if (!payload.id) {
                return;
            }
            const res = await dShoppingList(payload.id);
            if (res.code !== 0) {
                return;
            }
            commit("deleteItem", payload.id);
        },
        async updateItemsNumber(
            { commit },
            payload: { id: number; quantity: number }
        ) {
            // 更新购物车
            if (!payload.id || !payload.quantity) {
                return;
            }
            const res = await uShoppingList(payload.id, payload.quantity);
            if (res.code !== 0) {
                return;
            }
            commit("changeShoppingList", payload);
        },
    },
    getters: {
        shoppingList(state) {
            return state.shoppingList;
        },
        list(state) {
            let list = [] as {
                coverUrl: string;
                id: number;
                name: string;
                price: number;
                quantity: number;
                allPrice: number;
            }[];
            state.orderList.forEach((item) => {
                const i = state.shoppingList.find((i) => i.id === item);
                if (i) {
                    list.push({
                        id: i.id,
                        quantity: i.quantity,
                        price: i.price || 0,
                        name: i.name || "",
                        coverUrl: i.coverUrl || "",
                        allPrice: (i.price ?? 0) * i.quantity,
                    });
                }
            });
            return list;
        },
    },
};
export default ShoppingListModule;
