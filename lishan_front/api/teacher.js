import request from '@/utils/request'
export default {
  //分页查询讲师
  getTeacherList(page,limit){
    return request({
      url: `/eduservice/teacherFront/getTeacherFrontList/${page}/${limit}`,
      method: 'get',
    })
  },
  //讲师详情
  getTeacherInfo(teacherId){
    return request({
      url:`/eduservice/teacherFront/getTeacherInfoByTeacherId/${teacherId}`,
      method:'get'
    })
  }
}