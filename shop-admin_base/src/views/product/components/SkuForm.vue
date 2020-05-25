<template>
  <el-form label-width="100px">
    <el-form-item label="SPU 名称">
      <span>小米11</span>
    </el-form-item>

    <el-form-item label="SKU 名称">
      <el-input type="text" placeholder="SKU 名称"></el-input>
    </el-form-item>

    <el-form-item label="价格">
      <el-input type="number" placeholder="SKU 价格"></el-input>
    </el-form-item>

    <el-form-item label="重量(千克)">
      <el-input type="number" placeholder="SKU 重量"></el-input>
    </el-form-item>

    <el-form-item label="规格描述">
      <el-input type="textarea" placeholder="SKU 规格描述" rows="4"></el-input>
    </el-form-item>

    <el-form-item label="平台属性">
      <el-form inline label-width="100px">
        <el-form-item label="test" style="margin: 5px">
          <el-select value="">
            <el-option label="A" value="1"></el-option>
            <el-option label="B" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="test" style="margin: 5px">
          <el-select value="">
            <el-option label="A" value="1"></el-option>
            <el-option label="B" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="test" style="margin: 5px">
          <el-select value="">
            <el-option label="A" value="1"></el-option>
            <el-option label="B" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="test" style="margin: 5px">
          <el-select value="">
            <el-option label="A" value="1"></el-option>
            <el-option label="B" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="test" style="margin: 5px">
          <el-select value="">
            <el-option label="A" value="1"></el-option>
            <el-option label="B" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>

    <el-form-item label="销售属性">
      <el-form inline label-width="100px">
        <el-form-item label="test" style="margin: 5px">
          <el-select value="">
            <el-option label="A" value="1"></el-option>
            <el-option label="B" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="test" style="margin: 5px">
          <el-select value="">
            <el-option label="A" value="1"></el-option>
            <el-option label="B" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>

    <el-form-item label="图片列表">
      <el-table border>
        <el-table-column type="selection" width="55"> </el-table-column>

        <el-table-column label="图片"> </el-table-column>
        <el-table-column label="名称"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row, $index }">
            <el-button type="primary">设为默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>

    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button @click="back">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "SkuForm",

  props: {
    saveSuccess: Function
  },

  data() {
    return {
      spu: {},

      skuInfo: {
        category3Id: null,
        spuId: null,
        tmId: null,
        skuName: null,
        skuDesc: "",
        price: null,
        weight: null,

        // 需要我们写代码去整理
        skuDefaultImg: "",
        skuAttrValueList: [],
        skuSaleAttrValueList: [],
        skuImageList: []
      },

      attrList: [],
      spuSaleAttrList: [],
      spuImageList: [],
      selectedSpuImageList: []
    };
  },

  methods: {
    // 保存SKU信息
    async save() {
      const { skuInfo, attrList, spuSaleAttrList, selectedSpuImageList } = this;

      // 只根据有attrIdValueId的attr来生成包含目标结构的数组
      skuInfo.skuAttrValueList = attrList.reduce((pre, attr) => {
        if (attr.attrIdValueId) {
          const [attrId, valueId] = attr.attrIdValueId.split(":");
          pre.push({
            attrId,
            valueId
          });
        }
        return pre;
      }, []);

      // 只根据有saleAttrValueId的attr来生成包含目标结构的数组
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((pre, attr) => {
        if (attr.saleAttrValueId) {
          pre.push({
            saleAttrValueId: attr.saleAttrValueId
          });
        }
        return pre;
      }, []);

      // 整理3: skuImageList
      skuInfo.skuImageList = selectedSpuImageList.map(image => ({
        imgName: image.imgName,
        imgUrl: image.imgUrl,
        spuImgId: image.id,
        isDefault: image.isDefault
      }));

      // 发送异步ajax请求保存SKU信息
      const result = await this.$API.sku.addUpdate(skuInfo);
      if (result.code === 200) {
        this.$message.success("保存SKU成功");
        this.resetData();
        this.saveSuccess();
      } else {
        this.$message.error("保存SKU信息失败");
      }
    },

    // 将当前图片设置为默认图片
    setDefaultImg(spuImg) {
      this.spuImageList.forEach(item => (item.isDefault = "0"));
      spuImg.isDefault = "1";
      this.skuInfo.skuDefaultImg = spuImg.imgUrl;
    },

    handleSelectionChange(value) {
      this.selectedSpuImageList = value;
    },

    initLoadAddData(spu) {
      this.spu = spu;
      this.skuInfo.category3Id = spu.category3Id;
      this.skuInfo.spuId = spu.id;
      this.skuInfo.tmId = spu.tmId;

      // 请求获取所有需要显示的数据
      this.getData();
    },

    async getData() {
      const { category1Id, category2Id, category3Id, id } = this.spu;
      const promise1 = this.$API.attr.getList(
        category1Id,
        category2Id,
        category3Id
      );
      const promise2 = this.$API.sku.getSpuImageList(id);
      const promise3 = this.$API.sku.getSpuSaleAttrList(id);

      const results = await Promise.all([promise1, promise2, promise3]);
      this.attrList = results[0].data;
      const spuImageList = results[1].data.map(item => ({
        ...item,
        isDefault: "0"
      }));
      this.spuImageList = spuImageList;
      this.spuSaleAttrList = results[2].data;
    },

    // 取消返回列表界面
    back() {
      this.resetData();
      this.$emit("cancel");
    },

    // 重置一下数据
    resetData() {
      (this.skuInfo = {
        category3Id: "",
        spuId: "",
        tmId: "",
        skuName: "",
        skuDesc: "",
        price: "",
        weight: "",
        skuDefaultImg: "",
        skuAttrValueList: [],
        skuSaleAttrValueList: [],
        skuImageList: []
      }),
        (this.spu = {}),
        (this.attrList = []);
      this.spuImageList = [];
      this.spuSaleAttrList = [];
      this.selectedImageList = [];
    }
  }
};
</script>

<style></style>
