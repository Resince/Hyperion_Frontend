/**
 * @interface IOrder
 * @param {string} address - address of the order
 * @param {Date} complete_time - complete time of the order
 * @param {number} con_id - id of the consignee
 * @param {string} consignee - consignee of the order
 * @param {string} contact - contact of the order
 * @param {string} cover_url - cover url of the order
 * @param {Date} create_time - create time of the order
 * @param {number} id - id of the order
 * @param {number} mer_id - id of the merchant
 * @param {number} payment - payment of the order
 * @param {string} state - state of the order
 */
export interface IOrder {
    address: string;
    complete_time: Date;
    con_id: number;
    consignee: string;
    contact: string;
    cover_url: string;
    create_time: Date;
    id: number;
    mer_id: number;
    payment: number;
    state: string;
}
