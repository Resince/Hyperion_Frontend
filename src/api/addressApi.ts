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
        url: "/address/default/" + id.toString(),
        method: "post",
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
        data: { props, id },
    });
};

export const reqDeleteAddress = (data: {
    id: number;
    userId: number;
}): Promise<IDataType> => {
    return request({
        url: "/address/delete/",
        method: "delete",
        data,
    });
};

export const reqAreaList = (id?: number): Promise<IDataType<any>> => {
    return request({
        url: "/area/list",
        method: "get",
        params: id,
    });
};
