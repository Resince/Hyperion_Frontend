<script setup lang="ts">
    import { useStore } from "@/store";
    import { onMounted, PropType, ref } from "vue";
    import { useRoute, useRouter } from "vue-router";
    const props = defineProps({
        isclose: Boolean,
        sideMenuList: Array as PropType<sideMenuType[]>,
    });
    type sideMenuType = {
        name: string;
        icon: string;
        link: string;
    };
    const activeIndex = ref(0);
    const route = useRoute();
    const toggleIsActive = (index: number) => {
        activeIndex.value = index;
    };
    const store = useStore();
    const router = useRouter();
    const handleLogout = () => {
        store.commit("loginModule/logout");
        router.push({ name: "LoginRegister" });
    };
    onMounted(() => {
        // 根据路由地址设置当前激活的菜单
        if (!props.sideMenuList) return;
        const index = props.sideMenuList.findIndex(
            (item) => item.link === route.path
        );
        activeIndex.value = index;
    });
</script>

<template>
    <div
        class="sidebar"
        :class="{ close: props.isclose }"
    >
        <a
            href="/merchant"
            class="logo"
        >
            <i class="bx bx-code-alt"></i>
            <div class="logo-name"><span>Hype</span>Rion</div>
        </a>
        <ul class="side-menu">
            <li
                v-for="(item, index) in sideMenuList"
                :key="index"
                :class="{ active: index == activeIndex }"
            >
                <a
                    @click="toggleIsActive(index)"
                    v-bind:href="item.link"
                    ><i
                        class="bx"
                        :class="item.icon"
                    ></i
                    ><span>{{ item.name }}</span></a
                >
            </li>
        </ul>
        <ul class="side-menu">
            <li>
                <a
                    class="logout"
                    @click="handleLogout"
                >
                    <i class="bx bx-log-out-circle"></i>
                    <span>Logout</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<style lang="scss">
    @import url(https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css);
    .sidebar {
        position: fixed;
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
                margin-top: 10px;
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
                    font-size: 17px;
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
                    span {
                        margin-left: 6px;
                    }
                    &.logout {
                        color: $danger;
                    }
                }
            }
            .logout {
                cursor: pointer;
            }
        }
        &.close .side-menu li a {
            width: calc(48px - (4px * 2));
            transition: all 0.3s ease;
        }
        & > .side-menu:last-child {
            position: absolute;
            bottom: 10px;
            left: 5px;
        }
    }
</style>
