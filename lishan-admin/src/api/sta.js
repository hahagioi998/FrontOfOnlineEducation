import request from '@/utils/request'

export default {
    //生成统计数据
    registerCount(day){
        return request({
            url: `/staservice/sta/registerCount/${day}`,
            method: 'post'
        })
    },
    //获得统计数据
    getDataSta(searchObj){
        return request({
            url: `/staservice/sta/showData/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
            method: 'get'
        })
    }
}
