import { Module } from "vuex";
import {
    IAddGoods,
    IGoods,
    IGoodsList,
    IgoodsDetail,
    IUpdateGoods,
} from "@/types/goods.ts";
import { IRootState } from "@/types/index";
import {
    reqAddGoods,
    reqCategoryList,
    reqDeleteGoods,
    reqGoodsDetail,
    reqGoodsList,
    reqOffSaleGoods,
    reqOnSaleGoods,
    reqUpdateGoods,
    reqUploadImage,
} from "@/api/goodsApi";
import { IgoodsAllListRequest } from "@/types/goods";

const goodsStoreModule: Module<IGoods, IRootState> = {
    namespaced: true,
    state() {
        return {
            goodDetail: {} as IgoodsDetail,
            goodsSearchList: {} as IGoodsList,
            goodsMerchantList: {} as IGoodsList,
        };
    },
    mutations: {
        changeGoodDetail(state, goodDetail) {
            state.goodDetail = goodDetail;
        },
        changeGoodsSearchList(state, payload) {
            state.goodsSearchList = payload;
        },
        changeGoodsMerchantList(state, payload) {
            state.goodsMerchantList = payload;
        },
    },
    actions: {
        async getGoodsDetailAction(
            { commit },
            { id, role }: { id: number; role: string }
        ) {
            if (!id || !role) {
                return;
            }
            // 请求商品详情
            const res = await reqGoodsDetail(id, role);
            if (res.code !== 0 || !res.data) {
                return;
            }
            commit("changeGoodDetail", res.data);
            return res.data;
        },
        async getGoodsSearchListAction(
            { commit },
            payload: IgoodsAllListRequest
        ) {
            if (
                payload.pageNum === 0 ||
                payload.pageSize === 0 ||
                (!payload.category && !payload.keyword)
            ) {
                return;
            }
            // 请求商品列表
            const res = await reqCategoryList(payload);
            if (res.code !== 0) {
                return;
            }
            commit("changeGoodsSearchList", res.data);
            return res.data;
        },
        async getGoodsMerchantListAction(
            { commit },
            { pagesize, pagenum }: { pagesize: number; pagenum: number }
        ) {
            if (!pagesize || !pagenum) {
                return;
            }
            // 请求商品列表
            const res = await reqGoodsList(pagesize, pagenum);
            if (res.code !== 0) {
                return;
            }
            commit("changeGoodsMerchantList", res.data);
            return res.data;
        },
        async updateGoodsAction({}, payload: IUpdateGoods) {
            // 更新商品信息
            if (!payload) {
                return;
            }
            await reqUpdateGoods(payload);
        },
        async onSaleGoodsAction({}, payload: { id: number }) {
            if (!payload) {
                return;
            }
            await reqOnSaleGoods(payload.id);
        },
        async offSaleGoodsAction({}, payload: { id: number }) {
            if (!payload) {
                return;
            }
            await reqOffSaleGoods(payload.id);
        },
        async addGoodsAction({}, payload: IAddGoods) {
            if (!payload) {
                return;
            }
            await reqAddGoods(payload);
        },
        async uploadGoodsImgAction({}, payload: FormData) {
            if (!payload) {
                return;
            }
            const res = await reqUploadImage(payload);
            return res.data;
        },
        async deleteGoodsAction({}, payload: { id: number }) {
            if (!payload) {
                return;
            }
            await reqDeleteGoods(payload.id);
        },
    },
    getters: {
        gGoodsDetail: (state) => {
            return state.goodDetail;
        },
        gGoodsSearchList: (state) => {
            return state.goodsSearchList;
        },
        gGoodsMerchantList(state) {
            return state.goodsMerchantList;
        },
    },
};

export default goodsStoreModule;
