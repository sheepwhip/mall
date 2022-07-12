<template>
  <div>
    <el-card>
      <div slot="header" class="header">
        <div class="category-header">
          <span>销售额类别占比</span>
          <el-radio-group v-model="radio1" size="small" class="btn">
            <el-radio-button label="全部渠道"></el-radio-button>
            <el-radio-button label="线上"></el-radio-button>
            <el-radio-button label="门店"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="charts" ref="charts"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "",
  data() {
    return {
      radio1: "全部渠道",
    };
  },
  mounted() {
    let myCharts = echarts.init(this.$refs.charts);
    myCharts.setOption({
      title: {
        text: "搜索引擎",
        subtext: 1048,
        left: "center",
        top: "center",
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          itemStyle: {
            normal: {
              color: function (colors) {
                var colorList = [
                  "#fc8251",
                  "#5470c6",
                  "#91cd77",
                  "#ef6567",
                  "#f9c956",
                  "#75bedc",
                ];
                return colorList[colors.dataIndex];
              },
            },
          },
          label: {
            show: true,
            position: "outside",
          },
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "搜索引擎" },
            { value: 735, name: "直接访问" },
            { value: 580, name: "邮件销售" },
            { value: 484, name: "联盟广告" },
            { value: 300, name: "视频广告" },
          ],
        },
      ],
    });
    myCharts.on("mouseover", (params) => {
      const { name, value } = params.data;
      myCharts.setOption({
        title: {
          text: name,
          subtext: value,
        },
      });
    });
  },
};
</script>

<style scoped>
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header {
  padding-bottom: 10px;
  border-bottom: 2px solid #e4e7ed;
}
.btn {
  margin-top: -12px;
}
.charts {
  width: 100%;
  height: 300px;
}
</style>