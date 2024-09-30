<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import request from "@/utils/request";

const isEditing = ref(false);
const userInfo = ref({
    name: '',
    id: '',
    address: '',
    tel: '',
    email: ''
});

onMounted(() => {
    request.get('/user/get').then((res) => {
        // const res =  request.get('/user/get');
        console.log(res);
        userInfo.value.id = res.data.id;
        userInfo.value.name = res.data.name;
        userInfo.value.tel = res.data.tel;
    });
});

//后端获取用户数据


const updateUserInfo = () => {
    // TODO: 发送更新用户信息请求到后端


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
            <p>电话: {{ userInfo.tel }}</p>
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
                    <el-input v-model="userInfo.tel"></el-input>
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
    height: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.user-info p {
    margin-bottom: 10px;
}
</style>
