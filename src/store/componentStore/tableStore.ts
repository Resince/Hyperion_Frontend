import { IRootState } from "@/types";
import { ITableStore } from "@/types/table";
import { Module } from "vuex";

const tableStoreMudule: Module<ITableStore, IRootState> = {
    namespaced: true,
    state() {
        return {
            columns: [],
        };
    },
    mutations: {
        pushColumns(state: any, column: any) {
            state.columns.push(column);
        },
        changeWidth(state: any, payload: { index: number; width: number }) {
            state.columns[payload.index].width = payload.width;
        },
    },
    getters: {
        columns: (state: { columns: any }) => state.columns,
    },
};

export default tableStoreMudule;
