<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
interface Props {
  name: string
}
const props=defineProps<Props>();
</script>

<template>
  <el-row class="sidebar-container">
    <el-col :span="24">
      <h5 class="mb-2">Welcome {{props.name}}</h5>
      <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
      >

        <el-menu-item index="1">
          <el-icon><icon-menu /></el-icon>
          <span>商品</span>
        </el-menu-item>

        <el-menu-item index="2">
          <el-icon><document /></el-icon>
          <span>购物车</span>
        </el-menu-item>

        <el-menu-item index="3">
          <el-icon><setting /></el-icon>
          <span>订单</span>
        </el-menu-item>

        <el-menu-item index="4">
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
