<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="scene != 0"
      ></CategorySelect>
    </el-card>
    <el-card>
      <!-- spu列表 -->
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addSpu"
          :disabled="!category3Id"
          >添加SPU</el-button
        >
        <el-table border style="width: 100%" :data="records">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="spu描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <hint-button
                type="success"
                size="mini"
                icon="el-icon-plus"
                @click="addSku(row)"
                title="添加sku"
              ></hint-button>
              <hint-button
                type="warning"
                size="mini"
                icon="el-icon-edit"
                @click="updateSpu(row)"
                title="修改spu"
              ></hint-button>
              <hint-button
                type="info"
                size="mini"
                icon="el-icon-info"
                title="查看当前的spu的sku列表"
                @click="handler(row)"
              ></hint-button>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)"
              >
                <hint-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  title="删除spu"
                  slot="reference"
                ></hint-button>
              </el-popconfirm>
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
      </div>
      <!-- 添加修改spu -->
      <SpuForm
        v-show="scene == 1"
        @changeScene="changeScene"
        ref="spu"
      ></SpuForm>
      <!-- 添加sku -->
      <SkuForm
        v-show="scene == 2"
        ref="sku"
        @changeScenes="changeScenes"
      ></SkuForm>
    </el-card>
    <el-dialog :title="`${spu.spuName}的spu列表`" :visible.sync="dialogTableVisible" :before-close="close">
      <el-table :data="skuList" v-loading="loading">
        <el-table-column
          property="skuName"
          label="名称"
          width="200"
        ></el-table-column>
        <el-table-column
          property="price"
          label="价格"
          width="150"
        ></el-table-column>
        <el-table-column
          property="weight"
          label="重量"
          width="150"
        ></el-table-column>
        <el-table-column label="默认图片">
          <template slot-scope="{row,$index}">
            <img :src="row.skuDefaultImg" style="width: 100px;height: 100px;">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";
import { done } from "nprogress";
export default {
  name: "Spu",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      page: 1,
      limit: 3,
      records: [],
      total: 0,
      scene: 0, //0:展示spu列表  1:展示添加修改spu  2:添加sku
      dialogTableVisible:false,
      spu:{},
      skuList:[],
      loading:true,
    };
  },
  components: {
    SpuForm,
    SkuForm,
  },
  methods: {
    getCategoryId({ categoryId, level }) {
      //categoryId:获取到一、二、三级分类的id  level：为了区分是几级id
      if (level == 1) {
        this.category1Id = categoryId;
        //清除2、3级分类的id
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        //清除3级id
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        //获取SPU列表数据进行展示
        this.getSpuList();
      }
    },
    async getSpuList() {
      const { page, limit, category3Id } = this;
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      if (result.code == 200) {
        this.records = result.data.records;
        this.total = result.data.total;
      }
    },
    currentChange(page) {
      this.page = page;
      this.getSpuList();
    },
    sizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    addSpu() {
      this.scene = 1;
      this.$refs.spu.addSpuData(this.category3Id);
    },
    updateSpu(row) {
      this.scene = 1;
      this.$refs.spu.initSpuData(row);
    },
    // 取消回调
    changeScene(scene) {
      this.scene = scene;
      this.getSpuList();
    },
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      if (result.code == 200) {
        this.$message.success("删除成功");
        this.getSpuList();
      }
    },
    addSku(row) {
      this.scene = 2;
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
    changeScenes(scene) {
      this.scene = scene;
    },
    async handler(spu){
      this.dialogTableVisible=true;
      this.spu=spu;
      let result=await this.$API.spu.reqSkuList(spu.id);
      if(result.code==200){
        this.skuList=result.data;
        this.loading=false;
      }
    },
    close(done){
      done();
      this.loading=true;
      this.skuList=[];
    }
  },
};
</script>

<style>
</style>