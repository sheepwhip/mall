<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import echarts from "echarts";
// import * as echarts from 'echarts'
export default {
  name: "",
  mounted() {
    let lineCharts = echarts.init(this.$refs.charts);
    lineCharts.setOption({
      xAxis: {
        show: false,
        boundaryGap: false,
        min:0,
        max:100
      },
      yAxis: {
        show: false,
        type: "category",
      },
      series: [
        {
          type: "bar",
          data: [78],
          color: "#5555FF",
          barWidth:10,
          color:'#55AA00',
          showBackground:true,
          backgroundStyle:{
            color:'#eee'
          },
          label:{
            show:true,
            formatter:'|',
            position:'right',
          }
        },
      ],
      // 布局
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      tooltip: {},
    });
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>