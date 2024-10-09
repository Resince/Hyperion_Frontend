<script setup lang="ts">
    import DataTable from "@/components/dataTable/index.vue";
    const handleFilter = () => {
        console.log("filter");
    };
    const handleSearch = () => {
        console.log("search");
    };
    const handleClickOrder = (i: any) => {
        console.log("click order");
    };
    type dataType = {
        header: { title: string }[];
        orders: orderType[];
    };
    type orderType = {
        complete_time: string;
        create_time: string;
        order_id: number;
        state: string;
        user_name: string;
        items: {
            cover_url: string;
            number: number;
            single_price: number;
        }[];
    };
    const data: dataType = {
        header: [
            { title: "商品" },
            { title: "商品单价" },
            { title: "数量" },
            { title: "交易状态" },
            { title: "实收款" },
        ],
        orders: [
            {
                complete_time: "2021-10-10",
                create_time: "2021-10-10",
                order_id: 1,
                state: "completed",
                user_name: "user1",
                items: [
                    {
                        cover_url: "https://via.placeholder.com/150",
                        number: 1,
                        single_price: 100,
                    },
                    {
                        cover_url: "https://via.placeholder.com/150",
                        number: 1,
                        single_price: 100,
                    },
                ],
            },
            {
                complete_time: "2021-10-10",
                create_time: "2021-10-10",
                order_id: 2,
                state: "process",
                user_name: "user2",
                items: [
                    {
                        cover_url: "https://via.placeholder.com/150",
                        number: 1,
                        single_price: 100,
                    },
                ],
            },
        ],
    };
</script>

<template>
    <DataTable
        :title="'订单管理'"
        :titleIcon="'bx-receipt'"
        :header="data.header"
        @handleFilter="handleFilter"
        @handleSearch="handleSearch"
        @handleClickOrder="handleClickOrder"
    >
        <tbody class="order-template">
            <template
                v-for="(item, index) in data.orders"
                :key="index"
            >
                <tr>
                    <td>
                        {{ item.order_id }}
                        {{ item.user_name }}
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                        <span
                            class="status"
                            :class="item.state"
                        >
                            {{ item.state }}
                        </span>
                    </td>
                    <td>{{ item.create_time }}</td>
                </tr>
                <tr
                    v-for="(goods, i) in item.items"
                    :key="i"
                    class="goods"
                >
                    <td>
                        <img :src="goods.cover_url" />
                        {{ goods.number }}
                    </td>
                    <td>{{ goods.single_price }}</td>
                    <td>{{ goods.number }}</td>
                    <td></td>
                    <td>{{ goods.number * goods.single_price }}</td>
                </tr>
                <tr>
                    <td>
                        {{ item.order_id }}
                        {{ item.user_name }}
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        {{
                            item.items.reduce((accumulator, currentValue) => {
                                return (
                                    accumulator +
                                    currentValue.number *
                                        currentValue.single_price
                                );
                            }, 0)
                        }}
                    </td>
                </tr>
            </template>
        </tbody>
    </DataTable>
</template>

<style scoped lang="scss">
    tbody.order-template {
        td {
            padding: 16px 0;
        }

        td img {
            width: 36px;
            height: 36px;
            border-radius: 20%;
            object-fit: cover;
        }
        .goods td:first-child {
            display: flex;
            align-items: center;
            gap: 10px;
            padding-left: 6px;
        }
        & tr {
            cursor: pointer;
            transition: all 0.3s ease;
        }

        & tr:hover {
            background: $grey;
        }

        tr td .status {
            font-size: 10px;
            padding: 6px 16px;
            color: $light;
            border-radius: 20px;
            font-weight: 700;
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
    }
</style>
