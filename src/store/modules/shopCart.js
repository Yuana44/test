import {
  reqCartList,
  reqCheckCartItem,
  reqAddToCart,
  reqDeleteCartItem,
} from "@/api";

export default {
  state: {
    cartList: [],
  },

  mutations: {
    RECEIVE_CART_LIST(state, { cartList }) {
      state.cartList = cartList;
    },
  },

  actions: {
    /* 
    获取购物车列表数据的异步action
    */
    async getCartList({ commit }) {
      const result = await reqCartList();
      if (result.code === 200) {
        const cartList = result.data;
        commit("RECEIVE_CART_LIST", { cartList });
      }
    },

    /* 
    改变购物项的勾选状态的异步
    */
    async checkCartItem({}, { skuId, isChecked }) {
      const result = await reqCheckCartItem(skuId, isChecked);

      if (result.code !== 200) {
        throw new Error(result.message || "修改勾选状态操作成功");
      }
    },

    async checkAllCartItems({ state, commit, dispatch, getters }, checked) {
      const isChecked = checked ? 1 : 0;
      const promises = [];

      state.cartList.forEach((item) => {
        if (item.isChecked === isChecked) return;
        const promise = dispatch("checkCartItem", {
          skuId: item.skuId,
          isChecked,
        });
        promises.push(promise);
      });
      return Promise.all(promises);
    },

    /* 
    添加商品到购物车的异步action
    */
    async addToCart({ commit }, { skuId, skuNum, callback }) {
      const result = await reqAddToCart(skuId, skuNum);
      if (result.code === 200) {
        console.log("添加到购物车成功");
        callback();
      } else {
        console.log("添加到购物车失败");
        callback("添加到购物车失败");
      }
    },

    async addToCart2({ commit }, { skuId, skuNum }) {
      const result = await reqAddToCart(skuId, skuNum);
      if (result.code === 200) {
        // 添加到购物车成功
        return "";
      } else {
        // 失败
        return "添加到购物车失败";
      }
    },

    async addToCart3({ commit }, { skuId, skuNum }) {
      const result = await reqAddToCart(skuId, skuNum);
      if (result.code !== 200) {
        // 失败
        throw new Error("添加到购物车失败");
      }
    },

    /* 
    删除一个购物项的异步action
    */
    async deleteCartItem(context, skuId) {
      const result = await reqDeleteCartItem(skuId);
      if (result.code !== 200) {
        // 失败
        throw new Error("删除购物项失败");
      }
    },

    /* 
    删除所有勾选的购物项的异步action
    */
    async deleteCheckedCartItems({ state, dispatch }) {
      const promises = state.cartList.reduce((pre, item) => {
        if (item.isChecked === 1) {
          pre.push(dispatch("deleteCartItem", item.skuId));
        }
        return pre;
      }, []);

      return Promise.all(promises);
    },
  },

  getters: {
    /* 
    已选中的商品的总数量
    */
    totalCount(state) {
      let total = 0;
      state.cartList.forEach((item) => {
        const { isChecked, skuNum } = item;
        // 只有在当前购物项选中才累加
        if (isChecked === 1) {
          total += skuNum;
        }
      });

      return total;
    },

    /* 
    已选中的商品的总价格
    */
    totalPrice(state) {
      let total = 0;
      state.cartList.forEach((item) => {
        const { isChecked, cartPrice, skuNum } = item;
        if (isChecked === 1) {
          total += cartPrice * skuNum;
        }
      });
      return total;
    },
  },
};
