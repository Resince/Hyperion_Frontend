<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();

interface Props {
  name: string;
}
const props = defineProps<Props>();

const activeIndex = ref('1');

const setActiveIndex = () => {
  const savedPath = sessionStorage.getItem('activePath');
  if (savedPath) {
    switch (savedPath) {
      case '/consumer/profile':
        activeIndex.value = '4';
        break;
      case '/consumer/orders':
        activeIndex.value = '3';
        break;
      case '/consumer/shop':
        activeIndex.value = '1';
        break;
      default:
        activeIndex.value = '1';
    }
  }
};

const handleMenuClick = (path: string, index: string) => {
  sessionStorage.setItem('activePath', path);
  activeIndex.value = index;
  router.push(path);
};

onMounted(() => {
  setActiveIndex();
});
</script>

<template>
  <el-row class="sidebar-container">
    <el-col :span="24">
      <h5 class="mb-2">Welcome {{ props.name }}</h5>
      <el-menu :default-active="activeIndex" class="el-menu-vertical-demo">
        <el-menu-item index="1" @click="handleMenuClick('/consumer/shop', '1')">
          <el-icon><icon-menu /></el-icon>
          <span>商品</span>
        </el-menu-item>
        <el-menu-item index="2" @click="handleMenuClick('/consumer/trolly', '2')">
          <el-icon><document /></el-icon>
          <span>购物车</span>
        </el-menu-item>
        <el-menu-item index="3" @click="handleMenuClick('/consumer/orders', '3')">
          <el-icon><setting /></el-icon>
          <span>订单</span>
        </el-menu-item>
        <el-menu-item index="4" @click="handleMenuClick('/consumer/profile', '4')">
          <el-icon><location /></el-icon>
          <span>个人信息</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<style scoped>
.sidebar-container {
  height: 100vh;
  width: 200px;
  background-color: #ebecf1;
  border-right: 1px solid #dcdcdc;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
}
</style>
