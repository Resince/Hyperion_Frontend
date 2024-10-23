export enum liColor {
    PRIMARY = "primary",
    WARNING = "warning",
    SUCCESS = "success",
    DANGWR = "danger",
}

export enum liStatus {
    PENDING = "pending",
    SUCCESS = "success",
    FAILED = "failed",
}


/**
 * 订单状态
 * @enum {string}
 * @property {string} PLACED - "刚创建完订单"
 * @property {string} CONFIRMED - "支付之后"
 * @property {string} SHIPPED - "商家发货之后"
 * @property {string} COMPLETE - "确认收货之后"
 */
export enum OrderState {
    PLACED = "PLACED",
    CONFIRMED = "CONFIRMED",
    SHIPPED = "SHIPPED",
    COMPLETE = "COMPLETE",
}
