import Vue from "vue";
//import App from "./App.vue";
import App from "@/App";
import router from "./router";
import TypeNav from "@/components/TypeNav";
import store from "./store";
import "./mock/mockServer";
import "swiper/css/swiper.min.css";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
import "./validate";
import * as API from "@/api";
import "./elements";

// 让所有组件对象可以直接看到API对象
Vue.prototype.$API = API;

// 去掉不是生产环境的提示
Vue.config.productionTip = false;
Vue.component("TypeNav", TypeNav);
Vue.component("Carousel", Carousel);
Vue.component("Pagination", Pagination);

// Vue.prototype.$bus = new Vue();

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  render: (h) => h(App),
  router,
  store, //所有的组件对象都可以通过$store属性得到store对象
}).$mount("#app");
