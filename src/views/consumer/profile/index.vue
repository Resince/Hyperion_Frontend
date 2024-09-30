<script setup lang="ts">
import {ref, reactive, onMounted, watch} from 'vue';
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
        // console.log(res);
        userInfo.value.id = res.data.id;
        userInfo.value.name = res.data.name;
        userInfo.value.tel = res.data.tel;
    });
//TODO: 获取用户地址信息

});



const updateUserInfo = () => {
    // TODO: 发送更新用户信息请求到后端, 更新用户信息


    ElMessage({
        message: '用户信息更新成功',
        type: 'success',
    });
    isEditing.value = false;
};

const cancelEdit = () => {
    isEditing.value = false;
};
const edit = () => {
    isEditing.value = true;
    fetchProvinces();
};


const provinces = ref([]);
const cities = ref([]);
const districts = ref([]);
const details=ref('');
const selectedProvince = ref('');
const selectedCity = ref('');
const selectedDistrict = ref('');
const fetchProvinces = () => {
  request.get('/area/list',{ params: {parentId:0} }).then((res) => {
    console.log(res);
    provinces.value = res.data;
  });
};
const fetchCities = (provinceId) => {
  request.get('/area/list',{ params: {parentId:provinceId} }).then((res) => {
    console.log(res);
    cities.value = res.data;
  });
};
const fetchDistricts = (cityId) => {
  request.get('/area/list',{ params: {parentId:cityId} }).then((res) => {
    console.log(res);
    districts.value = res.data;
  });
};
watch(selectedProvince, (newVal) => {
  if (newVal) {
    fetchCities(newVal);
  }
});
watch(selectedCity, (newVal) => {
  if (newVal) {
    fetchDistricts(newVal);
  }
});



</script>

<template>
    <div class="user-info">
        <div v-if="!isEditing">
            <p>姓名: {{ userInfo.name }}</p>
            <p>地址: {{ userInfo.address }}</p>
            <p>电话: {{ userInfo.tel }}</p>
            <el-button type="primary" @click="edit">修改</el-button>
        </div>
        <div v-else>
            <el-form :model="userInfo" label-width="80px">
                <el-form-item label="姓名">
                    <el-input v-model="userInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                  <el-select v-model="selectedProvince" placeholder="选择省">
                    <el-option v-for="province in provinces" :key="province.id" :label="province.name" :value="province.id"></el-option>
                  </el-select>
                  <el-select v-model="selectedCity" placeholder="选择市" :disabled="!selectedProvince">
                    <el-option v-for="city in cities" :key="city.id" :label="city.name" :value="city.id"></el-option>
                  </el-select>
                  <el-select v-model="selectedDistrict" placeholder="选择区" :disabled="!selectedCity">
                    <el-option v-for="district in districts" :key="district.id" :label="district.name" :value="district.id"></el-option>
                  </el-select>
                      <el-input v-model="details"></el-input>
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
