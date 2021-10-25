import request from '@/utils/request'

export default {

    //1.讲师列表(分页条件查询)
    getTeacherListPage(current,limit,teacherQuery){
        return request({
            url: `/eduservice/edu-teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            //teacherQuery条件对象，后端使用RequestBody获取数据
            //data表示把对象转为json格式进行传递到接口
            data: teacherQuery
          })
    },
    //逻辑删除讲师
    deleteTeacherById(id){
        return request({
            url: `/eduservice/edu-teacher/delete/${id}`,
            method: 'delete',
          })
    },
    //新增讲师
    addTeacher(teacher) {     
        return request({         
            url: `/eduservice/edu-teacher/addTeacher`,         
            method: 'post',         
            data: teacher
        })
    },
    //根据id查询讲师
    getTeacherInfo(id) {     
        return request({         
            url: `/eduservice/edu-teacher/getTeacherById/${id}`,         
            method: 'get',         
        })
    },
    //修改讲师
    updateTeacherInfo(teacher){
        return request({         
            url: `/eduservice/edu-teacher/updateTeacher`,         
            method: 'post',  
            data: teacher     
        })
    }
}
