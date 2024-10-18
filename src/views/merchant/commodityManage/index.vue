<script setup lang="ts">
    import DataTable from "@/components/dataTable/table.vue";
    import DataTableColumn from "@/components/dataTable/tableColumn.vue";
    import Main from "@/components/main/index.vue";
    import Container from "@/components/container/index.vue";
    import Status from "@/components/dataTable/status.vue";
    import Header from "@/components/header/index.vue";

    const handleFilter = () => {
        console.log("filter");
    };
    const handleSearch = () => {
        console.log("search");
    };
    const handleClickOrder = (i: any) => {
        console.log("click order", i);
    };
    type dataType = {
        orders: {
            id: number;
            cover_url: string;
            name: string;
            date: string;
            status: string;
            statusMeg: string;
            price: number;
            stock: number;
            total_sales: number;
        }[];
    };
    const data: dataType = {
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
                stock: 100,
                total_sales: 100,
            },
        ],
    };
</script>

<template>
    <Main>
        <Header headerTitle="商品管理"></Header>
        <Container>
            <DataTable
                title="商品列表"
                :titleIcon="'bx-receipt'"
                :orders="data.orders"
                :flexBasis="'100%'"
                :tbodyMaxHeight="'400px'"
                @handleFilter="handleFilter"
                @handleSearch="handleSearch"
                @handleClickOrder="handleClickOrder"
            >
                <DataTableColumn
                    title="商品信息"
                    width="200px"
                    label="name"
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
                    title="商品描述"
                    width="20%"
                    label="date"
                ></DataTableColumn>
                <DataTableColumn
                    title="商品价格"
                    width="15%"
                    label="price"
                ></DataTableColumn>
                <DataTableColumn
                    title="库存数量"
                    width="15%"
                    label="stock"
                ></DataTableColumn>
                <DataTableColumn
                    title="状态"
                    width="15%"
                    label="statusMeg"
                >
                    <template #default="{ row }">
                        <Status :row="row"></Status>
                    </template>
                </DataTableColumn>
                <DataTableColumn
                    title="总销量"
                    width="15%"
                    label="total_sales"
                ></DataTableColumn>
            </DataTable>
        </Container>
    </Main>
</template>

<style scoped lang="scss"></style>
