import Vue from 'vue'
import App from './App.vue'
// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import {Button,MessageBox} from 'element-ui'
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入MockServe.js ----mock数据
import '@/mock/mockServe';
// 引入swiper样式
import 'swiper/css/swiper.css'
// 引入api
import * as API from '@/api'
import nm from '@/assets/1.gif'
// 引入懒加载
import VueLazyload from 'vue-lazyload';
// 引入表单校验插件
import '@/plugins/validate'
Vue.use(VueLazyload,{
    loading:nm
});

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    // 全局事件总线
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$API=API;
    },
    // 注册路由
    router,
    // 注册仓库
    store
}).$mount('#app')
