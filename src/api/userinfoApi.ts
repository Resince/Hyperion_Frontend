import { IDataType, IUserList, IUserListReq } from "@/types";
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

export const deleteUserApi = (id: number): Promise<IDataType> => {
    return request({
        url: `/admin/user/delete?id=${id}`,
        method: "delete",
    });
};

export const getUserListApi = (
    data: IUserListReq
): Promise<IDataType<IUserList>> => {
    return request({
        url: "/admin/user/list",
        method: "get",
        params: data,
    });
};
