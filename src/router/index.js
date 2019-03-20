import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Index from 'pages/index'

// 数据总览
import Business from 'pages/dataOverview/business.vue'
import Operate from 'pages/dataOverview/operate.vue'

// 学习管理
import Activity from 'pages/studyManage/activity.vue'
import Curriculum from 'pages/studyManage/curriculum.vue'
import QuestionAndAnswer from 'pages/studyManage/questionAndAnswer.vue'
import QuestionDetail from "pages/studyManage/questionDetail/questionDetail.vue"
import CommentDetail from 'pages/studyManage/CommentDetail/CommentDetail.vue'
import CreateCurriculum from "pages/studyManage/createCurriculum/createCurriculum.vue"
import CreateActivity from "pages/studyManage/createActivity/createActivity.vue"
import EditAnswer from "pages/studyManage/editAnswer/editAnswer.vue"
import EnrollPeople from 'pages/studyManage/enrollPeople/enrollPeople'
import CreateType from 'pages/studyManage/createType/createType'


//未做---查看信息
import ViewMessage from 'pages/studyManage/viewMessage/viewMessage'


// 变现管理
import Recommend from 'pages/cashManage/recommend.vue'
import Tender from 'pages/cashManage/tender.vue'
import TenderEdit from 'pages/cashManage/tenderEdit/tenderEdit.vue'
import ViewTender from 'pages/cashManage/viewTender/viewTender.vue'

// 分类管理
import ClassifyManage from 'pages/classifyManage/classifyManage.vue'

// 订单管理
import OrderManage from 'pages/orderManage/orderManage.vue'

// 用户管理
import UserManage from 'pages/userManage/userManage.vue'
import EditUserInfo from 'pages/userManage/editUserInfo/editUserInfo.vue'
import AddUser from 'pages/userManage/addUser/addUser.vue'

// 系统管理
import SystemSetting from 'pages/systemSetting/systemSetting.vue'

// 消息通知
import Notified from 'pages/notified/notified.vue'

// 用户信息
import UserInfo from 'pages/userInfo/userInfo.vue'

// 用户登陆
// 账号登录
import Login from 'pages/login/login'
// 扫码登录
import QRLogin from 'pages/login/QRLogin'

const routes = [
    {
        path:'/',component:Index,redirect:'/business',
        children: [
            // 数据总览
            { path:'business', component: Business,meta: {title: '业务'} },
            { path:'operate', component: Operate,meta: {title: '运营'}  },

            // 学习管理
            { path: 'activity', component: Activity,meta: {title: '活动'} },
            { path: 'curriculum', component: Curriculum,meta: {title: '课程'} },
            { path: 'questionAndAnswer', component: QuestionAndAnswer,meta: {title: '问答'} },
            { path: 'questionDetail/:questionId', component: QuestionDetail,meta: {title: '问答详情'} },
            { path: 'commentDetail/:id', component: CommentDetail,meta: {title: '评论列表'} },
            { 
                path: 'createCurriculum/:id/:type', 
                component: CreateCurriculum, 
                name:'createCurriculum',
                meta: { 
                    keepAlive:true,
                    title:['新建课程','编辑课程']
                }
            },
            { 
                path: 'createActivity/:id/:type', 
                component: CreateActivity,
                meta: { keepAlive:true },
                meta: { 
                    keepAlive:true,
                    title:['新建活动','编辑活动']
                }
            },
            { path: 'editAnswer', component: EditAnswer,meta: {title: '编辑回答'} },
            { path: 'enrollPeople/:id/:type', component: EnrollPeople, name:'enrollPeople',meta: {title: '报名用户'} },
            { path: 'createType/:type/:code/:editType', component: CreateType, name: 'createType',meta: {title: ['新建分类','编辑分类']} },
            

            //课程-报名人数-查看信息 未完成
            { path: 'viewMessage', component: ViewMessage,meta: {title: '个人信息'} },
            
            // 变现管理
            {path:'recommend', component: Recommend,meta: {title: '推荐'} },
            { path:'tender', component: Tender,meta: {title: '招标'}  },
            { 
                path:'tenderEdit/:id/:type', 
                component: TenderEdit,
                meta: {
                    title: ['新建招标','编辑招标']
                }
            },
            { path:'viewTender/:id', component: ViewTender,meta: {title: '投标结果'} },

            // 分类管理
            { path:'classifyManage/:type', component: ClassifyManage,name:'classifyManage',meta: {title: ['课程分类','活动分类']} },


            // 订单管理
            { path:'orderManage', component: OrderManage,meta: {title: '订单管理'} },

            // 用户管理
            { path:'userManage', component: UserManage,meta: {title: '用户管理'} },
            { path:'editUserInfo', component: EditUserInfo,meta: {title: '编辑信息'} },
            { path:'addUser', component: AddUser,meta: {title: '新增用户'} },
            

            // 系统设置
            { path:'systemSetting', component: SystemSetting },

            // 消息通知
            { path:'notified', component: Notified,meta: {title: '消息通知'} },

            // 用户信息
            { path:'userInfo/:id', component: UserInfo,meta: {title: '用户信息'} },

            
        ],
      
    },
    { path:'/login', component: Login},
    { path:'/QRLogin', component: QRLogin},
    
]

export default new Router({
    routes
})
