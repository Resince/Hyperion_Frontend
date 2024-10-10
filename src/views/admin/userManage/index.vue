<script setup lang="ts">
    import Main from "@/components/main/index.vue";
    import Container from "@/components/container/index.vue";
    import DataTable from "@/components/dataTable/index.vue";
    import Header from "@/components/header/index.vue";
    import Reminder from "@/components/reminder/index.vue";

    type dataType = {
        orderHeader: { title: string }[];
        orders: {
            id: number;
            cover_url: string;
            name: string;
            date: string;
            status: string;
            statusMeg: string;
            price: number;
            discount: number;
            stock: number;
            total_sales: number;
        }[];
        backlog?: {
            title: string;
            status: boolean;
        }[];
    };
    const data: dataType = {
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
                cover_url: "https://via.placeholder.com/150",
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
                cover_url: "https://via.placeholder.com/150",
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
                cover_url: "https://via.placeholder.com/150",
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
            { title: "任务1", status: false },
            { title: "任务2", status: true },
            { title: "任务3", status: false },
        ],
    };
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
        <Header :headerTitle="'用户管理'" />
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

<style scoped lang="scss"></style>
