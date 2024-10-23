<script setup lang="ts">
    import Main from "@/components/main/index.vue";
    import Container from "@/components/container/index.vue";
    import DataTable from "@/components/dataTable/table.vue";
    import Header from "@/components/header/index.vue";
    import DataTableColumn from "@/components/dataTable/tableColumn.vue";
    import { onMounted, ref } from "vue";
    import { IUserList } from "@/types";
    import Status from "@/components/dataTable/status.vue";
    import { useStore } from "@/store";

    const store = useStore();
    const data = ref<IUserList>({} as IUserList);
    const init = async () => {
        data.value = await store.dispatch("getUserListAction", {
            pageNum: 1,
            pageSize: 10,
        });
    };
    onMounted(() => {
        init();
    });
    const handleTableFilter = () => {
        console.log("filter");
    };
    const handleTableSearch = async (i: string) => {
        data.value = await store.dispatch("getUserListAction", {
            pageNum: 1,
            pageSize: 10,
            search: i,
        });
    };
    const handleClickOrder = (i: number) => {
        console.log("click order", i);
    };
    const handleDelete = async (id: number) => {
        await store.dispatch("deleteUserAction", id);
        // 将删除后的state修改为DELETE
        data.value.items = data.value.items.map((item) => {
            if (item.id === id) {
                item.state = "DELETE";
            }
            return item;
        });
        console.log("delete");
    };
</script>

<template>
    <Main>
        <Header :headerTitle="'用户管理'" />
        <Container>
            <DataTable
                :title="'用户管理'"
                :titleIcon="'bx-receipt'"
                :orders="data.items"
                flexBasis="700px"
                @handleFilterAdd="handleTableFilter"
                @handleSearch="handleTableSearch"
                @handleClickOrder="handleClickOrder"
            >
                <DataTableColumn
                    title="用户ID"
                    width="10%"
                    label="id"
                ></DataTableColumn>
                <DataTableColumn
                    title="用户名"
                    width="11%"
                    label="name"
                ></DataTableColumn>
                <DataTableColumn
                    title="角色"
                    width="12%"
                    label="role"
                ></DataTableColumn>
                <DataTableColumn
                    title="邮箱"
                    width="12%"
                    label="email"
                ></DataTableColumn>
                <DataTableColumn
                    title="电话"
                    width="12%"
                    label="tel"
                ></DataTableColumn>
                <DataTableColumn
                    title="最后登录时间"
                    width="12%"
                    label="lastLogin"
                ></DataTableColumn>
                <DataTableColumn
                    title="状态"
                    width="12%"
                    label="state"
                >
                    <template #default="{ row }">
                        <Status :row="row"></Status>
                    </template>
                </DataTableColumn>
                <DataTableColumn
                    title="操作"
                    width="12%"
                    label="lastLogin"
                >
                    <template #default="{ row }">
                        <button
                            @click="handleDelete(row.id)"
                            class="UserdeleteButton"
                        >
                            删除
                        </button>
                    </template>
                </DataTableColumn>
            </DataTable>
        </Container>
    </Main>
</template>

<style scoped lang="scss">
    .UserdeleteButton {
        background-color: #ff4d4f;
        color: #fff;
        border: none;
        border-radius: 4px;
        padding: 4px 8px;
        cursor: pointer;
    }
</style>
