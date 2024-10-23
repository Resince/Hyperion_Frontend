import request from "@/utils/request";
import { IDataType } from "@/types";
import { IMerchantOrderList, IOrder } from "@/types/order";
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
    console.log(id);

    return request.get<IDataType<IOrder>>(`/order/detail`, {
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
    return request.get<IDataType<IMerchantOrderList>>(`/order/merchant/list`, {
        params: {
            pageSize,
            pageNum,
            state,
        },
    });
};

export const createOrder = (addrId: number, goodsIdList: number[]) => {
    console.log(addrId, goodsIdList);
    return request.post<IDataType<any>>("/order/add", {
        addrId,
        goodsIdList,
    });
};

export const orderPay = (id: number) => {
    return request.patch<IDataType>(`/order/pay?id=${id}`);
};

export const orderReceive = (id: number) => {
    return request.patch<IDataType>(`/order/receive?id=${id}`);
};

export const orderSent = (id: number) => {
    return request.patch<IDataType>(`/order/ship?id=${id}`);
};

export const orderReview = (
    orderId: number,
    goodsId: number,
    review: number
) => {
    console.log(orderId, goodsId, review);

    return request.patch<IDataType>(
        "/order/review",
        { orderId, goodsId, review },
        {
            params: {
                orderId,
                goodsId,
                review,
            },
        }
    );
};
