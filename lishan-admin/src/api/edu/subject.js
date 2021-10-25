import request from '@/utils/request'
const api_name = '/admin/edu/subject'
export default {
  getSubjectList() {     
      return request({       
          url: '/eduservice/subject/getAllSubject',       
          method: 'get'
    })
  }
}
