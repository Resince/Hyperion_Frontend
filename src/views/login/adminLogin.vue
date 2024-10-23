<script lang="ts" setup>
    import { useStore } from "@/store";
    import { ref } from "vue";
    const input = ref<string>("");
    const store = useStore();
    const login = async () => {
        await store.dispatch("loginModule/loginAdminAction", {
            tel: "15279061234",
            pass: input.value,
            role: "ADMIN",
        });
    };
</script>

<template>
    <div>
        <div>xixi</div>
        <el-input
            v-model="input"
            style="width: 240px"
            type="password"
            placeholder="输入密码"
            @keyup.enter="login"
        />
    </div>
</template>

<style lang="scss" scoped>
    div {
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 20px;
        div:first-child {
            font-size: 30px;
            font-weight: bold;
        }
    }
</style>
