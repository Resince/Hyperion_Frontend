import request from "@/utils/request";

export const getGoodsListAPI = () => {
    return request({
        url: `/goods/list`,
        method: "get",
    });
};
