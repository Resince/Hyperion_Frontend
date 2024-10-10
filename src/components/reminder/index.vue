<script setup lang="ts">
    const props = defineProps<{
        title: string;
        titleIcon: string;
        backlog?: {
            title: string;
            status: boolean;
        }[];
        flexBasis?: string;
    }>();
    /**
     * @emits handleFilter 返回筛选事件
     * @emits handlePlus 返回添加事件
     * @emits handleMoreOptions 返回更多选项事件, 参数为索引
     * @emits toggleStatus 返回切换状态事件, 参数为索引,需要对status进行取反
     */
    const emit = defineEmits<{
        (e: "handleFilter"): void;
        (e: "handlePlus"): void;
        (e: "handleMoreOptions", i: number): void;
        (e: "toggleStatus", i: number): void;
    }>();
</script>

<template>
    <div
        class="reminders"
        :class="{ reminderFlex: !!props.flexBasis }"
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
                class="bx bx-plus"
                @click="emit('handlePlus')"
            ></i>
        </div>
        <ul class="task-list">
            <li
                :class="item.status ? 'completed' : 'not-completed'"
                v-for="(item, index) in props.backlog"
                :key="index"
            >
                <div class="task-title">
                    <i
                        class="bx"
                        :class="item.status ? 'bx-check-circle' : 'bx-x-circle'"
                        @click="emit('toggleStatus', index)"
                    ></i>
                    <p>{{ item.title }}</p>
                </div>
                <i
                    class="bx bx-dots-vertical-rounded"
                    @click="emit('handleMoreOptions', index)"
                ></i>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
    .reminders {
        &.reminderFlex {
            flex-grow: 1;
        }
        color: $dark;
        border-radius: 20px;
        background: $light;
        padding: 24px;

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

        .task-list {
            width: 100%;

            li {
                width: 100%;
                margin-bottom: 16px;
                background: $grey;
                padding: 14px 10px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .task-title {
                    display: flex;
                    align-items: center;
                }

                .task-title p {
                    margin-left: 6px;
                }

                .bx {
                    cursor: pointer;
                }

                &.completed {
                    border-left: 10px solid $success;
                    p {
                        text-decoration: line-through;
                    }
                }

                &.not-completed {
                    border-left: 10px solid $danger;
                }

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }
    @media screen and (max-width: 576px) {
        .reminders .task-list {
            min-width: 340px;
        }
    }
</style>
