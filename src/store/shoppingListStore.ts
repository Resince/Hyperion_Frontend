import {
    getshoppingList as gShoppingList,
    postShoppingList as pShoppingList,
    deleteShoppingList as dShoppingList,
    updateShoppingList as uShoppingList,
} from "@/api/shoppingListApi";
import { IRootState } from "@/types";
import {
    IShoppingList,
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
        changeShoppingList(state, shoppingListItem: IShoppingList) {
            state.shoppingList = state.shoppingList.map((item) => {
                if (item.id === shoppingListItem.goods_id) {
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
        },
        async postShoppingList({}, payload: { id: number; quantity: number }) {
            // 添加物品到购物车
            if (!payload.id || !payload.quantity) {
                return;
            }
            await pShoppingList(payload.id, payload.quantity);
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
            commit("changeShoppingList", res.data);
        },
    },
    getters: {
        shoppingList(state) {
            return state.shoppingList;
        },
        orderList(state) {
            let orderList = [] as {
                cover_url: string;
                id: number;
                name: string;
                price: number;
                quantity: number;
                allPrice: number;
            }[];
            state.orderList.forEach((item) => {
                const i = state.shoppingList.find((i) => i.id === item);
                if (i) {
                    orderList.push({
                        id: i.id,
                        quantity: i.quantity,
                        price: i.price,
                        name: i.name,
                        cover_url: i.cover_url,
                        allPrice: i.price * i.quantity,
                    });
                }
            });
            return orderList;
        },
    },
};
export default ShoppingListModule;
