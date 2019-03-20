import axios from 'axios'
import { Loading } from 'element-ui'
import router from '../router/index'
import Vue from 'vue'
import { baseUrl } from './config'
import utils from '@/utils/utils.js'

var $axios = axios.create({
    baseURL: baseUrl,
    timeout: 6000,
});

let loadingInstance




// 添加请求拦截器
$axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么

    // 携带登陆凭证
    utils.getCookie('adminToken').then(res => {
        config.headers["adminToken"] = res
    })
    

    loadingInstance = Loading.service({ fullscreen: true });
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
})


// 添加响应拦截器
$axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    Vue.prototype.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        loadingInstance.close()
    })

    switch (response.data.status) {
        case 0:
            Vue.prototype.$notify.error({
                title: '错误',
                message: response.data.message,
            });
            break;
        case 1:
            return response.data.data;
            break;
        case 10:
            // 返回 10 登录失败 清除token信息并跳转到登录页面
            Vue.prototype.$notify.error({
                title: '错误',
                message: '登陆已过期，请重新登陆',
            });

            setTimeout(() => {
                router.push('/login');
            }, 1500);
            
            break;
        case 13:
            // 返回 13 重复提交
            response;
            break;
        default:;
            return response // 返回接口返回的错误信息s
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
})




export default $axios