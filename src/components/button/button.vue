<script setup lang="ts"></script>

<template>
    <a href="#">Sick Hover</a>
</template>

<style scoped lang="scss">
    a {
        color: #000;
        position: relative;
        text-decoration: none;
    }

    a::before {
        background: hsl(45 100% 70%);
        content: "";
        inset: 0;
        position: absolute;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.5s ease-in-out;
        z-index: -1;
    }

    a:hover::before {
        transform: scaleX(1);
        transform-origin: left;
    }

    /* Presentational styles */
    body {
        display: grid;
        font-family: system-ui, sans;
        font-size: 3.5rem;
        font-weight: 800;
        height: 100vh;
        place-items: center;
    }
</style>
