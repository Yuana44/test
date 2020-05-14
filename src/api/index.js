import ajax from "./ajax";
import mockAjax from "./mockAjax";
export function reqBaseCategoryList() {
  return ajax({
    method: "GET",
    url: "/product/getBaseCategoryList",
  });
}

export const reqBanners = () => mockAjax("/banners");
export const reqFloors = () => mockAjax("/floors");
export const reqProductList = (searchParams) =>
  ajax({
    url: "/list",
    method: "POST",
    data: searchParams,
  });

export const reqProduct = (skuId) => ajax(`/item/${skuId}`);
// reqProduct(6);

// 添加到购物车
export const reqAddToCart = (skuId, skuNumChange) =>
  ajax.post(`/cart/addToCart/${skuId}/${skuNumChange}`);

// 获取购物车列表
export const reqCartList = () => ajax("/cart/cartList");
reqCartList();

// 切换商品选中状态
export const reqCheckCartItem = (skuId, isChecked) =>
  ajax(`/cart/checkCart/${skuId}/${isChecked}`);

// 删除购物车商品
export const reqDeleteCartItem = (skuId) =>
  ajax.delete(`/cart/deleteCart/${skuId}`);

// 登陆
export function reqLogin(mobile, password) {
  return ajax({
    method: "POST",
    url: "/user/passport/login",
    data: { mobile, password },
  });

  //   return ajax.post('/user/passport/login',{mobile,password})
}

// 注册
export const reqRegister = (userInfo) =>
  ajax.post("/user/passport/register", userInfo);

// 退出登录
export const reqLogout = () => ajax("/user/passport/logout");
