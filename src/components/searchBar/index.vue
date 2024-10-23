<script setup lang="ts">
    import { useStore } from "@/store";
    import { ref } from "vue";
    const store = useStore();
    const text = ref("");
    const handleSearch = async () => {
        // 调用函数指向相关页面
        await store.dispatch("goodsStoreModule/getGoodsSearchListAction", {
            category: "",
            keyword: text.value,
            pageNum: 1,
            pageSize: 10,
        });
    };
</script>

<template>
    <div class="searchbarWrapper">
        <el-input
            class="searchbar"
            v-model="text"
            placeholder="搜索商品"
            clearable
            @keyup.enter="handleSearch"
        />
    </div>
</template>

<style lang="scss">
    .searchbarWrapper > .el-input {
        width: 300px;
        .el-input__wrapper {
            border-radius: 10px 10px;
        }
    }
</style>
