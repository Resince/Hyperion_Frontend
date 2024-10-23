// 记录一些基础的类型定义
import { ILogin } from "./login";
import { IRegister } from "./register";
import { IGoods } from "./goods";
import { IShoppingListType } from "./shoppingList";
import { ITableStore } from "./table";
import { IAddressState } from "./address";
import { IOrder } from "./order";
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
 * @param name 用户名
 * @param tel 用户电话
 * @param email 用户邮箱
 * @param role 用户角色
 */
export interface IRootState {
    name: string;
    tel: string;
    email: string;
    role?: string;
}

// 用户列表类型
export interface IUserList {
    items: IUserListItem[];
    total: number;
}

export interface IUserListItem {
    id: number;
    name: string;
    pass: string;
    email: string;
    lastLogin: string;
    role: string;
    state: string;
    tel: string;
}
// 用户列表请求参数类型
export interface IUserListReq {
    pageNum: number;
    pageSize: number;
    role?: string;
    search?: string;
    state?: string;
}

export interface IRootWithModule {
    loginModule: ILogin;
    regesterModule: IRegister;
    goodsStroeMudule: IGoods;
    shoppingListMudule: IShoppingListType;
    tableStoreMudule: ITableStore;
    addressStoreMudule: IAddressState;
    orderStoreMudule: IOrder;
}

export type IStoreType = IRootState & IRootWithModule;
