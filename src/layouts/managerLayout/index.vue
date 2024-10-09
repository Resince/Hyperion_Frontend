<script setup lang="ts">
    import { ref } from "vue";
    import Header from "./components/header.vue";
    import Siderbar from "./components/siderbar.vue";
    import { useRoute } from "vue-router";
    const route = useRoute();
    const isclose = ref(false);
    const toggleSidebar = () => {
        isclose.value = !isclose.value;
    };
    const path = route.path;
    const sliderListMerchant = [
        { name: "总览", icon: "bxs-dashboard", link: "/merchant" },
        { name: "商品", icon: "bxs-store", link: "/merchant/commodityManage" },
        { name: "交易", icon: "bxs-analyse", link: "/merchant/orderManage" },
    ];
    const sliderListAdmin = [
        { name: "用户管理", icon: "bxs-user", link: "/admin/userManage" },
    ];
    const sliderList = path.includes("merchant")
        ? sliderListMerchant
        : sliderListAdmin;
</script>

<template>
    <div class="common-layout">
        <Siderbar
            :isclose="isclose"
            :sideMenuList="sliderList"
        />
        <div class="content">
            <Header @toggleSidebar="toggleSidebar" />
            <router-view />
        </div>
    </div>
</template>

<style lang="scss">
    .bx {
        font-size: 1.7rem;
    }

    a {
        text-decoration: none;
    }

    li {
        list-style: none;
    }
    .common-layout {
        background: $grey;
        overflow-x: hidden;
        display: flex;
        height: 100vh;
        width: 100vw;
        flex-direction: row;
    }
    .content {
        position: relative;
        width: calc(100% - 230px);
        left: 230px;
        transition: all 0.3s ease;
    }
    .sidebar.close ~ .content {
        width: calc(100% - 60px);
        left: 60px;
    }
</style>
