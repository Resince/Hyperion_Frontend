<script setup lang="ts"></script>

<template>
    <nav class="content-nav">
        <i class="bx bx-menu"></i>
        <form action="#">
            <div class="form-input">
                <input
                    type="search"
                    placeholder="Search..."
                />
                <button
                    class="search-btn"
                    type="submit"
                >
                    <i class="bx bx-search"></i>
                </button>
            </div>
        </form>
        <input
            type="checkbox"
            id="theme-toggle"
            hidden
        />
        <label
            for="theme-toggle"
            class="theme-toggle"
        ></label>
        <a
            href="#"
            class="notif"
        >
            <i class="bx bx-bell"></i>
            <span class="count">12</span>
        </a>
        <a
            href="#"
            class="profile"
        >
            <img src="" />
        </a>
    </nav>
</template>

<style scoped lang="scss">
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
        .bx &.bx-menu {
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
        .profile img {
            width: 36px;
            height: 36px;
            object-fit: cover;
            border-radius: 50%;
        }
        .theme-toggle {
            display: block;
            min-width: 50px;
            height: 25px;
            background: $grey;
            cursor: pointer;
            position: relative;
            border-radius: 25px;
            &::before {
                content: "";
                position: absolute;
                top: 2px;
                left: 2px;
                bottom: 2px;
                width: calc(25px - 4px);
                background: $primary;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
        }
        #theme-toggle &:checked + .theme-toggle &::before {
            left: calc(100% - (25px - 4px) - 2px);
        }
    }
</style>
