<script setup lang="ts">
import Header from './components/header.vue';
import Siderbar from './components/siderbar.vue';

</script>

<template>
    <div class="consumerLayout-layout">
        <el-container>
            <Siderbar />
            <el-container>
                <Header>Header</Header>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped lang="scss">
div {
    display: flex;
    margin: auto;

    h1 {
        font-size: larger;
    }
}
</style>
