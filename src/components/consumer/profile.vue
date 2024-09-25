<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';

const isEditing = ref(false);
const userInfo = reactive({
  name: '张三',
  address: '北京市朝阳区',
  phone: '12345678901',
});

const updateUserInfo = () => {
  // TODO: 发送更新用户信息请求到后端
  // ...
  ElMessage({
    message: '用户信息更新成功',
    type: 'success',
  });
  isEditing.value = false;
};

const cancelEdit = () => {
  isEditing.value = false;
};

</script>

<template>
  <div class="user-info">
    <div v-if="!isEditing">
      <p>姓名: {{ userInfo.name }}</p>
      <p>地址: {{ userInfo.address }}</p>
      <p>电话: {{ userInfo.phone }}</p>
      <el-button type="primary" @click="isEditing = true">修改</el-button>
    </div>
    <div v-else>
      <el-form :model="userInfo" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="userInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="userInfo.address"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="userInfo.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateUserInfo">更新</el-button>
          <el-button @click="cancelEdit">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.user-info {
  width: 400px;
  margin: 50px auto auto auto;
  //margin-top: 20px;
  height: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.user-info p {
  margin-bottom: 10px;
}
</style>
