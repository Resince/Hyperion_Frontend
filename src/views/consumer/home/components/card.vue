<script setup lang="ts">
    import { IGoodsListItem } from "@/types/goods";
    import { useRouter } from "vue-router";
    const { data, size } = defineProps<{
        data: IGoodsListItem;
        size?: string;
    }>();
    const router = useRouter();
    const handlePurchase = () => {
        // TODO : Purchase
        // 跳转指详情页面
        router.push({ name: "GoodsDetails", params: { id: data.id } });
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
            <div class="card-heading">{{ data.name }}</div>
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
