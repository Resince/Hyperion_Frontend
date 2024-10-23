<script setup lang="ts">
    import { IShoppingListItem } from "@/types/shoppingList";
    import SortButton from "@/assets/icons/sortButton.vue";
    import Tablerow from "./components/tablerow.vue";
    import { computed, onBeforeUnmount, onMounted, onUpdated, ref } from "vue";
    import { useStore } from "@/store";
    import { useRouter } from "vue-router";
    import { watch } from "vue";
    const store = useStore();
    const router = useRouter();
    // 初始化数据
    const initeData = async () => {
        await store.dispatch("ShoppingListModule/getShoppingList");
    };
    const data = computed<IShoppingListItem[]>(
        () => store.getters["ShoppingListModule/shoppingList"]
    );
    const shoppingListLength = computed<number>(() => data.value.length);
    onMounted(() => {
        initeData();
        console.log("初始化");
    });
    onUpdated(() => {
        console.log("组件更新");
    });
    onBeforeUnmount(() => {
        console.log("组件卸载");
    });
    // 排序
    let sortState: { [key: string]: number } = {
        singlePrice: 1,
        quantity: 1,
        price: 1,
    };
    const handleSort = (i: keyof IShoppingListItem) => {
        sortState[i] = sortState[i] * -1;
        data.value.sort((a, b) => {
            return sortState[i] * (Number(a[i]) - Number(b[i]));
        });
    };

    // 全选
    const selectAll = ref<boolean>(false);
    const selectedGoods = ref<Set<number>>(new Set());
    const handleSelectAll = () => {
        if (selectAll.value) {
            data.value.map((item: any) => {
                selectedGoods.value.add(item.id);
            });
        } else {
            selectedGoods.value.clear();
        }
    };
    watch(
        () => selectedGoods.value.size,
        (newVal: number) => {
            if (newVal === data.value.length) {
                selectAll.value = true;
            } else {
                selectAll.value = false;
            }
        }
    );
    // 相应函数
    const calculatePrice = computed(() => {
        let price = 0;
        selectedGoods.value.forEach((item) => {
            const foundItem = data.value.find((i) => i.id === item);
            if (foundItem?.price) {
                price += foundItem.price;
            }
        });
        return price.toFixed(2);
    });
    const calculateDiscount = computed(() => {
        let discount = 0;
        selectedGoods.value.forEach((item) => {
            const foundItem = data.value.find((i) => i.id === item);
            if (!foundItem?.discount || !foundItem.price) return;
            discount += foundItem.discount * foundItem.price;
        });
        return discount.toFixed(2);
    });
    function handleClickGood(id: number) {
        router.push({
            name: "GoodsDetails",
            params: { id: id },
        });
    }
    const handleClickDelete = async (id: number) => {
        selectedGoods.value.delete(id);
        await store.dispatch("ShoppingListModule/deleteShoppingList", {
            id: id,
        });
    };
    const handleClickDeleteAll = async () => {
        // 删除所有选中的商品
        const promises: any[] = [];
        data.value.forEach((i) => {
            promises.push(
                store.dispatch("ShoppingListModule/deleteShoppingList", i.id)
            );
        });
        await Promise.all(promises);
        selectedGoods.value.clear();
    };
    const handlePay = () => {
        if (selectedGoods.value.size === 0) return;
        store.commit("ShoppingListModule/changeOrderList", selectedGoods.value);
        router.push({ name: "Pay" });
    };
</script>

