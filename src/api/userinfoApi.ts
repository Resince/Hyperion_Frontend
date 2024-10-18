import { IDataType } from "@/types";
import request from "@/utils/request";
import { IRootState } from "@/types";

export const getUserInfoAPI = (): Promise<IDataType<IRootState>> => {
    return request({
        url: "/user/get",
        method: "get",
    });
};

export const updateUserInfoAPI = (
    data: IRootState
): Promise<IDataType<IRootState>> => {
    return request({
        url: "/user/change",
        method: "post",
        data: {
            name: data.name,
            tel: data.tel,
            email: data.email,
        },
    });
};
