import request from '@/utils/request'
export default {
//=========================小节操作========================================
   
    //根据id获取小节信息
    getVideoInfoById(videoId){
        return request({       
            url: '/eduservice/video/getVideoInfo/'+videoId,       
            method: 'get'
      })
    },
    //添加小节
    addVideo(eduVideo) {     
        return request({       
            url: '/eduservice/video/addVideo',       
            method: 'post',
            data:eduVideo
      })
    },
     //删除小节
     deleteVideoById(videoId) {     
      return request({       
          url: '/eduservice/video/deleteVideoById/'+videoId,       
          method: 'delete'
    })
    },
     //修改小节信息
    updateChapter(eduVideo) {     
        return request({       
            url: '/eduservice/video/updateVideo',       
            method: 'post',
            data:eduVideo
    })
    },
    deleteVideo(videoId){
        return request({       
            url: '/eduservice/video/deleteVideoByVideoId/'+videoId,       
            method: 'delete'
    })
    }
}