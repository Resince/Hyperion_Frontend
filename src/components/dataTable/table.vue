<script setup lang="tsx">
    import { CSSProperties, ref } from "vue";
    import { computed } from "vue";
    import { useStore } from "@/store";
    import { JSX } from "vue/jsx-runtime";
    const store = useStore();
    const props = defineProps<{
        title: string;
        titleIcon: string;
        flexBasis?: string;
        tbodyMaxHeight?: string;
        iconAdd?: boolean;
        orders?: Array<{ id: number; [key: string]: any }>;
    }>();
    /**
     * @emits handleFilter 返回筛选事件
     * @emits  返回搜索事件
     * @emits handleClickOrder 返回点击订单事件, 参数为订单id
     */
    const emit = defineEmits<{
        (e: "handleFilterAdd"): void;
        (e: "handleSearch", i: any): void;
        (e: "handleClickOrder", i: any): void;
    }>();
    // 获取store中的columns
    // 其中包含着列数据和对应的渲染函数
    const columns = ref(store.getters["tableStoreModule/columns"]);
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
                        {columns.value.map((column: any, index: any) => (
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
    const searchText = ref("");
    const visible = ref(false);
    const handleClickSearch = () => {
        visible.value = !visible.value;
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
                class="bx"
                :class="props.iconAdd ? 'bx-plus' : ''"
                @click="emit('handleFilterAdd')"
            ></i>
            <input
                class="searchInput"
                :class="{ visible: visible }"
                v-model="searchText"
                placeholder="搜索商品信息"
                @keyup.enter="emit('handleSearch', searchText)"
            />
            <i
                class="bx bx-search"
                @click="handleClickSearch"
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
            .searchInput {
                background: $grey;
                border-radius: 36px;
                width: 0px;
                color: $dark;
                font-size: 18px;
                padding: 0px;
                transition: all 0.2s ease-in-out;
                &.visible {
                    padding: 3px 16px;
                    width: 160px;
                }
                &::placeholder {
                    font-size: 15px;
                }
            }
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
