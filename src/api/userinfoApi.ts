import { IDataType } from "@/types";
import request from "@/utils/request";
import { IRootState } from "@/types";

export const getUserInfoAPI = (id: string): Promise<IDataType<IRootState>> => {
    return request({
        url: "/user/get/" + id,
        method: "get",
    });
};

export const updateUserInfoAPI = (
    data: IRootState
): Promise<IDataType<IRootState>> => {
    return request({
        url: "/user/info/" + data.id,
        method: "post",
        data: {
            name: data.name,
            tel: data.tel,
            email: data.email,
        },
    });
};
