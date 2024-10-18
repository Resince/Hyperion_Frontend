<script setup lang="ts">
    import { Edit } from "@element-plus/icons-vue";
    import { onMounted, ref } from "vue";
    import { useStore } from "@/store/index.ts";
    const radio2 = ref("1");
    const store = useStore();
    const tableData = ref([]);
    const initeData = () => {
        tableData.value = store.getters["ShoppingListMudule/orderList"];
    };
    onMounted(() => {
        initeData();
    });
</script>

<template>
    <div class="Cus-orderDetail">
        <div class="pay-title">结算页</div>
        <div class="pay-msg">
            <div class="pay-msg-title">
                <div>收货人信息</div>
                <div class="button-edit">
                    <el-button
                        type="primary"
                        :icon="Edit"
                        circle
                    />
                </div>
            </div>
            <el-descriptions
                direction="vertical"
                :column="4"
                size="large"
                border
            >
                <el-descriptions-item label="收货人姓名"
                    >{{}}</el-descriptions-item
                >
                <el-descriptions-item label="收货人联系方式"
                    >{{}}</el-descriptions-item
                >
                <el-descriptions-item
                    label="是否有运费险"
                    :span="2"
                    ><el-tag size="small">{{}}</el-tag></el-descriptions-item
                >
                <el-descriptions-item label="是否存放驿站">
                    <el-tag size="small">{{}}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="地址"> {{}} </el-descriptions-item>
            </el-descriptions>
        </div>
        <div>
            <el-table
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column
                    prop="cover_url"
                    label="已购商品"
                    width="180"
                >
                    <template v-slot="{ row }">
                        <img
                            :src="row.cover_url"
                            alt=""
                            style="width: 60px; height: 60px"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="商品名称"
                    width="400"
                ></el-table-column>
                <el-table-column
                    prop="price"
                    label="单价"
                    width="200"
                ></el-table-column>
                <el-table-column
                    prop="quantity"
                    label="数量"
                    width="200"
                ></el-table-column>
                <el-table-column
                    prop="allPrice"
                    label="小计"
                    width="180"
                ></el-table-column>
            </el-table>
        </div>
        <div class="pay-method">
            <h1>支付方式</h1>
            <el-radio-group v-model="radio2">
                <el-radio value="1">微信支付</el-radio>
                <el-radio value="2">支付宝</el-radio>
                <el-radio value="3">货到付款</el-radio>
            </el-radio-group>
        </div>
        <div class="checkout">
            <button class="button">提交订单</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .Cus-orderDetail {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin: 10px 20px;
        .pay-title {
            font-size: 24px;
            font-weight: bold;
            &::after {
                content: "";
                display: block;
                width: 100%;
                height: 1px;
                background-color: #ebeef5;
                margin-top: 10px;
            }
        }
        .pay-msg {
            .pay-msg-title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 10px;
                div {
                    font-size: 20px;
                    font-weight: bold;
                }
                .button-edit {
                    padding-right: 20px;
                }
            }
        }
        .pay-method {
            &::before {
                content: "";
                display: block;
                width: 100%;
                height: 1px;
                background-color: #ebeef5;
                margin-bottom: 10px;
            }
            h1 {
                font-size: 20px;
                font-weight: bold;
            }
        }
        .checkout {
            .button {
                width: 200px;
                height: 40px;
                background-color: #409eff;
                color: #fff;
                border: none;
                border-radius: 7px;
            }
        }
    }
</style>
