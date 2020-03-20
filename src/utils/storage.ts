function get(k:string) {
    let v = localStorage.getItem(k);
    if (!v || v == "undefined") {
        v = ""
     }
    return v;
}

function set(k:string, v:string) {
    localStorage.setItem(k, v);
}
function saveUserInfo(info:any) {
    var token = info.token ? info.token : '';
    set("token", token)
    localStorage.setItem("user", JSON.stringify(info));
}
function getUserInfo() {
    return JSON.parse(get("user"));
}
function clear() {
    localStorage.clear()
}
function isAuth() { 
    const flag = localStorage.getItem("token") && localStorage.getItem("token") != 'undefined' ? true : false;
    return flag
}

const Storager = {
    get,
    set,
    saveUserInfo,
    getUserInfo,
    clear,
    isAuth
}

export default Storager;    