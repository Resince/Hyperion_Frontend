<script lang="ts" setup>
    // 需要定制一些样式
</script>

<template>
    <div class="card">
        <slot name="header"></slot>
        <slot></slot>
        <slot name="footer"></slot>
    </div>
</template>

<style lang="scss" scoped>
    .card {
        border-radius: 20px;
        background: $light;
        padding: 13px 24px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
    }
</style>
