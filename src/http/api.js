import axios from './http.js'
import qs from 'qs'


export const post = function({url,data}) {
    return axios.post(url,data)
}

export const get = function({url,data}) {
    return  axios.get(url,{data:data})
}

/* 微信扫码登录 */
export const wechatLogin = (params) => {
    return axios.post('/wechat/wechatLogin',qs.stringify(params))
}

export const login = (params) => {
    return axios.post('/passPort/login',qs.stringify(params))
}


/* 数据统计api */

// 业务数据统计
export const getBusinessData = (params) => {
    return axios.get('/statistics/getBusinessDataStatistics',{params:params})
}

// 运营数据统计
export const getOperationData = (params) => {
    return axios.get('/statistics/getOperationDataStatistics',{params:params})
}


/* 问答 api */

// 问题列表
export const questionList = (params) => {
    return axios.get('/question/questionList',{params:params})
}
//问题详情
export const questionDetail = (params) => {
    return axios.get('/question/questionDetail',{params:params})
}
// 评论列表
export const commentList = (params) => {
    return axios.get('/question/commentList',{params:params})
}

//屏蔽/取消屏蔽问题
export const blockQuestion = (params) => {
    return axios.post('/question/blockQuestion',qs.stringify(params))
}

//屏蔽/取消屏蔽回答
export const blockAnswer = (params) => {
    return axios.post('/question/blockAnswer',qs.stringify(params))
}
//屏蔽/取消屏蔽评论
export const blockComment = (params) => {
    return axios.post('/question/blockComment',qs.stringify(params))
}

//创建回答
export const createQuestionAnswer = (params) => {
    return axios.post('/question/createQuestionAnswer',qs.stringify(params))
}


//置顶答复
export const upAnswer = (params) => {
    return axios.post('/question/upAnswer',qs.stringify(params))
}

//置顶问题
export const upQuestion = (params) => {
    return axios.post('/question/upQuestion',qs.stringify(params))
}





/* 课程  api */

// 查询课程列表
export const getCourseList = (params) => {
    return axios.get('/course/getCourseList',{params: params})
}

// 课程下架
export const courseOut = (params) => {
    return axios.post('/course/courseOut',qs.stringify(params))
}
// 课程上架

export const coursePutaway = (params) => {
    return axios.post('/course/coursePutaway',qs.stringify(params))
}
// 新建课程
export const createCourse = (params) => {
    return axios.post('/course/createCourse',qs.stringify(params))
}

// 课程分类列表
export const getCourseTypeList = (params) => {
    return axios.get('/course/getCourseTypeList',{params: params})
}

// 添加课程分类
export const addCourseType = (params) => {
    return axios.post('/course/addCourseType',qs.stringify(params))
}

// 刷新课程分类
export const updateCourseType = (params) => {
    return axios.post('/course/updateCourseType',qs.stringify(params))
}

// 按照课程分类code获取课程分类
export const getCourseTypeByCode = (params) => {
    return axios.get('/course/getCourseTypeByCode',{params: params})
}

// 报名人数列表
export const getCourseEnrollList = (params) => {
    return axios.get('/course/getCourseEnrollList',{params: params})
}

// 根据id查询课程
export const getCourseById = (params) => {
    return axios.get('/course/getCourseById',{params: params})
}

// 导出语音|导出PPT
export const exportCourse = (params) => {
    return axios.get('course/exportCourseContent',{params: params})
}

// 更新课程
export const updateCourse = (params) => {
    return axios.post('/course/updateCourse',qs.stringify(params))
}


/* 活动 api */
// 查询活动列表
export const getActivityList = (params) => {
    return axios.get('/activity/getActivityList',{params: params})
}

// 报名人数列表
export const getActivityEnrollList = (params) => {
    return axios.get('/activity/getActivityEnrollList',{params: params})
}

// 根据Id查询活动
export const getActivityById = (params) => {
    return axios.get('/activity/getActivityById',{params: params})
}

// 按照活动分类code获取活动分类
export const getActivityTypeByCode = (params) => {
    return axios.get('/activity/getActivityTypeByCode',{params: params})
}

// 活动分类列表
export const getActivityTypeList = (params) => {
    return axios.get('/activity/getActivityTypeList',{params: params})
}

// 活动下架
export const activityOut = (params) => {
    return axios.post('/activity/activityOut',qs.stringify(params))
}

// 活动上架
export const activityPutaway = (params) => {
    return axios.post('/activity/activityPutaway',qs.stringify(params))
}

// 添加活动分类
export const addActivityType = (params) => {
    return axios.post('/activity/addActivityType',qs.stringify(params))
}

