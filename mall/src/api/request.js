// 对axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
// 引入store
import store from "@/store";
// 引入进度条样式
import "nprogress/nprogress.css";

// 利用axios对象的create方法创建一个axios实例
const request = axios.create({
    // 配置对象
    // 基础路径，发送请求，路径会出现api
    baseURL:"/api",
    // 请求超时
    timeout:5000,
});
// 请求拦截器
request.interceptors.request.use(config=>{
    // config：配置对象，包含一个headers请求头
    if(store.state.detail.uuid_token){
        // 请求头添加一个字段(userTempId),字段名称由后端指定
        config.headers.userTempId=store.state.detail.uuid_token;
    }
    // 携带token
    if(store.state.user.token){
        config.headers.token=store.state.user.token;
    }
    // 进度条开始
    nprogress.start();
    return config;
});

// 响应拦截器
request.interceptors.response.use(res=>{
    // 成功的回调
    // 进度条结束
    nprogress.done();
    return res.data;
},error=>{
    // 失败回调
    return Promise.reject(new Error('false'));
});



// 对外暴露
export default request;