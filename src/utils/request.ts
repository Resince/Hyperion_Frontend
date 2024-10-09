import 'nprogress/nprogress.css';

import router from '@/router/index.ts';
import axios from 'axios';
import {ElMessage} from 'element-plus';
import nProgress from 'nprogress';

import {getToken, removeToken} from './cache.ts';
import {getError} from './errorTable.ts';

// 暂时没有后端接口，所以这里的baseurl是空的
const baseurl: string = import.meta.env.DEV ?
    'http://127.0.0.1:4523/m1/5249404-4917197-default' :
    '';

const request = axios.create({
  baseURL: baseurl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use(
    (config) => {
      // 如果是注册就不写token
      if (config.url === '/user/register' || config.url === '/user/login') {
        return config;
      }
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      nProgress.start();
      return config;
    },
    (error) => {
      console.log('request error:', error);
      return Promise.reject(error);
    });

request.interceptors.response.use(
    (response) => {
      // 对响应数据做点什么
      const {code, message} = response.data;
      if (code !== 0) {
        console.log('loginRes.code', code);
        const msg = message ? message : getError(code.toString());
        ElMessage.error(msg);
      }
      nProgress.done();
      return response.data;
    },
    (error) => {
      // 对响应错误做点什么
      if (error.response?.status === 401) {
        ElMessage.error('登录过期，请重新登录');
        removeToken();
        router.push('/login');
      } else if (error.response?.status === 404) {
        ElMessage.error('请求资源不存在');
      } else if (error.response?.status === 400) {
        ElMessage.error('请求有误');
      } else {
        ElMessage.error('请求失败');
      }
      nProgress.done();
      return Promise.reject(error);
    });

export default request;
