<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import Inslights from "@/components/insights/index.vue";
    import Header from "@/components/header/index.vue";
    import Main from "@/components/main/index.vue";
    import Container from "@/components/container/index.vue";
    import DataTable from "@/components/dataTable/table.vue";
    import Reminder from "@/components/reminder/index.vue";
    import DataTableColumn from "@/components/dataTable/tableColumn.vue";
    import { liColor, OrderState } from "@/types/enum";
    import Status from "@/components/dataTable/status.vue";
    import { IGoodsList } from "@/types/goods";
    import store from "@/store";
    import {
        IMerchantOrderList,
        IMerchantOrderListItem,
        IMerchantOrderListItemItem,
    } from "@/types/order";

    const data = ref<{
        goods: IGoodsList;
        backlog: {
            title: string;
            status: boolean;
        }[];
        insights: {
            number: string;
            icon: string;
            title: string;
            color: liColor;
        }[];
    }>({
        goods: {} as IGoodsList,
        backlog: [],
        insights: [
            {
                number: "0.0",
                icon: "bx-calendar-check",
                title: "评分",
                color: liColor.PRIMARY,
            },
            {
                number: "0",
                icon: "bx-show-alt",
                title: "商品",
                color: liColor.WARNING,
            },
            {
                number: "0",
                icon: "bx-line-chart",
                title: "订单",
                color: liColor.SUCCESS,
            },
            {
                number: "0",
                icon: "bx-dollar-circle",
                title: "销售额",
                color: liColor.DANGWR,
            },
        ],
    });
    const init = async () => {
        data.value.goods = await store.dispatch(
            "goodsStoreModule/getGoodsMerchantListAction",
            {
                pagesize: 10,
                pagenum: 1,
            }
        );
        const ordersConfirmed = await store.dispatch(
            "orderStoreModule/getOrderListByMerchantAction",
            {
                pageSize: 1,
                pageNum: 1,
                state: OrderState.CONFIRMED.toString(),
            }
        );
        const ordersComplete: IMerchantOrderList = await store.dispatch(
            "orderStoreModule/getOrderListByMerchantAction",
            {
                pageSize: 1,
                pageNum: 1,
                state: OrderState.COMPLETE.toString(),
            }
        );
        const allMoney = ordersComplete.items.reduce(
            (prev, cur) =>
                prev +
                cur.items.reduce((p, c) => p + c.number * c.singlePrice, 0),
            0
        );
        data.value.insights = [
            {
                number: "9.0",
                icon: "bx-calendar-check",
                title: "评分",
                color: liColor.PRIMARY,
            },
            {
                number: data.value.goods.total.toString() || "0",
                icon: "bx-show-alt",
                title: "商品",
                color: liColor.WARNING,
            },
            {
                number: ordersConfirmed.total.toString() || "0",
                icon: "bx-line-chart",
                title: "订单",
                color: liColor.SUCCESS,
            },
            {
                number: allMoney.toString() || "0",
                icon: "bx-dollar-circle",
                title: "销售额",
                color: liColor.DANGWR,
            },
        ];
        ordersConfirmed.items.map((item: IMerchantOrderListItem) => {
            item.items.map((i: IMerchantOrderListItemItem) => {
                data.value.backlog.push({
                    title: `订单号${item.orderId} 商品:${i.name}(${i.number}) 未发货`,
                    status:
                        item.state === OrderState.CONFIRMED.toLocaleLowerCase(),
                });
            });
        });
    };
    onMounted(() => {
        init();
    });
    const handleTableFilter = () => {
        console.log("filter");
    };
    const handleTableSearch = () => {
        console.log("search");
    };
    const handleClickOrder = (i: number) => {
        console.log("click order", i);
    };
    const handleReminderFilter = () => {
        console.log("filter");
    };
    const handleReminderPlus = () => {
        console.log("plus");
    };
    const handleMoreOptions = (i: number) => {
        console.log("more options", i);
    };
    const handleToggleStatus = (i: number) => {
        console.log("toggle status", i);
    };
</script>

<template>
    <Main>
        <Header headerTitle="总览" />
        <Inslights :data="data.insights" />
        <Container>
            <DataTable
                :title="'商品管理'"
                :titleIcon="'bx-receipt'"
                :orders="data.goods.items"
                :flexBasis="'500px'"
                :tbodyMaxHeight="'500px'"
                @handleFilter="handleTableFilter"
                @handleSearch="handleTableSearch"
                @handleClickOrder="handleClickOrder"
            >
                <DataTableColumn
                    title="商品信息"
                    label="name"
                    width="90px"
                >
                    <template #default="{ row }">
                        <div
                            style="
                                display: flex;
                                align-items: center;
                                gap: 12px;
                                padding-left: 6px;
                            "
                        >
                            <img
                                :src="row.coverUrl"
                                alt=""
                                style="
                                    width: 36px;
                                    height: 36px;
                                    border-radius: 20%;
                                    object-fit: cover;
                                "
                            />
                            <span>{{ row.name }}</span>
                        </div>
                    </template>
                </DataTableColumn>
                <DataTableColumn
                    title="库存数量"
                    width="90px"
                    label="quantity"
                ></DataTableColumn>
                <DataTableColumn
                    title="价格"
                    width="90px"
                    label="price"
                ></DataTableColumn>
                <DataTableColumn
                    title="状态"
                    width="100px"
                    label="sale"
                >
                    <template #default="{ row }">
                        <Status :row="row"></Status>
                    </template>
                </DataTableColumn>
                <DataTableColumn
                    title="总销量"
                    width="90px"
                    label="totSales"
                ></DataTableColumn>
            </DataTable>
            <Reminder
                :title="'待办事项'"
                :titleIcon="'bx-note'"
                :backlog="data.backlog"
                :flexBasis="'300px'"
                :tbodyMaxHeight="'400px'"
                @handleFilterAdd="handleReminderFilter"
                @handlePlus="handleReminderPlus"
                @handleMoreOptions="handleMoreOptions"
                @toggleStatus="handleToggleStatus"
            />
        </Container>
    </Main>
</template>

<style lang="scss"></style>
