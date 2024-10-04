import axios from "axios";
import { ElMessage } from "element-plus";
import { getToken, setToken } from "./token.ts";

const request = axios.create({
    baseURL: "http://127.0.0.1:4523/m1/5227230-0-default",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

request.interceptors.request.use(
    (config) => {
        //如果是注册就不写token
        if (config.url === "/user/register" || config.url === "/user/login") {
            return config;
        }
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.log("request error:", error);
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    (response) => {
        // const res = response.data;

        // if (res.code === 0) {
        //     console.log("response:", res);
        //     return res;
        // } else {
        //     ElMessage({
        //         message: res.msg || "Error",
        //         type: "error",
        //         duration: 5 * 1000,
        //     });
        //     return Promise.reject("0");
        // }
        return response.data;
    },
    (error) => {
        console.log("response error:", error);
        ElMessage({
            message: error.msg || "Error",
            type: "error",
            duration: 5 * 1000,
        });
        // 对响应错误做些什么，例如统一处理错误提示
        // if (axios.isAxiosError(error)) {
        //     console.error('Axios Error:', error.message);
        //     if (error.response) {
        //         // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        //         console.error('Response Data:', error.response.data);
        //         console.error('Response Status:', error.response.status);
        //         console.error('Response Headers:', error.response.headers);
        //     } else if (error.request) {
        //         // 请求已发出，但没有收到任何响应
        //         console.error('Request:', error.request);
        //     } else {
        //         // 在设置请求时发生了一些错误
        //         console.error('Error:', error.message);
        //     }
        // } else {
        //     // 不是 AxiosError
        //     console.error('Unexpected Error:', error);
        // }
        return Promise.reject(error);
    }
);

export default request;
