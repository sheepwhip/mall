// 配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
// 使用插件
Vue.use(VueRouter);
// 引入store
import store from '@/store';
// 先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push||replace
// location:告诉原来的push方法往哪里跳转（传递那些参数）
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // 重新调用原来的push方法，篡改函数上下文一次
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        // 重新调用原来的push方法，篡改函数上下文一次
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}

// 配置路由
let router= new VueRouter({
    // 配置路由
    routes,
    // 滚动行为
    scrollBehavior(to,from,savedPositin){
        return {y:0};
    }
});

// 全局守卫：前置守卫
router.beforeEach(async (to,from,next)=>{
    // next();
    // 用户登录了，才会有token
    let token=store.state.user.token;
    // 用户信息
    let name=store.state.user.userInfo.name;
    // 用户已登录
    if(token){
        // 如果用户访问的是登录页面，则直接跳转到首页
        if(to.path=='/login'){
            next('/home');
        }else{
            // 如果已有用户名
            if(name){
                next();
            }else{
                // 没有用户信息，派发action
                try {
                    await store.dispatch("getUserInfo");
                    next();
                } catch (error) {
                    // token失效，重新登录
                    // 清除token
                    await store.dispatch('userLogout');
                    next('/login');
                }
            }
        }
    }else{
        // 未登录，不能进入交易相关的，支付相关的，个人中心
        let toPath=to.path;
        if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('center')!=-1){
            next('/login?redirect='+toPath);
        }else{
            next();
        }
    }
})

export default router;