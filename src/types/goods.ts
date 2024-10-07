// goods ts type

/**
 * goods interface
 * 这个接口包括商品详情列表
 * 查询key和结果列表
 * 商家查询列表以及page和size
 * @interface IGoods
 */
export interface IGoods {
    goodDetail: IgoodsDetail[];
    goodsSearchList: goodsSearchItem[];
    goodsMerchantList: IGoodsListItem[];
    pageNum?: number;
    pageSize?: number;
}
export interface goodsSearchItem {
    key: IgoodsAllListRequest;
    value: IGoodsAllList;
}

/**
 * 商品详情相应接口
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
 * 商品按照类别和关键字查询item接口
 * @interface IGoodsALLListItem
 * @param {string} coverUrl - coverUrl of the goods
 * @param {number} discount - discount of the goods
 * @param {number} id - id of the goods
 * @param {string} name - name of the goods
 * @param {number} price - price of the goods
 * @param {string} desc - desc of the goods
 */
export interface IGoodsALLListItem {
    id: number;
    coverUrl: string;
    discount: number;
    name: string;
    price: number;
    desc: string;
}

/**
 * 查询之后的列表接口
 * @interface IGoodsAllList
 * @param {IGoodsItem[]} items - items of the goods
 * @param {number} total - total of the goods
 */
export interface IGoodsAllList {
    items: IGoodsALLListItem[];
    total: number;
}

/**
 * 商家查询item接口
 * @interface IGoodsListItem
 * @param {string} cover_url - cover_url of the goods
 * @param {string} desc - desc of the goods
 * @param {number} discount - discount of the goods
 * @param {number} id - id of the goods
 * @param {string} name - name of the goods
 * @param {number} price - price of the goods
 * @param {number} quantity - quantity of the goods
 * @param {string} state - state of the goods
 * @param {number} tot_sales - tot_sales of the goods
 */
export interface IGoodsListItem {
    cover_url: string;
    desc: string;
    discount: number;
    id: number;
    name: string;
    price: number;
    quantity: number;
    state: string;
    tot_sales: number;
}

/**
 * AddGoods interface
 * @interface IAddGoods
 * @param {string} category - category of the goods
 * @param {string} coverUrl - coverUrl of the goods
 * @param {string} desc - desc of the goods
 * @param {number} discount - discount of the goods
 * @param {string} name - name of the goods
 * @param {number} price - price of the goods
 * @param {number} quantity - quantity of the goods
 * @param {string} state - "ONSALE" | "OFFSALE"
 */
export interface IAddGoods {
    category?: string;
    coverUrl?: string;
    desc?: string;
    discount?: number;
    name: string;
    price: number;
    quantity: number;
    state: "ONSALE" | "OFFSALE";
}

/**
 * UpdateGoods interface
 * @interface IUpdateGoods
 * @param {string} category - category of the goods
 * @param {string} cover_url - cover_url of the goods
 * @param {string} desc - desc of the goods
 * @param {number} discount - discount of the goods
 * @param {number} id - id of the goods
 * @param {string} name - name of the goods
 * @param {number} price - price of the goods
 * @param {number} quantity - quantity of the goods
 */
export interface IUpdateGoods {
    category?: string;
    cover_url?: string;
    desc?: string;
    discount?: number;
    id: number;
    name?: string;
    price?: number;
    quantity?: number;
}
