// API进行统一管理
import requests from "./request";
import mockRequests from "./mockAjax";

// 三级联动接口
export const reqCategoryLits=()=>requests({url:'/product/getBaseCategoryList',method:'get'})

// 获取banner（Home首页轮播图接口）
export const reqGetBannerList=()=>mockRequests.get('/banner');
   
// 获取floor数据
export const reqFloorList=()=>mockRequests.get('/floor');

// 获取搜索模块数据 地址：/api/list 请求方式：post
export const reqGetSearchInfo=(params)=>requests({url:'/list',method:'post',data:params});

// 获取产品详情信息的接口 地址：/api/item/{ skuId }  get 
export const reqGoodsInfo=(skuId)=>requests({url:`/item/${skuId}`,method:'get'});   

// 将产品加入到购物车中
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'});

// 获取购物车列表数据
export const reqCartList=()=>requests({url:'/cart/cartList',method:'get'});

// 删除购物车产品
export const reqDeleteCartById=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});

// 修改商品选中状态
export const reqUpdateCheckedById=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});

// 获取验证码
export const reqGetCode=(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'});

// 注册
export const reqUserRegister=(data)=>requests({url:'/user/passport/register',data,method:'post'});

// 登录
export const reqUserLogin=(data)=>requests({url:`/user/passport/login`,data,method:'post'});

// 获取用户信息【带着token向服务器要用户信息】
export const reqUserInfo=()=>requests({url:'user/passport/auth/getUserInfo',method:'get'});

// 退出登录
export const reqLogout=()=>requests({url:'/user/passport/logout',method:'get'});

// 获取用户地址信息
export const reqAddressInfo=()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'});

// 获取用户清单
export const reqOredrInfo=()=>requests({url:'/order/auth/trade',method:'get'});

// 提交订单
export const reqSubmitOrder=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'});

// 支付信息
export const reqPayInfo=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});

// 获取订单支付状态
export const reqPayStatus=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});

// 获取个人中心
export const reqMyOrderList=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'});
