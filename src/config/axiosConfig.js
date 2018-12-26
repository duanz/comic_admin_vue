import axios from 'axios'
import qs from 'qs'
// import { loadingInstance } from '../config/commentData';
import { Loading, MessageBox } from 'element-ui';
// export const loadingInstance = Loading.service({ fullscreen: true });
// http://www.php.cn/js-tutorial-394589.html




// 响应时间
axios.defaults.timeout = 5 * 1000

// 配置cookie
axios.defaults.withCredentials = true

// 配置请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 静态资源
// Vue.prototype.$static = ''

// 配置接口地址
// axios.defaults.baseURL = 'http://api.douban.com/v2';

// // 指定允许其他域名访问
// header("Access-Control-Allow-Origin:*");
// // 响应类型
// header("Access-Control-Allow-Methods:POST");
// // 响应头设置
// header("Access-Control-Allow-Headers:x-requested-with,content-type");

// 添加请求拦截器
axios.interceptors.request.use(
    config => {
        // Loading.service({ fullscreen: true });

        if (config.method === 'post') {
            config.data = qs.stringify(config.data);
            config.headers = {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }

        // 指定允许其他域名访问
        // config.headers.common["Access-Control-Allow-Origin"] = "*";
        // // // 响应类型
        // config.headers["Access-Control-Allow-Methods"] = "POST";
        // // // 响应头设置
        // config.headers["Access-Control-Allow-Headers"] = "x-requested-with,content-type";
        // config.headers["csrftoken"] = 'nfd3HJkwVHLb8qXsQlRqI20YlmezDcq9qDQfCRQLyqtsaLjwuPO5gSzafsoHmyp3';


        return config
    },

    err => {
        // Loading.service({ fullscreen: true }).close();
        MessageBox.alert("处理失败");
        return Promise.reject(err);
    }

)

// 添加响应拦截器
axios.interceptors.response.use(
    res => {
        // Loading.service({ fullscreen: true }).close();
        if (res.status === 200 || res.status === 201) {
            if (res.data.code === 404) {
                MessageBox.alert("处理失败");
                return Promise.reject(res);
            }

            return Promise.resolve(res);
        } else {
            MessageBox.alert("处理失败");
            return Promise.reject(res);
        }
    },
    err => {
        // Loading.service({ fullscreen: true }).close();
        MessageBox.alert("处理失败");
        return Promise.reject(err)
    }

)

// 发送请求

export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, params)
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

export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}