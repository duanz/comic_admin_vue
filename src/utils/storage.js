function get(k) {
    let v = localStorage.getItem(k);
    if (!v || v == "undefined") {
        v = ""
     }
    return v;
}

function set(k, v) {
    localStorage.setItem(k, v);
}
function saveUserInfo(info) {
    var token = info.token ? info.token : '';
    set("token", token)
    localStorage.setItem("user", JSON.stringify(info));
}
function getUserInfo() {
    return JSON.parse(localStorage.getItem("user"));
}
function clear() {
    localStorage.clear()
}
function isAuth() {
    const flag = localStorage.getItem("token") && localStorage.getItem("token") != 'undefined' ? true : false;
    return flag
}

export const Storager = {
    get,
    set,
    saveUserInfo,
    getUserInfo,
    clear,
    isAuth
}