import router from '../router'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
// import { loadingInstance } from '../config/commentData';
import Storager from "../utils/storage.ts"
import { Loading, MessageBox } from 'element-ui';
// export const loadingInstance = Loading.service({ fullscreen: true });
// http://www.php.cn/js-tutorial-394589.html

// 响应时间
axios.defaults.timeout = 5 * 1000

// 配置cookie
axios.defaults.withCredentials = true

// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 静态资源
Vue.prototype.$static = "../assets"

// 配置接口地址
// axios.defaults.baseURL = 'http://api.douban.com/v2';

// 添加请求拦截器
axios.interceptors.request.use(
    config => {
        Loading.service({ fullscreen: true });

        if (config.method === 'post') {
            config.data = qs.stringify(config.data);
            config.headers = {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "x-requested-with,content-type"
            }
        }

        // 指定允许其他域名访问
        // config.headers.common["Access-Control-Allow-Origin"] = "*";

        if (config.needAuth) {
            var isAuth = Storager.isAuth();
            var token = Storager.get('token');
            if (!isAuth) {
                router.replace({
                    path: '/login',
                    query: { redirect: router.currentRoute.fullPath }
                })
            }
            config.headers["Authorization"] = 'Token ' + token;
        }
        console.log("config well")
        return config
    },

    err => {
        console.log(err);
        Loading.service({ fullscreen: true }).close();
        MessageBox.alert("处理失败");
        return Promise.reject(err);
    }

)

// 添加响应拦截器
axios.interceptors.response.use(
    res => {
        Loading.service({ fullscreen: true }).close();
        if (res.status === 200 || res.status === 201) {
            if (res.data.code === 404) {
                MessageBox.alert("请求地址错误");
                return Promise.reject(res);
            } else if (res.data.code === 401) {
                MessageBox.alert("请登陆后操作");
                router.replace({
                    path: '/login',
                    query: { redirect: router.currentRoute.fullPath }
                })
            }

            return Promise.resolve(res);
        } else {
            MessageBox.alert("处理失败");
            return Promise.reject(res);
        }
    },
    err => {
        Loading.service({ fullscreen: true }).close();
        MessageBox.alert("处理失败");
        return Promise.reject(err)
    }

)

// 发送请求

export function post(url, params = NaN, needAuth = true) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, params, needAuth)
            .then(
                res => {
                    resolve(res.data)
                },
                err => {
                    reject(err.data)
                }
            )
            .catch(err => {
                reject(err.data)
            })
    })

}

export function get(url, params = {}, needAuth = true) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {params: params, needAuth: needAuth})
            .then(
                res => {
                    resolve(res.data);
                },
                err => {
                    reject(err.data);
                }
            )
            .catch(
                err => {
                    reject(err.data);
                }
            )
    })
}


export function put(url, params = NaN, needAuth = true) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, params, needAuth)
            .then(
                res => {
                    resolve(res.data)
                },
                err => {
                    reject(err.data)
                }
            )
            .catch(err => {
                reject(err.data)
            })
    })

}

export function remove(url, params = NaN, needAuth = true) {
    return new Promise((resolve, reject) => {
        axios.delete(url, {
            params: params
        }, needAuth).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// const generalRequest = (method, url, data, successCallback, requestOpt) => request(Object.assign({
//     method: method,
//     url: url,
//     data: data,
//     success: successCallback,
// }, requestOpt));



// const get = (url, data, successCallback, requestOpt) => generalRequest('GET', url, data, successCallback, requestOpt);
// const post = (url, data, successCallback, requestOpt) => generalRequest('POST', url, data, successCallback, requestOpt);
// const put = (url, data, successCallback, requestOpt) => generalRequest('PUT', url, data, successCallback, requestOpt);
// const rdelete = (url, data, successCallback, requestOpt) => generalRequest('DELETE', url, data, successCallback, requestOpt);
