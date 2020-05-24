import request from "@/utils/request";

export default {
  cancelSale(skuId) {
    return request.get(`/admin/product/cancelSale/${skuId}`);
  },

  //上架SKU
  onSale(skuId) {
    return request.get(`/admin/product/onSale/${skuId}`);
  },

  //删除指定id的sku
  remove(skuId) {
    return request.delete(`/admin/product/deleteSku/${skuId}`);
  },

  //根据指定的SPU的id查询所有对应的SKU的列表
  getListBySpuId(spuId) {
    return request.get(`/admin/product/findBySpuId/${spuId}`);
  },

  //根据SKU的id查询SKU的详细信息
  get(skuId) {
    return request.get(`/admin/product/getSkuById/${skuId}`);
  },

  //获取SKU的分页列表
  getList(page, limit) {
    return request.get(`/admin/product/list/${page}/${limit}`);
  },

  //保存SKU
  addUpdate(skuInfo) {
    return request.post(
      `/admin/product/${skuInfo.id ? "update" : "save"}SkuInfo`,
      skuInfo
    );
  },

  //获取指定SPU的id对应的图片列表
  getSpuImageList(spuId) {
    return request.get(`/admin/product/spuImageList/${spuId}`);
  },

  //获取指定SPU的id对应的销售属性列表
  getSpuSaleAttrList(spuId) {
    return request.get(`/admin/product/spuSaleAttrList/${spuId}`);
  }
};
