<script setup lang="ts"></script>

<template>
    <main>
        <slot></slot>
    </main>
</template>

<style lang="scss">
    main {
        width: 100%;
        padding: 36px 24px;
        max-height: calc(100vh - 56px);
        @media screen and (max-width: 768px) {
            & {
                width: calc(100% - 60px);
                left: 200px;
            }
        }
    }
</style>
