<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      @click="showAdd"
      style="margin-bottom:20px"
      >添加</el-button
    >
    <el-table v-loading="loading" :data="trademarks" border stripe>
      <el-table-column label="序号" type="index" width="80" align="center">
      </el-table-column>

      <el-table-column prop="tmName" label="品牌名称"> </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 60px;" />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="showUpdate(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTrademark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      style="text-align: center; margin-top: 20px;"
      :current-page="page"
      :page-sizes="[3, 6, 9, 12]"
      :page-size="limit"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @current-change="getTrademarks"
      @size-change="handleSizeChange"
    >
    </el-pagination>
    <el-dialog :title="form.id ? '更新' : '添加'" :visible.sync="isShowDialog">
      <el-form :model="form" style="width: 80%">
        <el-form-item label="品牌名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.tmName"
            autocomplete="off"
            placeholder="请输入品牌名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleLogoSuccess"
            :before-upload="beforeLogoUpload"
          >
            <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDialog = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTrademark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TrademarkList",

  data() {
    return {
      loading: false,
      trademarks: [],
      total: 0,
      page: 1,
      limit: 10,

      isShowDialog: false,
      form: {
        tmName: "",
        logoUrl: ""
      },
      formLabelWidth: "100px"
    };
  },

  mounted() {
    // 测试
    // this.$API.trademark.getById(1)
    this.getTrademarks();
  },

  methods: {
    // 上传图片成功
    handleLogoSuccess(res, file) {
      const logoUrl = res.data;
      // 保存图片url
      this.form.logoUrl = logoUrl;
    },

    // 限制图片格式和大小
    beforeLogoUpload(file) {
      const isJPGOrPNG = ["image/jpeg", "image/png"].indexOf(file.type) >= 0;
      const isLt500KB = file.size / 1024 < 500;

      if (!isJPGOrPNG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt500KB) {
        this.$message.error("上传头像图片大小不能超过 500kb!");
      }

      return isJPGOrPNG && isLt500KB;
    },

    async getTrademarks(page = 1) {
      this.page = page;

      this.loading = true;

      const result = await this.$API.trademark.getList(page, this.limit);

      this.loading = false;
      // 成功
      if (result.code === 200) {
        const { records, total } = result.data;
        this.trademarks = records;
        this.total = total;
      } else {
        // 失败了
        this.$message.error("获取品牌列表失败");
      }
    },

    // 每页数量
    handleSizeChange(pageSize) {
      this.limit = pageSize;
      this.getTrademarks();
    },

    // 添加
    showAdd() {
      this.form = {
        tmName: "",
        logoUrl: ""
      };
      this.isShowDialog = true;
    },

    // 修改
    showUpdate(trademark) {
      this.form = trademark;
      this.isShowDialog = true;
    },

    // 更新
    async addOrUpdateTrademark() {
      const trademark = this.form;
      let result;
      if (trademark.id) {
        result = await this.$API.trademark.update(trademark);
      } else {
        result = await this.$API.trademark.add(trademark);
      }
      // 成功
      if (result.code === 200) {
        this.$message.success(`${trademark.id ? "更新" : "添加"}品牌成功`);
        this.isShowDialog = false;
        // 更新，添加，显示不同页码
        this.getTrademarks(trademark.id ? this.page : 1);
        // 清除数据
        this.form = {
          tmName: "",
          logoUrl: ""
        };
      } else {
        // 失败后, 提示添加/更新失败
        this.$message.error(`${trademark.id ? "更新" : "添加"}品牌失败`);
      }
    },

    // 删除
    deleteTrademark(trademark) {
      this.$confirm(`确定删除 ${trademark.tmName} 吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const result = await this.$API.trademark.remove(trademark.id);
          // 成
          if (result.code === 200) {
            this.$message.success("删除品牌成功!");
            const page =
              this.trademarks.length === 1 ? this.page - 1 : this.page;
            this.getTrademarks(page);
          } else {
            // 如果失败
            this.$message.error("删除品牌失败!");
          }
        })
        .catch(() => {
          // 点击取消
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
