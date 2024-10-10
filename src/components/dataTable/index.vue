<script setup lang="ts">
    const props = defineProps<{
        title: string;
        titleIcon: string;
        header: { title: string }[];
        flexBasis?: string;
        orders?: {
            id: number;
            cover_url: string;
            name: string;
            date: string;
            status: string;
            statusMeg: string;
            price: number;
            discount: number;
            stock: number;
            total_sales: number;
        }[];
    }>();
    /**
     * @emits handleFilter 返回筛选事件
     * @emits handleSearch 返回搜索事件
     * @emits handleClickOrder 返回点击订单事件, 参数为订单id
     */
    const emit = defineEmits<{
        (e: "handleFilter"): void;
        (e: "handleSearch"): void;
        (e: "handleClickOrder", i: any): void;
    }>();
</script>

<template>
    <div
        class="orders"
        :class="{ ordersFlex: !!props.flexBasis }"
        :style="{ flexBasis: props.flexBasis }"
    >
        <div class="header">
            <i
                class="bx"
                :class="props.titleIcon"
            ></i>
            <h3>{{ props.title }}</h3>
            <i
                class="bx bx-filter"
                @click="emit('handleFilter')"
            ></i>
            <i
                class="bx bx-search"
                @click="emit('handleSearch')"
            ></i>
        </div>
        <table>
            <thead>
                <tr>
                    <th
                        v-for="(item, index) in props.header"
                        :key="index"
                    >
                        {{ item.title }}
                    </th>
                </tr>
            </thead>
            <slot>
                <tbody>
                    <tr
                        v-for="(item, index) in props.orders"
                        :key="index"
                        @click="emit('handleClickOrder', item.id)"
                    >
                        <td>
                            <img :src="item.cover_url" />
                            <p>{{ item.name }}</p>
                        </td>
                        <td>{{ item.date }}</td>
                        <td>
                            <span
                                class="status"
                                :class="item.status"
                            >
                                {{ item.statusMeg }}
                            </span>
                        </td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.discount }}</td>
                        <td>{{ item.stock }}</td>
                        <td>{{ item.total_sales }}</td>
                    </tr>
                </tbody>
            </slot>
        </table>
    </div>
</template>

<style scoped lang="scss">
    .orders {
        &.ordersFlex {
            flex-grow: 1;
        }
        color: $dark;
        border-radius: 20px;
        background: $light;
        padding: 24px;
        overflow-x: auto;
        .header {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 24px;

            h3 {
                margin-right: auto;
                font-size: 24px;
                font-weight: 600;
            }

            .bx {
                cursor: pointer;
            }
        }

        table {
            width: 100%;
            border-collapse: collapse;

            th {
                padding-bottom: 12px;
                font-size: 13px;
                text-align: left;
                border-bottom: 1px solid $grey;
            }

            td {
                padding: 16px 0;
            }

            tr td:first-child {
                display: flex;
                align-items: center;
                gap: 12px;
                padding-left: 6px;
            }

            td img {
                width: 36px;
                height: 36px;
                border-radius: 20%;
                object-fit: cover;
            }

            tbody tr {
                cursor: pointer;
                transition: all 0.3s ease;
            }

            tbody tr:hover {
                background: $grey;
            }

            tr td .status {
                font-size: 10px;
                padding: 6px 16px;
                color: $light;
                border-radius: 20px;
                font-weight: 700;
            }

            tr td .status.completed {
                background: $success;
            }

            tr td .status.process {
                background: $primary;
            }

            tr td .status.pending {
                background: $warning;
            }
        }
    }
</style>
