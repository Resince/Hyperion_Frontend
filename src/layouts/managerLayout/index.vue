<script setup lang="ts">

</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-container>
                <el-header>Header</el-header>
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
