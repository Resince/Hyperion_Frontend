<script setup lang="tsx">
    import { CSSProperties, onMounted, ref } from "vue";
    import { computed } from "vue";
    import { useStore } from "@/store";
    import { JSX } from "vue/jsx-runtime";
    const store = useStore();
    const props = defineProps<{
        title: string;
        titleIcon: string;
        flexBasis?: string;
        tbodyMaxHeight?: string;
        orders?: Array<{ id: number; [key: string]: any }>;
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
    // 获取store中的columns
    // 其中包含着列数据和对应的渲染函数
    const columns = ref(store.state.tableStoreMudule.columns);
    const styleScroll = computed<CSSProperties | undefined>(() => {
        return {
            display: "block",
            maxHeight: props.tbodyMaxHeight,
            overflowY: "auto",
        };
    });

    const DataTable = (): JSX.Element => {
        return (
            <tbody style={props.tbodyMaxHeight ? styleScroll.value : null}>
                {props.orders?.map((order) => (
                    <tr
                        key={order.id}
                        onClick={() => emit("handleClickOrder", order.id)}
                    >
                        {columns.value.map((column, index) => (
                            <td
                                key={index}
                                style={{ width: column.width }}
                            >
                                {column.renderCell(order)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        );
    };
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
                        v-for="(item, index) in columns"
                        :key="index"
                        :style="{ width: item.width }"
                    >
                        {{ item.title }}
                    </th>
                </tr>
            </thead>
            <!--  默认插槽隐藏 -->
            <slot style="display: none"> </slot>
            <!-- 通过自己定义的tsx函数来定义tbody -->
            <DataTable />
        </table>
    </div>
</template>
<style lang="scss">
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
            overflow-y: auto;
            border-collapse: collapse;

            tbody {
                &::-webkit-scrollbar {
                    width: 5px;
                }
                &::-webkit-scrollbar-thumb {
                    background-color: rgba(0, 0, 0, 0.3);
                    border-radius: 10px;
                }

                &::-webkit-scrollbar-track {
                    background: transparent;
                }
            }

            th {
                min-width: 100px;
                padding-bottom: 12px;
                font-size: 13px;
                text-align: left;
                border-bottom: 1px solid $grey;
            }

            td {
                padding: 16px 0;
            }

            tr {
                display: table;
                width: 100%;
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
