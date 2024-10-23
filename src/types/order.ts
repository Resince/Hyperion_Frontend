/**
 * 用户获取订单列表
 * @interface IOrder
 */
export interface IOrder {
    total: number;
    items: IOrderItem[];
}

/**
 * 用户获取的订单item
 * @interface IOrderDetail
 */
export interface IOrderItem {
    coverUrl: string;
    createTime: string;
    id: number;
    payment: number;
    state: string;
}

export interface IOrderDetail {
    completeTime: string;
    consumer: IConsumer;
    coverUrl: string;
    createTime: string;
    id: string;
    merchant: IMerchant;
    payment: number;
    state: string;
    goodsList: IOrderDetailItem[];
}
export interface IConsumer {
    address: string;
    consignee: string;
    contact: string;
    id: number;
}

export interface IMerchant {
    id: number;
    name: string;
}

export interface IOrderDetailItem {
    coverUrl: string;
    quantity: number;
    price: number;
    discount: number;
    merId: number;
    goodsId: number;
    name: string;
}

/**
 * 商家获取订单列表
 * @interface IMerchantOrder
 */
export interface IMerchantOrderList {
    items: IMerchantOrderListItem[];
    total: number;
}

export interface IMerchantOrderListItem {
    address: string;
    completeTime: string;
    consignee: string;
    createTime: string;
    items: IMerchantOrderListItemItem[];
    orderId: number;
    state: string;
    userName: string;
}

export interface IMerchantOrderListItemItem {
    coverUrl: string;
    id: number;
    name: string;
    number: number;
    singlePrice: number;
}
