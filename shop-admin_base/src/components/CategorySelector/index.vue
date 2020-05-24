<template>
  <el-form :inline="true" :model="cForm" class="demo-form-inline">
    <el-form-item label="一级分类">
      <el-select
        :disabled="disabled"
        v-model="cForm.category1Id"
        placeholder="选择一级分类"
        @change="handleChange1"
      >
        <el-option
          :label="c.name"
          :value="c.id"
          v-for="c in category1List"
          :key="c.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select
        :disabled="disabled"
        v-model="cForm.category2Id"
        placeholder="选择二级分类"
        @change="handleChange2"
      >
        <el-option
          :label="c.name"
          :value="c.id"
          v-for="c in category2List"
          :key="c.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select
        :disabled="disabled"
        v-model="cForm.category3Id"
        placeholder="选择三级分类"
        @change="handleChange3"
      >
        <el-option
          :label="c.name"
          :value="c.id"
          v-for="c in category3List"
          :key="c.id"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "CategorySelector",

  data() {
    return {
      disabled: false,
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: ""
      },
      category1List: [],
      category2List: [],
      category3List: []
    };
  },

  mounted() {
    this.getCategory1List();
  },

  methods: {
    // 获取一级分类列表显示
    async getCategory1List() {
      const result = await this.$API.category.getCategorys1();
      this.category1List = result.data;
    },

    // 获取二级分类列表显示
    async handleChange1(category1Id) {
      this.cForm.category2Id = "";
      this.cForm.category3Id = "";
      this.category2List = [];
      this.category3List = [];
      this.$emit("categoryChange", { categoryId: category1Id, level: 1 });

      // 获取二级列表
      const result = await this.$API.category.getCategorys2(category1Id);
      this.category2List = result.data;
    },

    // 获取三级分类列表显示
    async handleChange2(category2Id) {
      // 重置三级列表相关数据
      this.cForm.category3Id = "";
      this.category3List = [];
      this.$emit("categoryChange", { categoryId: category2Id, level: 2 });
      const result = await this.$API.category.getCategorys3(category2Id);
      this.category3List = result.data;
    },

    // 处理选中三级分类项的监听回调
    handleChange3(category3Id) {
      this.$emit("categoryChange", { categoryId: category3Id, level: 3 });
    }
  }
};
</script>

<style></style>
