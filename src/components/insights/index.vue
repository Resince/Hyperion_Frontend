<script setup lang="ts">
    import { liColor } from "@/types/enum";
    defineProps<{
        data: { number: string; icon: string; title: string; color: liColor }[];
    }>();
</script>

<template>
    <ul class="insights">
        <li
            v-for="(item, index) in data"
            :key="index"
            :class="item.color"
        >
            <i
                class="bx"
                :class="item.icon"
            ></i>
            <span class="info">
                <h3>{{ item.number }}</h3>
                <p>{{ item.title }}</p>
            </span>
        </li>
    </ul>
</template>

<style lang="scss">
    .insights {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 24px;
        margin-top: 10px;

        li {
            padding: 24px;
            background: $light;
            border-radius: 20px;
            display: flex;
            align-items: center;
            gap: 24px;
            cursor: pointer;

            .bx {
                width: 80px;
                height: 80px;
                border-radius: 10px;
                font-size: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            &.primary .bx {
                background: $light-primary;
                color: $primary;
            }

            &.warning .bx {
                background: $light-warning;
                color: $warning;
            }

            &.success .bx {
                background: $light-success;
                color: $success;
            }

            &.danger .bx {
                background: $light-danger;
                color: $danger;
            }

            .info h3 {
                font-size: 24px;
                font-weight: 600;
                color: $dark;
            }

            .info p {
                color: $dark;
            }
        }
    }
</style>
