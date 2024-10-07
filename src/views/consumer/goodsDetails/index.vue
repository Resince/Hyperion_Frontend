<script setup lang="ts">
    import store from "@/store";
    import { IgoodsDetail } from "@/types/goods";
    import { onMounted, ref } from "vue";
    import { useRoute } from "vue-router";
    const id = ref<string>("");
    const data = ref<IgoodsDetail>();
    const initeData = async () => {
        id.value = useRoute().params.id as string;
        id.value = id.value.split(":")[1];
        const role = store.getters.gRole;
        await store.dispatch("goodsStoreMudule/getGoodsDetailAction", {
            id: id.value,
            role: role,
        });
        data.value = store.getters["goodsStoreMudule/gGoodDetail"](
            Number(id.value)
        );
    };
    onMounted(() => {
        initeData();
    });
    const quantity = ref<number>(1);
    const handleAddToShoppingList = async () => {
        await store.dispatch("ShoppingListMudule/postShoppingList", {
            id: Number(id.value),
            quantity: Math.max(1, quantity.value),
        });
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
                <div class="name">
                    <h1>商品名称</h1>
                    <div>{{ data?.name }}</div>
                </div>
                <div class="price">
                    <h1>商品价格</h1>
                    <div>
                        {{ data?.price }}
                    </div>
                </div>
                <div class="des">
                    <h1>商品描述</h1>
                    <div>
                        {{ data?.desc }}
                    </div>
                </div>
                <div class="buttons">
                    <button
                        class="addtoShoppingList"
                        @click="handleAddToShoppingList"
                    >
                        加入购物车
                    </button>
                    <div class="quantity">
                        <button
                            class="plus"
                            @click="quantity++"
                        >
                            +
                        </button>
                        <button
                            class="minus"
                            @click="quantity--"
                        >
                            -
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="details-message">
            <div class="comment">商品评论</div>
            <div class="introduction">商品介绍</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .details {
        display: flex;
        flex-direction: column;
        gap: 30px;
        height: 100%;
        padding: 0px 20px;

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
                border-radius: 8px;
                height: 350px;
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
                h1 {
                    font-size: 20px;
                    color: black;
                    font-weight: bold;
                }
                div {
                    font-size: 15px;
                    color: black;
                }
                .name,
                .price,
                .des {
                    border-radius: 8px;
                    background-color: #f0f0f0;
                    padding: 10px;
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                }
                .buttons {
                    display: flex;
                    flex-direction: row;
                    gap: 3px;
                    .addtoShoppingList {
                        width: 100px;
                        height: 40px;
                        background-color: yellow;
                        color: black;
                        border: 2px solid black;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                    .quantity {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        .plus,
                        .minus {
                            width: 18px;
                            height: 18px;
                            background-color: yellow;
                            color: black;
                            border: 2px solid black;
                            border-radius: 5px;
                            cursor: pointer;
                            display: flex;
                            justify-content: center;
                            align-items: center;
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
            .comment {
                font-size: 20px;
            }
            .introduction {
                font-size: 20px;
            }
        }
    }
</style>
