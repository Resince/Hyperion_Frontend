// 记录一些基础的类型定义
import { ILogin } from "./login";
import { IRegister } from "./register";
import { IGoods } from "./goods";
import { IShoppingListType } from "./shoppingList";
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
    data?: T;
}

/**
 * @interface IRootState
 * @param id 用户id
 * @param name 用户名
 * @param tel 用户电话
 * @param email 用户邮箱
 * @param role 用户角色
 */
export interface IRootState {
    id: number;
    name: string;
    tel: string;
    email: string;
    role?: string;
}

export interface IRootWithModule {
    loginModule: ILogin;
    regesterModule: IRegister;
    goodsStroeMudule: IGoods;
    shoppingListMudule: IShoppingListType;
}

export type IStoreType = IRootState & IRootWithModule;
