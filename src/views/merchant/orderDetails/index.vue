<script setup lang="ts">
    defineProps<{
        id: number;
    }>();
    import { onMounted, ref } from "vue";
    import Header from "@/components/header/index.vue";
    import Main from "@/components/main/index.vue";
    import DataTable from "@/components/dataTable/table.vue";
    import DataTableColumn from "@/components/dataTable/tableColumn.vue";
    import Card from "@/components/card/index.vue";
    const activeStep = ref(1);
    const data = ref({
        order: [
            {
                id: 1,
                name: "商品1",
                price: 100,
                count: 1,
                status: 1,
            },
            {
                id: 2,
                name: "商品2",
                price: 200,
                count: 2,
                status: 2,
            },
            {
                id: 3,
                name: "商品3",
                price: 300,
                count: 3,
                status: 3,
            },
            {
                id: 4,
                name: "商品4",
                price: 400,
                count: 4,
                status: 4,
            },
        ],
    });
    const init = async () => {
        console.log("init");
    };
    onMounted(() => {
        init();
    });
</script>

<template>
    <Main>
        <Header headerTitle="订单详情" />
        <Card>
            <div class="baseMsg">
                <p>订单号:{{}}</p>
                <p>下单时间:{{}}</p>
            </div>
        </Card>
        <Card>
            <div class="steps-container">
                <el-steps
                    style="max-width: 600px"
                    :space="200"
                    :active="activeStep"
                    finish-status="success"
                    align-center
                >
                    <el-step title="下单" />
                    <el-step title="已支付" />
                    <el-step title="已发货" />
                    <el-step title="已签收" />
                    <el-step title="评价" />
                </el-steps>
            </div>
        </Card>
        <Card>
            <DataTable
                title="商品信息"
                titleIcon="bx bx-cart"
                :orders="data.order"
            >
                <DataTableColumn
                    title="商品名称"
                    label="name"
                    width="200px"
                />
                <DataTableColumn
                    title="单价"
                    label="price"
                    width="100px"
                />
                <DataTableColumn
                    title="数量"
                    label="count"
                    width="100px"
                />
                <DataTableColumn
                    title="状态"
                    label="status"
                    width="100px"
                >
                </DataTableColumn>
            </DataTable>
        </Card>
        <Card>
            <template #header>
                <h3>配送信息</h3>
            </template>
            <div class="baseMsg">
                <p>收货人:{{}}</p>
                <p>联系电话:{{}}</p>
                <p>收货地址:{{}}</p>
            </div>
        </Card>
    </Main>
</template>

<style scoped lang="scss">
    .baseMsg {
        font-size: 16px;
    }
    .steps-container {
        margin: 20px;
        width: 100%;
        margin: 20px auto;
        padding-left: 260px;
    }
</style>
