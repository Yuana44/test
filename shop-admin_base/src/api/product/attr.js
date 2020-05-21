//商品管理的 平台属性相关的接口请求函数
import request from "@/utils/request";

export default {
  //根据3级分类获取属性列表
  getList(category1Id, category2Id, category3Id) {
    return request(
      `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`
    );
  },
  //根据ID删除对应的属性
  remove(id) {
    return request.delete(`/admin/product/deleteAttr/${id}`);
  },
  //根据属性id获取属性值列表
  getValueList(attrId) {
    return request(`/admin/product/getAttrValueList/${attrId}`);
  },
  //添加/更新属性
  //attrInfo如果有id那就是更新, 如果没有id那就是添加
  addOrUpdate(attrInfo) {
    return request.post("/admin/product/saveAttrInfo", attrInfo);
  }
};
