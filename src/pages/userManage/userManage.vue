<template>
    <div class="page-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">

            <!-- 未有回答问题 -->
            <el-tab-pane label="顾问申请列表" name="no">
                <!-- <el-row>
                    <el-col :offset="18" :span="6" class="search">
                        <el-input
                            placeholder="输入关键字"
                            v-model="input1">
                        </el-input>
                        <el-button>搜索</el-button>
                    </el-col>
                </el-row> -->

                <el-table :data="adviser" style="width: 100%" class="table">
                    <el-table-column label="头像/用户名" width="180">
                        <template slot-scope="scope">
                            <img v-if="scope.row.headImg" :src="scope.row.headImg" class="avatar">
                            <span v-else  class="avatar"></span>
                            <span class="name">{{scope.row.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="phone" label="手机号">
                    </el-table-column>
                    <el-table-column align='center' prop="inviterUserName" label="邀请人">
                    </el-table-column>
                    <el-table-column align='center' label="状态">
                        <template slot-scope="scope">
                            <!-- applyStatus 1待审核,2已拒绝,3审核通过 -->
                            {{status[scope.row.applyStatus]}}
                        </template>
                    </el-table-column>
                    <el-table-column align='center' prop="createTime" label="申请时间">
                    </el-table-column>
                    <el-table-column label="操作" align='center'>
                        <template slot-scope="scope">
                            <router-link :to="{path:'/editUserInfo', query: { userId: scope.row.userId , recordId : scope.row.recordId , listType : 'apply' , applyStatus : scope.row.applyStatus || ''}}" class="click-btn none">查看信息</router-link>
                        </template>
                    </el-table-column>

                </el-table>

                <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10,50, 100, 150, 200, 250, 300]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </el-tab-pane>

            <!-- 已有回答问题 -->
            <el-tab-pane label="用户列表" name="exist">
                <el-row class='search'  :gutter="15">
                    <el-col :span="5">
                        <el-button  type="info" @click="exportExcel">导出EXCEL</el-button>
                        <el-button  type="primary"><router-link class="white" :to="{path:`/addUser`}">+添加用户</router-link></el-button>
                    </el-col>

                    <!-- <el-col  :span="3" :offset='9'>
                        <el-select v-model="exportFillter.type" placeholder="身份类型">
                            <el-option
                            v-for="item in idTypeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                     -->
                    <!-- <el-col :span="5" :offset='12'>
                        <el-input v-model="searchData.keywordStr" placeholder="请输入关键字" clearable @clear='resetKeyWord'></el-input>
                    </el-col>
                    <el-col :span="2">
                        <el-button  @click="search">搜索</el-button>
                    </el-col> -->
                    

                </el-row>
                <el-table :data="user" style="width: 100%" class="table">
                    <el-table-column label="头像/用户名" width="250">
                        <template slot-scope="scope">
                            <img v-if="scope.row.headImg" :src="scope.row.headImg" class="avatar">
                            <span v-else  class="avatar"></span>
                            
                            <span class="name">{{scope.row.name}}</span>
                            <div class="tag" v-if="scope.row.isSell">
                                销售
                            </div>
                            <div class="tag" v-if="scope.row.isBroker">
                                经纪人
                            </div>
                            <div class="tag" v-if="!scope.row.isSell && !scope.row.isBroker && scope.row.userType == 2">
                                顾问
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="phone" label="手机号">
                    </el-table-column>
                    <el-table-column align='center' prop="inviterUserName" label="邀请人">
                    </el-table-column>
                    <el-table-column align='center' prop="brokerUserName" label="经纪人">
                    </el-table-column>
                    <el-table-column align='center' prop="counselorLevelName" label="顾问等级">
                    </el-table-column>
                    <el-table-column align='center' prop="signedItemName" label="服务类别">
                    </el-table-column>
                    <el-table-column label="操作" align='center'>
                        <template slot-scope="scope">
                            <router-link class="click-btn none" :to="{path:'/editUserInfo', query: { userId: scope.row.userId , listType : 'user' , applyStatus : scope.row.applyStatus || ''}}">查看信息</router-link>
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination class="pagination" @size-change="userHandleSizeChange" @current-change="userHandleCurrentChange" :current-page="userCurrentPage" :page-sizes="[10,50, 100, 150, 200, 250, 300]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="userTotal">
                </el-pagination>

            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    import { getUserApplyList, getUserInfoList,getUserList } from '@/http/api.js'
    import utils from '../../utils/utils.js'
    import {baseUrl} from '../../http/config.js'
    import Vue from 'vue'
    export default {
        data() {
            return {
                activeName: 'no',
                input1: '',

                // 顾问申请列表
                adviser: [],
                currentPage: 1,
                total: 0,
                pageSize: 10,

                // 用户列表
                user: [],
                userCurrentPage: 1,
                userTotal: 0,
                userPageSize: 10,

                status: {
                    1: '待审核',
                    2: '已拒绝',
                    3: '审核通过'
                },

                idTypeList: [
                    {
                        name: '顾问',
                        value: '顾问'
                    },
                    {
                        name: '学员',
                        value: '学员'
                    },
                    {
                        name: '销售',
                        value: '销售'
                    },
                    {
                        name: '经纪人',
                        value: '经纪人'
                    },
                ],

                searchData: {
                    keywordStr:'',
                }
            }
        },
        methods: {
            onImgLoaded(event) {
                console.log(event,'event')
            },
            handleClick(item) {
                console.log(item)
            },
            // 顾问申请分页
            handleSizeChange(val) {
                this.pageSize = val
                this.getApplyForList()
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getApplyForList()
            },
            // 用户分页
            userHandleSizeChange(val) {
                this.userPageSize = val
                console.log(this.$refs.userAvatar,'userAvatar')
                this.getUserList()
            },
            userHandleCurrentChange(val) {
                this.userCurrentPage = val
                console.log(this.$refs.userAvatar,'userAvatar')
                this.getUserList()
            },
            // 获取顾问申请列表
            getApplyForList() {
                getUserApplyList({
                    pageSize: this.pageSize,
                    pageNum: this.currentPage
                }).then(res => {
                    if (res) {

                        this.adviser = res.list
                        this.total = res.total
                    }
                })
            },
            // 获取用户用户列表
            getUserList() {
                getUserInfoList({
                    pageSize: this.userPageSize,
                    pageNum: this.userCurrentPage,
                    keywordStr: this.search.keywordStr || ''
                }).then(res => {
                    if (res) {
                        this.user=res.list
                        this.userTotal = res.total
                    }
                })
            },
            //导出excel
            exportExcel() {
                let url = `/user/exportUserList?keywordStr=${this.searchData.keywordStr || ''}`

                utils.download(url)
            },
            search() {
                console.log( this.searchData.keywordStr,' this.searchData.keywordStr')
                getUserList({
                    keywordStr: this.searchData.keywordStr
                }).then(res =>{
                    if(res) {
                        this.user = res
                    }
                })
            },
            resetKeyWord() {
                this.getUserList()
            }
        },
        watch:{
            
        },
        created() {
            this.getUserList()
            this.getApplyForList()
        }
    }
</script>


<style lang="scss" scoped>
    .page-container {
        .search {
            padding: 20px 0;
        }

        .table {
            .avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                overflow: hidden;
                display: inline-block;
                background: #dddddd;
            }
        }

        .tip {
            font-size: 14px;
            padding-bottom: 7px;
        }
    }
</style>
