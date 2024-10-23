import { IDataType } from "@/types";
import { IAddressDetail, IAddressListItem, IAddressReq } from "@/types/address";
import request from "@/utils/request";

export const reqAddressDetail = (
    id: number
): Promise<IDataType<IAddressDetail>> => {
    return request({
        url: "/address/detail/" + id.toString(),
        method: "get",
    });
};

export const reqAddressList = (): Promise<IDataType<IAddressListItem[]>> => {
    return request({
        url: "/address/list",
        method: "get",
    });
};

type reqSetdefaultRes = {
    id: number;
    userId: number;
    is_default: number;
};
export const reqSetdefault = (
    id: number
): Promise<IDataType<reqSetdefaultRes>> => {
    return request({
        url: "/address/default",
        method: "post",
        params: { id },
    });
};

export const reqAddAddress = (props: IAddressReq): Promise<IDataType> => {
    return request({
        url: "/address/add",
        method: "post",
        data: props,
    });
};

export const reqUpdateAddress = (
    props: IAddressReq,
    id: number
): Promise<IDataType> => {
    return request({
        url: "/address/update",
        method: "post",
        data: { id, ...props },
    });
};

export const reqDeleteAddress = (id: number): Promise<IDataType> => {
    return request({
        url: "/address/delete",
        method: "delete",
        params: {
            id: id,
        },
    });
};

export const reqAreaList = (parentId?: number): Promise<IDataType<any>> => {
    return request({
        url: "/area/list",
        method: "get",
        params: { parentId },
    });
};
