<template>
    <div class="page-container">
        <el-row class="question">
            <el-col :span="12">
                <h1 class="title">{{question.title}}</h1>
                <div class="describe">{{question.desc}}</div>
                <div class="time">{{question.createTime}}</div>
            </el-col>

            <div class="fllow">
                关注者 {{ question.attentionCount }}
            </div>
        </el-row>

        <div class="edit">
                <el-row class="input-group">
                    <el-col :span='2' class="label">
                        回答内容<i class="require">*</i>
                    </el-col>
                    <el-col :span="12">
                        <UEditor ref="editor"></UEditor>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :offset="2" :span="5">
                        <el-button type="primary" @click="submit">保存</el-button>
                    </el-col>
                </el-row>
        </div>
    </div>
</template>

<script>
import UEditor from 'components/ueditor/ueditor'
import { questionDetail,createQuestionAnswer } from '../../../http/api.js'
export default {
    data () {
        return {
            questionId:-1,
            question: {},
        }
    },
    created () {

        this.questionId = this.$route.query.questionId
        this.getQuestionDetail()
    },
    methods: {
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
        submit() {
            let content = this.$refs.editor.getUEContent()

            if(content == '') {
                this.$notify.error({
                    title: '错误',
                    message: '请输入回答内容'
                });
                return
            }
            createQuestionAnswer({
                questionId:this.questionId,
                content:content
            }).then(res => {
                if(res) {
                    this.$message({
                        message: '回答成功',
                        type: 'success'
                    })
                    setTimeout(() => {
                        this.$router.go(-1)
                    },1500)
                }
            })
        }
        
    },
    components: {
        UEditor
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
        
        .fllow{
            position: absolute;
            top:100px;
            font-size: 18px;
            right:30%;
        }
        
        
        @include list

        
    }
    .edit{
        background: white;
        padding:30px 30px 100px;
        margin-top: 13px;
    }
}

.input-group{
    padding-bottom: 45px;
}


</style>

