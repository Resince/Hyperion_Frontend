import { IDataType } from "@/types";
import request from "../utils/request";
import { IShoppingList, IShoppingListItem } from "@/types/shoppingList";

export const postShoppingList = (
    id: number,
    quantity: number
): Promise<IDataType<IShoppingList>> => {
    return request({
        url: `/trolley/add`,
        method: "post",
        data: {
            goods_id: id,
            quantity: quantity,
        },
    });
};

export const getshoppingList = (): Promise<IDataType<IShoppingListItem[]>> => {
    return request({
        url: `/trolley/list`,
        method: "get",
    });
};

type restype = {
    user_id: number;
    goods_id: number;
};
export const deleteShoppingList = (id: number): Promise<IDataType<restype>> => {
    return request({
        url: `/trolley/delete/?goodsId=${id}`,
        method: "delete",
    });
};

export const updateShoppingList = (
    id: number,
    quantity: number
): Promise<IDataType<IShoppingList>> => {
    return request({
        url: `/trolley/update`,
        method: "post",
        data: {
            id: id,
            quantity: quantity,
        },
    });
};
