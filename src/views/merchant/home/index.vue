<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import Inslights from "@/components/insights/index.vue";
    import Header from "@/components/header/index.vue";
    import Main from "@/components/main/index.vue";
    import Container from "@/components/container/index.vue";
    import DataTable from "@/components/dataTable/table.vue";
    import Reminder from "@/components/reminder/index.vue";
    import DataTableColumn from "@/components/dataTable/tableColumn.vue";
    import { liColor } from "@/types/enum";
    import Status from "@/components/dataTable/status.vue";
    import { IGoodsListItem } from "@/types/goods";

    const data = ref<{
        orders: IGoodsListItem[];
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
        orders: [
            {
                id: 1,
                cover_url:
                    "https://img14.360buyimg.com/n0/jfs/t1/237508/31/26791/41336/66fab1cdFad9506ae/370786bacd62a6ec.jpg",
                name: "商品1",
                state: "completed",
                quantity: 100,
                tot_sales: 100,
                desc: "商品1描述",
                discount: 0.8,
                price: 100,
            },
            {
                id: 2,
                cover_url:
                    "https://img14.360buyimg.com/n0/jfs/t1/237508/31/26791/41336/66fab1cdFad9506ae/370786bacd62a6ec.jpg",
                name: "商品2",
                state: "completed",
                quantity: 100,
                tot_sales: 100,
                desc: "商品1描述",
                discount: 0.8,
                price: 100,
            },
            {
                id: 3,
                cover_url:
                    "https://img14.360buyimg.com/n0/jfs/t1/237508/31/26791/41336/66fab1cdFad9506ae/370786bacd62a6ec.jpg",
                name: "商品3",
                state: "completed",
                quantity: 100,
                tot_sales: 100,
                desc: "商品1描述",
                discount: 0.8,
                price: 100,
            },
        ],
        backlog: [
            {
                title: "Start Our Meeting",
                status: false,
            },
            {
                title: "Analyse Our Site",
                status: false,
            },
            {
                title: "Play Footbal",
                status: true,
            },
        ],
        insights: [
            {
                number: "2,390",
                icon: "bx-calendar-check",
                title: "用户",
                color: liColor.PRIMARY,
            },
            {
                number: "1,250",
                icon: "bx-show-alt",
                title: "商品",
                color: liColor.WARNING,
            },
            {
                number: "1,250",
                icon: "bx-line-chart",
                title: "订单",
                color: liColor.SUCCESS,
            },
            {
                number: "1,250",
                icon: "bx-dollar-circle",
                title: "销售额",
                color: liColor.DANGWR,
            },
        ],
    });
    const init = () => {
        
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
                :orders="data.orders"
                :flexBasis="'500px'"
                :tbodyMaxHeight="'500px'"
                @handleFilter="handleTableFilter"
                @handleSearch="handleTableSearch"
                @handleClickOrder="handleClickOrder"
            >
                <DataTableColumn
                    title="商品信息"
                    label="name"
                    width="100px"
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
                                :src="row.cover_url"
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
                    width="100px"
                    label="quantity"
                ></DataTableColumn>
                <DataTableColumn
                    title="状态"
                    width="100px"
                    label="state"
                >
                    <template #default="{ row }">
                        <Status :row="row"></Status>
                    </template>
                </DataTableColumn>
                <DataTableColumn
                    title="总销量"
                    width="100px"
                    label="tot_sales"
                ></DataTableColumn>
            </DataTable>
            <Reminder
                :title="'待办事项'"
                :titleIcon="'bx-note'"
                :backlog="data.backlog"
                :flexBasis="'300px'"
                :tbodyMaxHeight="'400px'"
                @handleFilter="handleReminderFilter"
                @handlePlus="handleReminderPlus"
                @handleMoreOptions="handleMoreOptions"
                @toggleStatus="handleToggleStatus"
            />
        </Container>
    </Main>
</template>

<style lang="scss"></style>
