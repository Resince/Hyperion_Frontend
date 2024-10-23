<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import { useStore } from "@/store/index.ts";
    import { IOrderDetail } from "@/types/order";
    import { OrderState } from "@/types/enum";
    const props = defineProps<{
        id: string;
    }>();
    const store = useStore();
    // 赋初值，防止报错
    const data = ref<IOrderDetail>({
        id: "",
        createTime: "",
        completeTime: "",
        state: "",
        payment: 0,
        goodsList: [
            {
                coverUrl: "",
                quantity: 0,
                price: 0,
                discount: 0,
                merId: 0,
                goodsId: 0,
                name: "",
            },
        ],
        consumer: {
            consignee: "",
            contact: "",
            address: "",
            id: 0,
        },
        merchant: {
            name: "",
            id: 0,
        },
        coverUrl: "",
    });
    const initeData = async () => {
        data.value = await store.dispatch(
            "orderStoreModule/getOrderDetailAction",
            {
                id: props.id,
            }
        );
    };
    onMounted(() => {
        initeData();
    });
    // 处理订单操作
    const handleAction = async (id: number, score?: number) => {
        if (data.value.state === OrderState.PLACED.toString()) {
            // 未支付去支付
            await store.dispatch("orderStoreModule/orderPayAction", {
                orderId: data.value.id,
            });
            data.value.state = OrderState.CONFIRMED.toString();
        } else if (data.value.state === OrderState.SHIPPED.toString()) {
            // 确认收货
            await store.dispatch("orderStoreModule/orderReceiveAction", {
                orderId: data.value.id,
            });
            data.value.state = OrderState.COMPLETE.toString();
        } else if (data.value.state === OrderState.COMPLETE.toString()) {
            await store.dispatch("orderStoreModule/reviewAction", {
                orderId: data.value.id,
                goodsId: id,
                review: score,
            });
        }
    };
</script>
<template>
    <div class="Cus-orderDetail">
        <div class="Cus-orderDetail-title">订单页</div>
        <div class="Cus-orderDetail-msg">
            <el-descriptions
                class="margin-top"
                title="订单信息"
                :column="3"
                size="large"
                border
            >
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <user />
                            </el-icon>
                            订单号
                        </div>
                    </template>
                    {{ data.id }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <iphone />
                            </el-icon>
                            下单时间
                        </div>
                    </template>
                    {{ data.createTime }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <location />
                            </el-icon>
                            完成时间
                        </div>
                    </template>
                    {{ data.completeTime }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <tickets />
                            </el-icon>
                            订单状态
                        </div>
                    </template>
                    <el-tag size="small">{{ data.state }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <office-building />
                            </el-icon>
                            商品数量
                        </div>
                    </template>
                    {{ data.goodsList.length }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <office-building />
                            </el-icon>
                            实付款
                        </div>
                    </template>
                    {{ data.payment }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="Cus-orderDetail-msg">
            <el-descriptions
                class="margin-top"
                title="收货人信息"
                :column="2"
                size="large"
                border
            >
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <user />
                            </el-icon>
                            买家姓名
                        </div>
                    </template>
                    {{ data.consumer.consignee }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <iphone />
                            </el-icon>
                            买家联系方式
                        </div>
                    </template>
                    {{ data.consumer.contact }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <location />
                            </el-icon>
                            买家地址
                        </div>
                    </template>
                    {{ data.consumer.address }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="Cus-orderDetail-msg">
            <el-descriptions
                class="margin-top"
                title="商家信息"
                :column="2"
                size="large"
                border
            >
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <user />
                            </el-icon>
                            商家姓名
                        </div>
                    </template>
                    {{ data.merchant.name }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <iphone />
                            </el-icon>
                            商家联系方式
                        </div>
                    </template>
                    1561351517
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div>
            <el-table
                :data="data.goodsList"
                style="width: 100%"
            >
                <el-table-column
                    prop="coverUrl"
                    label="已购商品"
                    width="180"
                >
                    <template v-slot="{ row }">
                        <img
                            :src="row.coverUrl"
                            alt=""
                            style="width: 60px; height: 60px"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="商品名称"
                    width="200"
                ></el-table-column>
                <el-table-column
                    prop="quantity"
                    label="数量"
                    width="200"
                ></el-table-column>
                <el-table-column
                    prop="discount"
                    label="折扣"
                    width="180"
                ></el-table-column>
                <el-table-column
                    prop="price"
                    label="需付款"
                    width="200"
                ></el-table-column>
                <el-table-column
                    label="Operations"
                    v-if="data.state === 'COMPLETE'"
                >
                    <template #default="scope">
                        <el-button
                            size="small"
                            @click="handleAction(scope.row.goodsId, 1)"
                        >
                            好评
                        </el-button>
                        <el-button
                            size="small"
                            type="danger"
                            @click="handleAction(scope.row.goodsId, -1)"
                        >
                            差评
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <el-button
                v-if="data.state === 'PLACED'"
                size="large"
                class="checkout"
                @click="handleAction"
            >
                支付
            </el-button>
            <el-button
                v-if="data.state === 'CONFIRMED'"
                class="checkout"
                size="large"
                @click="handleAction"
            >
                等待商家发货
            </el-button>
            <el-button
                v-if="data.state === 'SHIPPED'"
                class="checkout"
                size="large"
                @click="handleAction"
            >
                确认收货
            </el-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .Cus-orderDetail {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin: 10px 20px;
        &-title {
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
        .el-button {
            width: 200px;
            margin: auto;
        }
    }
</style>
