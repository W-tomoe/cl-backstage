<template>
    <div class="page-container">
        <div class="title">{{title}}</div>

        <el-row class="input-group">
            <el-col :span='2' class="label center">
                {{title}}<i class="require">*</i>
            </el-col>
            <el-col :span="12" class="limit">
                <el-input type="text" v-model="typeName" placeholder="请输入分类名称" :maxlength='maxlength'></el-input>
            </el-col>
        </el-row>

        <el-row>
            <el-col :offset="2" :span="4">
                <el-button type='danger' @click="deleteType" v-if="code != 0">删除</el-button>
                <el-button type='primary' @click="save">保存</el-button>
            </el-col>
        </el-row>
    </div>
</template>


<script>
import { addCourseType, addActivityType, getCourseTypeByCode, getActivityTypeByCode, updateActivityType, updateCourseType } from '../../../http/api.js'
import limitInput from 'components/limitInput/limitInput'
export default {
    data () {
        return {
            typeName: '',
            maxlength:8,
            title:'活动分类',
            type:'',
            code:0,
        }
    },
    created() {

        let type = this.type = this.$route.params.type

        let code = this.code = this.$route.params.code

        if (type == 'activity') {
            this.title = '活动分类'
            if(code == 0) {
 
            } else {
                this.getActivityTypeName()
            }
        } else {
            this.title = '课程分类'

            if(code == 0) {

            } else {
                this.getCourseTypeName()
            }
            
        }
    },
    methods: {
        save() {
            if(this.typeName == '') {
                this.$notify.error({
                    title: '错误',
                    message: '请输入分类名称'
                })
                return
            }

            if(this.code == 0) {
                this.addType().then(res => {
                    this.$message({
                        message: '添加成功！',
                        type: 'success'
                    })

                    setTimeout( ()=> {
                        this.$router.go(-1)
                    },1500)
                })
            }else {
                this.editType(1)
            }
            
        },
        // 新增分类
        addType() {
            if(this.type == 'activity') {
                return addActivityType({
                    activityTypeName: this.typeName
                })
            } else {
                return addCourseType({
                    courseTypeName: this.typeName
                })
            }
        },
        // 编辑分类
        editType(valid) {

            if(this.type == 'activity') {
                updateActivityType({
                    activityTypeName: this.typeName,
                    activityTypeCode: this.code,
                    valid: valid
                }).then(res => {

                    if(valid== 0) {
                        this.$message({
                            message: '删除成功！',
                            type: 'success'
                        })
                    }else {
                        this.$message({
                            message: '保存成功！',
                            type: 'success'
                        })
                    }
                    

                    setTimeout( ()=> {
                        this.$router.go(-1)
                    },1500)
                })
            } else {
                updateCourseType({
                    courseTypeName: this.typeName,
                    courseTypeCode: this.code,
                    valid: valid
                }).then(res => {

                    if(valid== 0) {
                        this.$message({
                            message: '删除成功！',
                            type: 'success'
                        })
                    }else {
                        this.$message({
                            message: '保存成功！',
                            type: 'success'
                        })
                    }
                    

                    setTimeout( ()=> {
                        this.$router.go(-1)
                    },1500)
                })
            }
        },
        // 删除分类
        deleteType() {
            this.$confirm('是否删除该分类?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.editType(0)
            })
        },
        getCourseTypeName() {
            getCourseTypeByCode({
                courseTypeCode:this.code
            }).then(res => {
                this.typeName = res.dictName
            })
        },
        getActivityTypeName() {
            getActivityTypeByCode({
                activityTypeCode:this.code
            }).then(res => {
                this.typeName = res.dictName
            })
        }
    },
    components: {
        limitInput
    }
}
</script>

<style lang="scss" scoped>
.page-container{
    bottom:0px;
    .title{
        font-size: 16px;
        font-weight: bold;
        padding:15px 0 30px;
    }

    .input-group{
        padding-bottom: 45px;
        .label{
            font-size: 14px;
            
        }
        .center{
            line-height: 40px;
        }
        .tip{
            padding-top: 20px;
            font-size: 14px;
        }
        .sell{
            padding-bottom: 20px;
        }
    }
}
</style>
