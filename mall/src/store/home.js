import {reqCategoryLits,reqGetBannerList,reqFloorList} from '@/api'
// home模块的小仓库

// 仓库存储数据的地方
const state={
    // 三级菜单数据
    categoryList:[],
    // 轮播图数据
    bannerList:[],
    // floor数据
    floorList:[]
};
// 修改state的唯一手段
const mutations={
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList;
    },
    BANNERLIST(state,bannerList){
        state.bannerList=bannerList;
    },
    FLOORLIST(state,floorList){
        state.floorList=floorList;
    }
};
// 处理action,可书写业务逻辑，也可处理异步
const actions={
    // 通过API里面的接口函数调用，向服务器发请求，获取数据
    async categoryList({commit}){
        let result=await reqCategoryLits();
        if(result.code===200){
            commit('CATEGORYLIST',result.data)
        }
    },
    // 获取轮播图数据
    async getBannerList({commit}){
        let result=await reqGetBannerList();
        if(result.code===200){
            commit('BANNERLIST',result.data)
        }
    },
    // 获取floor数据
    async getFloorList({commit}){
        let result=await reqFloorList();
        if(result.code===200){
            commit('FLOORLIST',result.data)
        }
    }
};
// 类似计算属性，用于简化仓库数据
const getters={};

export default {
    state,
    mutations,
    actions,
    getters
}