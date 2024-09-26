<script setup lang="ts">
import store from "@/store";
import Sidebar from "@/components/consumer/sidebar.vue";
const name=store.state.userInfo?.name;
import layout from "@/layout/index.vue";
</script>

<template>
    <layout :name="name"/>
    <router-view/>
</template>

<style scoped>

</style>
