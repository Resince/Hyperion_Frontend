import request from "@/utils/request";
import { IDataType } from "@/types";
import {
    IGoodsAllList,
    IgoodsAllListRequest,
    IgoodsDetail,
    IAddGoods,
    IUpdateGoods,
    IGoodsListItem,
} from "@/types/goods";
import qs from "qs";

// 按照分类或者关键字查询商品列表
export const reqCategoryList = (
    param: IgoodsAllListRequest
): Promise<IDataType<IGoodsAllList>> => {
    const params = {
        pageNum: param.pageNum,
        pageSize: param.pageSize,
        category: param.category,
        keyword: param.keyword,
    };
    let query = qs.stringify(params);
    return request({
        url: `/goods/listAll?${query}`,
        method: "get",
    });
};

// 获取商品详情
export const reqGoodsDetail = (
    id: number,
    role: string
): Promise<IDataType<IgoodsDetail>> => {
    return request({
        url: `/goods/detail/${id}?role=${role}`,
        method: "get",
    });
};

// 获取商家列表
export const reqGoodsList = (
    pageSize: number,
    pageNum: number
): Promise<IDataType<IGoodsListItem[]>> => {
    const params = {
        
        pageNum: pageNum,
        pageSize: pageSize,
    };
    let query = qs.stringify(params);
    console.log(query);
    return request({
        url: `/goods/list?${query}`,
        method: "get",
    });
};

// 新增商品
export const reqAddGoods = (data: IAddGoods): Promise<IDataType> => {
    return request({
        url: `/goods/add`,
        method: "post",
        data,
    });
};

// 更新商品
export const reqUpdateGoods = (data: IUpdateGoods): Promise<IDataType> => {
    return request({
        url: `/goods/update`,
        method: "post",
        data,
    });
};

// 删除商品
export const reqDeleteGoods = (id: string): Promise<IDataType> => {
    return request({
        url: `/goods/delete/${id}`,
        method: "delete",
    });
};

// 商品上架
export const reqOnSaleGoods = (id: string): Promise<IDataType> => {
    return request({
        url: `/goods/onSale/${id}`,
        method: "post",
    });
};

// 商品下架
export const reqOffSaleGoods = (id: string): Promise<IDataType> => {
    return request({
        url: `/goods/offSale/${id}`,
        method: "post",
    });
};
