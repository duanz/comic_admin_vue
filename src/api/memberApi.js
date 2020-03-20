
import { get, post } from '../config/axiosConfig';


export const login = (formData) => post('/api/members/login/', formData, false);
export const logout = () => post('/api/members/logout/', {}, true);











// login: function (context, creds, redirect) {
//     return context.$http.post(api.login, creds).then(response => {
//         let data = response.data.user;
//         localStorage.clear();
//         localStorage.setItem('userName', data.username);
//         localStorage.setItem('userId', data.id);
//         localStorage.setItem('email', data.email);
//         if (redirect) {
//             context.$router.push(redirect);
//         } else {
//             context.$router.push('/hotpage');
//         }
//     }).catch(function (errors) {
//         context.$notify.error({
//             title: ' Login Failed',
//             message: 'Unauthorized ip address or invalid username/password'
//         });
//         console.error(errors);
//     })
// },
// handleError: function (content, res) {
//     var errMsg = "网络错误";
//     localStorage.clear();
//     switch (res.status) {
//         case 401:
//             errMsg = "请登陆";
//             content.$router.push('/login');
//         case 403:
//             errMsg = "请提升权限";
//             content.$router.push('/login');
//         case 504:
//             errMsg = "网络超时";
//         case 500:
//             errMsg = "服务器出小差";
//     }
// }