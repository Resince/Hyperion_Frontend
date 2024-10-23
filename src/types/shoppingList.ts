export interface IShoppingListType {
    shoppingList: IShoppingListItem[];
    orderList: Set<number>;
}

/**
 * 修改购物车商品数量的数据类型
 * @interface
 * @param {number} quantity - quantity of the shoppingList
 * @param {number} id - id of the shoppingList
 */
export interface IShoppingListReq {
    id: number;
    quantity: number;
}

/**
 * 单个购物车商品的数据类型
 * @interface
 * @param {string} coverUrl - cover_url of the shoppingListItem
 * @param {number} discount - discount of the shoppingListItem
 * @param {number} id - id of the shoppingListItem
 * @param {string} name - name of the shoppingListItem
 * @param {number} price - price of the shoppingListItem
 * @param {number} quantity - quantity of the shoppingListItem
 * @param {string} state - 商品状态，如果为DELETED则不显示,无法下单
 */
export interface IShoppingListItem {
    coverUrl: string;
    discount: number;
    id: number;
    name: string;
    price: number;
    quantity: number;
    state: string;
}
