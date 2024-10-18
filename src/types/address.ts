export interface IAddressState {
    addressList: IAddressListItem[];
}

/**
 * @interface IAddress
 * @param {string} cityId - 城市的id
 * @param {string} cityName - 城市的名字
 * @param {string} consignee - 收货人
 * @param {string} contact - 联系方式
 * @param {string} detail - 详细地址
 * @param {string} distId - 收获地址的id
 * @param {string} distName - 收货地址的名字
 * @param {string} id - id of the address
 * @param {string} isDefault - isDefault of the address
 * @param {string} provId - 省份的id
 * @param {string} provName - 省份的名字
 */
export interface IAddressDetail {
    provId: number;
    provName: string;
    cityId: number;
    cityName: string;
    distId: number;
    distName: string;
    consignee: string;
    contact: string;
    detail: string;
    id: string;
    isDefault: number;
}

/**
 * @interface IAddressListItem
 * @param {string} consignee - 收货人的名字
 * @param {string} contact - 联系方式
 * @param {string} detail - 详细地址
 * @param {string} district - 区域
 * @param {number} id - id of the addressListItem
 * @param {number} is_default - is_default of the addressListItem
 */
export interface IAddressListItem {
    consignee: string;
    contact: string;
    detail: string;
    district: string;
    id: number;
    is_default: number;
}

/**
 * @interface IAddressReq
 * @param {number} cityId - 城市的id
 * @param {string} consignee - 收货人
 * @param {string} contact - 联系方式
 * @param {string} detail - 详细地址
 * @param {number} distId - 区域的id
 * @param {number} provId - 省份的id
 * @param {number} userId - 用户的id
 */
export interface IAddressReq {
    cityId: number;
    consignee: string;
    contact: string;
    detail: string;
    distId: number;
    provId: number;
    userId: number;
}
