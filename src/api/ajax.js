import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";
NProgress.configure({ showSpinner: false });

const instance = axios.create({
  baseURL: "/api",
  timeout: 15000,
});

// axios请求拦截器
instance.interceptors.request.use((config) => {
  // console.log("请求拦截器执行");
  NProgress.start();
  // 未登录
  config.headers["userTempId"] = store.state.user.userTempId;
  return config;

  // 已登陆
  const token = store.state.user.userInfo.token;
  if (token) {
    // 这一句必须写啊
    config.headers["token"] = token;
  }
});

// axios响应
instance.interceptors.response.use(
  (response) => {
    // console.log("响应拦截器成功回掉执行");
    NProgress.done();
    return response.data;
  },

  (error) => {
    // console.log("响应拦截器失败回调执行");
    NProgress.done();
    alert(`请求出错: ${error.message || "未知错误"}`);
    return Promise.reject(error);
  }
);

export default instance;
