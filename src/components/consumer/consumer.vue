<script setup lang="ts">

import store from "@/store/index";
const name = store.state.userInfo?.name;
import layout from "@/layout/index.vue";

</script>

<template>
    <layout :name="name" />
    <router-view />
</template>

<style scoped></style>
