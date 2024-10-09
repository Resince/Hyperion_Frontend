<script setup lang="ts">
    import { PropType } from "vue";

    type dataModelItem = {
        number: string;
        icon: string;
        title: string;
    };
    const dataModel = defineModel({
        required: true,
        type: Array as PropType<dataModelItem[]>,
    });
</script>

<template>
    <ul class="insights">
        <li
            v-for="(item, index) in dataModel"
            :key="index"
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

            &:nth-child(1) .bx {
                background: $light-primary;
                color: $primary;
            }

            &:nth-child(2) .bx {
                background: $light-warning;
                color: $warning;
            }

            &:nth-child(3) .bx {
                background: $light-success;
                color: $success;
            }

            &:nth-child(4) .bx {
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
