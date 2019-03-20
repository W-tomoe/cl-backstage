<template>
    <div class="page-container">
        <div  class="back">
            <i class="el-icon-close" @click="back(-1)"></i>
            <span>共{{total}}评论</span>
        </div>
        <div v-if='commontList.length < 1' class='empty'><span>暂无回答内容</span></div>
        <div class="answer" v-else>
            <el-row class="answer-item " :class="{'mask': item.commentStatus == 2}" v-for="(item, index) in commontList" :key="index" >
                <el-col :span="12">
                    <div class="describe">{{item.content}}</div>
                    <div class="time">
                       <span>{{item.createTime}}</span>
                    </div>  
                </el-col>
                
                <el-col :offset="6" :span="6" class="author">
                    <img :src="item.headImg " class="avatar">
                    <span class="name">{{item.nickname }}</span>
                    <div class="shield-answer" v-if="item.commentStatus  == 2" @click="blockComment(item.commentId,0)">
                        取消屏蔽
                    </div>
                    <div class="shield-answer" v-else @click="blockComment(item.commentId,1)">
                        屏蔽评论
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
import { commentList,blockComment } from '../../../http/api.js'
export default {
    data () {
        return {
            commentId:-1,
            currentPage:1,
            pageSize:10,
            total:0,
            commontList:[],
            tipContent:[
                '取消屏蔽该评论，用户将可以查看该评论。',
                '屏蔽该评论，用户将无法查看屏蔽的评论。',
            ]
        }
    },
    created() {

        this.commentId = this.$route.params.id
        console.log(this.commentId,'this.commentId')
        this.getCommentList()
    },
    methods: {
        getCommentList() {
            commentList({
                pageNum:this.currentPage,
                pageSize:this.pageSize,
                answerId:this.commentId
            }).then(res => {
                if(res.list) {
                    this.commontList = res.list
                    this.total = res.total
                }
            })
        },
        blockComment(commentId,block) {
            this.$confirm(this.tipContent[block], '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                blockComment({
                    commentId:commentId,
                    onOff:block
                }).then(res=>{
                    if(res) {
                        this._tipMessage(block)
                        this.getCommentList()
                    }
                })
            })
        },
        back(size) {
            this.$router.go(size)
        },
        handleSizeChange(size) {
            this.pageSize = size

            this.getCommentList()
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage
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
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/common.scss';
.page-container{
    bottom:0px;
    background: transparent;
    .back{
        background: white;
        padding:44px 30px 31px;
        font-size: 22px;
        i{
            cursor: pointer;
        }
        span{
            padding-left: 30px;
        }
    }
    .answer{
        .answer-item {
            background: white;
            padding:30px;
            margin-bottom: 20px;
            &:last-child{
                margin: 0;
            }
            .shield-answer{
                margin-top:50px;
                font-size: 14px;
                background: #f0f0f0;
                color:$active-bg;
                padding:15px;
                cursor: pointer;
            }
            .comment-num{
                padding-left: 70px;
                cursor: pointer;
                color:$active-bg
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

    .mask{
        background: #f7f7f7!important;
    }
}
</style>

