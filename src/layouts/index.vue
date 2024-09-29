<script setup lang="ts">
import store from '@/store'
import { ref, onMounted, computed } from 'vue'
import { Goods, Setting, ShoppingCart, Tickets } from "@element-plus/icons-vue";
import router from "@/router/router";


//data
const consumerMenu = [
  {
    title: "商品",
    path: '/consumer/shop',
    icon: Goods
  },
  {
    title: "购物车",
    path: '/consumer/trolly',
    icon: ShoppingCart
  },
  {
    title: "订单",
    path: '/consumer/orders',
    icon: Tickets
  },
  {
    title: "个人信息",
    path: '/consumer/profile',
    icon: Setting
  },
]

const merchantMenu = [
  {
    title: '商品管理',
    path: '/merchant/goods'
  },
  {
    title: '订单管理',
    path: '/merchant/orders'
  },
  {
    title: '店铺信息',
    path: '/merchant/detail'
  }
]

const adminMenu = [
  {
    title: '用户管理',
    path: '/admin/userlist'
  },
  {
    title: '商家管理',
    path: '/admin/merchantlist'
  }
]

const role = ref(store.state.userInfo?.role);

//activeIndex 用于记录当前激活的菜单项
const activeIndex = ref('1');
onMounted(() => {
  console.log('mounted');
  setActiveIndex();
});
const setActiveIndex = () => {
  const savedPath = sessionStorage.getItem('activePath');
  if (savedPath) {
    switch (savedPath) {
      case 'consumer/profile':
        activeIndex.value = '4';
        break;
      case 'consumer/orders':
        activeIndex.value = '3';
        break;
      case 'consumer/shop':
        activeIndex.value = '1';
        break;
      default:
        activeIndex.value = '1';
    }
  }
};

//menu 用于根据角色返回不同的菜单
const menu = computed(() => {
  switch (role) {
    case 'consumer':
      return consumerMenu;
    case 'merchant':
      return merchantMenu;
    case 'admin':
      return adminMenu;
    default:
      return consumerMenu;
  }
})

//处理菜单点击事件
const handleMenuClick = (path: string) => {
  sessionStorage.setItem('activePath', path);
  router.push(path);
};
</script>

<template>
  <el-container class="sidebar-container">
    <el-row align="top">
      <el-col :span="24">
        <h5 class="mb-2">Welcome {{ store.state.userInfo?.name }}</h5>
        <el-menu :default-active="activeIndex" background-color="#22aaee" text-color="#fff" router="true">
          <el-menu-item v-for="item in menu" :index="item.path">
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </el-container>
</template>

<style scoped>
.sidebar-container {
  height: 100vh;
  width: 145px;
  background-color: #445566;
  position: fixed;
  overflow-y: auto;
}
</style>

<style lang="less">
.el-menu {
  padding: 20px 0 0 0px;
  background-color: #445566;

  border: 0 !important;
}

.el-menu-item {

  border-radius: 10px;
  border-right: none;
  background-color: #445566;
  outline: none;
  /* Remove any focus outline */
  box-shadow: none;
  /* Remove any box-shadow */
}
</style>
