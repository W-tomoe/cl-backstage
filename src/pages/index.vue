<template>
    <el-container class="index-page">

        <!-- 侧边导航栏  start-->
        <el-aside width="230px" class='aside'>
            <div class="logo">
                <img src="../assets/img/logo.jpg"  class="logo-img" alt="">
                <div class="text">
                    <div>橙链</div>
                    <span>财务技能分享及变现平台</span>
                </div>
            </div>
            <!-- 导航栏 -->
            <el-menu  class="nav" background-color='#303954' text-color='white'   @select='selectItem' :default-active="active">
                <div v-for="item in navList" :key="item.navId">
                    <el-menu-item  :key="item.navPath" :index="item.navPath" v-if="!item.childrenList">
                        <template slot="title">
                            <i class="iconfont nav-icon" :class="item.iconClass"></i>
                            <span>{{item.title}}</span>
                        </template>
                    </el-menu-item>
                    <el-submenu :index="item.navId" v-else>
                        <template slot="title">
                            <i class="iconfont nav-icon" :class="item.iconClass"></i>
                            <span>{{item.title}}</span>
                        </template>
                        <el-menu-item v-for="json in item.childrenList" class="no-icont-item" :key="json.childNavPath" :index="json.childNavPath">
                                {{json.title}}
                        </el-menu-item>
                    </el-submenu>
                </div>
            </el-menu>
   
        </el-aside>
        <!-- 侧边导航栏  end-->

        <el-container >
            <!-- 头部  start-->
            <el-header class="header" height='100px'>
                <div class="current-page-name">{{openPageName}}</div>
                <ul class="left-list">
                    <li class="code">
                        
                        <el-dropdown placement='bottom-start'>
                            <span class="el-dropdown-link">
                                <i class="iconfont icon-qr-code"></i>
                                访问小程序
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <span class='wechat-code-box'>
                                    <img src="../assets/img/code.jpg" alt="" class="wechat-code-img">
                                </span>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </li>
                    <li>
                        <router-link :to="{path:'/notified'}">
                            <i class="el-icon-bell"></i>
                            <span>消息通知</span>
                        </router-link>
                    </li>
                    <li>
                        <el-dropdown placement='bottom-start' trigger="click"  @command="loginOut">
                            <span class="el-dropdown-link">
                                <img src="../assets/img/logo.jpg" class="avatar">
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item >退出登陆</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </li>
                </ul>
            </el-header>
            <!-- 头部  end-->

            <!-- 主体  start-->
            <el-main class="mian-content">
                <router-view></router-view>
            </el-main>
            <!-- 主体  end-->

        </el-container>
    </el-container>
</template>


