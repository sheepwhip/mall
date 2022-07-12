<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card style="margin-top: 10px;">
          <Detail title="总销售额" count="￥ 126560">
            <template slot="charts">
              <span  style="font-size: 10px;">周同比<svg t="1656839280166" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3654" width="16" height="16"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" p-id="3655" fill="#ffffff"></path></svg>56.6%<svg t="1656839010760" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2542" width="16" height="16"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" p-id="2543" fill="#d81e06"></path></svg></span>
              <svg t="1656839280166" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3654" width="16" height="16"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" p-id="3655" fill="#ffffff"></path></svg>
              <span  style="font-size: 10px;">日同比<svg t="1656839280166" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3654" width="16" height="16"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" p-id="3655" fill="#ffffff"></path></svg>19.16%<svg t="1656839280166" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3654" width="16" height="16"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" p-id="3655" fill="#1afa29"></path></svg></span>
            </template>
            <template slot="footer">
              <span style="font-size: 16px">日销售额￥ 12423</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="margin-top: 10px;">
          <Detail title="访问量" count="88460">
            <template slot="charts">
              <lineCharts></lineCharts>
            </template>
            <template slot="footer">
              <span style="font-size: 16px">日访问量 1234</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="margin-top: 10px;">
          <Detail title="支付笔数" count="88460">
            <template slot="charts">
              <barCharts></barCharts>
            </template>
            <template slot="footer">
              <span style="font-size: 16px">转化率 65%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="margin-top: 10px;">
          <Detail title="运营活动效果" count="78%">
            <template slot="charts">
              <progressChart></progressChart>
            </template>
            <template slot="footer">
              <span  style="font-size: 16px;">周同比&nbsp;12%<svg t="1656839010760" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2542" width="16" height="16"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" p-id="2543" fill="#d81e06"></path></svg></span>
              &nbsp;
              <span  style="font-size: 16px;">日同比&nbsp;11%<svg t="1656839280166" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3654" width="16" height="16"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" p-id="3655" fill="#1afa29"></path></svg></span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import lineCharts from './lineChart';
import barCharts from './barChart';
import progressChart from './progressChart';
export default {
  name: "",
  components: {
    Detail,
    lineCharts,
    barCharts,
    progressChart
  },
};
</script>

<style>
</style>