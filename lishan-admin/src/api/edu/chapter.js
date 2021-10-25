import request from '@/utils/request'
export default {
//==========================章节操作======================================== 
  //根据课程id查询课程大纲列表
  getAllChapterVideo(courseId) {     
      return request({       
          url: '/eduservice/edu-chapter/getChapterVideo/'+courseId,       
          method: 'get'
    })
  },
  //添加章节
  addChapter(eduChapter) {     
    return request({       
        url: '/eduservice/edu-chapter/addChapter',       
        method: 'post',
        data:eduChapter
  })
},
  //根据id查询章节信息
  getChapterById(chapterId) {     
      return request({       
          url: '/eduservice/edu-chapter/getChapter/'+chapterId,       
          method: 'get'
    })
    },
  //修改章节信息
  updateChapter(eduChapter) {     
    return request({       
        url: '/eduservice/edu-chapter/updateChapter',       
        method: 'post',
        data:eduChapter
  })
  }, 
  //删除章节
  deleteChapter(chapterId) {     
    return request({       
        url: '/eduservice/edu-chapter/deleteChapter/'+chapterId,       
        method: 'delete'
  })
  }
}