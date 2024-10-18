<script setup lang="ts">
    import DataTable from "@/components/dataTable/table2.vue";
    import Main from "@/components/main/index.vue";
    import Container from "@/components/container/index.vue";
    import Header from "@/components/header/index.vue";

    const handleFilter = () => {
        console.log("filter");
    };
    const handleSearch = () => {
        console.log("search");
    };
    const handleClickOrder = (i: number) => {
        console.log("click order", i);
    };
    type dataType = {
        header: { title: string; width: string; label: string }[];
        orders: orderType[];
    };
    type orderType = {
        complete_time: string;
        create_time: string;
        order_id: number;
        state: string;
        user_name: string;
        payee: string;
        payee_address: string;
        items: {
            cover_url: string;
            number: number;
            single_price: number;
            des: string;
        }[];
    };
    const data: dataType = {
        header: [
            { title: "订单编号", width: "400px", label: "order_id" },
            { title: "单价", width: "200px", label: "single_price" },
            { title: "数量", width: "200px", label: "number" },
            { title: "状态", width: "200px", label: "state" },
            { title: "实际收款", width: "200px", label: "aLLprice" },
        ],
        orders: [
            {
                complete_time: "2021-10-10",
                create_time: "2021-10-10",
                order_id: 115234523412,
                state: "completed",
                user_name: "user1",
                payee: "张先生收",
                payee_address: "北京朝阳区五道口",
                items: [
                    {
                        cover_url: "https://via.placeholder.com/150",
                        number: 1,
                        single_price: 100,
                        des: "蒙牛酸奶风味礼盒装200g*12盒",
                    },
                    {
                        cover_url: "https://via.placeholder.com/150",
                        number: 1,
                        single_price: 100,
                        des: "蒙牛酸奶风味礼盒装200g*12盒",
                    },
                ],
            },
            {
                complete_time: "2021-10-10",
                create_time: "2021-10-10",
                order_id: 115232523412,
                state: "process",
                user_name: "user2",
                payee: "张先生收",
                payee_address: "北京朝阳区五道口",
                items: [
                    {
                        cover_url: "https://via.placeholder.com/150",
                        number: 1,
                        single_price: 100,
                        des: "蒙牛酸奶风味礼盒装200g*12盒",
                    },
                ],
            },
        ],
    };
    // 计算总价
    const totalOrderPrice = (order: orderType) => {
        return order.items.reduce((acc: number, cur) => {
            return acc + cur.single_price * cur.number;
        }, 0);
    };
</script>

<template>
    <Main>
        <Header headerTitle="交易管理"</Header>
        <Container>
            <DataTable
                title="订单列表"
                :titleIcon="'bx-receipt'"
                :header="data.header"
                :flexBasis="'100%'"
                @handleFilter="handleFilter"
                @handleSearch="handleSearch"
                @handleClickOrder="handleClickOrder"
            >
                <tbody class="order-template">
                    <template v-for="item in data.orders">
                        <tr class="order-msg">
                            <td>
                                <div>订单编号: {{ item.order_id }}</div>
                                <div>买家昵称: {{ item.user_name }}</div>
                            </td>
                            <td></td>
                            <td></td>
                            <td>
                                <span
                                    class="status"
                                    :class="data.orders[0].state"
                                >
                                    {{ data.orders[0].state }}
                                </span>
                            </td>
                            <td>{{ data.orders[0].create_time }}</td>
                        </tr>
                        <tr
                            class="goodsList"
                            v-for="goods in item.items"
                        >
                            <td>
                                <div>
                                    <img
                                        :src="goods.cover_url"
                                        alt=""
                                    />
                                    <div>{{ goods.des }}</div>
                                </div>
                            </td>
                            <td>￥{{ goods.single_price }}</td>
                            <td>{{ goods.number }}</td>
                            <td></td>
                            <td>￥{{ goods.single_price * goods.number }}</td>
                        </tr>
                        <tr class="order-address">
                            <td>
                                <div>收货地址:{{ item.payee_address }}</div>
                                <div>收货人:{{ item.payee }}</div>
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
            color: $light;
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
