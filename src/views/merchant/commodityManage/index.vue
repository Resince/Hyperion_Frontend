<script setup lang="ts">
    import DataTable from "@/components/dataTable/index.vue";
    import Main from "@/components/main/index.vue";
    import Container from "@/components/container/index.vue";
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
    };
    const data: dataType = {
        header: [
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
    };
</script>

<template>
    <Main>
        <Container>
            <DataTable
                :title="'商品管理'"
                :titleIcon="'bx-receipt'"
                :header="data.header"
                :orders="data.orders"
                :flexBasis="'100%'"
                @handleFilter="handleFilter"
                @handleSearch="handleSearch"
                @handleClickOrder="handleClickOrder"
            ></DataTable>
        </Container>
    </Main>
</template>

<style scoped lang="scss"></style>
