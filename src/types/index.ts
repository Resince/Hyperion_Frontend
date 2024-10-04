// 记录一些基础的类型定义
import { ILogin } from "./loginRegister/login";
// 基础信息的类型定义

/**
 * @interface IDataType
 * @param {number} code - 状态码
 * @param {string} msg - 提示信息
 * @param {T} data - 数据嵌套的数据类型
 */
export interface IDataType<T = any> {
    code: number;
    msg: string;
    data: T;
}

/**
 * @interface IRootState
 * @param id 用户id
 * @param name 用户名
 * @param role 用户角色
 */
export interface IRootState {
    id: number;
    name: string;
    role: string;
}

export interface IRootWithModule {
    loginModule: ILogin;
}

export type IStoreType = IRootState & IRootWithModule;
