export interface IShoppingListType {
    shoppingList: IShoppingListItem[];
    orderList: Set<number>;
}

/**
 * Interface for ShoppingList
 * @interface
 * @param {number} goods_id - goods_id of the shoppingList
 * @param {number} quantity - quantity of the shoppingList
 * @param {number} user_id - user_id of the shoppingList
 */
export interface IShoppingList {
    goods_id: number;
    quantity: number;
    user_id: number;
}

/**
 * 单个购物车商品的数据类型
 * @interface
 * @param {string} cover_url - cover_url of the shoppingListItem
 * @param {number} discount - discount of the shoppingListItem
 * @param {number} id - id of the shoppingListItem
 * @param {string} name - name of the shoppingListItem
 * @param {number} price - price of the shoppingListItem
 * @param {number} quantity - quantity of the shoppingListItem
 * @param {string} state - 商品状态，如果为DELETED则不显示,无法下单
 */
export interface IShoppingListItem {
    cover_url: string;
    discount: number;
    id: number;
    name: string;
    price: number;
    quantity: number;
    state: string;
}
