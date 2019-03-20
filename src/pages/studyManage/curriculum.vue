<template>
    <div class="page-container">
        <el-row>
            <el-button type="primary" @click="newCurriculum">新建课程</el-button>
        </el-row>

        <!-- <el-form  class="search">
            <el-row>
                <el-col :offset="8" :span="10">
                    <el-select v-model="courseState" placeholder="课程状态">
                        <el-option
                        v-for="item in courseStates"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="courseType" placeholder="课程分类">
                        <el-option
                        v-for="item in courseTypes"
                        :key="item.dictCode"
                        :label="item.dictName"
                        :value="item.dictCode">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="keywordStr" placeholder="请输入关键字"></el-input>
                </el-col>
                <el-col :span="2">
                <el-button type="primary" @click="onSearch">搜索</el-button>
                </el-col>
            </el-row>

        </el-form> -->

        <el-row>
            <el-col class="tip">课程列表（{{total}}条）</el-col>
        </el-row>
        
        <el-table
            :data="curriculumList"
            style="width: 100%" class="table">
            <el-table-column
                width="300"
                label="课程">
                <template slot-scope="scope">
                    <div class="course-box">
                        <div class="course-img">
                            <img  :src="scope.row.showImg">
                        </div>
                        <div>
                            <p>{{scope.row.title}}</p>
                            <span class="price-text">{{scope.row.priceStr == '0' ? '免费' : scope.row.priceStr + '元'}}</span>
                        </div>
                    </div>
                    <div>{{scope.row.courseTypeStr }}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="enrollCount"
                align="center"
                label="报名人数">
                <template slot-scope="scope">
                    <router-link class="click-btn none" :to="{path:`/enrollPeople/${scope.row.courseId}/curriculum`}">{{scope.row.enrollCount}}</router-link>
                </template>
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
                        <span class="click-btn none" @click="eidtCourse(scope.row)">编辑</span>
                    </span>
                    <span v-if="scope.row.courseStatus == 1">
                        <div class="font-0">
                            <span class="click-btn" @click="eidtCourse(scope.row)">编辑</span>
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

import { getCourseList,courseOut,coursePutaway,getCourseTypeList,exportCourse } from '../../http/api.js'
import utils from '../../utils/utils.js'
export default {
    data () {
        return {
            curriculumList:[],
            courseStates:[
                {
                    label:'草稿',
                    value:0
                },
                {
                    label:'已上架(即将直播)',
                    value:1
                },
                {
                    label:'已下架',
                    value:2
                },
                {
                    label:'直播中',
                    value:3
                },
                {
                    label:'直播结束',
                    value:4
                }
            ],
            courseState: '',
            courseTypes: [],
            courseType: '',
            currentPage: 1,
            keywordStr: '',
            total: 0,
            pageSize: 10,
            courseId: ''
        }
    },
    created() {

        this.getCourseList()
        this.getCourseType()
    },
    mounted() {

    },
    methods:{
        handleSizeChange(size) {
            this.pageSize = size
            this.getCourseList()
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage
            this.getCourseList()
        },
        // 去新建课程
        newCurriculum() {
            this.$router.push(`/createCurriculum/0/new`)
        },
        // 编辑课程
        eidtCourse(item) {
            this.$router.push(`/createCurriculum/${item.courseId}/edit`)
            
        },
        // 获取课程列表
        getCourseList() {
            getCourseList({
                pageNum: this.currentPage,
                pageSize: this.pageSize,
                courseId: this.courseId,
                courseStatus: this.courseState,
                courseType: this.courseType,
                keywordStr: this.keywordStr
            }).then(res => {
                if(res) {
                    this.curriculumList = res.list
                    
                    this. total = res.total
                }
            })
        },
        // 获取课程分类
        getCourseType() {
            getCourseTypeList().then(res => {
                this.courseTypes = res 
            })
        },
        // 下架接口
        courseOut(courseId) {
            courseOut({
                courseId:courseId
            }).then(res => {
                if(res) {
                    this.getCourseList()
                    this.$message({
                        message: '下架成功',
                        type: 'success'
                    })
                }
            })
        },
        // 下架按钮
        off(courseId) {

            this.$confirm('是否架该课程?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.courseOut(courseId)
            })
            
        },
        upper(courseId) {
            this.$confirm('是否上架该课程?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.coursePutaway(courseId)
            })
        },
        coursePutaway(courseId) {
            coursePutaway({
                courseId:courseId
            }).then(res => {
                if(res) {
                    this.getCourseList()
                    this.$message({
                        message: '上架成功',
                        type: 'success'
                    })
                }
            })
        },
        // 导出
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
        // 搜索
        /* onSearch() {
            this.getCourseList()
        } */
    },
    components: {
        
    }
}
</script>


<style lang="scss" scoped>
.page-container{
    .search{
        padding-top: 15px;
        text-align: right;
        .el-select,.el-input{
            padding-left: 10px;
        }
    }
    .tip {
        font-size: 14px;
        padding:16px 0 20px;
    }
    .table{
        .course-box{
            display: flex;
            align-items: center;
            .course-img {
                width: 135px;
                overflow: hidden;
                margin-right: 10px;
                img{
                    width: 100%;
                }
            }
        }
        
    }
}
</style>