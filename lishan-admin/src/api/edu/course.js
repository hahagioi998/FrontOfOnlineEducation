import request from '@/utils/request'
const api_name = '/admin/edu/subject'
export default {
    //1.添加课程信息
    addCourseInfo(courseInfo) {     
      return request({       
          url: '/eduservice/edu-course/addCourse',       
          method: 'post',
          data:courseInfo
    })
  },
  // 查询所有讲师
    findAllTeacher() {     
      return request({       
          url: '/eduservice/edu-teacher/findAll',       
          method: 'get',
    })
  },
    //根据课程id查询课程基本信息
    getCourseInfoByCourseId(courseId) {     
      return request({       
          url: '/eduservice/edu-course/getCourseInfoByCourseId/'+courseId,       
          method: 'get',
    })
  },
  updateCourseInfo(courseInfoVo) {     
    return request({       
        url: '/eduservice/edu-course/updateCourseInfo',       
        method: 'post',
        data:courseInfoVo
  })
},
  //课程确认信息显示
  getPublishCourseInfo(courseId) {     
    return request({       
        url: '/eduservice/edu-course/getPublishCourseInfo/'+courseId,       
        method: 'get',
  })
},
  //课程最终发布
  publishCourse(courseId){
    return request({       
      url: '/eduservice/edu-course/publishCourse/'+courseId,       
      method: 'post',
})
  },
  //分页条件查询课程列表
  getCourseListPage(current,limit,courseQuery){
    return request({
        url: `/eduservice/edu-course/pageCourseCondition/${current}/${limit}`,
        method: 'post',
        //courseQuery条件对象，后端使用RequestBody获取数据
        //data表示把对象转为json格式进行传递到接口
        data: courseQuery
      })
},
  deleteCourse(courseId){
    return request({
        url: `/eduservice/edu-course/deleteCourse/${courseId}`,
        method: 'delete'
      })
}
}
