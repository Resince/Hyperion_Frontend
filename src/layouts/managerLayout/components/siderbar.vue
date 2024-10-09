<script setup lang="ts">
    import { ref } from "vue";
    const isclose = ref(true);
    const isActive = ref(false);
    const toggleIsClose = () => {
        isclose.value = !isclose.value;
    };
    const toggleIsActive = () => {
        isActive.value = !isActive.value;
    };
</script>

<template>
    <div
        class="sidebar"
        :class="{ close: isclose }"
    >
        <a
            href="/merchant"
            class="logo"
        >
            <i class="bx bx-code-alt"></i>
            <div class="logo-name"><span>Asmr</span>Prog</div>
        </a>
        <ul class="side-menu">
            <li>
                <a href="#"><i class="bx bxs-dashboard"></i>总览</a>
            </li>
            <li>
                <a href="#"><i class="bx bx-store-alt"></i>商品</a>
            </li>
            <li
                :class="{ active: isActive }"
                @click="toggleIsActive"
            >
                <a href="#"><i class="bx bx-analyse"></i>交易</a>
            </li>
            <li>
                <a href="#"><i class="bx bx-message-square-dots"></i>交易</a>
            </li>
            <li>
                <a href="#"><i class="bx bx-group"></i>Users</a>
            </li>
            <li>
                <a href="#"><i class="bx bx-cog"></i>Settings</a>
            </li>
        </ul>
        <ul class="side-menu">
            <li>
                <a
                    href="#"
                    class="logout"
                >
                    <i class="bx bx-log-out-circle"></i>
                    Logout
                </a>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
    @import url(https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css);
    .sidebar {
        position: sticky;
        top: 0;
        left: 0;
        background: $light;
        width: 230px;
        height: 100%;
        z-index: 2000;
        overflow-x: hidden;
        scrollbar-width: none;
        transition: all 0.3s ease;
        &::-webkit-scrollbar {
            display: none;
        }
        &.close {
            width: 60px;
        }
        .logo {
            font-size: 24px;
            font-weight: 700;
            height: 56px;
            display: flex;
            align-items: center;
            color: $primary;
            z-index: 500;
            padding-bottom: 20px;
            box-sizing: content-box;
            .logo-name span {
                color: $dark;
            }
        }

        .bx {
            min-width: 60px;
            display: flex;
            justify-content: center;
            font-size: 2.2rem;
        }
        .side-menu {
            width: 100%;
            margin-top: 48px;
            li {
                height: 48px;
                background: transparent;
                margin-left: 6px;
                border-radius: 48px 0 0 48px;
                padding: 4px;
                &.active {
                    background: $grey;
                    position: relative;
                    &::before {
                        content: "";
                        position: absolute;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        top: -40px;
                        right: 0;
                        box-shadow: 20px 20px 0 $grey;
                        z-index: -1;
                    }
                    &::after {
                        content: "";
                        position: absolute;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        bottom: -40px;
                        right: 0;
                        box-shadow: 20px -20px 0 $grey;
                        z-index: -1;
                    }
                    a {
                        color: $success;
                    }
                }
                a {
                    width: 100%;
                    height: 100%;
                    background: $light;
                    display: flex;
                    align-items: center;
                    border-radius: 48px;
                    font-size: 16px;
                    color: $dark;
                    white-space: nowrap;
                    overflow-x: hidden;
                    transition: all 0.3s ease;
                    .bx {
                        min-width: calc(60px - ((4px + 6px) * 2));
                        display: flex;
                        font-size: 1.6rem;
                        justify-content: center;
                    }
                    &.logout {
                        color: $danger;
                    }
                }
            }
        }
        &.close .side-menu li a {
            width: calc(48px - (4px * 2));
            transition: all 0.3s ease;
        }
    }
</style>
