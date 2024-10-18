<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import AddressList from "./components/addressList.vue";
    import Profile from "./components/profile.vue";
    import OrderList from "./components/orderList.vue";
    import { useStore } from "@/store";
    const store = useStore();

    const showAddress = ref(false);
    onMounted(async () => {
        // 初始化地址表，为了两个子组件之间的信息传递
        await store.dispatch("addressStoreMudule/reqAddressListAction");
    });
</script>

<template>
    <div class="user">
        <Profile
            @handle-show-address="
                () => {
                    showAddress = !showAddress;
                }
            "
        />
        <AddressList :showAddress="showAddress" />
        <OrderList />
    </div>
</template>

<style scoped lang="scss">
    .user {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
</style>
