<script setup lang="ts">
    import { onMounted } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import LightningIcon from "@/assets/icons/lightingIcon.vue";
    import ClotheIcon from "@/assets/icons/clotheIcon.vue";
    import DigtalIcon from "@/assets/icons/digtalIcon.vue";
    import FurnitureIcon from "@/assets/icons/furnitureIcon.vue";
    import CosmeticIcon from "@/assets/icons/cosmeticIcon.vue";
    import FoodIcon from "@/assets/icons/foodIcon.vue";
    import BooksIcon from "@/assets/icons/booksIcon.vue";
    // todo:
    // 使用：该页面跳转传递参数 id 该参数代表不同的类别
    // 利用参数对后端返回的数据进行分类
    // 商品页面，对数进行分类并进行展示和排行

    //data
    const category = [
        {
            title: "新加入",
            path: "/consumer/home/new",
            icon: LightningIcon,
        },
        {
            title: "服装",
            path: "/consumer/home/clothes",
            icon: ClotheIcon,
        },
        {
            title: "数码",
            path: "/consumer/home/digtal",
            icon: DigtalIcon,
        },
        {
            title: "家居",
            path: "/consumer/home/furniture",
            icon: FurnitureIcon,
        },
        {
            title: "美妆",
            path: "/consumer/home/cosmetic",
            icon: CosmeticIcon,
        },
        {
            title: "食品",
            path: "/consumer/home/food",
            icon: FoodIcon,
        },
        {
            title: "图书",
            path: "/consumer/home/books",
            icon: BooksIcon,
        },
    ];

    const isInvalidPath = () => {
        const route = useRoute();
        const c = route.params.category;
        category.map((i) => {
            if (i.path.split("/")[3] === c) {
                return true;
            }
        });
        return false;
    };

    const router = useRouter();

    onMounted(() => {
        if (isInvalidPath()) {
            router.push({ name: "404" });
        }
    });
</script>

<template>
    <el-aside class="sidebar-container">
        <div class="logo">
            <img
                loading="lazy"
                src="@/assets/logo_transparent.png"
            />
        </div>
        <p class="title">探索</p>
        <el-menu
            :default-active="$route.path"
            :router="true"
        >
            <el-menu-item
                v-for="item in category"
                :index="item.path"
            >
                <el-icon>
                    <component :is="item.icon" />
                </el-icon>
                <span>{{ item.title }}</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<style lang="scss">
    .sidebar-container {
        height: 100vh;
        width: 100%;
        overflow: hidden;
        background-color: $cus_white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-right: 1px solid $cus_line-grey;

        .logo {
            margin: 30px auto 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                width: 60%;
                object-fit: contain;
                scale: 1.8;
            }
        }

        .title {
            margin: 10px 0px 20px 0px;
            position: relative;
            left: -15px;
            font-size: 30px;
            font-weight: bolder;
        }
        .el-menu {
            margin-left: 40px;
            width: 100%;
            height: 100%;
            margin-top: 0px;
            display: flex;
            flex-direction: column;
            .el-menu-item {
                font-size: 15px;
                height: 11%;
                padding-left: 40px !important;
                width: 100%;
                border-radius: 10px;
                display: flex;
                gap: 14px;
            }
        }
    }
</style>
