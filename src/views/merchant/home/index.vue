<script setup lang="ts">
    import { ref } from "vue";
    import Inslights from "./component/insights.vue";
    const data = ref({
        orders: [
            {
                id: 1,
                img: "https://img14.360buyimg.com/n0/jfs/t1/237508/31/26791/41336/66fab1cdFad9506ae/370786bacd62a6ec.jpg",
                name: "特斯拉车",
                date: "14-08-2023",
                statusMeg: "已完成",
                status: "completed",
            },
            {
                id: 2,
                img: "https://img14.360buyimg.com/n0/jfs/t1/237508/31/26791/41336/66fab1cdFad9506ae/370786bacd62a6ec.jpg",
                name: "John Doe",
                date: "14-08-2023",
                statusMeg: "待付款",
                status: "pending",
            },
            {
                id: 3,
                img: "https://img14.360buyimg.com/n0/jfs/t1/237508/31/26791/41336/66fab1cdFad9506ae/370786bacd62a6ec.jpg",
                name: "John Doe",
                date: "14-08-2023",
                statusMeg: "处理中",
                status: "process",
            },
        ],
        backlog: [
            {
                title: "Start Our Meeting",
                status: false,
            },
            {
                title: "Analyse Our Site",
                status: false,
            },
            {
                title: "Play Footbal",
                status: true,
            },
        ],
        insights: [
            {
                number: "2,390",
                icon: "bx-calendar-check",
                title: "用户",
            },
            {
                number: "1,250",
                icon: "bx-show-alt",
                title: "商品",
            },
            {
                number: "1,250",
                icon: "bx-line-chart",
                title: "订单",
            },
            {
                number: "1,250",
                icon: "bx-dollar-circle",
                title: "销售额",
            },
        ],
    });
    const handleFilter = () => {
        console.log("filter");
    };
    const handleSearch = () => {
        console.log("search");
    };
    const handleMoreOptions = () => {
        console.log("more options");
    };
    const handleClickOrder = (id: number) => {
        console.log("order id: ", id);
    };
</script>

<template>
    <main>
        <div class="header">
            <div class="left">
                <h1>总览</h1>
            </div>
        </div>

        <!-- Insights -->
        <Inslights v-model:model-value="data.insights" />
        <!-- End of Insights -->

        <div class="bottom-data">
            <div class="orders">
                <div class="header">
                    <i class="bx bx-receipt"></i>
                    <h3>最近订单</h3>
                    <i
                        class="bx bx-filter"
                        @click="handleFilter"
                    ></i>
                    <i
                        class="bx bx-search"
                        @click="handleSearch"
                    ></i>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>商品信息</th>
                            <th>订单截至时间</th>
                            <th>状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(item, index) in data.orders"
                            :key="index"
                            @click="handleClickOrder(item.id)"
                        >
                            <td>
                                <img :src="item.img" />
                                <p>{{ item.name }}</p>
                            </td>
                            <td>{{ item.date }}</td>
                            <td>
                                <span
                                    class="status"
                                    :class="item.status"
                                    >{{ item.statusMeg }}</span
                                >
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Reminders -->
            <div class="reminders">
                <div class="header">
                    <i class="bx bx-note"></i>
                    <h3>待办事项</h3>
                    <i class="bx bx-filter"></i>
                    <i class="bx bx-plus"></i>
                </div>
                <ul class="task-list">
                    <li
                        :class="item.status ? 'completed' : 'not-completed'"
                        v-for="(item, index) in data.backlog"
                        :key="index"
                    >
                        <div class="task-title">
                            <i
                                class="bx"
                                :class="
                                    item.status
                                        ? 'bx-check-circle'
                                        : 'bx-x-circle'
                                "
                                @click="() => (item.status = !item.status)"
                            ></i>
                            <p>{{ item.title }}</p>
                        </div>
                        <i
                            class="bx bx-dots-vertical-rounded"
                            @click="handleMoreOptions"
                        ></i>
                    </li>
                </ul>
            </div>

            <!-- End of Reminders-->
        </div>
    </main>
</template>

<style lang="scss">
    main {
        width: 100%;
        padding: 36px 24px;
        max-height: calc(100vh - 56px);

        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            flex-wrap: wrap;

            .left {
                h1 {
                    font-size: 36px;
                    font-weight: 600;
                    margin-bottom: 10px;
                    color: $dark;
                }
            }
        }

        .bottom-data {
            display: flex;
            flex-wrap: wrap;
            gap: 24px;
            margin-top: 24px;
            width: 100%;
            color: $dark;

            & > div {
                border-radius: 20px;
                background: $light;
                padding: 24px;
                overflow-x: auto;
            }

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

                bx {
                    cursor: pointer;
                }
            }

            .orders {
                flex-grow: 1;
                flex-basis: 500px;

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
                        border-radius: 50%;
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

            .reminders {
                flex-grow: 1;
                flex-basis: 300px;

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
        }

        @media screen and (max-width: 768px) {
            &.sidebar {
                width: 200px;
            }

            & {
                width: calc(100% - 60px);
                left: 200px;
            }
        }

        @media screen and (max-width: 576px) {
            nav form .form-input input {
                display: none;
            }

            nav form .form-input button {
                width: auto;
                height: auto;
                background: transparent;
                color: $dark;
                border-radius: none;
            }

            nav form.show .form-input input {
                display: block;
                width: 100%;
            }

            nav form.show .form-input button {
                width: 36px;
                height: 100%;
                color: $light;
                background: $danger;
                border-radius: 0 36px 36px 0;
            }

            nav form.show ~ .notif,
            nav form.show ~ .profile {
                display: none;
            }

            .insights {
                grid-template-columns: 1fr;
            }

            .bottom-data .header {
                min-width: 340px;
            }

            .bottom-data .orders table {
                min-width: 340px;
            }

            .bottom-data .reminders .task-list {
                min-width: 340px;
            }
        }
    }
</style>
