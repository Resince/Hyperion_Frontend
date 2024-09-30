<script setup lang="ts">
import Header from './components/header.vue';
import Siderbar from './components/siderbar.vue';

</script>

<template>
    <div class="consumerLayout-layout">
            <Siderbar />
            <el-container>
                <Header>Header</Header>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
    </div>
</template>

<style scoped lang="scss">
.consumerLayout-layout {
    display: flex;

    width: 100%;
    h1 {
        font-size: larger;
    }
}
</style>
