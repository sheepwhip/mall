import { reqGoodsInfo,reqAddOrUpdateShopCart } from "@/api";
// 封装游客身份模块uuid--->生成一个随机字符串（不能在改变）
import { getUUID } from "@/utils/uuid_token";

const state={
    goodInfo:{},
    // 游客临时身份
    uuid_token:getUUID(),
};

const mutations={
    GETGOODINFO(state,goodInfo){
        state.goodInfo=goodInfo;
    }
};

const actions={
    // 获取产品信息
    async getGoodInfo({commit},skuId){
        let result=await reqGoodsInfo(skuId);
        if(result.code==200){
            commit('GETGOODINFO',result.data);
        }
    },
    // 将产品加入到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        // 加入购物车返回的解构
        // 加入购物车以后（发请求），前台将参数带给服务器
        // 服务器写入数据成功，并没有返回其他数据，只返回code=200，因此不需要三连环存储数据
        let result=await reqAddOrUpdateShopCart(skuId,skuNum);
        if(result.code==200){
            // 加入购物车成功
            return 'ok';
        }else{
            // 加入购物车失败
            return Promise(new Error('faile'));
        }
    }
};

const getters={
    // 路径导航
    categoryView(state){
        return state.goodInfo.categoryView||{};
    },
    // 产品信息
    skuInfo(state){
        return state.goodInfo.skuInfo||{};
    },
    // 产品售卖属性
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[];
    }
};

export default{
    state,
    mutations,
    actions,
    getters
}