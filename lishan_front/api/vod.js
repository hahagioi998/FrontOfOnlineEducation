import request from '@/utils/request'
export default {
//获取播放凭证接口
 getPlayAuth(videoId){
    return request({
      url:`/eduVod/video/getPlayAuth/${videoId}`,
      method:'get'
    })
  }
}