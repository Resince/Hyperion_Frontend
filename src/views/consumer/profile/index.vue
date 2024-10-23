<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import AddressList from "./components/addressList.vue";
    import Profile from "./components/profile.vue";
    import OrderList from "./components/orderList.vue";
    import { useStore } from "@/store";
    import { OrderState } from "@/types/enum";
    const store = useStore();

    const showAddress = ref(false);
    onMounted(async () => {
        // 初始化该页面所有数据
        await store.dispatch("orderStoreModule/getOrderListAction", {
            pageSize: 10,
            pageNum: 1,
            state: OrderState.PLACED.toString(),
        });
        await store.dispatch("addressStoreModule/reqAddressListAction");
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
