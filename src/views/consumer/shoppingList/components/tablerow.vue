<script setup lang="ts">
    import { ref } from "vue";
    import { ElButton, ElCheckbox } from "element-plus";
    import { Delete } from "@element-plus/icons-vue";
    const selected = ref(false);
</script>

<template>
    <div class="tableview-row">
        <el-checkbox
            v-model="selected"
            size="large"
            class="selectall"
        />
        <div class="product-cell image">
            <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt=""
            />
            <span>Ocean</span>
        </div>
        <div class="product-cell describe">Furniture</div>
        <div class="product-cell singlePrice">11</div>
        <div class="product-cell quantity">36</div>
        <div class="product-cell price">$560</div>
        <div class="product-cell action">
            <el-button
                type="danger"
                :icon="Delete"
                circle
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .tableview-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 7px;
        flex-direction: row;
        margin: 5px 0px;
        &:hover {
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            background-color: #fff;
        }
    }
    .product-cell {
        display: flex;
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: 16px;
        align-items: center;
        img {
            width: 70px;
            height: 50px;
            border-radius: $cus_radius;
        }
        &.image {
            display: flex;
            align-items: center;
            span {
                margin-left: 10px;
            }
        }
        &.action {
            display: flex;
            justify-content: center;
            gap: 20px;
        }
    }
</style>