<script>
import utils from '@/utils/utils.js'
export default {
    data() {
        return {
            navList:[
                {
                    navId:'1',
                    title:'数据总览',
                    iconClass:'icon-chart-line',
                    childrenList:[
                        {
                            childNavPath:'/business',
                            title:'业务'
                        },
                        {
                            childNavPath:'/operate',
                            title:'运营'
                        }
                    ]
                },
                {
                    navId:'2',
                    title:'学习管理',
                    iconClass:'icon-organization',
                    childrenList:[
                        {
                            childNavPath:'/questionAndAnswer',
                            title:'问答'
                        },
                        {
                            childNavPath:'/curriculum',
                            title:'课程'
                        },
                        {
                            childNavPath:'/activity',
                            title:'活动'
                        }
                    ]
                },
                {
                    navId:'3',
                    title:'变现管理',
                    iconClass:'icon-gears',
                    childrenList:[
                        {
                            childNavPath:'/tender',
                            title:'招标'
                        },
                        {
                            childNavPath:'/recommend',
                            title:'推荐'
                        }
                    ]
                },
                {
                    navId:'4',
                    title:'分类管理',
                    iconClass:'icon-tags',
                    childrenList:[
                        {
                            childNavPath:'/classifyManage/course',
                            title:'课程'
                        },
                        {
                            childNavPath:'/classifyManage/activity',
                            title:'活动'
                        }
                    ]
                },
                /* {
                    navId:'5',
                    title:'订单管理',
                    iconClass:'icon-shoppingcart',
                    navPath:'/orderManage'
                },
                 */
                {
                    navId:'6',
                    title:'用户管理',
                    iconClass:'icon-people',
                    navPath:'/userManage'
                },
                /* {
                    navId:'7',
                    title:'系统设置',
                    iconClass:'icon-gears',
                    navPath:'/systemSetting'
                }, */
                {
                    navId:'8',
                    title:'消息通知',
                    iconClass:'icon-bell',
                    navPath:'/notified'
                },
                // {
                //     navId:'9',
                //     title:'用户信息',
                //     iconClass:'icon-people1',
                //     navPath:'/userInfo/0'
                // }
            ],
            openPageName:'业务'
        }
    },
    created () {
        this.active = this.$route.fullPath

        if(sessionStorage.getItem('openPageName')) {
            this.openPageName = sessionStorage.getItem('openPageName')
        }
    },
    methods:{
        selectItem(path,index) {
            let _this = this
            this.$router.push(path)

            /* _this.navList.forEach((el,key) => {
                if(index.length > 1) {
                    _this.navList[index[0]-1].childrenList.forEach((child,val) => {
                        if(child.childNavPath == index[1]) {
                            sessionStorage.setItem('openPageName',child.title)
                        }
                    })
                }else {
                    if(el.navPath == index[0]) {
                        sessionStorage.setItem('openPageName',el.title)
                    }
                }
            }); */
        },
        //退出登录
        loginOut() {

            // sessionStorage.removeItem('adminToken')
            utils.clearCookie('adminToken')
            this.$router.push('/login')
        }
    },
    updated () {
        this.openPageName = sessionStorage.getItem('openPageName')
    }
}
</script>


<style lang="scss" scoped>
@import '../assets/css/common.scss';
.index-page{
    font-size: 16px;
    .aside{
        background: $menu-bg;
        height: 100vh;
        box-sizing: border-box;
        .logo{
            padding:26px 10px 22px;
            display: flex;
            align-items: center;
            color:white;
            width: 230px;
            box-sizing: border-box;
            .logo-img{
                background: white;
                height: 49px;
                width: 49px;
                border-radius: 50%;
            }
            .text{
                padding-left: 13px;
                div{
                    font-size: 28px;
                    padding-bottom: 8px;
                }
                span{
                    font-size: 13px;
                }
            }
        }
    }

    .header{
        height: 100px;
        display: flex;
        align-items: center;
        background: white;
        justify-content: space-between;
        font-size: 22px;
        .left-list{
            display: flex;
            align-items: center;
            margin-right: 30px;
            li{
                height:100px;
                line-height: 100px;
                padding:0 25px;
                position: relative;
                cursor: pointer;
                i,span{
                    font-size: 22px;
                }
                &::after{
                    position: absolute;
                    top:35px;
                    right: 0;
                    content: ' ';
                    display: block;
                    border-right: 1px solid $default;
                    height: 30px;
                }
                .avatar{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background: #dddddd;
                }
                &:last-child::after{
                    border:none;
                }
            }
            .code{
                .el-dropdown-link{
                    display: inline-block;
                    font-size: 22px;
                    color:$default;
                    height: 100%;
                }

                .wechat-code-box {
                    padding:15px;
                }
                
            }
        }
    }
    .mian-content {
        background: $mian-bg;
        padding:30px;
        position: relative;
    }
}

.el-dropdown-menu {
    padding:0;
    .wechat-code-img{
        padding:15px;
        width: 150px;
        height: 150px;
    }
}

.nav-icon{
    font-size:20px;
    color: white;
    padding-right:30px;
}

.el-menu{
    border:none;
}
.el-menu-item.is-active {
    background: $active-bg!important;
    color:white;
}
.el-menu-item:hover,.el-submenu__title:hover{
    // background: $active-bg!important;
}

</style>
