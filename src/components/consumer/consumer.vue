<script setup lang="ts">
import store from "@/store";
import Sidebar from "@/components/consumer/sidebar.vue";
const name=store.state.name;
</script>

<template>
    <sidebar :name="name"/>
    <router-view/>

</template>

<style scoped>

</style>