<template>
    <div class="shoppingList">
        <div class="shoppingList-header">
            <h1 class="shoppingList-header-title">
                我的购物车({{ shoppingListLength }})
            </h1>
            <div class="shoppingList-header-action">
                <!-- <button
                    class="shoppingList-header-action-button"
                    @click="handleFilter"
                >
                    <span>Filter</span
                    ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-filter"
                    >
                        <polygon
                            points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
                        />
                    </svg>
                </button> -->
            </div>
        </div>
        <div class="shoppingList-tableview">
            <div class="tableview-header">
                <div class="product-cell selectall">
                    <el-checkbox
                        v-model="selectAll"
                        size="large"
                        @change="handleSelectAll"
                    />
                    <div>全选</div>
                </div>
                <div class="product-cell image">商品</div>
                <div class="product-cell describe">介绍</div>
                <div class="product-cell singlePrice">
                    单价
                    <SortButton @sort="handleSort('price')" />
                </div>
                <div class="product-cell quantity">
                    数量
                    <SortButton @sort="handleSort('quantity')" />
                </div>
                <div class="product-cell price">小计</div>
                <div class="product-cell action">操作</div>
            </div>
            <Tablerow
                v-for="item in data"
                :row="item"
                :selected-goods="selectedGoods"
                @handle-click-delete="handleClickDelete"
                @handle-click-good="handleClickGood"
            />
        </div>
        <div class="shoppingList-footer">
            <button
                class="selected-delete"
                @click="handleClickDeleteAll"
            >
                删除选中
            </button>
            <div class="selected-msg">
                <div class="selected-quantity">
                    已选择
                    <span>{{ selectedGoods.size }}</span>
                    件商品
                </div>
                <div class="selected-price">
                    <div class="selected-price-all">
                        <span>总价:{{ calculatePrice }}</span>
                    </div>
                    <div class="selected-price-discount">
                        促销:<span>{{ calculateDiscount }}</span>
                    </div>
                </div>
                <button
                    class="selected-pay"
                    @click="handlePay"
                >
                    结算
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .shoppingList {
        width: 100%;
        display: flex;
        flex-direction: column;
        &-header {
            position: sticky;
            top: 72px;
            z-index: 100;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding: 5px 5px;
            background-color: $cus_background;
            &-title {
                font-size: 22px;
                font-weight: bold;
            }
            &-action {
                height: 100%;
                &-button {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    gap: 5px;
                    height: 100%;
                    padding: 0px 15px;
                    border-radius: 7px;
                    background-color: $cus_line-grey;
                }
            }
        }
        &-tableview {
            width: 100%;
            padding: 0 4px;
            .tableview-header {
                display: flex;
                flex-direction: row;
                align-items: center;
                border-radius: 4px;
                background-color: $cus_line-grey;
                position: sticky;
                top: 115px;
                padding-top: 3px;
                padding-bottom: 3px;
                margin-bottom: 5px;
                z-index: 90;
                .product-cell {
                    display: flex;
                    align-items: center;
                    font-size: 15px;
                    font-weight: bold;
                    &.selectall {
                        padding-left: 20px;
                    }
                    &.image {
                        padding-left: 40px;
                    }
                }
            }
        }
        .selectall {
            width: 6%;
            padding-left: 20px;
            gap: 5px;
            z-index: 10;
        }
        .image {
            width: 20%;
        }
        .describe {
            width: 33%;
        }
        .singlePrice {
            width: 10%;
        }
        .quantity {
            width: 10%;
        }
        .price {
            width: 10%;
        }
        .action {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 10%;
        }

        &-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0px;
            border-top: 1px solid $cus_line-grey;
            position: sticky;
            bottom: 0;
            background-color: $cus_white;
            z-index: 100;
            height: 70px;
        }
        .selected-msg {
            display: flex;
            flex-direction: row;
            gap: 15px;
        }
        .selected {
            &-delete {
                width: 100px;
                height: 40px;
                background-color: lightsalmon;
                color: $cus_white;
                border: 2px solid red;
                border-radius: 5px;
                cursor: pointer;
            }
            &-quantity {
                font-size: 18px;
                font-weight: bold;
                span {
                    color: red;
                }
            }
            &-price {
                display: flex;
                flex-direction: column;
                gap: 5px;
                &-all {
                    font-size: 18px;
                    font-weight: bold;
                }
                &-discount {
                    font-size: 14px;
                }
                span {
                    color: red;
                }
            }
            &-pay {
                width: 100px;
                height: 40px;
                background-color: lightgreen;
                color: $cus_white;
                border: 2px solid green;
                border-radius: 5px;
                cursor: pointer;
            }
        }
    }
</style>
