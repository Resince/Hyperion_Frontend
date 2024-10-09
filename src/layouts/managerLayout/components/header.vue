<script setup lang="ts">
    import { ref } from "vue";
    import userIcon from "@/assets/icons/userIcon.vue";
    defineProps({
        searchPlaceholder: {
            type: String,
            default: "Search...",
        },
    });
    // TODO 之后完善搜索逻辑
    const search = ref("");
    const handleSearch = () => {
        console.log(search.value);
    };
    const data = ref({
        bellCount: 0,
    });
    const handleBellClick = () => {
        console.log("bell");
    };
    const handleProfile = () => {
        console.log("profile");
    };
</script>

<template>
    <nav class="content-nav">
        <i
            class="bx bx-menu"
            @click="$emit('toggleSidebar')"
        ></i>
        <form>
            <div class="form-input">
                <input
                    type="search"
                    :placeholder="searchPlaceholder"
                    v-model="search"
                />
                <button
                    class="search-btn"
                    type="submit"
                    @click="handleSearch"
                >
                    <i class="bx bx-search"></i>
                </button>
            </div>
        </form>
        <a
            @click="handleBellClick"
            class="notif"
        >
            <i class="bx bx-bell"></i>
            <span class="count">{{ data.bellCount }}</span>
        </a>
        <a
            class="profile"
            @click="handleProfile"
        >
            <userIcon
                width="25px"
                height="25px"
            />
        </a>
    </nav>
</template>

<style lang="scss">
    nav.content-nav {
        height: 56px;
        background: $light;
        padding: 0 24px 0 0;
        display: flex;
        align-items: center;
        grid-gap: 24px;
        position: sticky;
        top: 0;
        left: 0;
        z-index: 1000;
        &::before {
            content: "";
            position: absolute;
            width: 40px;
            height: 40px;
            bottom: -40px;
            left: 0;
            border-radius: 50%;
            box-shadow: -20px -20px 0 $light;
        }
        a {
            color: $dark;
        }
        .bx.bx-menu {
            cursor: pointer;
            color: $dark;
        }
        form {
            max-width: 400px;
            width: 100%;
            margin-right: auto;
            .form-input {
                display: flex;
                align-items: center;
                height: 36px;
                input {
                    flex-grow: 1;
                    padding: 0 16px;
                    height: 100%;
                    border: none;
                    background: $grey;
                    border-radius: 36px 0 0 36px;
                    outline: none;
                    width: 100%;
                    color: $dark;
                }
                button {
                    width: 80px;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: $primary;
                    color: $light;
                    font-size: 18px;
                    border: none;
                    outline: none;
                    border-radius: 0 36px 36px 0;
                    cursor: pointer;
                }
            }
        }
        .notif {
            font-size: 20px;
            position: relative;
            .count {
                position: absolute;
                top: -6px;
                right: -6px;
                width: 20px;
                height: 20px;
                background: $danger;
                border-radius: 50%;
                color: $light;
                border: 2px solid $light;
                font-weight: 700;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
        .profile {
            cursor: pointer;
            padding-bottom: 6px;
        }
    }
</style>
