const errorTable: { [key: string]: string } = {
    "-101": "用户已存在",
    "-102": "用户密码错误",
    "-103": "用户信息获取或修改失败",
    "-104": "获取订单失败",
    "-201": "没有查到商品",
    "-202": "没有查到商品详情",
    "-203": "加入购物车失败",
    "-204": "购物车列表查看失败",
    "-205": "删除购物车内商品失败",
    "-206": "增加购物车内商品数量失败",
    "-207": "结算失败",
    "-208": "创建订单失败",
    "-209": "订单支付失败",
    "-210": "确认收货失败",
    "-211": "评价失败",
    "-214": "设置默认地址失败",
    "-216": "地址修改失败",
    "-217": "删除地址失败",
    "-302": "没找到商家对应的商品",
    "-303": "上架失败",
    "-304": "下架失败",
    "-305": "修改失败",
    "-306": "删除失败",
    "-308": "发货失败",
    "-313": "新增地址失败",
    "-315": "新增地址失败",
    "-401": "没找到用户",
    "-402": "没找到用户详情信息",
    "-403": "新增用户失败",
    "-404": "删除用户失败",
    "-405": "没找到商家",
    "-406": "没找到商家详情信息",
};

const getError = (code: string) => {
    return errorTable[code];
};

export { getError };
