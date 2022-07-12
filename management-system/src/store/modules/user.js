import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter,anyRoutes,asyncRoutes,constantRoutes } from '@/router'
import router from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    routes:[],
    roles:[],
    buttons:[],
    // 路由对比
    resultAsyncRoutes:[],
    // 最终路由
    resultAllRoutes:[],
  }
}

const state = getDefaultState()

const mutations = {
  // 重置state
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // 存储token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 存储用户信息
  SET_USERINFO:(state,userInfo)=>{
    // 用户名
    state.name=userInfo.name;
    // 用户头像
    state.avatar=userInfo.avatar;
    // 菜单权限
    state.routes=userInfo.routes;
    // 按钮权限
    state.buttons=userInfo.buttons;
    // 角色
    state.roles=userInfo.roles;
  },
  // 异步路由
  SET_RESULTASYNCROUTES:(state,asyncRoutes)=>{
    // 保存当前异步路由
    state.resultAsyncRoutes=asyncRoutes;
    // 计算出所有需要展示的路由
    state.resultAllRoutes=constantRoutes.concat(state.resultAsyncRoutes,anyRoutes);
    // 添加新的路由
    router.addRoutes(state.resultAllRoutes)
  }
}

// 两个数组对比，判断当前显示那些路由
const computeAsyncRoutes=(asyncRoutes,routes)=>{
  return asyncRoutes.filter(item=>{
     if(routes.indexOf(item.name)!=-1){
      if(item.children&&item.children.length){
        item.children=computeAsyncRoutes(item.children,routes);
      }
      return true;
    }
  })
}

const actions = {
  // 登录业务
  async login({ commit }, userInfo) {
    const { username, password } = userInfo;
    let result=await login({ username: username.trim(), password: password });
    console.log(result);
    if(result.code==20000){
        commit('SET_TOKEN', result.data.token);
        setToken(result.data.token);
        return 'ok';
    }else{
        return Promise.reject(new Error('faile'))
    }
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        commit('SET_USERINFO',data)
        commit('SET_RESULTASYNCROUTES',computeAsyncRoutes(asyncRoutes,data.routes))
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

