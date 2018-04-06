import Vue from 'vue';
import axios from 'axios';
// import * as types from '../store/types.js'
import store from "../store/store.js"
// import qs from 'qs';
import router from '../router/index'

//axios请求拦截器
axios.interceptors.request.use((config) => {
  // post请求添加自定义请求头
  if (config.method === 'post') {
    config.headers['Content-Type'] = 'application/form-data';
  }
  let userToken = localStorage.getItem('userToken')||store.state.token;
  // console
  if(userToken){
    config.headers['authorization'] = store.state.token;
  }
  // console.log(config);
  // console.log(store.state);

  return config;
}, (error) => {
  alert("错误的传参");
  return Promise.reject(error);
});

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        // case 500:
          // 返回 401 清除token信息并跳转到登录页面
          // router.replace({
          //   path: 'login',
          //   query: {
          //     redirect: router.currentRoute.fullPath
          //   }
          // })
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  });

// 封装通用请求方法:
export function ajax(url, ajaxType, params, success) {
  // post 请求
  if (ajaxType == 'post') {
    axios.post(
      url,
      params,
      // config
      {
        headers: {
        "Accept":"application/json"
        }
      }
    ).then((res) => {
      success(res);
    });
    // get请求
  } else if (ajaxType == 'get') {
    axios.get(
      url, {
        params
      }
    ).then((res) => {
      success(res);
    });
  }
}
export default axios;