// 新建活动
export const createActivity = (params) => {
    return axios.post('/activity/createActivity',qs.stringify(params))
}

//填写活动软文外联
export const editSoftUrl = (params) => {
    return axios.post('/activity/editSoftUrl',qs.stringify(params))
}

// 更新活动
export const updateActivity = (params) => {
    return axios.post('/activity/updateActivity',qs.stringify(params))
}

// 更新活动分类
export const updateActivityType = (params) => {
    return axios.post('/activity/updateActivityType',qs.stringify(params))
}


/* 招标api */

// 招标项目列表
export const bidprojectList = (params) => {
    return axios.get('/bidproject/bidprojectList',{params: params})
}

// 经纪人查找列表 关键字匹配电话号码或者姓名
export const brokerList = (params) => {
    return axios.get('/user/brokerList',{params: params})
}

// 产品类型列表
export const getProductTypeList = (params) => {
    return axios.get('/bidproject/getProductTypeList',{params: params})
}

// 项目类型列表
export const getProjectTypeList = (params) => {
    return axios.get('/bidproject/getProjectTypeList',{params: params})
}

// 新建招标项目
export const createBidproject = (params) => {
    return axios.post('/bidproject/createBidproject',qs.stringify(params))
}

// 编辑招标项目
export const editBidproject = (params) => {
    return axios.post('/bidproject/editBidproject',qs.stringify(params))
}

// 中标信息查询
export const makeBidBidproject = (params) => {
    return axios.post('/bidproject/makeBidBidproject',qs.stringify(params))
}
// 批量投标 机器人投标
export const bidBidproject = (params) => {
    return axios.post('/bidproject/bidBidproject',qs.stringify(params))
}

// 发布招标项目
export const publishBidproject = (params) => {
    return axios.post('/bidproject/publishBidproject',qs.stringify(params))
}

// 下架招标项目
export const unPublishBidproject = (params) => {
    return axios.post('/bidproject/unPublishBidproject',qs.stringify(params))
}

// 查看招标项目详情
export const bidprojectDetail = (params) => {
    return axios.get('/bidproject/bidprojectDetail',{params:params})
}

// 屏蔽投标
export const blockBid = (params) => {
    return axios.post('/bidproject/blockBid',qs.stringify(params))
}


/* 推荐 api */

// 推荐项目列表
export const recommendProjectList = (params) => {
    return axios.get('/recommendProject/recommendProjectList',{params:params})
}

// 指派销售
export const assignSeller = (params) => {
    return axios.post('/recommendProject/assignSeller',qs.stringify(params))
}

// 屏蔽推荐项目
export const blockRecommentProject = (params) => {
    return axios.post('/recommendProject/blockRecommentProject',qs.stringify(params))
}

// 签约项目
export const signRecommentProject = (params) => {
    return axios.post('/recommendProject/signRecommentProject',qs.stringify(params))
}





/* 用户 api */
export const getUserList = (params) => {
    return axios.get('/user/getUserList',{params: params})
}

export const addUser = (params) => {
    return axios.post('/user/addUser',qs.stringify(params))
}




// 顾问申请列表
export const getUserApplyList = (params) => {
    return axios.get('/user/queryUserApplyList',{params: params})
}

// 获取用户列表
export const getUserInfoList = (params) => {
    return axios.get('/user/queryUserInfoList',{params: params})
}

// 获取用户详情
export const getUserDetail = (params) => {
    return axios.get('/user/queryUserDetail',{params: params})
}

// 获取用户配置
export const getUserApplyConfig = (params) => {
    return axios.get('/common/getUserApplyConfig',{params: params})
}

// 修改用户详情
export const editUserDetail = (params) => {
    return axios.post('/user/editUserDetail',qs.stringify(params))
}

// 通过审核
export const passUserApply = (params) => {
    return axios.post('user/passUserApply',qs.stringify(params))
}

// 拒绝审核
export const repulseUserApply = (params) => {
    return axios.post('/user/repulseUserApply',qs.stringify(params))
}

// 获取销售人员列表
export const sellerList = (params) => {
    return axios.get('user/sellerList',{params: params})
}



/* 消息api */
export const getMessageList = (params) => {
    return axios.get('/message/getMessageList',{params: params})
}

/* 地址API */

// 省份
export const getAllProvinceList = (params) => {
    return axios.get('/area/getAllProvinceList',{params: params})
}

// 市区
export const getAllCityList = (params) => {
    return axios.get('/area/getAllCityList',{params: params})
}

// 地区
export const getAllZoneList = (params) => {
    return axios.get('/area/getAllZoneList',{params: params})
}

// 所有地址列表
export const getAllAreaList = (params) => {
    return axios.get('/area/getAllAreaList',{params: params})
}








