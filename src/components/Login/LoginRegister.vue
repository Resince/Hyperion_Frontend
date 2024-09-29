<script setup lang="ts">
import {reactive, ref} from 'vue';
import request from '@/utils/request';
import {ElMessage} from "element-plus";
import store from "@/store";

const activeTab = ref('login');
import Md5 from 'crypto-js/md5';
import router from "@/router/router";
import {UserInfo} from "@/types/user";
const registerData = ref({
  name: '',
  tel:'',
  pass: '',
  email: '',
  confirmPassword: '',
  role: "",
});
const loginData = ref({
  tel: '',
  pass: '',
  role: ''
});
const handleTabClick = (tab) => {
  registerData.value.name = '';
  registerData.value.tel='';
  registerData.value.pass = '';
  registerData.value.email = '';
  registerData.value.confirmPassword = '';
  registerData.value.role = '';
};
function validateConfirmPassword(rule, value, callback) {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== registerData.value.pass) {
    callback(new Error('两次输入密码不一致'));
  } else {
    callback();
  }
}
const registerRules=reactive(
    {
      name: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
      ],
      tel:[
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
      ],
      pass: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/ , message: '密码必须包含数字和字母，且长度在6-16位之间', trigger: 'blur' }
      ],
      email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
      ],
      confirmPassword: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        { validator: validateConfirmPassword, trigger: 'blur' }
      ],
      role: [
        { required: true, message: '请选择用户类型', trigger: 'change' }
      ]
    }
)

const loginFormRef=ref(null)
const registerFormRef=ref(null)

const loginRules=reactive(
    {
      tel:[
        // { required: true, message: '请输入手机号', trigger: 'blur' },
        { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
      ],
      role: [
        { required: true, message: '请选择用户类型', trigger: 'change' }
      ]
    }
)
const ToLogin = async (form: any | undefined) => {
  if (!form) return;
  await form.validate((valid: boolean, fields: any) => {
    if (valid) {
      // console.log('loginData', loginData.value);
      if (loginData.value.tel === '' || loginData.value.password === '') {
        ElMessage.error('请输入手机号和密码');
        return;
      }
      const temp={...loginData.value};
      temp.pass=Md5(loginData.value.pass).toString();
      console.log('temp', temp);
      request.post('/user/login', temp).then((res) => {
        console.log(res);
        //TODO: FIX
        const id=res.data.id;
        const token = res.data.token;
        const name= res.data.name;
        const role= res.data.role;
        const userinfo: UserInfo={id,name,role,token};
        localStorage.setItem('token', token);
        store.dispatch('saveUserInfo', userinfo);
        console.log('userinfo::', userinfo);

        if(role === 'MERCHANT') router.push('/merchant');
        else router.push('/consumer');

      }).catch((error) => {
        console.log(error);
        ElMessage.error('登录失败');
      });
    } else {
      ElMessage.error('Wrong input');
    }
  });
};

const ToRegister = async (form: any | undefined) => {
  if (!form) return;
  await form.validate((valid: boolean, fields: any) => {
    if (valid) {
      const temp={...registerData.value};
      console.log('registerData', registerData.value);
      temp.pass = Md5(registerData.value.pass).toString();
      // console.log("form: " ,form);
      // console.log('test md5', registerData.value.pass);
      console.log('temp', temp);
      request.post('/user/register', temp).then((res) => {
        console.log(res);
      }).catch((error) => {
        console.log(error);
        ElMessage.error('注册失败');
      });
    } else {
      ElMessage.error('Wrong input');
    }
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
      <el-tab-pane label="登录" name="login" class="m-3">
        <el-form :model="loginData"  label-width="70px" :rules="loginRules" ref="loginFormRef">
          <el-form-item label="手机号" prop="tel">
            <el-input v-model="loginData.tel" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input v-model="loginData.pass" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="用户类型" prop="role">
            <el-radio-group v-model="loginData.role">
              <el-radio value="CONSUMER" size="large" >用户</el-radio>
              <el-radio value="MERCHANT" size="large">商家</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="ToLogin(loginFormRef)">登录</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="register" class="m-3">
        <el-form :model="registerData" :rules="registerRules"   label-width="80px" ref="registerFormRef">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="registerData.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="tel">
            <el-input v-model="registerData.tel" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerData.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input v-model="registerData.pass" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="registerData.confirmPassword" type="password" placeholder="请确认密码"></el-input>
          </el-form-item>
          <el-form-item label="用户类型" prop="role">
            <el-radio-group v-model="registerData.role">
              <el-radio value="CONSUMER" size="large" >用户</el-radio>
              <el-radio value="MERCHANT" size="large">商家</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="ToRegister(registerFormRef)">注册</el-button>
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
  flex : 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
}
</style>
