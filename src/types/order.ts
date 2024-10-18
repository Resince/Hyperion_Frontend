export interface IOrder {
    total: number;
    orders: IOrderItem[];
}

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
    IOrderDetailItems: IOrderDetailItem[];
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
    name?: string;
}

export interface IMerchantOrder {
    complete_time: string;
    create_time: string;
    items: IMerchantOrderItem[];
    order_id: number;
    state: string;
    user_name: string;
}

export interface IMerchantOrderItem {
    cover_url: string;
    number: number;
    single_price: number;
}
