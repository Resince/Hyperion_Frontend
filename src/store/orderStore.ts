import {
    createOrder,
    getOrderDetail,
    getOrderList,
    getOrderListByMerchant,
    orderPay,
    orderReview,
} from "@/api/orderApi";
import { IRootState } from "@/types";
import { IOrder } from "@/types/order";
import { Module } from "vuex";

const orderStoreMudule: Module<IOrder, IRootState> = {
    namespaced: true,
    state() {
        return {
            total: 0,
            orders: [],
        };
    },
    mutations: {
        changeOrderList(state, payload: IOrder) {
            state.total = payload.total;
            state.orders = payload.orders;
        },
    },
    actions: {
        async getOrderListAction(
            { commit },
            payload: { pageSize: number; pageNum: number; state: string }
        ) {
            const orderList = await getOrderList(
                payload.pageSize,
                payload.pageNum,
                payload.state
            );
            commit("changeOrderList", orderList.data);
            return orderList.data;
        },
        async getOrderDetailAction({}, payload: { id: number }) {
            const orderDetail = await getOrderDetail(payload.id);
            return orderDetail.data;
        },
        async getOrderListByMerchantAction(
            {},
            payload: { pageSize: number; pageNum: number; state: string }
        ) {
            const orderList = await getOrderListByMerchant(
                payload.pageSize,
                payload.pageNum,
                payload.state
            );
            return orderList.data;
        },
        async createOrderAction(
            {},
            payload: { addrId: number; goodsIdList: number[] }
        ) {
            await createOrder(payload.addrId, payload.goodsIdList);
        },
        async orderPayAction({}, payload: { orderId: number }) {
            await orderPay(payload.orderId);
        },
        async orderReceiveAction({}, payload: { orderId: number }) {
            await orderPay(payload.orderId);
        },
        async orderSentAction({}, payload: { orderId: number }) {
            await orderPay(payload.orderId);
        },
        async reviewAction(
            {},
            payload: { orderId: number; goodsId: number; review: string }
        ) {
            await orderReview(payload.orderId, payload.goodsId, payload.review);
        },
    },
};

export default orderStoreMudule;
