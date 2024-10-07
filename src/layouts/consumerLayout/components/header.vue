<script setup lang="ts">
    import SearchBar from "@/components/searchBar/index.vue";
    import shoppinglistIcon from "@/assets/icons/shoppinglistIcon.vue";
    import userIcon from "@/assets/icons/userIcon.vue";
    import { useRouter } from "vue-router";
    const router = useRouter();
    const handleClickShoppingList = () => {
        router.push("/consumer/shoppinglist");
    };
    const handleClickUser = () => {
        router.push("/consumer/profile");
    };
</script>

<template>
    <div class="headerwrapper">
        <div class="search">
            <search-bar />
        </div>
        <nav class="header-navigation">
            <button @click="handleClickShoppingList">
                <shoppinglistIcon />
            </button>
            <button @click="handleClickUser">
                <userIcon />
            </button>
        </nav>
    </div>
</template>

<style scoped lang="scss">
    .headerwrapper {
        background-color: $cus_background;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 0px 20px;
        z-index: 100;
        position: sticky;
        top: 0px;
        z-index: 100;
    }

    .header-navigation {
        padding-right: 20px;
        display: flex;
        flex-direction: row;
        gap: 30px;
    }
</style>
