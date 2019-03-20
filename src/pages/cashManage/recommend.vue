<template>
    <div class="page-container">
        <div class="tip">项目列表（{{total}}条）</div>


        <div  v-if="recommendList.length > 0">
            <el-row class="recommend-list" v-for="(item,index) in recommendList" :key="index" :class='{"block":item.isBlock == 1}'>
                <el-col :span="8">
                    <div class="recommend-msg" v-if='item.belongFlag == 1'><span class="click-btn none" style="padding:0;" @click="viewPersonMsg(item.createUserId)">{{item.createUserName}}</span>推荐的所属公司{{item.companyIndustryName}}项目</div>
                    <div class="recommend-msg" v-else><span class="click-btn none" style="padding:0;" @click="viewPersonMsg(item.createUserId)">{{item.createUserName}}</span>推荐的{{item.companyIndustryName}}{{item.productTypeName}}项目</div>
                    <div  class="label">
                        <div class="label-item gray">公司行业 / 公司规模 / 公司年限 / 产品类型</div>
                        <div class="label-item gray">公司业务</div>
                        <div class="label-item gray">公司问题</div>
                    </div>
                </el-col>
                <el-col class="detail" :span="8">
                    <div class="recommend-msg">
                    <span>项目状态：{{item.recommendprojectStatus == 1 ?'接洽中':item.recommendprojectStatus == 2 ? '已接洽':item.recommendprojectStatus == 3 ? '已签约':'屏蔽'}} </span>
                    <span>推荐时间：{{item.createTime}}</span>
                    </div>
                    <div class="label">
                        <div class="label-item">{{ item.companyIndustryName }} / {{item.companyScaleName}}人 / {{item.companyYears}}年 / {{item.productTypeName}},
                            {{item.belongFlag == 1 ? '预计为公司节省费用:':item.recommendprojectStatus == 3 ? '实际报酬:':'预期报酬:'}}<span class="require">￥{{item.expectedReturnFeeStr}}</span></div>
                        <div class="label-item">{{item.companyBusiness}}</div>
                        <div class="label-item">{{item.companyProblem}}</div>
                    </div>
                </el-col>
                <el-col class="operation" :span="8">
                    <div class="recommend-msg">操作</div>
                    <div  class="label">
                        <el-select
                            v-model="userId[index]"
                            filterable
                            remote
                            clearable
                            reserve-keyword
                            placeholder="请输入关键词"
                            :remote-method="remoteMethod"
                            :loading="loading">
                                <el-option
                                v-for="item in sellerList"
                                :key="item.userId"
                                :label="(item.name || item.nickname) + item.phone"
                                :value="item.userId">
                                </el-option>
                        </el-select>

                        <span class="click-btn none" @click="handOver(item.recommendprojectId,index)">转交</span>

                        <div  v-if="item.isBlock == 0">
                            <span class="click-btn none" @click="block(item.recommendprojectId, true)">屏蔽推荐信息</span>
                        </div>

                        <div  v-else>
                            <span class="click-btn none" @click="block(item.recommendprojectId, false)">解除屏蔽</span>
                        </div>

                        <div v-if="item.recommendprojectStatus === 2">
                            <span class="click-btn none"  @click="signing(item.recommendprojectId)">签约</span>
                        </div>
                        
                    </div>
                </el-col>
            </el-row>
        </div>
        
        <div class='empty' v-else>
            <span>暂无推荐项目</span>
        </div>

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
import { recommendProjectList, sellerList, assignSeller, blockRecommentProject, signRecommentProject } from '../../http/api.js'
    export default {
        name: 'recommend',
        data() {
            return {
                recommendList:[],
                sellerList:[],
                loading: false,
                currentPage: 1,
                pageSize: 10,
                total: 0,
                tipMessage: '',
                successTip: '',
                userId:[

                ],
            }
        },
        created() {
            this.getRecommendList()
            this.getSellerList()
        },
        methods:{
            getRecommendList() {
                recommendProjectList({
                    pageNum: this.currentPage,
                    pageSize: this.pageSize
                }).then(res => {
                    this.recommendList = res.list

                    this.total = res.total
                    // 如果已签约那么展示签约的人
                    res.list.forEach( (val,key) => {
                        if(val.sellerId) {
                            this.userId[key] = val.sellerId
                        }
                    })

                })
            },
            // 搜索逻辑
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true
                    this.getSellerList(query)
                } else {
                    this.sellerList = []
                }
            },
            getSellerList(keyword) {
                sellerList({
                    keyWords:keyword
                }).then(res => {
                    this.sellerList = res
                    this.loading = false
                })
            },
            // 屏蔽项目
            block(id,onOff) {
                if(onOff) {
                   this.tipMessage = '是否屏蔽该项目？'
                   this.successTip = '屏蔽成功'
                } else {
                    this.tipMessage = '是否对该项目解除屏蔽？'
                    this.successTip = '解除屏蔽成功'
                }

                this.$confirm(this.tipMessage, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    blockRecommentProject({
                        recommendprojectId: id,
                        onOff: onOff
                    }).then(res => {
                        if(res) {
                            this.$message({
                                message: this.successTip,
                                type: 'success'
                            })

                            this.getRecommendList()
                        }
                    })
                })

                
            },
            // 签约
            signing(id) {
                this.$confirm('是否签约该项目？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    signRecommentProject({
                        recommendprojectId: id
                    }).then(res => {
                        if(res) {
                            this.$message({
                                message: '签约成功',
                                type: 'success'
                            })
                            this.getRecommendList()
                        }
                    })
                })
            },
            // 转交项目
            handOver(id,index) {
                if(!this.userId[index]) {
                    this.$notify.error({
                        title: '错误',
                        message: '请选择转交人'
                    })
                    return
                }

                this.$confirm('是否转交该项目？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    assignSeller({
                        recommendprojectId: id,
                        userId: this.userId[index]
                    }).then(res => {
                        if(res) {
                            this.$message({
                                message: '转交成功',
                                type: 'success'
                            })
                            this.getRecommendList()
                        }
                    })
                })
            },
            //查看推荐人信息
            viewPersonMsg(id) {

            },
            handleSizeChange(size) {
                this.pageSize = size
                this.getRecommendList()
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage
                this.getRecommendList()
            }
        }
    }
</script>


<style lang="scss" scoped>
@import '../../assets/css/common.scss';
    .page-container {
        padding: 20px;
        background-color: #fff;
        // bottom:0;
        .recommend-list {
            font-size: 14px;
            .recommend-msg{
                background: #F6F8FA;
                padding:20px 22px;
                font-size: 14px;
                font-weight: bold;
                min-height: 28px;

                span:last-child{
                    padding-left: 15px;
                }
            }

            .label{
                padding: 0 22px;
                .label-item{
                    font-size: 14px;
                    padding-top: 30px;
                    &:nth-child(2) {
                        min-height: 40px;
                    }
                    &:last-child{
                        padding-bottom: 30px;
                    }
                }
                .gray{
                    color: gray;
                }
                div.click-btn{
                    padding:0;
                    padding-top: 10px;
                }
            }

            .operation .label{
                padding-top:15px;
                div:not(:first-child){
                    padding-top:15px;
                    .click-btn{
                        padding:0
                    }
                }
            }
        }
        
    }

.block{
    background: #f5f5f5;
}

</style>
