<script setup lang="ts">
    defineProps<{
        row: {
            state: string;
        };
    }>();
    const convertStatus = (state: string) => {
        switch (state) {
            case "completed":
                return "已完成";
            case "process":
                return "进行中";
            case "pending":
                return "待处理";
            default:
                return "未知";
        }
    };
</script>

<template>
    <span
        class="state"
        :class="row.state"
    >
        {{ convertStatus(row.state) }}
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
    }

    .state.completed {
        background: $success;
    }

    .state.process {
        background: $primary;
    }

    .state.pending {
        background: $warning;
    }
</style>
