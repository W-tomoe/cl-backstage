<template>
    <div class="page-container">
        <el-row class="question">
            <el-col :span="12">
                <h1 class="title">{{question.title}}</h1>
                <div class="describe">{{question.desc}}</div>
                <div class="time">{{question.createTime}}</div>
                <el-button class="edit" type="primary"><router-link :to="{path:'/editAnswer',query:{questionId:questionId }}" class="white">写回答</router-link></el-button>    
            </el-col>

            <div class="fllow">
                关注者 {{ question.attentionCount }}
            </div>
            
            <el-col :offset="6" :span="6" class="author">
                <img :src="question.headImg" class="avatar">
                <span class="name">{{question.name}}</span>
            </el-col>
        </el-row>
        

        <!-- 搜索 -->
        <el-row class="search">
            
        </el-row>

        <!-- 回答列表 -->
        <div v-if='answerList.length < 1' class='empty'><span>暂无回答内容</span></div>
        <div class="answer" v-else>
            <el-row class="answer-item " :class="{'mask': item.answerStatus == 2}" v-for="(item, index) in answerList" :key="index" >
                <el-col :span="12">
       
                    <div v-if='item.isUp' class='stick-tip'>置顶</div>
                    <div class="describe" v-html="item.content"></div>

                    <div class="time">
                       <span>{{item.createTime}}</span>
                       <router-link class="comment-num" :to="{path:`/commentDetail/${item.answerId}`}">评论 {{item.commentCount}}</router-link>
                    </div>
                </el-col>
                
                <el-col :offset="6" :span="6" class="author">
                    <div class="avatar">
                        <img :src="item.headImg">
                    </div>
                    <span class="name">{{item.nickname }}</span>
                    <div class='stick-btn'>
                        <div class="stick-answer" @click='stick(item.answerId,item.isUp)' v-if='!item.isUp'>
                            置顶回答
                        </div>
                        <div class="stick-answer" @click='stick(item.answerId,item.isUp)' v-else>
                            取消置顶
                        </div>
                        <div class="shield-answer" v-if="item.answerStatus  == 2" @click="blockAnswer(item.answerId,0)">
                            取消屏蔽
                        </div>
                        <div class="shield-answer" v-else @click="blockAnswer(item.answerId,1)">
                            屏蔽回答
                        </div>
                    </div>
                </el-col>
            </el-row>
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
import { questionDetail,commentList,blockAnswer,upAnswer } from '../../../http/api.js'
import { imgUrl } from '../../../http/config.js'
export default {
    data () {
        return {
            currentPage:1,
            pageSize:10,
            total:0,
            question: {},
            answerList:[],
            questionId:-1,
            tipContent:[
                '取消屏蔽该回答，用户将可以查看该回答。',
                '屏蔽该回答，用户将无法查看屏蔽的回答。',
            ]
        }
    },
    created() {


        this.questionId = this.$route.params.questionId
        
        this.getQuestionDetail()
    },
    methods: {
        handleSizeChange(size) {
            this.pageSize = size
            this.getQuestionDetail()
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage
            this.getQuestionDetail()
        },
        //置顶回答
        stick(id,state) {

            let title;
            state == 1? title='确认取消该回答的置顶？':title='确认置顶该回答吗？'

            this.$confirm(title, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                upAnswer({
                    answerId:id,
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

                        this.getQuestionDetail()
                    }
                })
            })
            
        },
        // 屏蔽/取消屏蔽回答
        blockAnswer(commentId,block) {
            this.$confirm(this.tipContent[block], '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                blockAnswer({
                    answerId:commentId,
                    onOff:block
                }).then(res => {
                    if(res) {
                        this._tipMessage(block)
                        this.getQuestionDetail()
                    }
                    
                })
            })
        },
        getQuestionDetail() {
            questionDetail({
                pageNum:this.currentPage,
                pageSize:this.pageSize,
                questionId: this.questionId
            }).then(res => {
                if(res.extra) {



                    this.question = res.extra                  
                    this.answerList = res.list 
                    this.total = res.total
                }
            })
        },
        _tipMessage(block) {
            if(block) {
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
@import '../../../assets/css/common.scss';



.page-container {
    background: $mian-bg;
    padding:0;
    bottom: 0;
    height: 100%;
    .question{
        background: white;
        padding:30px;
        position: relative;
        margin-bottom: 20px;
        &:last-child{
            margin:0
        }
        .title {
            font-size: 20px;
            font-weight: bold;
            padding-bottom: 30px;
        }
        .edit{
            margin-top: 13px;
        }
        .fllow{
            position: absolute;
            top:100px;
            font-size: 18px;
            right:30%;
        }
        
        
        @include list

        
    }
    .answer{
        .answer-item {
            background: white;
            padding:30px;
            margin-bottom: 20px;
            &:last-child{
                margin: 0;
            }

            .stick-btn{
                margin-top:50px;
                display: flex;
                .shield-answer,.stick-answer,.answer-sticked{
                    display: inline-block;
                    margin-bottom:15px;
                    font-size: 14px;
                    background: #f0f0f0;
                    color:$active-bg;
                    padding:15px;
                    width:90px;
                    text-align:center;
                    box-sizing:border-box;
                    cursor: pointer;
                }
                .stick-answer{
                    margin-right: 15px;
                    display: inline-block;
                    background:$active-bg;
                    color:white;
                }
            }
 
            .comment-num{
                padding-left: 70px;
                cursor: pointer;
                color:$active-bg
            }

            .stick-tip{
                width: 40px;
                text-align: center;
                margin-bottom: 15px;
                font-size: 14px;
                padding:2px;
                color:$active-bg;
                border:1px solid $active-bg;
            }

            @include list
        }
    }
    .pagination{
        background: white;
        // padding: 0;
        padding-bottom: 60px;
        padding-right: 30px;
    }
}

.mask{
    background: #f7f7f7!important;
}
</style>

