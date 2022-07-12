<template>
  <div>
    <el-table border style="width: 100%" :data="records">
      <el-table-column
        type="index"
        label="序号"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="skuName"
        label="名称"
        width="width"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="skuDesc"
        label="描述"
        width="width"
        align="center"
      ></el-table-column>
      <el-table-column prop="prop" label="默认图片" width="110" align="center">
        <template slot-scope="{ row, $index }">
          <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column
        prop="weight"
        label="重量(KG)"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="价格(元)"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{ row, $index }">
          <el-button
            type="success"
            icon="el-icon-top"
            size="mini"
            v-if="row.isSale == 0"
            @click="sale(row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-bottom"
            size="mini"
            v-else
            @click="cancel(row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-edit"
            size="mini"
            @click="edit"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            @click="getSkuInfo(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete-solid"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      style="text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->, sizes,total"
      :total="total"
      @size-change="sizeChange"
      @current-change="currentChange"
    >
    </el-pagination>
    <!-- 抽屉 -->
    <el-drawer :visible.sync="drawer" :show-close="false" size="50%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag
            type="success"
            v-for="(attr, index) in skuInfo.skuAttrValueList"
            :key="attr.id"
            style="margin: 5px"
            >{{ attr.attrId }}-{{ attr.valueId }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品照片</el-col>
        <el-col :span="16">
          <el-carousel>
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl" style="width: 480px;height: 300px;">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      page: 1,
      limit: 10,
      records: [],
      total: 0,
      skuInfo: {},
      drawer: false,
    };
  },
  mounted() {
    this.getSkuList();
  },
  methods: {
    async getSkuList() {
      const { page, limit } = this;
      let result = await this.$API.sku.reqSkuList(page, limit);
      if (result.code == 200) {
        this.records = result.data.records;
        this.total = result.data.total;
      }
    },
    sizeChange(limit) {
      this.limit = limit;
      this.getSkuList();
    },
    currentChange(page) {
      this.page = page;
      this.getSkuList();
    },
    async sale(row) {
      let result = await this.$API.sku.reqSale(row.id);
      if (result.code == 200) {
        row.isSale = 1;
        this.$message.success("上架成功");
        this.getSkuList();
      }
    },
    async cancel(row) {
      let result = await this.$API.sku.reqCancel(row.id);
      if (result.code == 200) {
        row.isSale = 0;
        this.$message.success("下架成功");
        this.getSkuList();
      }
    },
    edit() {
      this.$message("系统维护中");
    },
    async getSkuInfo(sku) {
      this.drawer = true;
      let result = await this.$API.sku.reqSkuById(sku.id);
      if (result.code == 200) {
        this.skuInfo = result.data;
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
  font-weight: bold;
}
.el-col {
  margin: 10px 10px;
}
.el-carousel__button{
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
}
</style>