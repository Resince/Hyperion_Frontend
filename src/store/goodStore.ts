import { Module } from "vuex";
import { goodsSearchItem, IGoods } from "@/types/goods";
import { IRootState } from "@/types/index";
import { reqCategoryList, reqGoodsDetail, reqGoodsList } from "@/api/goodsApi";
import { IgoodsAllListRequest } from "@/types/goods";

const goodsStoreMudule: Module<IGoods, IRootState> = {
    namespaced: true,
    state() {
        return {
            goodDetail: [],
            goodsSearchList: [],
            goodsMerchantList: [],
            pageNum: 0,
            pageSize: 0,
        };
    },
    mutations: {
        changeGoodDetail(state, goodDetail) {
            state.goodDetail.push(goodDetail);
            // 保持goodDetail的长度为2
            if (state.goodDetail.length > 3) state.goodDetail.shift();
        },
        changeGoodsSearchList(state, { res, payload }) {
            state.goodsSearchList.push({ key: payload, value: res.data });
            // 保持goodsSearchList的长度为2
            if (state.goodsSearchList.length > 3) state.goodsSearchList.shift();
        },
        changeGoodsMerchantList(
            state,
            { goodsMerchantList, pagenum, pagesize }
        ) {
            state.goodsMerchantList = goodsMerchantList.data;
            state.pageNum = pagenum;
            state.pageSize = pagesize;
        },
    },
    actions: {
        async getGoodsDetailAction(
            { commit, state },
            { id, role }: { id: number; role: string }
        ) {
            if (!id || !role) {
                return;
            }
            // 请求商品详情
            // 如果商品详情已经存在，则不再请求
            if (state.goodDetail.some((item) => item.id === id)) {
                return;
            }
            const res = await reqGoodsDetail(id, role);
            if (res.code !== 0 || !res.data) {
                return;
            }
            commit("changeGoodDetail", res.data);
        },
        async getGoodsSearchListAction(
            { commit, state },
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
            if (state.goodsSearchList.some((item) => item.key === payload)) {
                return;
            }
            const res = await reqCategoryList(payload);
            commit("changeGoodsSearchList", { res, payload });
        },
        async getGoodsMerchantListAction(
            { commit, state },
            { pagesize, pagenum }: { pagesize: number; pagenum: number }
        ) {
            if (!pagesize || !pagenum) {
                return;
            }
            // 请求商品列表
            if (state.pageNum === pagenum && state.pageSize === pagesize) {
                return;
            }
            const res = await reqGoodsList(pagenum, pagesize);
            commit("changeGoodsMerchantList", { res, pagenum, pagesize });
        },
    },
    getters: {
        gGoodDetail: (state) => (id: number) => {
            return state.goodDetail.find((item) => item.id === id);
        },
        gGoodsSearchList:
            (state) =>
            (payload: IgoodsAllListRequest): goodsSearchItem | undefined => {
                return state.goodsSearchList.find(
                    (item) =>
                        item.key.category === payload.category &&
                        item.key.keyword === payload.keyword &&
                        item.key.pageNum === payload.pageNum &&
                        item.key.pageSize === payload.pageSize
                );
            },
        gGoodsMerchantList(
            state,
            payload: { pagesize: number; pagenum: number }
        ) {
            if (
                state.pageNum === payload.pagenum &&
                state.pageSize === payload.pagesize
            ) {
                return state.goodsMerchantList;
            } else {
                return [];
            }
        },
        gPageNum(state) {
            return state.pageNum;
        },
        gPageSize(state) {
            return state.pageSize;
        },
    },
};

export default goodsStoreMudule;
