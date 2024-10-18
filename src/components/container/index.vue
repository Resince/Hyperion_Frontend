<script setup lang="ts"></script>

<template>
    <div class="bottom-data">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .bottom-data {
        display: flex;
        flex-wrap: wrap;
        gap: 24px;
        margin-top: 24px;
        margin-bottom: 24px;
        width: 100%;
        color: $dark;
    }
</style>
