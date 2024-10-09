<script setup lang="ts">
    import Header from "./components/header.vue";
    import Siderbar from "./components/siderbar.vue";
</script>

<template>
    <div class="common-layout">
        <Siderbar />
        <div class="">
            <Header />
            <router-view class="content" />
        </div>
    </div>
</template>

<style scoped lang="scss">
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
