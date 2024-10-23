<script setup lang="ts">
    import { computed, ref, watch } from "vue";
    import Card from "./components/card.vue";
    import { IGoodsList, IgoodsAllListRequest } from "@/types/goods";
    import { useStore } from "@/store";
    import { useRoute } from "vue-router";
    const store = useStore();
    const route = useRoute();
    const category = ref<string>("");
    const changeCardList = async () => {
        category.value = route.params.category as string;
        const params: IgoodsAllListRequest = {
            category: category.value,
            keyword: "",
            pageNum: 1,
            pageSize: 10,
        };
        await store.dispatch(
            "goodsStoreModule/getGoodsSearchListAction",
            params
        );
    };
    // 监听路由变化
    watch(
        () => route.params.category,
        async () => {
            await changeCardList();
        },
        { immediate: true }
    );

    // 搜索框搜索商品时，商品列表会变化，同步更新、
    // 加载商品列表
    const goodsData = computed<IGoodsList | null>(() => {
        const t = store.getters["goodsStoreModule/gGoodsSearchList"];
        if (t && t.items) {
            t.items = t.items.filter((item: any) => item.state !== "DELETED");
        }
        return t;
    });
</script>

<template>
    <div class="grid-container">
        <Card
            v-for="d in goodsData?.items"
            size=""
            :data="d"
        />
    </div>
</template>

<style scoped lang="scss">
    .grid-container {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: 1fr;
        grid-template-rows: 380px;
        grid-gap: 20px;

        @media (min-width: 30em) {
            grid-template-columns: 1fr 1fr;
        }

        @media (min-width: 60em) {
            grid-template-columns: repeat(5, 1fr);
        }
    }
</style>
