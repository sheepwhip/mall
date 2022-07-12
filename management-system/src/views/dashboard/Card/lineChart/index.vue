<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name:'',
  mounted() {
    let lineCharts=echarts.init(this.$refs.charts);
    lineCharts.setOption({
      xAxis:{
        show:false,
        type:'category',
        boundaryGap:false
      },
      yAxis:{
        show:false,
      },
      series:[
        {
          type:'line',
          data:[10,7,33,12,48,9,29,10,44],
          // 拐点样式
          itemStyle:{
            opacity:0
          },
          // 线条样式
          lineStyle:{
            color:'purple'
          },
          // 填充
          areaStyle:{
            color:{
              type:'linear',
              x:0,
              y:0,
              x2:0,
              y2:1,
              colorStops:[
                {
                  offset:0,
                  color:"purple",
                },
                {
                  offset:1,
                  color:'#fff',
                }
              ],
              global:false
            }
          },
          smooth:true,
        }
      ],
      // 布局
      grid:{
        left:0,
        top:0,
        right:0,
        bottom:0
      }
    })
  },
}
</script>

<style scoped>
  .charts{
    width: 100%;
    height: 100%;
    color: rgba(156, 129, 174, 0.486);
  }
</style>