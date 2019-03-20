<template>
    <div class="page-container">
        <el-form :rules="rules" :model="course" ref="course" label-width="100px">
            <div class="title">基本信息</div>
   
            <el-row class="form-group">
                <el-col :span="14">
                    <el-form-item label="音频名称" prop="title">
                        <el-input placeholder="输入音频名称" maxlength='35' v-model="course.title"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-row class="form-group">
                <el-col :span="14">
                    <el-form-item label="音频简介" prop="describe">
                        <el-input placeholder="输入音频简介" type="textarea" rows="5" maxlength='120' v-model="course.describe"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

             <el-row class="form-group">
                <el-col :span="14">
                    <el-form-item label="直播时间" prop="liveBeginTime">
                        <el-date-picker :disabled="type=='edit'" format="yyyy-MM-dd HH:mm:ss" value-format='yyyy-MM-dd HH:mm:ss' v-model="course.liveBeginTime" :value='course.liveBeginTime' type="datetime" placeholder="开始时间" ></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row class="form-group">
                <el-col :span="8">
                    <el-form-item label="音频封面" prop="showImg">
                        <el-upload
                            class="upload-demo"
                            :action="upLoad"
                            :on-success='uploadSuccess'
                            :on-remove='uploadRemove'
                            :file-list="fileList"
                            :limit='1'
                            :before-upload="beforeUpload"
                            accept=''
                            list-type="picture">
                            <el-button size="small" type="primary" >点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">建议尺寸750*560px，JPG、PNG格式， 图片小于5M。最多上传一张图片。</div>
                        </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row  class="form-group">
                <el-col :span="14" class="custom-group">
                    <label class="label"><span class="require">*</span>音频详情</label>
                    <div class="input-group">
                        <UEditor ref='editor'></UEditor>
                        <div class="tip">友情提示：支持第三方微信编辑器的内容复制</div>
                    </div>
                </el-col>
            </el-row>

            <div class="title">讲师设置</div>

            <el-row  class="form-group">
                <el-col :span="14" class="range-time">
                    <el-form-item label="主讲人" prop="userId">
                        <el-select
                            v-model="course.userId"
                            filterable
                            remote
                            reserve-keyword
                            clearable
                            placeholder="请输入关键词"
                            :remote-method="remoteMethod"
                            :loading="loading">
                                <el-option
                                    v-for="item in lecturers"
                                    :key="item.userId"
                                    :label="(item.name || item.nickname) + item.phone"
                                    :value="item.userId">
                                </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            


            <div class="title">商品信息</div>

            <el-row class="form-group">
                <el-col :span="14">
                    <el-form-item label="售卖方式" prop="price">
                        <el-row>
                            <el-col :span="2">
                                <el-radio v-model="sellType" label="1" @change='sellChange'>免费</el-radio>
                                <el-input type="hidden"  placeholder="设置价格" v-model="course.price" ></el-input>
                             </el-col>
                        </el-row>     
                        <el-row>
                            <el-col :span="1">
                                <el-radio v-model="sellType" label="2" @change='sellChange'>收费</el-radio>
                            </el-col>
                            <el-col :span="5" :offset="1" v-if="showPriceInput">
                                <el-input type="text"  placeholder="设置价格" v-model="course.price" ></el-input>
                            </el-col>
                        </el-row>
 
                    </el-form-item>
                </el-col>
            </el-row>

            <!-- <el-row class="form-group">
                <el-col :span="14">
                    <el-form-item label="课程类型" prop="courseType">
                        <el-select v-model="course.courseType"  placeholder="请选择">
                            <el-option v-for="item in courseTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row class="form-group">
                <el-col :span="14">
                    <el-form-item label="课程状态" prop="isPutaway">
                        <el-select v-model="course.isPutaway "  placeholder="请选择">
                        <el-option v-for="item in isPutaways" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    </el-form-item>
                </el-col>
            </el-row> -->

            <el-row class="form-group">
                <el-col :span="14">
                    <el-form-item label="课程分类" prop="courseTypeCode">
                        <el-select v-model="course.courseTypeCode"  placeholder="请选择">
                            <el-option v-for="item in courseCodeTypes" :key="item.dictCode" :label="item.dictName" :value="item.dictCode"></el-option>
                        </el-select>
                        <router-link class="click-btn none" :to="{path:`/createType/curriculum/0/new`}">前往课程分类</router-link>
                    </el-form-item>
                </el-col>
            </el-row>

            <div class="btns">
                <span class="click-btn" @click="submit('course','draft')"  v-if='courseId == 0'>保存为草稿</span>
                <el-button type="primary" @click="submit('course','created')" v-if='courseId == 0'>立即发布</el-button>
                <el-button type="primary" @click="submit('course','save')" v-else>保存</el-button>
            </div>
        </el-form>
    </div>
