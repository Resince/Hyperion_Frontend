<script setup lang="ts">
    import Header from "./components/header.vue";
    import Siderbar from "./components/siderbar.vue";
</script>

<template>
    <div class="consumer-Layout">
        <div class="siderbar">
            <Siderbar />
        </div>
        <div class="container">
            <Header />
            <div class="container-main"><router-view /></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .consumer-Layout {
        width: 100%;
        height: 100%;
        max-height: 100%;
        max-width: 2000px;
        display: flex;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        margin: 0 auto;
        .siderbar {
            flex-basis: 200px;
            max-width: 200px;
            height: 100%;
            width: 100%;
            flex-shrink: 0;
        }
        .container {
            padding: 0 16px 0px;
            background-color: $cus_white;
            height: 100%;
            width: 100%;
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow-y: scroll !important;
            .container-main {
                flex: 1;
                padding: 5px 0 0;
                height: 100%;
                width: 100%;
            }
        }
    }
</style>
