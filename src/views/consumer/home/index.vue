<script setup lang="ts">
    import Card from "./components/card.vue";
    const props = defineProps({
        id: String,
    });
</script>

<template>
    <div class="grid-container">
        <Card />
    </div>
</template>

<style scoped lang="scss">
    .grid-container {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        grid-auto-rows: 200px;
        grid-auto-flow: dense;
    }
</style>
