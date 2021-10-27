import request from '@/utils/request'
export default {
  //用户登录
  loginUser(userInfo){
      return request({
          url: '/educenter/member/login',
          method: 'post',
          data: userInfo
      })
  },
  //根据token获取用户信息
  getMeberById(){
      return request({
          url: '/educenter/member/getMemberById',
          method: 'get'
        })
  }
}