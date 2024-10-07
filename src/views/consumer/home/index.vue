<script setup lang="ts">
    import { onMounted, ref, watch } from "vue";
    import Card from "./components/card.vue";
    import { goodsSearchItem, IgoodsAllListRequest } from "@/types/goods";
    import { useStore } from "@/store";
    import { useRoute } from "vue-router";
    const store = useStore();
    const route = useRoute();
    const goodsData = ref<goodsSearchItem>();
    const category = ref<string>("");
    const changeCardList = async () => {
        category.value = route.params.category as string;
        category.value = category.value.split(":")[1];

        const params: IgoodsAllListRequest = {
            category: category.value,
            keyword: "",
            pageNum: 1,
            pageSize: 10,
        };
        await store.dispatch(
            "goodsStoreMudule/getGoodsSearchListAction",
            params
        );
        goodsData.value =
            store.getters["goodsStoreMudule/gGoodsSearchList"](params);
    };
    onMounted(async () => {
        await changeCardList();
    });

    // 监听路由变化
    watch(
        () => route.params.category,
        async () => {
            await changeCardList();
        }
    );
</script>

<template>
    <div class="grid-container">
        <Card
            v-for="d in goodsData?.value.items"
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
