<script lang="ts" setup>
    const visible = defineModel("visible");
    import { onMounted, ref, watch } from "vue";
    import { useStore } from "@/store";
    import { ElMessage } from "element-plus";
    const store = useStore();
    const props = defineProps<{
        title?: string;
        id?: number;
        inputAddress?: string;
        inputName?: string;
        inputPhone?: string;
    }>();
    const selectValuePro = ref<number>();
    const selectValueCity = ref<number>();
    const selectValueDis = ref<number>();
    const optionsPro = ref();
    const optionsCity = ref();
    const optionsDis = ref();
    // 地址信息更新处理
    const init = async () => {
        // 初始化省份数据
        optionsPro.value = await store
            .dispatch("addressStoreModule/reqAreaListAction", 0)
            .then((res) => {
                return res.map((item: any) => {
                    return {
                        value: item.id,
                        label: item.name,
                    };
                });
            });
    };
    watch(selectValuePro, async () => {
        optionsCity.value = await store
            .dispatch(
                "addressStoreModule/reqAreaListAction",
                selectValuePro.value
            )
            .then((res) => {
                return res.map((item: any) => {
                    return {
                        value: item.id,
                        label: item.name,
                    };
                });
            });
    });
    watch(selectValueCity, async (val) => {
        optionsDis.value = await store
            .dispatch("addressStoreModule/reqAreaListAction", val)
            .then((res) => {
                return res.map((item: any) => {
                    return {
                        value: item.id,
                        label: item.name,
                    };
                });
            });
    });
    // 其他地址信息
    const inputAddress = ref("");
    const inputName = ref("");
    const inputPhone = ref("");
    // 处理函数
    const handleAddAddressInfo = async () => {
        if (
            !selectValuePro.value ||
            !selectValueCity.value ||
            !selectValueDis.value ||
            !inputAddress.value ||
            !inputName.value ||
            !inputPhone.value
        ) {
            ElMessage({
                message: "请填写完整信息",
                type: "warning",
            });
            return;
        }
        if (!props.id)
            await store.dispatch("addressStoreModule/resAddAddressAction", {
                provId: selectValuePro.value,
                cityId: selectValueCity.value,
                distId: selectValueDis.value,
                detail: inputAddress.value,
                consignee: inputName.value,
                contact: inputPhone.value,
                userId: store.getters.gId,
            });
        else
            await store.dispatch("addressStoreModule/resUpdateAddressAction", {
                id: props.id,
                props: {
                    provId: selectValuePro.value,
                    cityId: selectValueCity.value,
                    distId: selectValueDis.value,
                    detail: inputAddress.value,
                    consignee: inputName.value,
                    contact: inputPhone.value,
                    userId: store.getters.gId,
                },
            });
        visible.value = false;
        selectValueCity.value = undefined;
        selectValueDis.value = undefined;
        inputAddress.value = "";
        inputName.value = "";
        inputPhone.value = "";
    };
    onMounted(() => {
        init();
    });
    watch(
        props,
        () => {
            if (props.inputAddress) inputAddress.value = props.inputAddress;
            if (props.inputName) inputName.value = props.inputName;
            if (props.inputPhone) inputPhone.value = props.inputPhone;
        },
        { deep: true }
    );
</script>

<template>
    <el-dialog
        v-model="visible"
        :title="props.title ? props.title : '添加地址'"
        width="800"
    >
        <div class="dialog-select">
            <el-select
                v-model="selectValuePro"
                placeholder="选择你的省份"
                size="large"
                style="width: 240px"
            >
                <el-option
                    v-for="item in optionsPro"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select>
            <el-select
                v-model="selectValueCity"
                placeholder="选择你的城市"
                size="large"
                style="width: 240px"
            >
                <el-option
                    v-for="item in optionsCity"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select>
            <el-select
                v-model="selectValueDis"
                placeholder="选择你的区县"
                size="large"
                style="width: 240px"
            >
                <el-option
                    v-for="item in optionsDis"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select>
            <el-input
                v-model="inputAddress"
                style="width: 240px"
                placeholder="详细地址"
            />
            <el-input
                v-model="inputName"
                style="width: 240px"
                placeholder="收件人姓名"
            />
            <el-input
                v-model="inputPhone"
                style="width: 240px"
                placeholder="收件人电话号码"
            />
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="visible = false">取消</el-button>
                <el-button
                    type="primary"
                    @click="handleAddAddressInfo()"
                >
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<style lang="scss" scoped>
    .dialog-select {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        width: 100%;
        gap: 20px;
    }
</style>
