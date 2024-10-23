<script setup lang="ts">
    import { IOrder } from "@/types/order";
    import { onMounted, ref } from "vue";
    import { useStore } from "@/store";
    import { useRouter } from "vue-router";
    import { OrderState } from "@/types/enum";
    const router = useRouter();
    const store = useStore();
    const data = ref<IOrder>({
        total: 4,
        items: [],
    });
    const init = async () => {
        data.value = await store.dispatch(
            "orderStoreModule/getOrderListAction",
            { pageSize: 10, pageNum: 1, state: OrderState.PLACED.toString() }
        );
    };
    onMounted(() => {
        init();
    });
    const handleOnClickDetail = (id: number) => {
        console.log(id);

        router.push({ name: "ConsumerOrderDetails", params: { id: id } });
    };
    const handleOnClickClass = async (type: OrderState) => {
        data.value = await store.dispatch(
            "orderStoreModule/getOrderListAction",
            { pageSize: 10, pageNum: 1, state: type.toString() }
        );
    };
    const trans = (i: string) => {
        switch (i) {
            case OrderState.PLACED.toString():
                return "待付款";
            case OrderState.CONFIRMED.toString():
                return "待发货";
            case OrderState.SHIPPED.toString():
                return "待收货";
            case OrderState.COMPLETE.toString():
                return "已完成";
            default:
                return "未知状态";
        }
    };
</script>
<template>
    <div class="orderlist">
        <div class="orderlist-title">我的订单</div>
        <div class="orderlist-header">
            <button
                class="cell notPay"
                @click="handleOnClickClass(OrderState.PLACED)"
            >
                <h1>待付款</h1>
            </button>
            <button
                class="cell notReceive"
                @click="handleOnClickClass(OrderState.CONFIRMED)"
            >
                <h1>待发货</h1>
            </button>
            <button
                class="cell notComment"
                @click="handleOnClickClass(OrderState.SHIPPED)"
            >
                <h1>待收货</h1>
            </button>
            <button
                class="cell completed"
                @click="handleOnClickClass(OrderState.COMPLETE)"
            >
                <h1>已完成</h1>
            </button>
        </div>
        <div class="orders">
            <div
                class="orders-rows"
                v-for="i in data.items"
            >
                <div class="img item">
                    <img
                        :src="i.coverUrl"
                        alt=""
                    />
                </div>
                <div class="msg item">
                    <div class="state">{{ trans(i.state) }}</div>
                    <div class="price">{{ i.payment }}</div>
                </div>
                <button
                    class="viewdetail item"
                    @click="handleOnClickDetail(i.id)"
                >
                    查看详情
                </button>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .orderlist {
        .orderlist-title {
            padding: 20px 0px;
            font-size: 23px;
            font-weight: bold;
            &::after {
                content: "";
                display: block;
                width: 100%;
                height: 1px;
                margin-top: 15px;
                background-color: $cus_line-grey;
            }
        }
        .orderlist-header {
            display: flex;
            justify-content: space-between;
            padding: 0px 20px 20px;
            border-bottom: $cus_line-grey 1px solid;
            .cell {
                width: 200px;
                height: 70px;
                border-radius: 10px;
                background: $cus_lightPink;
                h1 {
                    font-size: 16px;
                    font-weight: bold;
                }
            }
        }
        .orders {
            padding: 0px 30px;
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            width: 100%;
            .orders-rows {
                display: flex;
                gap: 20px;
                align-items: center;
                .img {
                    img {
                        width: 100px;
                        height: 100px;
                        border-radius: 7px;
                        object-fit: cover;
                    }
                }
                .msg {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    .state {
                        border-radius: 7px;
                        background-color: bisque;
                        padding: 5px 5px;
                        font-size: 18px;
                        font-weight: bold;
                    }
                    .price {
                        color: red;
                        font-size: 16px;
                        font-weight: bold;
                    }
                }
                .viewdetail {
                    margin-left: 70%;
                    width: 100px;
                    height: 50px;
                    border-radius: 7px;
                    background-color: $cus_yellow;
                    font-size: 16px;
                    font-weight: bold;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
    }
</style>
