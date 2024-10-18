import request from "@/utils/request";
import { IDataType } from "@/types";
import { IMerchantOrder, IOrder } from "@/types/order";
export const getOrderList = (
    pageSize: number,
    pageNum: number,
    state: string
) => {
    return request.get<IDataType<IOrder>>(`/order/consumer/list`, {
        params: {
            pageSize,
            pageNum,
            state,
        },
    });
};

export const getOrderDetail = (id: number) => {
    return request.get<IDataType<IOrder>>(`/order/consumer/detail`, {
        params: {
            id,
        },
    });
};

export const getOrderListByMerchant = (
    pageSize: number,
    pageNum: number,
    state: string
) => {
    return request.get<IDataType<IMerchantOrder>>(`/order/consumer/list`, {
        params: {
            pageSize,
            pageNum,
            state,
        },
    });
};

export const createOrder = (addrId: number, goodsIdList: number[]) => {
    return request.post<IDataType>("/order/add", {
        addrId,
        goodsIdList,
    });
};

export const orderPay = (orderId: number) => {
    return request.patch<IDataType>("/order/pay", {
        orderId,
    });
};

export const orderReceive = (orderId: number) => {
    return request.patch<IDataType>("/order/receive", {
        orderId,
    });
};

export const orderSent = (orderId: number) => {
    return request.patch<IDataType>("/order/ship", {
        orderId,
    });
};

export const orderReview = (
    orderId: number,
    goodsId: number,
    review: string
) => {
    return request.patch<IDataType>("/order/review", {
        orderId,
        goodsId,
        review,
    });
};
