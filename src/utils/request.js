import axios from 'axios'
import  ResponseCode  from './responseCode';

import {toast} from '@/components/ui/toast/use-toast'


const request =axios.create({
    baseURL: 'http://172.29.35.118:8080/',
    timeout: 5000,
    headers:{
        'Content-Type': 'application/json'
    },

});

request.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem('token');
        if(token){
            config.headers.Authorization =`Bearer ${token}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    (response)=>{
        // const {code,message,data}=response.data;
        const res=response.data;

        if(res.code==ResponseCode.SUCCESS)
        {
            return data;
        }else {
            // toast({
            //     title: 'Uh oh! Something went wrong.',
            //     description: 'There was a problem with your request.',
            // });
            console.error(res.message);
            return Promise.reject(new Error(res.message));
        }
        // return response;
    },
    (error)=>{
        // 对响应错误做些什么，例如统一处理错误提示
        if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.message);
            if (error.response) {
                // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                console.error('Response Data:', error.response.data);
                console.error('Response Status:', error.response.status);
                console.error('Response Headers:', error.response.headers);
            } else if (error.request) {
                // 请求已发出，但没有收到任何响应
                console.error('Request:', error.request);
            } else {
                // 在设置请求时发生了一些错误
                console.error('Error:', error.message);
            }
        } else {
            // 不是 AxiosError
            console.error('Unexpected Error:', error);
        }
        return Promise.reject(error);

    }
);

export default request;
