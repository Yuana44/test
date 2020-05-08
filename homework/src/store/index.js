import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";

// 声明使用vuex插件
Vue.use(Vuex);
const mutations = {
  test2(state2) {},
};
const actions = {};
const getters = {};
export default new Vuex.Store({
  mutations,
  actions,
  getters,
  modules,
});
