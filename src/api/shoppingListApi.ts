import { IDataType } from "@/types";
import request from "../utils/request";
import { IShoppingListReq, IShoppingListItem } from "@/types/shoppingList";

export const postShoppingList = (
    id: number,
    quantity: number
): Promise<IDataType<IShoppingListReq>> => {
    return request({
        url: `/trolley/add`,
        method: "post",
        data: {
            id: id,
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

export const deleteShoppingList = (id: number): Promise<IDataType> => {
    return request({
        url: `/trolley/delete`,
        method: "delete",
        params: {
            goodsId: id,
        },
    });
};

export const updateShoppingList = (
    id: number,
    quantity: number
): Promise<IDataType<IShoppingListReq>> => {
    return request({
        url: `/trolley/update`,
        method: "put",
        data: {
            id: id,
            quantity: quantity,
        },
    });
};
