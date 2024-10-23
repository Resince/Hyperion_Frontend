<template>
    <el-dialog
        v-model="addVisible"
        title="添加商品"
        width="800"
    >
        <div class="dialog-select">
            <el-input
                v-model="addDataItem.name"
                style="width: 240px"
                placeholder="商品名称"
            />
            <el-input
                v-model="addDataItem.desc"
                style="width: 240px"
                placeholder="商品描述"
            />
            <el-select
                v-model="addDataItem.category"
                placeholder="商品分类"
                style="width: 240px"
            >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select>
            <el-input
                v-model="addDataItem.price"
                style="width: 240px"
                placeholder="商品价格"
            />
            <el-input
                v-model="addDataItem.discount"
                style="width: 240px"
                placeholder="商品折扣"
            />
            <el-input
                v-model="addDataItem.quantity"
                style="width: 240px"
                placeholder="商品数量"
            />
            <el-upload
                class="upload-demo"
                action="''"
                ref="upload"
                :limit="1"
                :on-exceed="handleExceed"
                :http-request="handleFileUpload"
                :show-file-list="false"
            >
                <el-button type="primary">上传商品封面</el-button>
            </el-upload>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="handleExit">取消</el-button>
                <el-button
                    type="primary"
                    @click="handleAddGood()"
                >
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
    import { useStore } from "@/store";
    import { IAddGoods } from "@/types/goods";
    import {
        UploadInstance,
        ElMessage,
        UploadProps,
        UploadRawFile,
        genFileId,
    } from "element-plus";
    import { ref } from "vue";
    import { options } from "@/types/dict";
    import { watch } from "vue";
    const store = useStore();

    const addVisible = defineModel("addVisible");
    const handleExit = () => {
        addVisible.value = false;
    };
    // 添加商品
    const addDataItem = ref<IAddGoods>({} as IAddGoods);
    // 上传图片
    const upload = ref<UploadInstance>();
    const handleFileUpload = async (file: any) => {
        // 上传文件
        const formData = new FormData();
        formData.append("file", file.file);
        const url = await store.dispatch(
            "goodsStoreModule/uploadGoodsImgAction",
            formData
        );
        // 上传成功提醒
        ElMessage({
            message: "上传成功",
            type: "success",
        });
        addDataItem.value.coverUrl = url;
    };
    const handleExceed: UploadProps["onExceed"] = (files) => {
        upload.value!.clearFiles();
        const file = files[0] as UploadRawFile;
        file.uid = genFileId();
        upload.value!.handleStart(file);
    };
    const handleAddGood = async () => {
        // 如果其中的项为空就返回
        if (!addDataItem.value.coverUrl) return;
        await store.dispatch(
            "goodsStoreModule/addGoodsAction",
            addDataItem.value
        );
        await store.dispatch("goodsStoreModule/getGoodsMerchantListAction", {
            pagenum: 1,
            pagesize: 10,
        });
        addVisible.value = false;
    };
    watch(addVisible, (v) => {
        if (!v) {
            addDataItem.value = {} as IAddGoods;
        }
    });
</script>
<style lang="scss" scoped></style>
