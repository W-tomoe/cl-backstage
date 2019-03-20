<template>
    <div class="page-container">
        <!-- 招标项目 -->
        <el-row class="search">
            <el-col :span="6">
                <el-button type="primary"> <router-link class="white" :to="{path:`/tenderEdit/0/new`}">新建招标项目</router-link></el-button>
            </el-col>
        </el-row>
        <div class="tip">项目列表（{{total}}条）</div>
        <el-table :data="projectList" style="width: 100%" class="table">
            <el-table-column prop="answerNum" label="项目名称/价格">
                <template slot-scope="scope">
                    <p>{{scope.row.title}}</p>
                    <p class="price-text">{{scope.row.projectTypeName + ' - ' + '￥' +scope.row.productPriceStr}}{{scope.row.projectTypeName == '项目制'?' 总价': '/月'}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="bidsCount" align="center" label="投标人数">
                <template slot-scope="scope">
                    {{scope.row.bidsCount}}人
                </template>
            </el-table-column>
            <el-table-column prop="productTypeName" align="center" label="产品类型"></el-table-column>
            <el-table-column prop="brokerName" align="center" label="经纪人"></el-table-column>
            <el-table-column prop="fullDetailAddress" align="center" label="项目地址"></el-table-column>
            <el-table-column prop="bidprojectStatus" align="center" label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.bidprojectStatus == 1">草稿</span>
                    <span v-else-if="scope.row.bidprojectStatus == 2">招标中</span>
                    <span v-else-if="scope.row.bidprojectStatus == 3">招标结束</span>
                    <span v-else>下架</span>
                </template>
            </el-table-column>
            <el-table-column prop="deadline" align="center" label="截止时间"></el-table-column>
            <el-table-column label="操作" align="center" width="300">
                <template slot-scope="scope">
                    <span v-if="scope.row.bidprojectStatus == 1">
                        <router-link class="click-btn" :to="{path:`/tenderEdit/${scope.row.bidprojectId}`}" >编辑</router-link>
                        <span class="click-btn none"  @click="publish(scope.row.bidprojectId)">发布</span>
                    </span>
                    <span v-else-if="scope.row.bidprojectStatus == 2">
                        <router-link class="click-btn" :to="{path:`/tenderEdit/${scope.row.bidprojectId}/edit`}" >编辑</router-link>
                        <span class="click-btn" @click='off(scope.row.bidprojectId)'>下架</span>
                        <router-link  class="click-btn none"  :to="{path:`/viewTender/${scope.row.bidprojectId}`}">查看投标</router-link>
                    </span>
                    <span v-else-if="scope.row.bidprojectStatus == 3">
                        <span class="click-btn" @click='off(scope.row.bidprojectId)'>下架</span>
                        <router-link class="click-btn none" :to="{path:`/viewTender/${scope.row.bidprojectId}`}">查看投标</router-link>
                    </span>
                    <span v-else>
                        <router-link class="click-btn none" :to="{path:`/viewTender/${scope.row.bidprojectId}`}">查看投标</router-link>
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
import { bidprojectList, unPublishBidproject, publishBidproject, bidprojectDetail  } from '../../http/api.js'
    export default {
        name: "tender",
        data() {
            return {
                activeName: 'no',
                input1: '',
                projectList: [],
                currentPage: 1,
                pageSize: 10,
                total: 0,
            }
        },
        created() {
            this.getProjectList()
        },
        methods: {
            toTenderEdit(){
                this.$router.push({
                    path:'tenderEdit',
                    // query:{id:data.informationId}
                })
            },
            // 发布草稿项目
            publish(id) {

                publishBidproject({
                    bidprojectId:id
                }).then( res => {
                    if(res) {
                        this.$message({
                            message: '发布成功',
                            type: 'success'
                        })

                        this.getProjectList()
                    }
                })
            },
            // 下架项目
            off(id) {
                unPublishBidproject({
                    bidprojectId:id
                }).then(res => {
                    if(res) {
                        this.$message({
                            message: '下架成功',
                            type: 'success'
                        })

                        this.getProjectList()
                    }
                })
            },
            handleSizeChange(size) {
                this.pageSize = size

                this.getProjectList()
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage
                this.getProjectList()
            },
            // 获取招标项目列表
            getProjectList() {
                bidprojectList({
                    pageNum: this.currentPage,
                    pageSize: this.pageSize
                }).then(res => {
                    if(res) {
                        this.projectList = res.list
                        this.total = res.total
                    }
                })
            },
            
        }
    }
</script>


<style lang="scss" scoped>
    .page-container {
        font-style: 14px;
        padding: 20px;
        background-color: #fff;
        .search {
            margin-bottom: 20px;
        }

        .tip {}
    }
</style>
