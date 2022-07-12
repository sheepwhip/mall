const data=require('./data.json')
// import home from './data.json';
// Mock.mock("/mock/home", {code:200,data:home});
module.exports = [
  {
    url: '/home/list',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data
      }
    }
  }
]
