<script setup lang="ts">

</script>

<template>
    <el-header class="headerwrapper">
        <div class="search"></div>
        <div class="messagebar">
            <div class="shoppingListIcon">shoppinglist</div>
            <div class="userIcon">userIcon</div>
        </div>
    </el-header>
</template>

<style scoped lang="scss">
.headerwrapper {
    display: grid;
    grid-template-columns: 1fr 9fr 3fr;
    background-color: white;
}
</style>