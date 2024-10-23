<script lang="ts" setup>
    import { useStore } from "@/store";
    import { IAddressListItem } from "@/types/address";
    import { onMounted, ref } from "vue";
    import {
        Iphone,
        Location,
        OfficeBuilding,
        User,
    } from "@element-plus/icons-vue";
    import AddressDialog from "./addressDialog.vue";
    const store = useStore();
    defineProps<{
        showAddress: boolean;
    }>();
    const addressList = ref<IAddressListItem[]>([]);
    const init = async () => {
        await store.dispatch("addressStoreMudule/reqAddressListAction");
    };
    onMounted(() => {
        init();
        addressList.value = [
            {
                id: 1,
                consignee: "张三",
                contact: "123456789",
                district: "北京市海淀区",
                detail: "北京市海淀区",
                is_default: 1,
            },
            {
                id: 2,
                consignee: "李四",
                contact: "123456789",
                district: "北京市海淀区",
                detail: "北京市海淀区",
                is_default: 0,
            },
        ];
    });
    const visible = ref(false);
    const itemAddress = ref<IAddressListItem>();
    const handleChangeAddress = (item: IAddressListItem) => {
        itemAddress.value = item;
        visible.value = true;
    };
    const handleSetDefault = (id: number) => {
        addressList.value = addressList.value.map((item) => {
            if (item.id === id) {
                item.is_default = 1;
            } else {
                item.is_default = 0;
            }
            return item;
        });
        store.dispatch("addressStoreMudule/resSetDefaultAction", id);
    };
</script>

<template>
    <div
        class="addressList"
        :class="{ listWrapper: showAddress }"
        :style="{
            maxHeight: showAddress ? '500px' : '0px',
            overflow: showAddress ? 'visible' : 'hidden',
        }"
    >
        <el-descriptions
            :title="
                '收货地址' + index + (item.is_default === 1 ? '(默认地址)' : '')
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
                    @click="handleChangeAddress(item)"
                    >修改</el-button
                >
                <el-button
                    type="primary"
                    @click="handleSetDefault(item.id)"
                    >设为默认</el-button
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
    </div>
    <AddressDialog
        v-model:visible="visible"
        :id="itemAddress?.id"
        title="修改地址"
        :input-address="itemAddress?.detail"
        :input-name="itemAddress?.consignee"
        :input-phone="itemAddress?.contact"
    />
</template>

<style lang="scss" scoped>
    .addressList {
        &.listWrapper {
            padding: 20px 10px;
            border-top: 3px solid $cus_line-grey;
            border-bottom: 3px solid $cus_line-grey;
            overflow: hidden;
            transition: maxHeight all 0.5s;
        }
    }
    .dialog-select {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        width: 100%;
        gap: 20px;
    }
</style>
