<template>
    <div class="page-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">

            <el-row>
                <el-col :offset="5">

                </el-col>
            </el-row>

            <!-- 未有回答问题 -->
            <el-tab-pane label="未有回答问题" name="no">
                <!-- <el-row>
                    <el-col :offset="18" :span="6" class="search">
                        <el-input 
                            placeholder="输入关键字"
                            v-model="input1">
                        </el-input>
                        <el-button>搜索</el-button>
                    </el-col>
                </el-row> -->
                <div class="tip">问题列表（{{total}}条）</div>
            
                <el-table :data="noAnswerList" style="width: 100%" class="table">
                    <el-table-column
                        label="头像/用户名"
                        width="180">
                        <template slot-scope="scope">
                            <img :src="scope.row.headImg" class="avatar">
                            <span class="name">{{scope.row.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  label="问题标题/描述">
                        <template slot-scope="scope">
                            <span class='stick-tip' v-if='scope.row.isUp == 1'>置顶</span>
                            <span class="gray-text">#{{scope.row.labelCodeStr}}#</span>
                            <span>{{scope.row.title}}</span>
                            <div  class="gray-text desc-text">
                                {{scope.row.desc}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align='center' prop="answerCount" label="回答数量">
                    </el-table-column>
                    <el-table-column align='center' prop="attentionCount" label="关注人数">
                    </el-table-column>
                    <el-table-column label="操作" align='center'  width="320">
                        <template slot-scope="scope">
                            <router-link :to="{path:`/questionDetail/${scope.row.questionId}`}" class="click-btn">查看问题</router-link>
                            <span class="click-btn" @click.stop="blockQuestion(scope.row.questionId,1)" v-if="scope.row.questionStatus == 1">屏蔽问题</span>
                            <span class="click-btn" @click.stop="blockQuestion(scope.row.questionId,0)" v-else>取消屏蔽</span>

                            <span class="click-btn none" @click.stop="stickQuestion(scope.row.questionId,scope.row.isUp)" v-if="scope.row.isUp == 0">置顶问题</span>
                            <span class="click-btn none" @click.stop="stickQuestion(scope.row.questionId,scope.row.isUp)"  v-if="scope.row.isUp == 1">取消置顶</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            
            <!-- 已有回答问题 -->
            <el-tab-pane label="已有回答问题" name="exist">

                <!-- <el-row>
                    <el-col :offset="18" :span="6" class="search">
                        <el-input 
                            placeholder="输入关键字"
                            v-model="input1">
                        </el-input>
                        <el-button>搜索</el-button>
                    </el-col>
                </el-row> -->
                <div class="tip">问题列表（{{total}}条）</div>
            
                <el-table :data="hasAnswerList" style="width: 100%" class="table">
                    <el-table-column
                        label="头像/用户名"
                        width="180">
                        <template slot-scope="scope">
                            <img :src="scope.row.headImg" class="avatar">
                            <span class="name">{{scope.row.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  label="问题标题/描述">
                        <template slot-scope="scope">
                            <span class='stick-tip' v-if='scope.row.isUp == 1'>置顶</span>
                            <span class="gray-text">#{{scope.row.labelCodeStr}}#</span>
                            <span>{{scope.row.title}}</span>
                            <div  class="gray-text">
                                {{scope.row.desc}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align='center' prop="answerCount" label="回答数量">
                    </el-table-column>
                    <el-table-column align='center' prop="attentionCount" label="关注人数">
                    </el-table-column>
                    <el-table-column label="操作" align='center' width="320">
                        <template slot-scope="scope">
                            <router-link :to="{path:`/questionDetail/${scope.row.questionId}`}" class="click-btn">查看问题</router-link>
                            <span class="click-btn" @click.stop="blockQuestion(scope.row.questionId,1)" v-if="scope.row.questionStatus == 1">屏蔽问题</span>
                            <span class="click-btn" @click.stop="blockQuestion(scope.row.questionId,0)" v-else>取消屏蔽</span>

                            <span class="click-btn none" @click.stop="stickQuestion(scope.row.questionId,scope.row.isUp)" v-if="scope.row.isUp == 0">置顶问题</span>
                            <span class="click-btn none" @click.stop="stickQuestion(scope.row.questionId,scope.row.isUp)"  v-if="scope.row.isUp == 1">取消置顶</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

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
import { questionList,blockQuestion,upQuestion } from '../../http/api.js'

import { imgUrl } from '../../http/config.js'
export default {
    data () {
        return {
            activeName:'no',
            input1:'',
            noAnswerList:[],
            hasAnswerList:[],
            currentPage:1,
            pageSize:10,
            quesStatus: 2,
            total:0,
            tipContent:[
                '取消屏蔽该问题，用户将可以查看该问题。',
                '屏蔽该问题，用户将无法查看屏蔽的问题。',
            ]
        }
    },
    created() {

        this.loadingQuestionList()
    },

    methods: {
        handleClick(val) {
            if(val.index == 0) {
                this.quesStatus = 2
            }else {
                this.quesStatus = 1
            }
            this.loadingQuestionList()
        },
        handleSizeChange(size) {
            this.pageSize = size
            this.loadingQuestionList()
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage
            this.loadingQuestionList()
        },
        //请求问题列表
        loadingQuestionList() {
            const _this = this
            questionList({
                pageNum: _this.currentPage,
                pageSize: _this.pageSize,
                quesStatus: _this.quesStatus
            }).then((res) => {
                if(_this.quesStatus == 1) {
                    _this.hasAnswerList = res.list
                } else {
                    _this.noAnswerList = res.list
                }

                this.total = res.total
            })
        },
        // 置顶和取消置顶
        stickQuestion(id,state) {

            let title;
            state == 1? title='确认取消该问题的置顶？':title='确认置顶该问题吗？'

            this.$confirm(title, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                upQuestion({
                    questionId:id,
                    onOff:state == 1? false : true
                }).then(res => {
                    if(res) {
                        if(state == 1) {
                            this.$message({
                                message: '取消置顶成功',
                                type: 'success'
                            })
                        }else {
                            this.$message({
                                message: '置顶成功',
                                type: 'success'
                            })
                        }

                        this.loadingQuestionList()
                    }
                })
            })
        },
        // 屏蔽问题
        blockQuestion(id,block) {

            this.$confirm(this.tipContent[block], '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                blockQuestion({questionId:id,onOff:block == 1 ? true:false}).then((res)=> {
                    if(res) {
                        this._tipMessage(block)
                        this.loadingQuestionList()
                    }
                })
            })
        },
        _tipMessage(block) {
            if(block == 1) {
                this.$message({
                    message: '屏蔽成功',
                    type: 'success'
                })
            }else {
                
                this.$message({
                    message: '取消屏蔽成功',
                    type: 'success'
                })
            }
        },
    }
}
</script>


<style lang="scss" scoped>
@import '../../assets/css/common.scss';
.page-container{
    .search{
        display: flex;
        padding-top: 30px;
        .el-button{
            margin-left: 15px;
        }
    }
    .table{
        .avatar{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
        }
        .desc-text{
            max-height: 90px;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
        }
    }

    .stick-tip{
        width: 40px;
        height: 20px;
        text-align: center;
        font-size: 14px;
        padding:2px;
        color:$active-bg;
        box-sizing: border-box;
        border:1px solid $active-bg;
    }

    .tip{
        font-size: 14px;
        padding-bottom: 7px;
    }
}
</style>