<script setup lang="ts">
    import DataTable from "@/components/dataTable/table.vue";
    import DataTableColumn from "@/components/dataTable/tableColumn.vue";
    import Main from "@/components/main/index.vue";
    import Container from "@/components/container/index.vue";
    import Status from "@/components/dataTable/status.vue";
    import Header from "@/components/header/index.vue";
    import { onMounted, ref } from "vue";
    import { useStore } from "@/store";
    import {
        IAddGoods,
        IGoodsList,
        IGoodsListItem,
        IUpdateGoods,
    } from "@/types/goods";
    import {
        ElMessage,
        genFileId,
        UploadInstance,
        UploadProps,
        UploadRawFile,
    } from "element-plus";

    const store = useStore();
    // 添加商品
    const addDataItem = ref<IAddGoods>({} as IAddGoods);
    const addVisible = ref(false);
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
        console.log(url);

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
        addVisible.value = false;
        init();
        console.log("add");
    };
    const handleAdd = () => {
        addVisible.value = !addVisible.value;
        addDataItem.value = {} as IAddGoods;
    };
    // 搜索商品
    const handleSearch = async (i: any) => {
        data.value = await store.dispatch(
            "goodsStoreModule/getGoodsSearchListAction",
            {
                pageNum: 1,
                pageSize: 10,
                keyword: i,
                category: "",
            }
        );
    };
    const handleClickOrder = (i: any) => {
        console.log("click order", i);
    };
    const handleDelete = async (id: number) => {
        await store.dispatch("goodsStoreModule/deleteGoodsAction", { id });
        init();
    };
    // 数据加载
    const data = ref<IGoodsList>({} as IGoodsList);
    const init = async () => {
        data.value = await store.dispatch(
            "goodsStoreModule/getGoodsMerchantListAction",
            {
                pagenum: 1,
                pagesize: 10,
            }
        );
    };
    onMounted(() => {
        init();
    });
    // 编辑商品
    const edtiId = ref<number>(-1);
    const editData = ref<IUpdateGoods>({} as IUpdateGoods);
    const handleEdit = async (id: number) => {
        if (edtiId.value != id) {
            // 不同说明第一次点击，或者是点击了另一个
            // 放弃之前的编辑
            // 保存当前的信息
            const t = data.value?.items?.find((item) => item.id == id);
            if (t) {
                editData.value = {
                    name: t.name,
                    desc: t.desc,
                    price: t.price,
                    quantity: t.quantity,
                    category: t.category,
                    coverUrl: t.coverUrl,
                    discount: t.discount,
                    id: t.id,
                };
            }
            // 开始编辑
            edtiId.value = id;
            //
        } else {
            // 相同则说明点击了两次
            edtiId.value = -1;
            // 提交数据
            await store.dispatch(
                "goodsStoreModule/updateGoodsAction",
                editData.value
            );
            // 重新加载数据
            init();
        }
    };
    const changeSale = async (row: IGoodsListItem) => {
        if (row.sale == "ON") {
            row.sale = "OFF";
        } else {
            row.sale = "ON";
        }
        console.log(row.id);

        if (row.sale == "ON") {
            await store.dispatch("goodsStoreModule/onSaleGoodsAction", {
                id: row.id,
            });
        } else {
            await store.dispatch("goodsStoreModule/offSaleGoodsAction", {
                id: row.id,
            });
        }
    };
    const options = [
        {
            value: "new",
            label: "新品",
        },
        {
            value: "clothes",
            label: "服装",
        },
        {
            value: "digtal",
            label: "数码",
        },
        {
            value: "furniture",
            label: "家居",
        },
        {
            value: "cosmetic",
            label: "美妆",
        },
        {
            value: "food",
            label: "食品",
        },
        {
            value: "books",
            label: "图书",
        },
    ];
</script>

