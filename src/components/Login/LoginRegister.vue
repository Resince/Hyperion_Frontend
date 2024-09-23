<script setup lang="ts">
import {reactive, ref} from 'vue';
import request from '@/utils/request';
import {ElMessage} from "element-plus";

const activeTab = ref('login');
const registerData = ref({
  username: '',
  password: '',
  email: '',
  confirmPassword: '',
  usertype: '',
});
const loginData = ref({
  username: '',
  password: '',
});
const handleTabClick = (tab) => {
  registerData.value.username = '';
  registerData.value.password = '';
  registerData.value.email = '';
  registerData.value.confirmPassword = '';
  registerData.value.usertype = '';
};
function validateConfirmPassword(rule, value, callback) {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== registerData.value.password) {
    callback(new Error('两次输入密码不一致'));
  } else {
    callback();
  }
}
const registerRules=reactive(
    {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
      ],
      email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
      ],
      confirmPassword: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        { validator: validateConfirmPassword, trigger: 'blur' }
      ],
      usertype: [
        { required: true, message: '请选择用户类型', trigger: 'change' }
      ]
    }
)

const ToLogin = () => {
  console.log('loginData', loginData.value);
  request.post('/login', loginData.value).then((res) => {
    console.log(res);
  }).catch((error) => {
    console.log(error);
    ElMessage.error('登录失败');
  });
};

const ToRegister = () => {
  console.log('registerData', registerData.value);
  request.post('/register', registerData.value).then((res) => {
    console.log(res);
  }).catch((error) => {
    console.log(error);
    ElMessage.error('注册失败');
  });
};

</script>


<template>
  <div class="page-container">
    <div class="image-container">
      <img src="@/assets/wallpaper2.png" alt="Description of image" />
    </div>

  <div class="loginregister-container">
    <el-tabs v-model="activeTab" @tab-click="handleTabClick" class="w-5/6 space-y-6">
      <el-tab-pane label="登录" name="login">
        <el-form :model="loginData"  label-width="60px">
          <el-form-item label="用户名">
            <el-input v-model="loginData.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="loginData.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="ToLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="register">
        <el-form :model="registerData" :rules="registerRules"   label-width="70px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="registerData.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerData.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="registerData.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="registerData.confirmPassword" type="password" placeholder="请确认密码"></el-input>
          </el-form-item>
          <el-form-item label="用户类型" prop="usertype">
            <el-radio-group v-model="registerData.usertype">
              <el-radio value="user" size="large" >用户</el-radio>
              <el-radio value="merchant" size="large">商家</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="ToRegister">注册</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
  </div>
</template>



<style scoped>
.page-container {
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
}

.image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container img {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
}

.loginregister-container {
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
</style>
