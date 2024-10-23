<script lang="ts" setup>
    import { useStore } from "@/store";
    import { IAddressListItem } from "@/types/address";
    import { computed, ref } from "vue";
    import {
        Iphone,
        Location,
        OfficeBuilding,
        User,
    } from "@element-plus/icons-vue";
    import AddressDialog from "./addressDialog.vue";
    const store = useStore();
    const props = defineProps<{
        showAddress: boolean;
    }>();
    const addressList = computed(() => {
        console.log(store.getters["addressStoreModule/gAddressList"]);

        return store.getters["addressStoreModule/gAddressList"];
    });
    const visible = ref(false);
    const itemAddress = ref<IAddressListItem>();
    const handleChangeAddress = (item: IAddressListItem) => {
        itemAddress.value = item;
        visible.value = true;
    };
    const handleSetDefault = (id: number) => {
        store.dispatch("addressStoreModule/resSetDefaultAction", id);
    };
    const handleDeleteAddress = (item: IAddressListItem) => {
        store.dispatch("addressStoreModule/resDeleteAddressAction", item.id);
    };
</script>

<template>
    <div
        class="addressList"
        :class="{ listWrapper: props.showAddress }"
        :style="{
            maxHeight: showAddress ? '500px' : '0px',
            overflow: showAddress ? 'visible' : 'hidden',
        }"
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
                <el-popconfirm
                    title="Are you sure to delete this?"
                    @confirm="handleDeleteAddress(item)"
                >
                    <template #reference>
                        <el-button type="primary">删除</el-button>
                    </template>
                </el-popconfirm>
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
