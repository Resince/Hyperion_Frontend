// goods ts type

/**
 * goods interface
 * 这个接口包括商品详情列表
 * 查询key和结果列表
 * 商家查询列表以及page和size
 * @interface IGoods
 */
export interface IGoods {
    goodDetail: IgoodsDetail;
    goodsSearchList: IGoodsList;
    goodsMerchantList: IGoodsList;
}
/**
 * 商品详情结果相应接口
 * @interface IgoodsDetail
 * @param {string} category - category of the goods
 * @param {string} coverUrl - coverUrl of the goods
 * @param {string} desc - desc of the goods
 * @param {number} discount - discount of the goods
 * @param {number} id - id of the goods
 * @param {string} name - name of the goods
 * @param {number} negCount - negCount of the goods
 * @param {number} posCount - posCount of the goods
 * @param {number} price - price of the goods
 * @param {number} quantity - quantity of the goods
 * @param {number} totSales - totSales of the goods
 */
export interface IgoodsDetail {
    id: number;
    name: string;
    coverUrl: string;
    desc: string;
    price: number;
    discount: number;
    quantity: number;
    totSales: number;
    category: string;
    negCount: number;
    posCount: number;
}

/**
 * 商品详情请求接口
 * @interface IgoodsAllListRequest
 * @param {string} category - category of the goods
 * @param {string} keyword - keyword of the goods
 * @param {number} pageNum - pageNum of the goods
 * @param {number} pageSize - pageSize of the goods
 */
export interface IgoodsAllListRequest {
    pageNum: number;
    pageSize: number;
    keyword?: string;
    category?: string;
}

/**
 * 查询之后的列表接口
 * @interface IGoodsList
 * @param {IGoodsListItem[]} items - items of the goods
 * @param {number} total - total of the goods
 */
export interface IGoodsList {
    items: IGoodsListItem[];
    total: number;
}

/**
 * 商品查询结果列表接口
 * @interface IGoodsListItem
 * @param {string} category - category of the goods
 * @param {string} coverUrl - coverUrl of the goods
 * @param {string} desc - desc of the goods
 * @param {number} discount - discount of the goods
 * @param {number} id - id of the goods
 * @param {string} name - name of the goods
 * @param {string} negCount - negCount of the goods
 * @param {string} posCount - posCount of the goods
 * @param {number} price - price of the goods
 * @param {string} quantity - quantity of the goods
 * @param {string} state - status of the goods
 * @param {number} totSales - totSales of the goods
 */
export interface IGoodsListItem {
    category: string;
    coverUrl: string;
    desc: string;
    discount: number;
    id: number;
    name: string;
    negCount: number;
    posCount: number;
    price: number;
    quantity: number;
    sale: string;
    state: string;
    totSales: number;
    userId: number;
}

/**
 * 新增商品请求接口
 * @interface IAddGoods
 * @param {string} category - category of the goods
 * @param {string} coverUrl - coverUrl of the goods
 * @param {string} desc - desc of the goods
 * @param {number} discount - discount of the goods
 * @param {string} name - name of the goods
 * @param {number} price - price of the goods
 * @param {number} quantity - quantity of the goods
 */
export interface IAddGoods {
    category: string;
    coverUrl: string;
    desc: string;
    discount: number;
    name: string;
    price: number;
    quantity: number;
}

/**
 * UpdateGoods interface请求参数
 * @interface IUpdateGoods
 * @param {string} category - category of the goods
 * @param {string} coverUrl - cover_url of the goods
 * @param {string} desc - desc of the goods
 * @param {number} discount - discount of the goods
 * @param {number} id - id of the goods
 * @param {string} name - name of the goods
 * @param {number} price - price of the goods
 * @param {number} quantity - quantity of the goods
 */
export interface IUpdateGoods {
    category: string;
    coverUrl: string;
    desc: string;
    discount: number;
    id: number;
    name: string;
    price: number;
    quantity: number;
}
