<template>
  <el-card>
    <div slot="header" class="header">
      <div class="search-header">
        <span>线上热门搜索</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="12">
          <lineCharts></lineCharts>
        </el-col>
        <el-col :span="12">
          <lineCharts></lineCharts>
        </el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column label="排名" width="80" type="index" align="center">
        </el-table-column>
        <el-table-column prop="name" label="搜索关键字" width="width" align="center">
        </el-table-column>
        <el-table-column prop="address" label="用户数" sortable width="width" align="center">
        </el-table-column>
        <el-table-column prop="name" label="周涨幅" sortable width="width" align="center">
        </el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next" :total="1000" class="pagination"> </el-pagination>
    </div>
  </el-card>
</template>

<script>
import lineCharts from "./lineCharts";
export default {
  name: "",
  data() {
    return {
      tableData: [{}],
    };
  },
  components: {
    lineCharts,
  },
};
</script>

<style scoped>
.search-header {
  display: flex;
  justify-content: space-between;
}
.header {
  padding-bottom: 10px;
  border-bottom: 2px solid #e4e7ed;
}
.pagination{
  float: right;
}
</style>