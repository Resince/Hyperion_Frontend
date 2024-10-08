<script setup lang="ts">

</script>

<template>
    <main>
        <div class="header">
            <div class="left">
                <h1>Dashboard</h1>
                <ul class="breadcrumb">
                    <li><a href="#">
                            Analytics
                        </a></li>
                    /
                    <li><a href="#" class="active">Shop</a></li>
                </ul>
            </div>

        </div>

        <!-- Insights -->
        <ul class="insights">
            <li>
                <i class='bx bx-calendar-check'></i>
                <span class="info">
                    <h3>
                        1,074
                    </h3>
                    <p>待付款</p>
                </span>
            </li>
            <li><i class='bx bx-show-alt'></i>
                <span class="info">
                    <h3>
                        3,944
                    </h3>
                    <p>待发货</p>
                </span>
            </li>
            <li><i class='bx bx-line-chart'></i>
                <span class="info">
                    <h3>
                        14,721
                    </h3>
                    <p>待售后</p>
                </span>
            </li>
            <li><i class='bx bx-dollar-circle'></i>
                <span class="info">
                    <h3>
                        $6,742
                    </h3>
                    <p>已完成(件)</p>
                </span>
            </li>
        </ul>
        <!-- End of Insights -->

        <div class="bottom-data">
            <div class="orders">
                <div class="header">
                    <i class='bx bx-receipt'></i>
                    <h3>Recent Orders</h3>
                    <i class='bx bx-filter'></i>
                    <i class='bx bx-search'></i>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Order Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <img src="">
                                <p>John Doe</p>
                            </td>
                            <td>14-08-2023</td>
                            <td><span class="status completed">Completed</span></td>
                        </tr>
                        <tr>
                            <td>
                                <img src=" ">
                                <p>John Doe</p>
                            </td>
                            <td>14-08-2023</td>
                            <td><span class="status pending">Pending</span></td>
                        </tr>
                        <tr>
                            <td>
                                <img src=" ">
                                <p>John Doe</p>
                            </td>
                            <td>14-08-2023</td>
                            <td><span class="status process">Processing</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Reminders -->
            <div class="reminders">
                <div class="header">
                    <i class='bx bx-note'></i>
                    <h3>Remiders</h3>
                    <i class='bx bx-filter'></i>
                    <i class='bx bx-plus'></i>
                </div>
                <ul class="task-list">
                    <li class="completed">
                        <div class="task-title">
                            <i class='bx bx-check-circle'></i>
                            <p>Start Our Meeting</p>
                        </div>
                        <i class='bx bx-dots-vertical-rounded'></i>
                    </li>
                    <li class="completed">
                        <div class="task-title">
                            <i class='bx bx-check-circle'></i>
                            <p>Analyse Our Site</p>
                        </div>
                        <i class='bx bx-dots-vertical-rounded'></i>
                    </li>
                    <li class="not-completed">
                        <div class="task-title">
                            <i class='bx bx-x-circle'></i>
                            <p>Play Footbal</p>
                        </div>
                        <i class='bx bx-dots-vertical-rounded'></i>
                    </li>
                </ul>
            </div>

            <!-- End of Reminders-->

        </div>

    </main>
</template>

<style scoped lang="scss">
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
                color: var(--dark);
            }

            .breadcrumb {
                display: flex;
                align-items: center;
                gap: 16px;

                li {
                    color: var(--dark);

                    a {
                        color: var(--dark-grey);
                        pointer-events: none;

                        &.active {
                            color: var(--primary);
                            pointer-events: none;
                        }
                    }
                }
            }
        }
    }

    .insights {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 24px;
        margin-top: 36px;


        li {
            padding: 24px;
            background: var(--light);
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
                background: var(--light-primary);
                color: var(--primary);
            }

            &:nth-child(2) .bx {
                background: var(--light-warning);
                color: var(--warning);
            }

            &:nth-child(3) .bx {
                background: var(--light-success);
                color: var(--success);
            }

            &:nth-child(4) .bx {
                background: var(--light-danger);
                color: var(--danger);
            }

            .info h3 {
                font-size: 24px;
                font-weight: 600;
                color: var(--dark);
            }

            .info p {
                color: var(--dark);
            }
        }
    }

    .bottom-data {
        display: flex;
        flex-wrap: wrap;
        gap: 24px;
        margin-top: 24px;
        width: 100%;
        color: var(--dark);

        &>div {
            border-radius: 20px;
            background: var(--light);
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
                    border-bottom: 1px solid var(--grey);
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
                    background: var(--grey);
                }

                tr td .status {
                    font-size: 10px;
                    padding: 6px 16px;
                    color: var(--light);
                    border-radius: 20px;
                    font-weight: 700;
                }

                tr td .status.completed {
                    background: var(--success);
                }

                tr td .status.process {
                    background: var(--primary);
                }

                tr td .status.pending {
                    background: var(--warning);
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
                    background: var(--grey);
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
                        border-left: 10px solid var(--success);
                    }

                    &.not-completed {
                        border-left: 10px solid var(--danger);
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
            color: var(--dark);
            border-radius: none;
        }

        nav form.show .form-input input {
            display: block;
            width: 100%;
        }

        nav form.show .form-input button {
            width: 36px;
            height: 100%;
            color: var(--light);
            background: var(--danger);
            border-radius: 0 36px 36px 0;
        }

        nav form.show~.notif,
        nav form.show~.profile {
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
