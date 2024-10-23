<script setup lang="ts">
    import store from "@/store";
    import { IgoodsDetail } from "@/types/goods";
    import { computed, onMounted, ref } from "vue";
    const props = defineProps<{
        id: string;
    }>();
    const initeData = async () => {
        const role = store.getters.gRole;
        await store.dispatch("goodsStoreModule/getGoodsDetailAction", {
            id: props.id,
            role: role,
        });
        await store.dispatch("ShoppingListModule/getShoppingList");
    };
    const data = computed<IgoodsDetail>(() => {
        return store.getters["goodsStoreModule/gGoodsDetail"];
    });
    const inShoppingList = computed<boolean>(() => {
        const t = store.getters["ShoppingListModule/shoppingList"];
        return t.some((item: any) => item.id === Number(props.id));
    });
    onMounted(() => {
        initeData();
    });
    const quantity = ref<number>(1);
    const handleAddToShoppingList = async () => {
        if (inShoppingList.value === false) {
            await store.dispatch("ShoppingListModule/postShoppingList", {
                goodDetails: data.value,
                quantity: Math.max(1, quantity.value),
            });
        } else {
            await store.dispatch("ShoppingListModule/updateItemsNumber", {
                id: Number(props.id),
                quantity: quantity.value,
            });
        }
    };
</script>

<template>
    <div class="details">
        <div class="details-title">
            <h1>商品详情</h1>
        </div>
        <div class="details-main">
            <img :src="data?.coverUrl" />
            <div class="details-describe">
                <div class="name card">
                    <h1>商品名称</h1>
                    <div>{{ data?.name }}</div>
                </div>
                <div class="des card">
                    <h1>商品描述</h1>
                    <div>
                        {{ data?.desc }}
                    </div>
                </div>
                <div class="price card">
                    <h1>商品价格</h1>
                    <div>
                        {{ data?.price }}
                    </div>
                </div>
                <div class="discount card">
                    <h1>商品折扣</h1>
                    <div>
                        {{ data?.discount }}
                    </div>
                </div>
                <div class="details-price">
                    <div class="buttons">
                        <div class="buttons-number button-card">
                            <div>{{ quantity }}</div>
                        </div>
                        <div class="quantity">
                            <button
                                class="plus button-card"
                                @click="quantity = quantity + 1"
                            >
                                +
                            </button>
                            <button
                                class="minus button-card"
                                @click="quantity = Math.max(1, quantity - 1)"
                            >
                                -
                            </button>
                        </div>
                        <button
                            class="addtoShoppingList button-card"
                            @click="handleAddToShoppingList"
                        >
                            {{ !inShoppingList ? "加入购物车" : "更新购物车" }}
                        </button>
                    </div>
                    <div class="allprice">
                        <div>
                            实付款：{{
                                (
                                    data.price * quantity * data.discount || 1
                                ).toFixed(2)
                            }}
                        </div>
                        <div>
                            原价：{{ (data.price * quantity).toFixed(2) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="details-message">
            <div class="comment card">
                <h1>商品评价</h1>
                <div>好评：{{ data.posCount }}</div>
                <div>差评：{{ data.negCount }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .details {
        display: flex;
        flex-direction: column;
        gap: 10px;
        height: 100%;
        padding: 0px 20px;
        .card {
            border-radius: 8px;
            background-color: #f0f0f0;
            padding: 10px;
        }
        h1 {
            font-size: 20px;
            color: black;
            font-weight: bold;
        }
        &-title {
            display: flex;
            justify-content: left;
            height: 40px;
            h1 {
                font-size: 24px;
                color: black;
                font-weight: bold;
            }
        }
        &-main {
            display: flex;
            flex-direction: row;
            gap: 30px;
            img {
                object-fit: cover;
                border: 1px solid black;
                border-radius: 10px;
                height: 400px;
                width: 600px;
            }
            .details-describe {
                display: flex;
                flex-direction: column;
                gap: 10px;
                height: 100%;
                width: 100%;
                margin-right: 50px;
                justify-content: space-between;

                div {
                    font-size: 15px;
                    color: black;
                }
                .name,
                .price,
                .discount,
                .des {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                }
                .price > div {
                    font-size: 18px;
                    font-weight: bold;
                    color: rgb(190, 88, 88);
                }
                .details-price {
                    display: flex;
                    gap: 20px;
                    .buttons {
                        display: flex;
                        flex-direction: row;
                        gap: 3px;
                        .button-card {
                            background-color: yellow;
                            color: black;
                            border: 2px solid black;
                            border-radius: 5px;
                        }
                        .addtoShoppingList {
                            width: 100px;
                            cursor: pointer;
                        }
                        .buttons-number {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            width: 50px;
                            font-size: 20px;
                        }
                        .quantity {
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            .plus,
                            .minus {
                                width: 18px;
                                height: 18px;
                                cursor: pointer;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            }
                        }
                    }
                    .allprice {
                        display: flex;
                        flex-direction: raw;
                        align-items: center;
                        justify-self: center;
                        gap: 10px;
                        div {
                            border-radius: 8px;
                            background-color: #f0f0f0;
                            padding: 10px;
                        }
                        div:first-child {
                            font-size: 20px;
                            color: rgb(103, 40, 40);
                        }
                        div:nth-child(2) {
                            font-size: 15px;
                            color: black;
                        }
                    }
                }
            }
        }
        &-message {
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 20px;
            h1 {
                font-size: larger;
            }
            .comment > div {
                font-size: 18px;
            }
        }
    }
</style>
