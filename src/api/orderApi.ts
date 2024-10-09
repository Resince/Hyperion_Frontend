import request from "@/utils/request";
import { IOrder } from "@/types/order";
import { IDataType } from "@/types";
import qs from "qs";

export const getOrderAPI = (
    id: string,
    role: string,
    name?: string
): Promise<IDataType<IOrder>> => {
    const params = qs.stringify({
        role,
        name,
    });
    return request({
        url: `/order/list/${id}?${params}`,
        method: "get",
    });
};

export const updateOrderAPI = (data: IOrder): Promise<IDataType<>> => {
    return request({
        url: "/order/update/" + data.id,
        method: "post",
        data: {
            address: data.address,
            complete_time: data.complete_time,
            con_id: data.con_id,
            consignee: data.consignee,
            contact: data.contact,
            cover_url: data.cover_url,
            create_time: data.create_time,
            id: data.id,
            mer_id: data.mer_id,
            payment: data.payment,
            state: data.state,
        },
    });
};