<template>
    <Main>
        <Header headerTitle="商品管理"></Header>
        <Container>
            <DataTable
                title="商品列表"
                :titleIcon="'bx-receipt'"
                :orders="data.items"
                :flexBasis="'100%'"
                :tbodyMaxHeight="'400px'"
                :icon-add="true"
                @handleFilterAdd="handleAdd"
                @handleSearch="handleSearch"
                @handleClickOrder="handleClickOrder"
            >
                <DataTableColumn
                    title="商品信息"
                    width="150px"
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
                                :src="row.coverUrl"
                                alt=""
                                style="
                                    width: 36px;
                                    height: 36px;
                                    border-radius: 20%;
                                    object-fit: cover;
                                "
                                @click="handleEdit(row.id)"
                            />
                            <input
                                v-if="row.id == edtiId"
                                type="text"
                                v-model="editData.name"
                                class="input-edit"
                            />
                            <span v-else>{{ row.name }}</span>
                        </div>
                    </template>
                </DataTableColumn>
                <DataTableColumn
                    title="商品描述"
                    width="300px"
                    label="desc"
                >
                    <template #default="{ row }">
                        <input
                            v-if="row.id == edtiId"
                            type="text"
                            v-model="editData.desc"
                            class="input-edit"
                        />
                        <span v-else>{{ row.desc }}</span>
                    </template>
                </DataTableColumn>
                <DataTableColumn
                    title="商品价格"
                    width="8%"
                    label="price"
                >
                    <template #default="{ row }">
                        <input
                            v-if="row.id == edtiId"
                            type="text"
                            v-model.number="editData.price"
                            class="input-edit"
                        />
                        <span v-else>{{ row.price }}</span>
                    </template>
                </DataTableColumn>
                <DataTableColumn
                    title="商品折扣"
                    width="8%"
                    label="discount"
                >
                    <template #default="{ row }">
                        <input
                            v-if="row.id == edtiId"
                            type="text"
                            v-model.number="editData.discount"
                            class="input-edit"
                        />
                        <span v-else>{{ row.discount }}</span>
                    </template>
                </DataTableColumn>
                <DataTableColumn
                    title="库存数量"
                    width="10%"
                    label="quantity"
                >
                    <template #default="{ row }">
                        <input
                            v-if="row.id == edtiId"
                            type="text"
                            v-model.number="editData.quantity"
                            class="input-edit"
                        />
                        <span v-else>{{ row.quantity }}</span>
                    </template>
                </DataTableColumn>
                <DataTableColumn
                    title="状态"
                    width="10%"
                    label="sale"
                >
                    <template #default="{ row }">
                        <Status
                            v-if="row.id == edtiId"
                            :row="row"
                            @click="changeSale(row)"
                        ></Status>
                        <Status
                            v-else
                            :row="row"
                        ></Status>
                    </template>
                </DataTableColumn>
                <DataTableColumn
                    title="分类"
                    width="100px"
                    label="category"
                >
                    <template #default="{ row }">
                        <el-select
                            v-if="row.id == edtiId"
                            v-model="editData.category"
                            placeholder="商品分类"
                            style="width: 100px"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                        <span v-else>{{
                            options.find((i) => i.value === row.category)?.label
                        }}</span>
                    </template>
                </DataTableColumn>
                <DataTableColumn
                    title="总销量"
                    width="8%"
                    label="totSales"
                >
                    <template #default="{ row }">
                        <span>{{ row.totSales }}</span>
                    </template>
                </DataTableColumn>
                <DataTableColumn
                    title="操作"
                    width="10%"
                    label=""
                >
                    <template #default="{ row }">
                        <div class="action-button">
                            <button
                                @click="handleDelete(row.id)"
                                class="delete-button"
                            >
                                删除
                            </button>
                            <button
                                @click="handleEdit(row.id)"
                                class="edit-button"
                            >
                                {{ row.id == edtiId ? "完成" : "编辑" }}
                            </button>
                        </div>
                    </template>
                </DataTableColumn>
            </DataTable>
        </Container>
    </Main>
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
            >
                <el-button type="primary">上传商品封面</el-button>
            </el-upload>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="addVisible = false">取消</el-button>
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

<style lang="scss">
    .input-edit {
        width: 70%;
        background-color: #dbdada;
        border: none;
        border-radius: 8px;
    }
    .action-button {
        display: flex;
        gap: 3px;
        .delete-button {
            font-size: 12px;
            padding: 6px 16px;
            border-radius: 20px;
            font-weight: 700;
            background: $warning;
        }
        .edit-button {
            font-size: 12px;
            padding: 6px 16px;
            border-radius: 20px;
            font-weight: 700;
            background: $primary;
        }
    }
    .dialog-select {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        width: 100%;
        gap: 20px;
        .el-input__wrapper,
        .el-select__wrapper {
            border-radius: 10px;
        }
    }
</style>
