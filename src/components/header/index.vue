<script setup lang="ts">
    defineProps<{ headerTitle: string }>();
</script>

<template>
    <div class="header">
        <div class="left">
            <h1>{{ headerTitle }}</h1>
        </div>
    </div>
</template>

<style lang="scss">
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        flex-wrap: wrap;

        .left {
            h1 {
                font-size: 36px;
                font-weight: 600;
                margin-bottom: 10px;
                color: $dark;
            }
        }
    }
</style>
