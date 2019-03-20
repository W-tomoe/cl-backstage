<template>
    <div class="page-container">
        <el-table v-if="type == 'curriculum'"
            :data="enrollProject"
            style="width: 100%" class="table">
            <el-table-column
                width="500"
                label="课程">
                <template slot-scope="scope">
                    <div class="course-box">
                        <div class="course-img">
                            <img  :src="scope.row.showImg">
                        </div>
                        <div>
                            <p>{{scope.row.title}}</p>
                            <span class="price-text">{{scope.row.price =='免费' ? scope.row.price: scope.row.price + '元'}}</span>
                        </div>
                    </div>
                    <div>{{scope.row.courseTypeStr }}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="enrollCount"
                align="center"
                label="报名人数"
                width="180">
            </el-table-column>
            <el-table-column
                align="center"
                prop="browseCount"
                label="参与人数">
            </el-table-column>
            <el-table-column
                align="center"
                prop="state"
                label="状态">
                <template slot-scope='scope'>
                    <span v-if="scope.row.courseStatus == 0">草稿</span>
                    <span v-if="scope.row.courseStatus == 1">已上架(即将直播)</span>
                    <span v-if="scope.row.courseStatus == 2">已下架</span>
                    <span v-if="scope.row.courseStatus == 3">直播中</span>
                    <span v-if="scope.row.courseStatus == 4">直播结束</span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="lecturerUserName"
                label="主讲人">
            </el-table-column>

            <el-table-column
                align="center"
                prop="createTime"
                label="上架时间">
            </el-table-column>

            <el-table-column
                align="center"
                width="300"
                label="操作">
                <template slot-scope="scope">
                    <span v-if="scope.row.courseStatus == 0">
                        <span class="click-btn none">编辑</span>
                    </span>
                    <span v-if="scope.row.courseStatus == 1">
                        <div class="font-0">
                            <span class="click-btn">编辑</span>
                            <span class="click-btn none" @click="off(scope.row.courseId)">下架</span>
                        </div>
                    </span>

                    <span v-if="scope.row.courseStatus == 2">
                        <span class="click-btn none" @click="upper(scope.row.courseId)">上架</span>
                    </span>

                    <span v-if="scope.row.courseStatus == 3 || scope.row.courseStatus == 4">
                        <div class="font-0">
                            <span class="click-btn" v-if="scope.row.isExistPPT == 1"  @click="exportCourse(scope.row.courseId, 1)">导出PPT</span>
                            <span class="click-btn" v-if="scope.row.isExistMp3 == 1" @click="exportCourse(scope.row.courseId, 2)">导出语音</span>
                            <span class="click-btn none" @click="off(scope.row.courseId)">下架</span>
                        </div>
                    </span>
                    
                </template>
            </el-table-column>
        </el-table>

        <el-table v-else :data="enrollProject" style="width: 100%" class="table">
            <el-table-column
                width="450"
                label="封面/活动名称">
                <template slot-scope="scope">
                    <div class="course-box">
                        <div class="course-img">
                            <img :src="scope.row.showImg" >
                        </div>
                        <div>
                            <p>{{scope.row.title}}</p>
                            <span class="price-text">{{scope.row.price == 0 ? scope.row.price: scope.row.price + '元'}}</span>
                        </div>
                    </div>
                    <div>{{scope.row.type}}</div>
                </template>
            </el-table-column>

            <el-table-column 
                label="活动地址/时间"
                width="350">
                <template slot-scope="scope">
                    <div >{{scope.row.activityArea + scope.row.activityAddr}}</div>
                    <div>{{scope.row.activityBeginTime + ' 至 ' + scope.row.activityEndTime}}</div>
                </template>
            </el-table-column>

            <el-table-column align="center" prop="activityTypeStr" label="状态">
                <template slot-scope="scope">
                    <div v-if="scope.row.activityStatus == 0">草稿</div>
                    <div v-if="scope.row.activityStatus == 1">报名中</div>
                    <div v-if="scope.row.activityStatus == 2">已举办</div>
                    <div v-if="scope.row.activityStatus == 3">已下架</div>
                </template>
            </el-table-column>

            <el-table-column align="center" prop="lecturerUserName" label="主讲人"></el-table-column>

            <el-table-column align="center" prop="enrollCount" label="报名人数"></el-table-column>

            <el-table-column align="center" prop="browseCount" label="浏览人次"></el-table-column>

            <el-table-column align="center" width="200" label="操作">
                <template slot-scope="scope">
                    <span v-if="scope.row.activityStatus == 0">
                        <span class="click-btn none"  @click="editAct(scope.row.activityId)">编辑</span>
                    </span>

                    <span v-if="scope.row.activityStatus == 1"  class="font-0">
                        <span class="click-btn"  @click="editAct(scope.row.activityId)">编辑</span>
                        <span class="click-btn none" @click="off(scope.row.activityId)">下架</span>
                    </span>

                    <span v-else-if="scope.row.activityStatus == 2" class="font-0">
                        <span class="click-btn" @click="editAct(scope.row.activityId)">编辑</span>
                        <span class="click-btn none"  @click="off(scope.row.activityId)">下架</span>
                        <div class="click-btn none" @click="editArticle(scope.row.activityId)">填写软文外链</div>
                    </span>

                    <span v-else>
                        <span class="click-btn none" @click="upper(scope.row.activityId)">上架</span>
                    </span>
                </template>

            </el-table-column>
        </el-table>

        <el-row class="search" :gutter="20">
            <el-col :span="4">
                <div class="tip">参与学习用户列表（{{total}}人）</div>
                <div>当前搜索结果：（{{userList.length}}条）</div>
            </el-col>
            <!-- <el-col :offset="12" :span="2">
                <el-select v-model="user" placeholder="用户昵称">
                    <el-option
                    v-for="item in users"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-input placeholder="请输入关键字"></el-input>
            </el-col>
            <el-col  :span="2">
                <el-button @click="search">搜索</el-button>
            </el-col> -->
        </el-row>



        <el-table
        v-if="type == 'activity'"
        :data="userList"
        style="width: 100%" class="table">
            <el-table-column
                prop="state"
                label="头像/昵称">
                <template slot-scope='scope'>
                    <img :src="scope.row.headImg" class="avatar">
                    <span>{{scope.row.name || scope.row.nickname}}</span>
                </template>
            </el-table-column>

            <el-table-column
                align="center"
                prop="phone"
                label="手机号码">
                <template slot-scope='scope'>
                    {{scope.row.phone || '无'}}
                </template>
            </el-table-column>

            <el-table-column
                align="center"
                prop="liveBeginTime"
                label="用户类型">
                <template slot-scope='scope'>
                    <span v-if="scope.row.userType == 1">学员</span>
                    <span v-else>顾问</span>
                </template>
            </el-table-column>

            <el-table-column
                align="center"
                prop="companyName"
                label="公司名称">
            </el-table-column>

            <el-table-column
                align="center"
                prop="position"
                label="职位">
            </el-table-column>
            <!-- 2.0开发 -->
            <!-- <el-table-column
                align="center"
                prop="lastLearningTime"
                label="签到状态">
            </el-table-column>

            <el-table-column
                align="center"
                prop="lastLearningTime"
                label="最后签到时间">
            </el-table-column> -->
            
            <!-- <el-table-column
                align="center"
                label="操作">
                <template slot-scope='scope'> 
                    <router-link class="click-btn none" :to="{path:'/viewMessage',query:{userId:scope.row.userId}}">查看信息</router-link>
                </template>
            </el-table-column> -->
        </el-table>

        <el-table
        v-else
        :data="userList"
        style="width: 100%" class="table">
            <el-table-column
                prop="state"
                label="头像/昵称">
                <template slot-scope='scope'>
                    <img :src="scope.row.headImg" class="avatar">
                    <span>{{scope.row.name || scope.row.nickname}}</span>
                </template>
            </el-table-column>

            <el-table-column
                align="center"
                prop="phone"
                label="手机号码">
                <template slot-scope='scope'>
                    {{scope.row.phone || '无'}}
                </template>
            </el-table-column>

            <el-table-column
                align="center"
                prop="liveBeginTime"
                label="用户类型">
                <template slot-scope='scope'>
                    <span v-if="scope.row.userType == 1">学员</span>
                    <span v-else>顾问</span>
                </template>
            </el-table-column>

            <el-table-column
                align="center"
                prop="lastLearningTime"
                label="最后学习时间">
            </el-table-column>
            <!-- 2.0开发 -->
            <!-- <el-table-column
                align="center"
                label="操作">
                <template slot-scope='scope'> 
                    <router-link class="click-btn none" :to="{path:'/viewMessage',query:{userId:scope.row.userId}}">查看信息</router-link>
                </template>
            </el-table-column> -->
        </el-table>

        <el-pagination
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10,50, 100, 150, 200, 250, 300]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
import { getCourseEnrollList,coursePutaway,courseOut,  activityOut,activityPutaway,editSoftUrl,getActivityEnrollList } from '../../../http/api.js'
import Vue from 'vue'
import { imgUrl } from '../../../http/config.js'
import utils from '@/utils/utils.js'
export default {
    data () {
        return {
            enrollProject:[],
            total: 0,
            pageSize: 10,
            courseId:-1,
            users:[
                {
                    label:'小明',
                    value:1
                },
                {
                    label:'小黄',
                    value:2
                },
                {
                    label:'小三',
                    value:3
                },
            ],
            user:'',
            userList:[],
            currentPage:1,
            pageSize:10,
            total:0,
            courseTypeStr:'',
            type:'',
            enrollProjectId:0
        }
    },
    created() {

        
        let type =  this.type = this.$route.params.type
  
        if( type == 'activity') {
            this.enrollProjectId = this.$route.params.id
        }else {
            this.enrollProjectId = this.$route.params.id
        }

        this.getEnrollList()
    },
    methods: {
        // 写软文外链
        editArticle(id) {
            this.$prompt('<p>请正确填写有效的软文外链</p><p>- 仅支持微信内置浏览器打开的橙蟹、橙蟹有财的公众号文章短链接</p>', '软文外链', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/,
                inputErrorMessage: '链接格式不正确'
            }).then(({ value }) => {
                editSoftUrl({
                    activityId:id,
                    softUrl: value
                }).then(res => {
                    this.$message({
                        message: '软文外链填写成功~',
                        type: 'success'
                    })
                })
            })
        },
        // 上架
        upper(id) {

            if(this.type == 'acticity') {
                
            
                this.$confirm('是否上架该活动?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    activityPutaway({
                        activityId: id
                    }).then(res => {
                        if(res) {
                            this.$message({
                                message: '上架成功！',
                                type: 'success'
                            })
                            this.getEnrollList()
                        }
                    })

                })
            }else {
                this.$confirm('是否上架该课程?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    coursePutaway({
                        courseId:id
                    }).then(res => {
                        if(res) {
                            if(res) {
                                this.$message({
                                    message: '上架成功！',
                                    type: 'success'
                                })
                                this.getEnrollList()
                            }
                        }
                    })
                })

            }
        },
        // 去编辑活动
        editAct(id) {
            this.$router.push(`/createActivity/${id}/edit`)
        },
        getEnrollList() {
            if(this.type == 'activity') {
                getActivityEnrollList({
                    pageNum:this.currentPage,
                    pageSize:this.pageSize,
                    activityId:this.enrollProjectId
                }).then(res =>{
                    if(res) {
                        this.total = res.total

  

                        this.userList = res.list

                        if(this.enrollProject.length > 0) {
                            this.enrollProject.pop()
                        }

     

                        this.enrollProject.push(res.extra)
                    }
                })

            } else {

                getCourseEnrollList({
                    pageNum:this.currentPage,
                    pageSize:this.pageSize,
                    courseId:this.enrollProjectId
                }).then(res =>{
                    if(res) {
                        this.total = res.total


                        this.userList = res.list

                        if(this.enrollProject.length > 0) {
                            this.enrollProject.pop()
                        }

                        this.enrollProject.push(res.extra)
                    }
                })
            }
            
        },
        //导出语音
        exportCourse(id,type) {
            let tipContent 
            let downloadUrl

            
            // 1 PPt 2课程语音
            if(type == 1) {
                tipContent = '是否导出课程ppt'
                downloadUrl = `/course/exportCourseContent?courseId=${id}&contentType=1`
            }else {
                tipContent = '是否导出课程音频'
                downloadUrl = `/course/exportCourseContent?courseId=${id}&contentType=2`
            }

            this.$confirm(tipContent, '提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                utils.download(downloadUrl)
            })
        },
        // 下架接口
        projectOut() {
            
            if(this.type == 'activity') {
                activityOut({
                    activityId: this.enrollProjectId
                }).then(res => {
                    if(res) {
                        this.getEnrollList()
                        this.$message({
                            message: '下架成功',
                            type: 'success'
                        })
                    }
                })
            }else {
            
                courseOut({
                    courseId:this.enrollProjectId
                }).then(res => {
                    if(res) {
                        this.getEnrollList()
                        this.$message({
                            message: '下架成功',
                            type: 'success'
                        })
                    }
                })
            }
        },
        // 下架按钮
        off() {
            this.$confirm(`是否下架该${this.type == 'activity'?'活动':'课程'}?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.projectOut()
            })
        },
        coursePutaway() {
            if(this.type == 'activity') {
                activityPutaway({
                    activityId: this.enrollProjectId
                }).then(res => {
                    if(res) {
                        this.getEnrollList()
                        this.$message({
                            message: '上架成功',
                            type: 'success'
                        })
                    }
                })
            } else {
                coursePutaway({
                    courseId: this.enrollProjectId
                }).then(res => {
                    if(res) {
                        this.getEnrollList()
                        this.$message({
                            message: '上架成功',
                            type: 'success'
                        })
                    }
                })
            }

        },
        // 搜索
        search() {
            this.getEnrollList()
        },
        handleSizeChange(size) {
            this.pageSize = size
            this.getEnrollList()
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage
            this.getEnrollList()
        }

    },
    destroyed() {
        sessionStorage.removeItem('enrollProjectId')
    }
}
</script>


<style lang="scss" scoped>
.table{
    .course-box{
        display: flex;
        align-items: center;
        .course-img {
            width: 135px;
            height: 73px;
            background: #dddddd;
            overflow: hidden;
            margin-right: 10px;
            img{
                width: 100%;
            }
        }
    }
}

.search{
    padding:22px 0 10px;
    font-size: 14px;
    .tip{
        padding-top:0;
        padding-bottom: 10px;
    }
}

.avatar{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px;
}
</style>

