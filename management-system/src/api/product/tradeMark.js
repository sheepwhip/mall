// 获取品牌管理模块
import request from '@/utils/request';
// 获取品牌列表
export const reqTradeMarkList=(page,limit)=>request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:'get'});

// 添加修改品牌
export const reqAddOrUpdateTradeMark=(tradeMark)=>{
  // 修改
  if(tradeMark.id){
    return request({url:'/admin/product/baseTrademark/update',method:'put',data:tradeMark});
  }else{
    // 添加
    return request({url:'/admin/product/baseTrademark/save',method:'post',data:tradeMark});
  }
};

// 删除品牌
export const reqDeleteTradeMark=(id)=>request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'});