<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import { useStore } from "@/store/index.ts";
    import { IOrderDetail } from "@/types/order";
    const props = defineProps<{ id: string }>();
    const store = useStore();
    const data = ref<IOrderDetail>({
        payment: 83,
        state: "adipisicing ex dolor velit",
        createTime: "2024-12-20 02:27:38",
        completeTime: "2024-08-24 05:12:39",
        coverUrl: "https://petty-final.name/",
        consumer: {
            id: 93,
            consignee: "nulla in",
            contact: "velit et qui mollit irure",
            address: "辽宁省安徽市称多县",
        },
        merchant: {
            id: 76,
            name: "流定积",
        },
        id: "1",
        IOrderDetailItems: [
            {
                discount: 0.2,
                merId: 1111,
                goodsId: 522,
                coverUrl: "https://img.yzcdn.cn/vant/ipad.jpeg",
                price: 500.01,
                quantity: 2,
            },
            {
                discount: 0.2,
                merId: 1111,
                goodsId: 522,
                coverUrl: "https://img.yzcdn.cn/vant/ipad.jpeg",
                price: 500.01,
                quantity: 2,
            },
            {
                discount: 0.2,
                merId: 1111,
                goodsId: 522,
                coverUrl: "https://img.yzcdn.cn/vant/ipad.jpeg",
                price: 500.01,
                quantity: 2,
            },
        ],
    });
    const initeData = async () => {
        data.value = await store.dispatch(
            "orderStoreMudule/getOrderDetailAction",
            {
                id: props.id,
            }
        );
        data.value.IOrderDetailItems.map(async (item) => {
            await store
                .dispatch("goodsStoreModule/getGoodsDetailAction", {
                    id: item.goodsId,
                    role: "CONSUMER",
                })
                .then((res) => {
                    item.name = res.name;
                });
        });
    };
    onMounted(() => {
        initeData();
    });
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
                    {{ data.IOrderDetailItems.length }}
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
                :data="data.IOrderDetailItems"
                style="width: 100%"
            >
                <el-table-column
                    prop="cover_url"
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
                    prop="discount"
                    label="折扣"
                    width="180"
                ></el-table-column>
            </el-table>
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
    }
</style>
