<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import { useStore } from "@/store/index.ts";
    import { IAddressListItem } from "@/types/address";
    import { useRouter } from "vue-router";
    const router = useRouter();
    const store = useStore();
    // 初始化地址信息
    const addressList = ref<IAddressListItem[]>([]);
    const addressSelected = ref<IAddressListItem>({} as IAddressListItem);
    const initAddress = async () => {
        addressList.value = await store.dispatch(
            "addressStoreModule/reqAddressListAction"
        );
        // 默认地址
        addressList.value.map((item) => {
            if (item.isDefault === 1) addressSelected.value = item;
        });
        // 没有默认地址，选择第一个地址
        if (!addressSelected.value.id) {
            addressSelected.value = addressList.value[0];
        }
    };
    // 地址选择后的处理
    const handleSelectAddress = (item: IAddressListItem) => {
        addressSelected.value = item;
        visible.value = false;
    };
    // 初始化商品信息
    const radio = ref("1");
    const tableData = ref<{ id: number; [property: string]: any }>([] as any);
    const initeData = async () => {
        tableData.value = store.getters["ShoppingListModule/list"];
        initAddress();
    };
    // 地址选择显示
    const visible = ref(false);
    const handleChangeAddress = () => {
        visible.value = true;
    };
    // 提交订单
    const buttonMsg = ref("提交订单");
    const dialogPayVisible = ref(false);
    const handleSubmit = async () => {
        if (!addressSelected.value || !tableData.value) {
            return;
        }
        const res = await store.dispatch("orderStoreModule/createOrderAction", {
            addrId: addressSelected.value.id,
            goodsIdList: tableData.value.map((item: any) => item.id),
        });
        console.log(res);
        dialogPayVisible.value = true;
        buttonMsg.value = "支付订单";
    };
    onMounted(() => {
        initeData();
    });
    const handlePayOrder = async () => {
        dialogPayVisible.value = false;
        await store.dispatch("orderStoreModule/orderPayAction", {
            orderId: tableData.value.id,
        });
        router.push({ name: "ConsumerHome", params: { category: "new" } });
    };
</script>

<template>
    <div class="Cus-orderDetail">
        <div class="pay-title">结算页</div>
        <div class="addressList">
            <el-descriptions
                title="收货地址"
                style="padding-bottom: 20px"
                :column="3"
                size="default"
                border
            >
                <template #extra>
                    <el-button
                        type="primary"
                        @click="handleChangeAddress()"
                        >选择其他地址</el-button
                    >
                </template>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <user />
                            </el-icon>
                            收件人
                        </div>
                    </template>
                    {{ addressSelected.consignee }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <iphone />
                            </el-icon>
                            收件人电话
                        </div>
                    </template>
                    {{ addressSelected.contact }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <location />
                            </el-icon>
                            省市区
                        </div>
                    </template>
                    {{ addressSelected.district }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <office-building />
                            </el-icon>
                            详细地址
                        </div>
                    </template>
                    {{ addressSelected.detail }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div>
            <el-table
                :data="tableData"
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
            <el-radio-group v-model="radio">
                <el-radio value="1">微信支付</el-radio>
                <el-radio value="2">支付宝</el-radio>
                <el-radio value="3">货到付款</el-radio>
            </el-radio-group>
        </div>
        <div class="checkout">
            <button
                class="button"
                @click="handleSubmit"
            >
                {{ buttonMsg }}
            </button>
        </div>
    </div>
    <el-dialog
        v-model="visible"
        title="选择地址"
        width="900"
    >
        <el-descriptions
            :title="
                '收货地址' + index + (item.isDefault === 1 ? '(默认地址)' : '')
            "
            style="padding-bottom: 20px"
            :column="3"
            size="default"
            border
            v-for="(item, index) in addressList"
        >
            <template #extra>
                <el-button
                    type="primary"
                    @click="handleSelectAddress(item)"
                    >选择该地址</el-button
                >
            </template>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon>
                            <user />
                        </el-icon>
                        收件人
                    </div>
                </template>
                {{ item.consignee }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon>
                            <iphone />
                        </el-icon>
                        收件人电话
                    </div>
                </template>
                {{ item.contact }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon>
                            <location />
                        </el-icon>
                        省市区
                    </div>
                </template>
                {{ item.district }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon>
                            <office-building />
                        </el-icon>
                        详细地址
                    </div>
                </template>
                {{ item.detail }}
            </el-descriptions-item>
        </el-descriptions>
    </el-dialog>
    <el-dialog
        v-model="dialogPayVisible"
        title="编辑信息"
        width="500"
    >
        <div>这是支付码</div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogPayVisible = false"
                    >取消支付</el-button
                >
                <el-button
                    type="primary"
                    @click="handlePayOrder"
                >
                    支付完成
                </el-button>
            </div>
        </template>
    </el-dialog>
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
        .addressList {
            &::after {
                content: "";
                display: block;
                width: 100%;
                height: 1px;
                background-color: #ebeef5;
                margin-bottom: 10px;
            }
            &.listWrapper {
                padding: 20px 10px;
                border-top: 3px solid $cus_line-grey;
                border-bottom: 3px solid $cus_line-grey;
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
