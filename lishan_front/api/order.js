import request from '@/utils/request' 

export default { 
    //生成订单
    createOrder(courseId) {     
      return request({
      url: `/eduorder/order/createOrder/${courseId}`,       
      method: 'post'
      })
    },
    //根据订单id查询订单信息
    getOrdersInfo(id) {     
        return request({
        url: `/eduorder/order/getOrderInfo/${id}`,       
        method: 'get'
        })
      },
   //生成微信支付二维码接口
   createNative(orderNo) {     
    return request({
    url: `/eduorder/pay-log/createNative/${orderNo}`,       
    method: 'get'
    })
  },
  //根据订单号查询支付状态
  getPayStatus(orderNo) {     
      return request({
      url: `/eduorder/pay-log/getPayStatus/${orderNo}`,       
      method: 'get'
      })
    }


}
