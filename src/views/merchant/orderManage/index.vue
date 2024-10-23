<script setup lang="ts">
    import DataTable from "@/components/dataTable/table2.vue";
    import Main from "@/components/main/index.vue";
    import Container from "@/components/container/index.vue";
    import Header from "@/components/header/index.vue";
    import { onMounted, ref } from "vue";
    import { IMerchantOrderList, IMerchantOrderListItem } from "@/types/order";
    import { useStore } from "@/store";
    import { useRouter } from "vue-router";
    import { OrderState } from "@/types/enum";
    import formattedDate from "@/utils/formattedDate.ts";
    const router = useRouter();
    const store = useStore();
    const handleFilter = () => {
        console.log("filter");
    };
    const handleSearch = () => {
        console.log("search");
    };

    // 暂时没有该功能
    const handleClickOrder = (i: number) => {
        router.push({
            name: "orderDetails",
            params: { id: i },
        });
    };
    // 该页面的数据结构
    type dataType = {
        header: { title: string; width: string; label: string }[];
        orders: IMerchantOrderList;
    };
    const data = ref<dataType>({
        header: [
            { title: "订单编号", width: "400px", label: "order_id" },
            { title: "单价", width: "200px", label: "single_price" },
            { title: "数量", width: "200px", label: "number" },
            { title: "状态", width: "200px", label: "state" },
            { title: "实际收款", width: "200px", label: "aLLprice" },
        ],
        orders: {} as IMerchantOrderList,
    });
    // 计算总价
    const totalOrderPrice = (order: IMerchantOrderListItem) => {
        return order.items.reduce((acc: number, cur) => {
            return acc + cur.singlePrice * cur.number;
        }, 0).toFixed(2);
    };
    const init = async () => {
        data.value.orders = await store.dispatch(
            "orderStoreModule/getOrderListByMerchantAction",
            {
                pageSize: 20,
                pageNum: 1,
            }
        );
    };
    onMounted(() => {
        init();
    });
    const handleChangeState = async (order: IMerchantOrderListItem) => {
        if (order.state == OrderState.CONFIRMED.toString()) {
            await store.dispatch("orderStoreModule/orderSentAction", {
                orderId: order.orderId,
            });
            order.state = OrderState.SHIPPED.toString();
        }
    };
    const transState = (state: string) => {
        switch (state) {
            case OrderState.CONFIRMED.toString():
                return "待发货";
            case OrderState.SHIPPED.toString():
                return "待用户收货";
            case OrderState.COMPLETE.toString():
                return "已完成";
            case OrderState.PLACED.toString():
                return "待用户付款";
            default:
                return "未知";
        }
    };
</script>

<template>
    <Main>
        <Header headerTitle="交易管理"></Header>
        <Container>
            <DataTable
                title="订单列表"
                :titleIcon="'bx-receipt'"
                :header="data.header"
                :flexBasis="'100%'"
                @handleFilter="handleFilter"
                @handleSearch="handleSearch"
            >
                <tbody class="order-template">
                    <template v-for="item in data.orders.items">
                        <tr class="order-msg">
                            <td>
                                <div>订单编号: {{ item.orderId }}</div>
                                <div>买家昵称: {{ item.userName }}</div>
                            </td>
                            <td></td>
                            <td></td>
                            <td>
                                <span
                                    class="status"
                                    :class="item.state"
                                    @click="handleChangeState(item)"
                                >
                                    {{ transState(item.state) }}
                                </span>
                            </td>
                            <td>
                                创建时间：{{ formattedDate(item.createTime) }}
                            </td>
                        </tr>
                        <tr
                            class="goodsList"
                            v-for="goods in item.items"
                        >
                            <td>
                                <div>
                                    <img
                                        :src="goods.coverUrl"
                                        alt=""
                                    />
                                    <div>{{ goods.name }}</div>
                                </div>
                            </td>
                            <td>￥{{ goods.singlePrice }}</td>
                            <td>{{ goods.number }}</td>
                            <td></td>
                            <td>￥{{ (goods.singlePrice * goods.number).toFixed(2) }}</td>
                        </tr>
                        <tr class="order-address">
                            <td>
                                <div>收货地址:{{ item.address }}</div>
                                <div>收货人:{{ item.consignee }}</div>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>合计:{{ totalOrderPrice(item) }}</td>
                        </tr>
                    </template>
                </tbody>
            </DataTable>
        </Container>
    </Main>
</template>

<style scoped lang="scss">
    tbody.order-template {
        margin-top: 15px;
        display: block;
        max-height: 900px;
        overflow-y: auto;

        tr {
            display: table;
            width: 100%;
            cursor: pointer;
        }

        td {
            padding: 10px 0;
            min-width: 100px;
        }

        // 动画 begin
        tr {
            transition: all 0.3s ease;
            td:nth-child(1) {
                padding-left: 10px;
            }
        }

        tr:hover {
            background: $grey;
        }
        // 动画 end

        .order-msg {
            background: $light-blue;
            border-radius: 10px 10px 0 0;
            &:hover {
                background: $light-primary;
            }
            td {
                font-size: 12px;
                font-weight: 600;
            }
            td:nth-child(1) {
                display: flex;
                gap: 30px;
                width: 300px;
            }
        }
        .goodsList {
            td:nth-child(1) div {
                display: flex;
                padding-left: 15px;
                align-items: center;
                font-size: 12px;
                white-space: nowrap;
            }
        }
        .order-address {
            background: $light-blue;
            border-radius: 0 0 10px 10px;
            td {
                border-bottom: 20px;
                font-size: 12px;
                font-weight: 600;
            }
            margin-bottom: 10px;
            td:nth-child(1) {
                display: flex;
                gap: 30px;
                width: 300px;
            }
        }
        td img {
            width: 32px;
            height: 32px;
            border-radius: 20%;
            object-fit: cover;
        }

        // 订单状态 begin
        tr td .status {
            font-size: 11px;
            padding: 5px 16px;
            color: $dark;
            border-radius: 20px;
            font-weight: 600;
        }

        tr td .status.completed {
            background: $success;
        }

        tr td .status.process {
            background: $primary;
        }

        tr td .status.pending {
            background: $warning;
        }
        // 订单状态 end
    }
</style>
