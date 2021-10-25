import request from '@/utils/request' 

export default { 
    //查询课程名师
    getIndexData() {     
    return request({
    url: `/eduservice/indexFront/index`,       
    method: 'get'
  })
}
}
