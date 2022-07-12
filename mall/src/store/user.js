// 登录与注册
import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from "@/api";
const state={
    code:'',
    token:localStorage.getItem('TOKEN'),
    userInfo:{}
};
const mutations={
    GETCODE(state,code){
        state.code=code;
    },
    USERLOGIN(state,token){
        state.token=token;
    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo;
    },
    // 清除本地数据
    CLEAR(){
        state.token='';
        state.userInfo={};
        localStorage.removeItem('TOKEN');
    }
};
const actions={
    // 获取验证码
    async getCode({commit},phone){
        // 将验证码返回，正常情况后台会将验证码发送到用户手机中
        let result=await reqGetCode(phone);
        if(result.code===200){
            commit('GETCODE',result.data);
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 注册
    async userRegister({commit},user){
        let result=await reqUserRegister(user);
        if(result.code==200){
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 登录
    async userLogin({commit},data){
        let result=await reqUserLogin(data);
        // 服务器下发token，用户唯一标识符
        if(result.code==200){
            commit('USERLOGIN',result.data.token);
            // 持久化存储
            localStorage.setItem('TOKEN',result.data.token);
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 获取用户信息
    async getUserInfo({commit}){
        let result=await reqUserInfo();
        if(result.code==200){
            commit('GETUSERINFO',result.data);
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 退出登录
    async userLogout({commit}){
        let result=await reqLogout();
        if(result.code==200){
            commit('CLEAR');
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    }

};
const getters={};
export default{
    state,
    mutations,
    actions,
    getters
}