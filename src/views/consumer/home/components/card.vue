<script setup lang="ts">
    import { IGoodsALLListItem } from "@/types/goods";
    import { postShoppingList } from "@/api/shoppingListApi";
    import { useRouter } from "vue-router";
    const { data, size } = defineProps<{
        data: IGoodsALLListItem;
        size?: string;
    }>();
    const router = useRouter();
    const handleAddShoppingList = () => {
        // TODO: Add to shopping list
        postShoppingList(data.id, 1);
    };

    const handlePurchase = () => {
        // TODO : Purchase
        // 跳转指详情页面
        router.push(`/consumer/goodsdetails/:${data.id}`);
    };
</script>

<template>
    <div
        class="card-container"
        :class="[size]"
    >
        <div class="card-img">
            <img
                :src="data.coverUrl"
                alt=""
            />
        </div>
        <div class="card-box">
            <div>
                <button
                    class="card-action"
                    @click="handleAddShoppingList"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                    >
                        <path
                            d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48l45.5 0c3.8 0 7.1 2.7 7.9 6.5l51.6 271c6.5 34 36.2 58.5 70.7 58.5L488 384c13.3 0 24-10.7 24-24s-10.7-24-24-24l-288.3 0c-11.5 0-21.4-8.2-23.6-19.5L170.7 288l288.5 0c32.6 0 61.1-21.8 69.5-53.3l41-152.3C576.6 57 557.4 32 531.1 32L360 32l0 102.1 23-23c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-64 64c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l23 23L312 32 120.1 32C111 12.8 91.6 0 69.5 0L24 0zM176 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm336-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"
                        />
                    </svg>
                </button>
                <div class="card-heading">{{ data.name }}</div>
            </div>
            <div class="card-text">
                {{ data.desc }}
            </div>
            <div class="card-price">{{ data.price }}</div>
            <button
                class="card-button"
                @click="handlePurchase"
            >
                Purchase
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .card-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 380px;
    }
    .card-img {
        .wide {
            grid-column: 1 / span 2;
        }
        height: 200px;
        width: 100%;
        img {
            object-fit: cover;
            border-radius: 8px 8px 0px 0;
            height: 100%;
            width: 100%;
        }
    }
    .card-box {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 2px;
    }
    .card-action {
        position: relative;
        float: right;
        top: -15px;
        right: 10px;
        color: #e26d5c;
        background: #fff;
        border-radius: 100%;
        padding: 15px;
        font-size: 15px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2),
            0 1px 2px 0 rgba(0, 0, 0, 0.19);
        svg {
            width: 15px;
            scale: 1.5;
        }
    }

    .card-action:hover {
        color: #fff;
        background: #e26d5c;
        animation: pulse 1.5s infinite;
    }

    .card-heading {
        font-size: 18px;
        font-weight: bold;
        background: #fff;
        padding: 5px 10px 0px;
        text-align: left;
    }

    .card-text {
        padding: 6px 10px;
        background: #fff;
        font-size: 14px;
        color: #636262;
    }

    .card-price {
        padding: 0px 10px;
        background: #fff;
        font-size: 17px;
        color: #e26d5c;
        font-weight: bold;
    }

    .card-button {
        display: flex;
        justify-content: center;
        padding: 5px 0;
        width: 100%;
        background-color: $cus_yellow;
        color: #fff;
        border-radius: 0 0 8px 8px;
    }

    .card-button:hover {
        text-decoration: none;
        background-color: $cus_yellow;
        color: #fff;
    }

    @keyframes pulse {
        0% {
            transform: scale(0.9);
        }
        70% {
            transform: scale(1);
            box-shadow: 0 0 0 50px rgba(90, 153, 212, 0);
        }
        100% {
            transform: scale(0.9);
            box-shadow: 0 0 0 0 rgba(90, 153, 212, 0);
        }
    }
</style>
