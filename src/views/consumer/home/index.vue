<script setup lang="ts">
    import { computed, onMounted, ref, watch } from "vue";
    import Card from "./components/card.vue";
    import { IGoodsList, IgoodsAllListRequest } from "@/types/goods";
    import { useStore } from "@/store";
    import { useRoute } from "vue-router";
    const store = useStore();
    const route = useRoute();
    // 数据加载和分页
    const category = ref<string>("");
    const pageNum = ref<number>(1);
    const loadMore = async () => {
        category.value = route.params.category as string;
        const params: IgoodsAllListRequest = {
            category: category.value,
            pageNum: pageNum.value,
            pageSize: 25,
        };
        await store.dispatch(
            "goodsStoreModule/getGoodsSearchListAction",
            params
        );
    };
    // 更新数据使用
    const init = async () => {
        category.value = route.params.category as string;
        const params: IgoodsAllListRequest = {
            category: category.value,
            pageNum: 1,
            pageSize: 25 * pageNum.value,
        };
        await store.dispatch(
            "goodsStoreModule/getGoodsSearchListAction",
            params
        );
    };
    // 滚动加载
    const loadMoreTrigger = ref<HTMLElement | null>(null);
    onMounted(() => {
        const observer = new IntersectionObserver(
            async (entries) => {
                if (entries[0].isIntersecting) {
                    if (
                        goodsData.value &&
                        goodsData.value.total <= pageNum.value * 25
                    ) {
                        return;
                    }
                    pageNum.value++;
                    await loadMore();
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 1.0,
            }
        );
        observer.observe(loadMoreTrigger.value as HTMLElement);
    });
    // 监听路由变化
    watch(
        () => route.params.category,
        async () => {
            await init();
        },
        { immediate: true }
    );

    // 搜索框搜索商品时，商品列表会变化，同步更新、
    // 加载商品列表
    const goodsData = computed<IGoodsList | null>(() => {
        return store.getters["goodsStoreModule/gGoodsSearchList"];
    });
</script>

<template>
    <div class="grid-container">
        <Card
            v-for="d in goodsData?.items"
            size=""
            :data="d"
        />
        <div
            ref="loadMoreTrigger"
            class="load-more-trigger"
        ></div>
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
