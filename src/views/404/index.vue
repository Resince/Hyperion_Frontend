<script setup lang="ts">
    import { getCache } from "@/utils/cache";
    import { useRouter } from "vue-router";

    const router = useRouter();
    const handleClick = () => {
        const role = getCache("role");
        if (role === "ADMIN") {
            router.push({ name: "UserManage" });
        } else if (role === "USER") {
            router.push({ name: "MerchantHome" });
        } else {
            router.push({ name: "ConsumerHome", params: { category: "new" } });
        }
    };
</script>

<template>
    <div>
        <h1>Oops! Something went wrong!</h1>
        <div
            class="btn"
            @click="handleClick"
        >
            Return to Home
        </div>
    </div>
</template>

<style scoped lang="scss">
    $dark: #383a41;
    $blue: #5e7fdc;
    div {
        margin: auto;
    }
    h1 {
        font-weight: 800;
        color: $dark;
        text-align: center;
        font-size: 2.5em;
        padding-top: 20px;
    }

    .btn {
        font-family: "Open Sans";
        font-weight: 400;
        padding: 20px;
        background-color: rgba($blue, 1);
        color: white;
        width: 320px;
        margin: 0 auto;
        text-align: center;
        font-size: 1.2em;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 80px;
        margin-bottom: 50px;
        transition: all 0.2s linear;

        &:hover {
            background-color: rgba($blue, 0.8);
            transition: all 0.2s linear;
        }
    }
</style>
