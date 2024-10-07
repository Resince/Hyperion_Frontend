import request from "@/utils/request";
import { ILogin, ILoginRes } from "@/types/login";
import { IRegister, IRegisterRes } from "@/types/register";
import { IDataType } from "@/types";

export const reqLogin = (data: ILogin): Promise<IDataType<ILoginRes>> => {
    return request({
        url: "/user/login",
        method: "post",
        data,
    });
};

export const reqRegister = (
    data: IRegister
): Promise<IDataType<IRegisterRes>> => {
    return request({
        url: "/user/register",
        method: "post",
        data,
    });
};
