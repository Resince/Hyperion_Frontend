import request from "@/utils/request";
import { IDataType } from "@/types";
import {
    IGoodsList,
    IgoodsAllListRequest,
    IgoodsDetail,
    IAddGoods,
    IUpdateGoods,
} from "@/types/goods";
import qs from "qs";

// 按照分类或者关键字查询商品列表
export const reqCategoryList = (
    param: IgoodsAllListRequest
): Promise<IDataType<IGoodsList>> => {
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
        url: `/goods/detail`,
        method: "get",
        params: {
            id,
            role,
        },
    });
};

// 获取商家列表
export const reqGoodsList = (
    pageSize: number,
    pageNum: number
): Promise<IDataType<IGoodsList>> => {
    return request({
        url: `/goods/list`,
        method: "get",
        params: {
            pageSize,
            pageNum,
        },
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
export const reqDeleteGoods = (id: number): Promise<IDataType> => {
    return request({
        url: `/goods/delete`,
        method: "delete",
        params: {
            id,
        },
    });
};

// 商品上架
export const reqOnSaleGoods = (id: number): Promise<IDataType> => {
    return request({
        url: `/goods/onsale`,
        method: "put",
        params: {
            id,
        },
    });
};

// 商品下架
export const reqOffSaleGoods = (id: number): Promise<IDataType> => {
    return request({
        url: `/goods/offsale`,
        method: "put",
        params: {
            id,
        },
    });
};

// 上传图片
export const reqUploadImage = (data: FormData): Promise<IDataType<string>> => {
    return request({
        url: `/file/upload`,
        method: "post",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        data,
    });
};
