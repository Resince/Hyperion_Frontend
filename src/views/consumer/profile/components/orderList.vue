<script setup lang="ts">
    import { IOrder } from "@/types/order";
    import { onMounted, ref } from "vue";
    import { useStore } from "@/store";
    import { useRouter } from "vue-router";
    const router = useRouter();
    const store = useStore();
    const data = ref<IOrder>({
        total: 4,
        orders: [
            {
                id: 1,
                coverUrl: "https://img.yzcdn.cn/vant/ipad.jpeg",
                state: "待付款",
                createTime: "2021-10-10",
                payment: 1,
            },
            {
                id: 2,
                coverUrl: "https://img.yzcdn.cn/vant/ipad.jpeg",
                state: "待收货",
                createTime: "2021-10-10",
                payment: 1,
            },
            {
                id: 3,
                coverUrl: "https://img.yzcdn.cn/vant/ipad.jpeg",
                state: "待评价",
                createTime: "2021-10-10",
                payment: 1,
            },
            {
                id: 4,
                coverUrl: "https://img.yzcdn.cn/vant/ipad.jpeg",
                state: "已完成",
                createTime: "2021-10-10",
                payment: 1,
            },
        ],
    });
    const init = async () => {
        data.value = await store.dispatch(
            "orderStoreModule/getOrderListAction",
            { pageSize: 10, pageNum: 1, state: "notPay" }
        );
    };
    onMounted(() => {
        init();
    });
    const handleOnClickDetail = (id: number) => {
        router.push({ name: "ConsumerOrderDetails", params: { id: id } });
        console.log("查看详情", id);
    };
    const handleOnClickClass = async (type: string) => {
        data.value = await store.dispatch(
            "orderStoreModule/getOrderListAction",
            { pageSize: 10, pageNum: 1, state: type }
        );
    };
</script>
<template>
    <div class="orderlist">
        <div class="orderlist-title">我的订单</div>
        <div class="orderlist-header">
            <button
                class="cell notPay"
                @click="handleOnClickClass('notpay')"
            >
                <h1>待付款</h1>
            </button>
            <button
                class="cell notReceive"
                @click="handleOnClickClass('notReceive')"
            >
                <h1>待收货</h1>
            </button>
            <button
                class="cell notComment"
                @click="handleOnClickClass('notComment')"
            >
                <h1>待评价</h1>
            </button>
            <button
                class="cell completed"
                @click="handleOnClickClass('completed')"
            >
                <h1>已完成</h1>
            </button>
        </div>
        <div class="orders">
            <div
                class="orders-rows"
                v-for="i in data.orders"
            >
                <div class="img item">
                    <img
                        :src="i.coverUrl"
                        alt=""
                    />
                </div>
                <div class="msg item">
                    <div class="state">{{ i.state }}</div>
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