</template>


<script>

import limitInput from 'components/limitInput/limitInput'
import UEditor from 'components/ueditor/ueditor'
import { createCourse, getCourseTypeList, updateCourseType, getCourseById, updateCourse, getUserList } from '../../../http/api.js'
import { Loading } from 'element-ui';
import { upLoad } from '../../../http/config.js'
import { imgUrl } from '../../../http/config.js'
export default {
    data () {
        return {
            lecturers: [],
            sellType:'1',
            showPriceInput:false,
            course:{
                title:'',
                describe:'',
                liveBeginTime:'',
                showImg:[],
                content:'',
                userId:'',
                price:0,
                courseTypeCode:'',
                isPutaway: 1, //0草稿 1已上架 2已下架
                courseType: 2 // 1直播 2音频 3视频
            },
            fileList:[],
            courseCodeTypes:[],
            courseTypes:[
                // {
                //     label:'直播',
                //     value:1
                // },
                {
                    label:'音频',
                    value:2
                },
                // {
                //     label:'视频',
                //     value:3
                // },
            ],
            isPutaways:[
                {
                    label:'已上架',
                    value:1
                },
                {
                    label:'已下架',
                    value:2
                },
            ],
            courseId:0,
            rules: {
                title:[
                    { required: true, message: '请填写音频名称', trigger: 'change' }
                ],
                describe:[
                    { required: true, message: '请填写音频简介', trigger: 'change' }
                ],
                liveBeginTime:[
                    { required: true, message: '请选择直播时间', trigger: 'change' }
                ],
                showImg:[
                    { type: 'required', required: true, message: '请上传音频封面', trigger: 'change' }
                ],
                userId:[
                    { required: true, message: '请选择主讲人', trigger: 'change' }
                ],
                price:[
                    { required: true, message: '请选择填写课程价格', trigger: 'change' }
                ],
                price:[
                    { required: true, message: '请填写价钱', trigger: 'blur' },
                ],
                courseTypeCode:[
                    { required: true, message: '请选择课程分类', trigger: 'change' },
                ],
                /* courseType: [
                    { required: true, message: '请选择直播类型', trigger: 'change' },
                ],
                isPutaway: [
                     { required: true, message: '请选择课程状态', trigger: 'change' },
                ] */
            },
            loading: false,
            upLoad:upLoad,
            canFixLiveTime: false, // 是否能修改直播时间，新建的时候可以，编辑的时候1.0限制不可修改
            type:''
        }
    },
    created() {
        
        // this.init()
    },
    // 缓存页面进入调用
    activated() {
        this.init()
    },
    deactivated() {
  
    },
    beforeRouteEnter(to, from, next) { // 路由导航钩子，通过页面路由标记是否需要清空页面数据重新加载
        to.meta['fromPath'] = from.path;
        if(from.path == '/createType/curriculum/0' || from.path == '/curriculum' && to.params.type == 'edit') {
            to.meta['needFresh'] = false;
        }else{
            to.meta['needFresh'] = true;
        }
        next();
    },
    methods: {
        //初始化数据
        init() {
            let courseId = this.courseId = this.$route.params.id
            let type = this.$route.params.type
            if(type == 'new') {
                
            }else {
                this.getCourseById()
                this.getUserList()

                // this.canFixLiveTime = false
            }
            this.getCourseType()
            this.type = this.$route.params.type
            if (this.$route.meta['needFresh']) {
                this.resetForm();
            } 
        },
        // 新建进来的重置表单
        resetForm() {
            this.$refs['course'].resetFields()
            this.selectAddress = []
            this.sellType = '1'
            this.showPriceInput = false
            this.fileList = []
        },
        onEditorBlur(event) {

        },
        onEditorFocus(event) {

        },
        onEditorReady(event) {

        },
        //图片上传前
        beforeUpload(file) {
            let _this = this
            const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')
            const isLt5M = file.size / 1024 / 1024 < 5;

            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG、PNG 格式!')
            }

            if (!isLt5M) {
                this.$message.error('上传图片大小不能超过 5MB!')
            }

            const isSize = new Promise((resolve, reject) => { 
                var reader = new FileReader()
                reader.onload = (event) => { 
                    var image = new Image()
                    image.onload = function () { 
                        var width = this.width
                        var height = this.height
                        if (width != 750 && height != 560){
                            _this.$message.error('上传的图片必须是等于750*560px!');
                            reject()
                        } 
                        resolve()
                    }
                    image.src = event.target.result
                } 
                reader.readAsDataURL(file)
            })

            return isJPG && isLt5M && isSize
        },
        // 图片删除
        uploadRemove() {
            this.course.showImg = ''
            this.fileList.shift()
        },
        // 图片上传成功时
        uploadSuccess(res) {
            this.course.showImg = res.data.filePath
        },
        sellChange(val) {
            if(val == 2) {
                this.showPriceInput = true
                this.course.price = ''
            }else {
                this.showPriceInput = false
                this.course.price = 0
            }
            
        },
        getCourseById() {
            getCourseById({
                courseId:this.courseId
            }).then(res => {
                if(res) {
                    this.course = res

                    let last = this.course.showImg.lastIndexOf('/')
                    let name = ''

                    if(last > 0 ) {
                        name = this.course.showImg.substring(last+1)
                    }else {
                        name = this.course.showImg
                    }
    
                    this.fileList = [{url:`${res.showImg}`,name:name}]

                    if( this.course.price != 0) {
                        this.sellType = '2'
                        this.showPriceInput = true
                    }

                    this.$refs.editor.setUEContent(this.course.content)
                }
            })
        },
        getCourseType() {
            getCourseTypeList().then(res=>{
                if(res) {
                    this.courseCodeTypes = res
                }
            })
        },
        // 刷新课程分类
        refreshCourseType() {
            /* updateCourseType().then(res => {
                this.courseTypes = res
            }) */
        },
        
        // 搜索主讲人
        remoteMethod(query) {
            if(query !== '') {
                this.loading = true
                this.getUserList(query)

            }else {
                this.lecturers = []
            }
        },
        getUserList(keyword) {
            //获取用户列表
            getUserList({
                keywordStr:keyword
            }).then(res => {
                if(res) {
                    this.lecturers = res
                    this.loading = false
                }
                
            })
        },
        // 发布
        submit(name,type) {

            this.validForm(name).then((res)=>{
                let content = this.$refs.editor.getUEContent()

                if(content == '') {
                    this.$notify({
                        title: '警告',
                        message: '请输入回答内容',
                        type: 'warning'
                    });

                    return
                }

                this.course.content = content

                if(this.courseId == 0) {

                    if(type == 'draft') {
                        this.course.isPutaway = 0
                    }

                    createCourse(this.course).then(res => {
                        if(res) {


                            if(type == 'draft') {
                                this.$message({
                                    message: '存为草稿成功！',
                                    type: 'success'
                                })
                            }else {
                                this.$message({
                                    message: '发布成功！',
                                    type: 'success'
                                })
                            }
                            setTimeout(() => {
                                this.$router.push('/curriculum')
                            }, 1500)
                        }
                    })
                } else {
                    updateCourse(this.course).then(res => {
                        if(res) {
                            this.$message({
                                message: '编辑成功！',
                                type: 'success'
                            })

                            setTimeout(() => {
                                this.$router.push('/curriculum')
                            }, 1500)
                        }
                    })
                }
            }).catch(err => {
                this.$notify.error({
                    title: '错误',
                    message: '请检查必填项'
                });
            })            
        },
        validForm(name) {
            return new Promise((resolve,reject) => {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        resolve(valid)
                    } else {
                        reject(valid)
                    }
                })
            })
            
        },
        
    },
    watch: {
        course: {
            handler(newValue, oldValue) {
                this.course = newValue
            },
            deep: true
        }
    },
    components: {
        UEditor,
        limitInput
    }
}
</script>


<style lang="scss" scoped>
.page-container{

    padding-bottom: 200px;
    .title{
        font-weight: bold;
        font-size: 16px;
        padding: 30px 0 30px 25px;
    }
    .form-group{
        padding:26px 0;
    }
    .custom-group{
        display: flex;
        .label{
            text-align: right;
            width: 100px;
            font-size: 14px;
            color: #606266;
            line-height: 40px;
            padding: 0 12px 0 0;
            box-sizing: border-box;
            flex-shrink: 0;
        }
        .tip{
            padding-top: 15px;
            font-size: 14px;
        }
    }
    .btns{
        padding-top: 100px;
        .click-btn{
            padding-right: 42px;
            border: 0;
        }
    }
    
}
.el-radio{
    line-height: 40px
}
.el-textarea__inner{
    height: 150px;
}
</style>
