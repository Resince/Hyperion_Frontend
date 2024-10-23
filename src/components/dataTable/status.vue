<script setup lang="ts">
    import { ref } from "vue";
    const p = defineProps<{
        row: {
            state: string;
            sale: string;
        };
    }>();
    // 该组件逻辑为根据传入的状态值，显示不同的状态
    // 如果是state为
    const t = ref<string>(p.row.state);
    const convertStatus = () => {
        switch (p.row.state) {
            case "DELETED":
                return "已删除";
            case "PLACED":
                return "待用户支付";
            case "CONFIRMED":
                return "待商家发货";
            case "SHIPPED":
                return "待用户收货";
            case "COMPLETE":
                return "已完成";
        }
        t.value = p.row.sale;
        switch (p.row.sale) {
            case "ON":
                return "上架";
            case "OFF":
                return "下架";
        }
        switch (p.row.state) {
            case "ACTIVE":
                return "活跃中";
        }
    };
</script>

<template>
    <span
        class="state"
        :class="t"
    >
        {{ convertStatus() }}
        <slot></slot>
    </span>
</template>

<style lang="scss" scoped>
    .state {
        font-size: 10px;
        padding: 6px 16px;
        color: $light;
        border-radius: 20px;
        font-weight: 700;
        background: $primary;
    }
    .state.COMPLETE {
        background: $success;
    }
    .state.OFF,
    .state.DELETED {
        background: $warning;
    }
</style>
