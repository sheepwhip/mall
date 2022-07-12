<template>
  <div>
    <div class="header">
      <span class="search-header">搜索用户数</span>
      <svg
        t="1656837805678"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2551"
        width="22"
        height="22"
      >
        <path
          d="M536 480v192a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V480a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16z m-32-128h16a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16z m8 448c159.056 0 288-128.944 288-288s-128.944-288-288-288-288 128.944-288 288 128.944 288 288 288z m0 48c-185.568 0-336-150.432-336-336s150.432-336 336-336 336 150.432 336 336-150.432 336-336 336z"
          p-id="2552"
          fill="#8a8a8a"
        ></path>
      </svg>
    </div>
    <div class="main">
      <span class="main-title">12321</span>
      <span class="main-content">17.1</span>
      <svg
        t="1656839010760"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2542"
        width="16"
        height="16"
      >
        <path
          d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
          p-id="2543"
          fill="#d81e06"
        ></path>
      </svg>
      <svg
        t="1656839280166"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3654"
        width="16"
        height="16"
      >
        <path
          d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"
          p-id="3655"
          fill="#1afa29"
        ></path>
      </svg>
    </div>
    <div class="footer">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "",
  mounted() {
    let lineCharts = echarts.init(this.$refs.charts);
    lineCharts.setOption({
      xAxis: {
        show: false,
        type: "category",
        boundaryGap: false,
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "line",
          data: [10, 8, 7, 15, 28, 19, 31, 22, 44],
          // 拐点样式
          itemStyle: {
            opacity: 0,
          },
          // 线条样式
          lineStyle: {
            color:'#5555FF'
          },
          // 填充
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color:'#5555FF'
                },
                {
                  offset: 1,
                  color: "#fff",
                },
              ],
              global: false,
            },
          },
          smooth: true,
        },
      ],
      // 布局
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  margin-top: -20px;
  color: rgb(152, 143, 143);
}
.search-header {
  margin-right: 10px;
  font-size: 14px;
}
.main {
  margin: 10px 0;
}
.main-title {
  margin-right: 30px;
  font-size: 23px;
}
.main-content {
  margin-right: 10px;
  color: rgb(152, 143, 143);
}
.charts {
  width: 100%;
  height: 50px;
}
</style>