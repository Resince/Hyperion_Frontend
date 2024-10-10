<script setup lang="ts">
    import { ref } from "vue";
    import Inslights from "@/components/insights/index.vue";
    import Header from "@/components/header/index.vue";
    import Main from "@/components/main/index.vue";
    import Container from "@/components/container/index.vue";
    import DataTable from "@/components/dataTable/index.vue";
    import Reminder from "@/components/reminder/index.vue";
    import { liColor } from "@/types/enum";

    const data = ref({
        orderHeader: [
            { title: "商品信息" },
            { title: "商品描述" },
            { title: "商品价格" },
            { title: "商品折扣" },
            { title: "库存数量" },
            { title: "状态" },
            { title: "总销量" },
        ],
        orders: [
            {
                id: 1,
                cover_url:
                    "https://img14.360buyimg.com/n0/jfs/t1/237508/31/26791/41336/66fab1cdFad9506ae/370786bacd62a6ec.jpg",
                name: "商品1",
                date: "2021-10-10",
                status: "completed",
                statusMeg: "已完成",
                price: 100,
                discount: 0.8,
                stock: 100,
                total_sales: 100,
            },
            {
                id: 2,
                cover_url:
                    "https://img14.360buyimg.com/n0/jfs/t1/237508/31/26791/41336/66fab1cdFad9506ae/370786bacd62a6ec.jpg",
                name: "商品2",
                date: "2021-10-10",
                status: "process",
                statusMeg: "进行中",
                price: 100,
                discount: 0.8,
                stock: 100,
                total_sales: 100,
            },
            {
                id: 3,
                cover_url:
                    "https://img14.360buyimg.com/n0/jfs/t1/237508/31/26791/41336/66fab1cdFad9506ae/370786bacd62a6ec.jpg",
                name: "商品3",
                date: "2021-10-10",
                status: "pending",
                statusMeg: "待处理",
                price: 100,
                discount: 0.8,
                stock: 100,
                total_sales: 100,
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
        <Header :headerTitle="'总览'" />
        <Inslights :data="data.insights" />
        <Container>
            <DataTable
                :title="'用户管理'"
                :titleIcon="'bx-receipt'"
                :header="data.orderHeader"
                :orders="data.orders"
                :flexBasis="'500px'"
                @handleFilter="handleTableFilter"
                @handleSearch="handleTableSearch"
                @handleClickOrder="handleClickOrder"
            />
            <Reminder
                :title="'用户详情'"
                :titleIcon="'bx-note'"
                :backlog="data.backlog"
                :flexBasis="'300px'"
                @handleFilter="handleReminderFilter"
                @handlePlus="handleReminderPlus"
                @handleMoreOptions="handleMoreOptions"
                @toggleStatus="handleToggleStatus"
            />
        </Container>
    </Main>
</template>

<style lang="scss">
    
</style>
