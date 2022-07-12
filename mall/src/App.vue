<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!-- 判断footer的显示与隐藏  -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 通知vuex发请求，获取数据，存储于仓库之中
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>>