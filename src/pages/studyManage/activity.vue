<template>
    <div class="page-container">
        <el-row>
            <el-button type="primary" @click="newCurriculum">新建活动</el-button>
        </el-row>

       <!--  <el-form  class="search">
            <el-row :gutter="20">
                <el-col :offset="15" :span="3">
                    <el-select v-model="actState" placeholder="活动状态">
                        <el-option
                        v-for="item in activityStates"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="keywordStr" placeholder="请输入关键字"></el-input>
                </el-col>
                <el-col  :span="2">
                <el-button type="primary" @click="onSearch">搜索</el-button>
                </el-col>
            </el-row>

        </el-form> -->

        <el-row>
            <el-col class="tip">课程列表（{{total}}条）</el-col>
            <!-- <el-col>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>

            </el-col> -->
        </el-row>

        <el-table :data="activityList" style="width: 100%" class="table">
            <el-table-column
                width="300"
                label="封面/活动名称">
                <template slot-scope="scope">
                    <div class="course-box">
                        <div class="course-img">
                            <img :src="scope.row.showImg" >
                        </div>
                        <div>
                            <p>{{scope.row.title}}</p>
                            <span class="price-text">{{scope.row.priceStr == '0' ? '免费': scope.row.priceStr + '元'}}</span>
                        </div>
                    </div>
                    <div>{{scope.row.type}}</div>
                </template>
            </el-table-column>
            <el-table-column 
                label="活动地址/时间">
                <template slot-scope="scope">
                    <div >{{scope.row.activityArea + scope.row.activityAddr}}</div>
                    <div>{{scope.row.activityBeginTime + ' 至 ' + scope.row.activityEndTime}}</div>
                </template>
            </el-table-column>

            <el-table-column align="center"  prop="activityTypeStr" label="状态">
                <template slot-scope="scope">
                    <div v-if="scope.row.activityStatus == 0">草稿</div>
                    <div v-if="scope.row.activityStatus == 1">报名中</div>
                    <div v-if="scope.row.activityStatus == 2">已举办</div>
                    <div v-if="scope.row.activityStatus == 3">已下架</div>
                </template>
            </el-table-column>

            <el-table-column align="center" prop="lecturerUserName" label="主讲人"></el-table-column>

            <el-table-column align="center"  label="报名人数">
                 <template slot-scope="scope">
                    <router-link class="click-btn none" :to="{path:`/enrollPeople/${scope.row.activityId}/activity`}">{{scope.row.enrollCount}}</router-link>
                </template>
            </el-table-column>

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
import { getActivityList,getActivityTypeList,activityOut,activityPutaway,editSoftUrl } from '../../http/api.js'

export default {
    data () {
        return {
            activityList:[],
            // 搜索字段
            actState: '',
            keywordStr:'',
            activityTypes:[],
            actType:'',

            activityStates:[
                {
                    label: "草稿",
                    value: 0
                },
                {
                    label: "上架",
                    value: 1
                },
                {
                    label: "下架",
                    value: 2
                }
            ],
            
            // page
            currentPage: 1,
            total: 0,
            pageSize: 10,

            // 软文外链
            softUrl:''
        }
    },
    created() {
        this.getActivityType()
        this.getActivityList()
    },
    methods:{
        handleSizeChange(size) {
            this.pageSize = size
            this.getActivityList()
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage
            this.getActivityList()
        },
        //获取活动列表
        getActivityList() {
            getActivityList({
                pageNum: this.currentPage,
                pageSize: this.pageSize,
                isPutaway: this.actState,
                activityTypeCode: this.actType,
                keywordStr: this.keywordStr
            }).then(res => {

                this.activityList = res.list

                this.total = res.total
            })
        },
        // 获取活动分类
        getActivityType() {
            getActivityTypeList().then(res => {
                if(res) {
                    this.activityTypes = res
                }   
            })
        },
        //下架
        off(id) {

            this.$confirm('是否下架该课程?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                activityOut({
                    activityId: id
                }).then(res => {
                    if(res) {
                        this.$message({
                            message: '下架成功！',
                            type: 'success'
                        })
                        this.getActivityList()
                    }
                })

            })
        },
        // 上架
        upper(id) {

            this.$confirm('是否上架该课程?', '提示', {
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

                        this.getActivityList()
                    }
                })

            })
        },
        // 搜索列表
        /* onSearch() {
            this.getActivityList()
        }, */
        // 去新建活动
        newCurriculum() {
            this.$router.push('/createActivity/0/new')
        },
        // 去编辑活动
        editAct(id) {
            this.$router.push(`/createActivity/${id}/edit`)
        },
        // 去写软文
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


            
        }
    },
    mounted () {
        
    }
}
</script>


<style lang="scss" scoped>
.page-container{
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
                flex-shrink: 0;
                img{
                    width: 100%;
                }
            }
        }
        
    }
}
</style>