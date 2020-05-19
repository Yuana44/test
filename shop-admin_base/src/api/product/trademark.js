// 相当于ajax
import request from "@/utils/request";

const api_name = "/admin/product/baseTrademark";

export default {
  // 根据id获取对应的品牌
  getById(id) {
    return request.get(`${api_name}/get/${id}`);
  },

  // 获取所有品牌的列表
  // 获取品牌分页列表
  getList(page, limit) {
    if (page && limit) {
      return request(`/admin/product/baseTrademark/${page}/${limit}`);
    } else {
      return request("/admin/product/baseTrademark/getTrademarkList");
    }
  },

  // 根据id删除对应的品牌
  remove(id) {
    return request.delete(`/admin/product/baseTrademark/remove/${id}`);
  },

  // 添加一个新的品牌
  add(trademark) {
    return request.post(`${api_name}/save`, trademark);
  },

  // 更新品牌
  update(trademark) {
    return request.put(`${api_name}/update`, trademark);
  }
};
