<script setup lang="ts">
    defineProps({
        width: {
            type: String,
            default: "20px",
        },
        height: {
            type: String,
            default: "20px",
        },
    });
</script>

<template>
    <svg
        :style="{ width, height }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        class="normal"
    >
        <path
            d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
        />
    </svg>
</template>

<style scoped lang="scss"></style>
