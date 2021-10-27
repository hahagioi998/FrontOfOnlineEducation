import request from '@/utils/request'
export default {
  //条件分页查询课程
  getCourseList(page,limit,courseObj){
    return request({
      url: `/eduservice/courseFront/getFrontCourseList/${page}/${limit}`,
      method: 'post',
      data: courseObj
    })
  },
  //查询所有分类
  getAllSubject(){
    return request({
      url:`/eduservice/subject/getAllSubject`,
      method:'get'
    })
  },
  //课程详情
  getBaseCourseInfo(courseId){
    return request({
      url:`/eduservice/courseFront/getBaseCourseInfoById/${courseId}`,
      method:'get'
    })
  }
}