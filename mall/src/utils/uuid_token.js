import {v4 as uuidv4} from 'uuid';
// 生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID=()=>{
    // 查询本地存储是否有uuid
    let uuid_token=localStorage.getItem('UUIDTOKEN');
    // 如果没有
    if(!uuid_token){
        // 生成临时身份,并存储
        uuid_token=uuidv4();
        localStorage.setItem('UUIDTOKEN',uuid_token);
    }
    return uuid_token;
}