import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store";

Vue.use(VueRouter);


const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(location, onComplete, onAbort) {
  console.log("push()", location, onComplete, onAbort);
  if (onComplete || onAbort) {
    originPush.call(this, location, onComplete, onAbort);
  } else {
    return originPush.call(this, location).catch((error) => {
      console.log("catch到重复请求到error");
      return new Promise(() => {});
    });
  }
};


VueRouter.prototype.replace = function(location, onComplete, onAbort) {
  if (onComplete || onAbort) {
    originReplace.call(this, location, onComplete, onAbort);
  } else {
    return originReplace.call(this, location).catch(() => {
      console.log("catch error2");
      return new Promise(() => {});
    });
  }
};

// 声明使用插件
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

// 路由守卫
const checkPaths = ["/trade", "/pay", "/center"];

/* a.只有登陆了, 才能查看交易/支付/个人中心界面 */
router.beforeEach((to, from, next) => {
  // 回调
  const targetPath = to.path;

  const isCheckPath = checkPaths.some((path) => targetPath.indexOf(path) === 0);

  if (isCheckPath) {
    // 如果已经登陆
    if (store.state.user.userInfo.name) {
      next();
    } else {
      // 如果没有登陆
      next("/login?redirect=" + targetPath);
    }
  } else {
    // 如果目标路由不需要进行登陆
    next();
  }
});

export default router;
