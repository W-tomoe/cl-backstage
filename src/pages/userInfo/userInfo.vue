<template>
    <div class="page-container">
        <el-form ref="form" :rules="rules" >
            <div class="title">基本信息</div>
            <el-row>
                <el-col :span="12">
                    <div class="input-group">
                        <label>姓名</label>
                        <el-input v-model="userInfo.userName" placeholder="请填写"></el-input>
                    </div>
                    <div class="input-group">
                        <label>星座</label>
                        <!-- <el-input v-model="userInfo.star"  placeholder="请填写"></el-input> -->
                        <el-select v-model="userInfo.star" placeholder="请选择星座">
                            <el-option
                            v-for="item in stars"
                            :key="item.value"
                            :value="item.value"
                            :disabled="item.disabled">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="input-group">
                        <label>电话</label>
                        <el-input v-model="userInfo.phone"  placeholder="请填写"></el-input>
                    </div>
                    <div class="input-group">
                        <label>工作电话</label>
                        <el-input v-model="userInfo.workPhone"  placeholder="如有工作电话，请添加"></el-input>
                    </div>
                    <div class="input-group">
                        <label>工作年限</label>
                        <el-input v-model="userInfo.workLife"  placeholder="请填写"></el-input>
                    </div>
                    <div class="input-group">
                        <label>工作岗位</label>
                        <el-input v-model="userInfo.job"  placeholder="请选择"></el-input>
                    </div>
                    <div class="input-group">
                        <label>职业证书</label>
                        <el-select
                            v-model="userInfo.certificate"
                            multiple
                            default-first-option
                            placeholder="请选择，可以多选">
                            <el-option
                            v-for="item in certificates"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="input-group">
                        <label>经历</label>
                        <el-input type="textarea" :rows="8" v-model="userInfo.experience"  placeholder="工作经历/教育经历等"></el-input>
                    </div>
                    <div class="input-group">
                        <label>个性签名</label>
                        <el-input type="text"  v-model="userInfo.autograph"  placeholder="请填写"></el-input>
                    </div>
                    <div class="input-group">
                        <label>附件</label>
                        <el-upload
                            class="upload-demo"
                            :action="baseUrl + '/uploadFile/uploadFile'"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">可以上传Word简历，职业证书、学历证书等图片或PDF</div>
                        </el-upload>
                    </div>
                </el-col>
                <el-col :offset="4" :span="8">
                    <div class="avatar">
                        <img src="../../assets/img/logo.jpg" alt="">
                    </div>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>


<script>
import { baseUrl } from '../../http/config.js'
import { getUserDetail } from '../../http/api.js'
export default {
    data () {
        return {
            userInfo: {
                userName:'陈展',
                star:'',
                phone:'137962739293',
                workPhone: '',
                workLife:'5',
                job:'财务',
                certificate:[],
                experience:'萨格哇嘎我去过会让气管软骨',
                autograph:'我就是我，不一样的烟火',
                email:'1534@qq.com',

            },
            certificates:[
                {
                    label:'CMA',
                    value:1,
                },
                {
                    label:'ACCA',
                    value:2,
                },
            ],
            stars: [
                {name:'白羊座',value:'白羊座'},
                {name:'金牛座',value:'金牛座'},
                {name:'双子座',value:'双子座'},
                {name:'巨蟹座',value:'巨蟹座'},
                {name:'狮子座',value:'狮子座'},
                {name:'处女座',value:'处女座'},
                {name:'天秤座',value:'天秤座'},
                {name:'天蝎座',value:'天蝎座'},
                {name:'射手座',value:'射手座'},
                {name:'魔羯座',value:'魔羯座'},
                {name:'水瓶座',value:'水瓶座'},
                {name:'双鱼座',value:'双鱼座'},
            ],
            fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        }
    },
    created() {
        this.baseUrl = baseUrl

    },
    methods: {
        //证书图片上传
        handlePreview() {

        },
        getUserInfo() {
            getUserDetail({

            }).then( res => {

            })
        },
        handleRemove() {

        }
    },
    components: {

    }
}
</script>


<style lang="scss" scoped>
@import '../../assets/css/common.scss';
.page-container {
    .title{
        font-size: 14px;
        font-weight: bold;
        padding-bottom: 20px;
    }
    .input-group{
        display: flex;
        margin-bottom: 20px;
        label{
            flex-shrink: 0;
            display: inline-block;
            width: 120px;
            text-align: left;
            line-height: 40px;
            font-size: 14px;
        }
        .el-input,.el-select{
            flex-grow: 1;
        }
        .file-name{
            line-height: 40px;
            color:$active-bg;
            font-size: 14px;
            cursor: pointer;
        }
    }
    .avatar{
       width: 400px;
       height: 400px; 
       background: #dddddd;
       img{
           width: 100%;
           height: 100%;
       }
    }
}
</style>
