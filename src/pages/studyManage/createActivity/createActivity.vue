<template>
    <div class="page-container">
        <el-form :model='activity' :rules="rules" ref="form" label-width="100px">
            <div class="title">基本信息</div>
            
            <el-row class="form-group">
                <el-col :span="14">
                    <el-form-item label="活动名称" prop="title">
                        <el-input placeholder="输入活动名称" maxlength='35' v-model="activity.title"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row  class="form-group">
                <el-col :span="8">
                    <el-form-item label="活动封面" prop="showImg">
                        <el-upload
                            class="upload-demo"
                            :action="upLoad"
                            :on-success='uploadSuccess'
                            :on-remove="uploadRemove"
                            :before-upload="beforeUpload"
                            :file-list="fileList"
                            :limit='1'
                            list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">建议尺寸750*560px，JPG、PNG格式， 图片小于5M。最多上传一张图片。</div>
                        </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row  class="form-group">
                <el-col :span="14">
                    <el-form-item label="活动分类" prop="activityTypeCode">
                        <el-select v-model="activity.activityTypeCode"  placeholder="请选择">
                            <el-option v-for="item in activityType" :key="item.dictCode" :label="item.dictName" :value="item.dictCode"></el-option>
                        </el-select>
                        <router-link class="click-btn none" :to="{path:`/createType/activity/0/new`}">前往活动分类</router-link>
                    </el-form-item>
                </el-col>
            </el-row>


            <div class="title">活动举办时间</div>


            <el-row  class="form-group">
                <el-col :span="14">
                    <el-form-item label="举办时间" prop="activityBeginTime">
                        <el-date-picker
                            :disabled="type=='edit'"
                            v-model="rangeTime"
                            type="datetimerange"
                            @change="rangeChange"
                            value-format='yyyy-MM-dd HH:mm:ss'
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item >
                </el-col>
            </el-row>


            <div class="title">活动地址</div>

            <el-row :gutter="20"  class="form-group">
                <el-col :span="7" class="range-time">
                    <el-form-item label="省/市/区" prop="areaCode">
                        <el-cascader expand-trigger="hover" :options="addressList" filterable  @change="addressChange" v-model="selectAddress"></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="7" class="range-time">
                    <el-form-item label="详细地址" prop="activityAddr">
                        <el-input type="text"  placeholder="输入详细地址" v-model="activity.activityAddr"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>


            <div class="title">主讲人</div>
            <el-row  class="form-group">
                <el-col :span="14" class="range-time">
                    <el-form-item label="主讲人" prop="userId">
                        <el-select
                            v-model="activity.userId"
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

            <el-row  class="form-group">
                <el-col :span="14" class="custom-group">
                    <label class="label"><span class="require">*</span>活动详情</label>
                    <div class="input-group">
                        <UEditor ref='editor'></UEditor>
                        <div class="tip">友情提示：支持第三方微信编辑器的内容复制</div>
                    </div>
                </el-col>
            </el-row>
     
            <div class="title">收费信息</div>

            <el-row class="form-group">
                <el-col :span="14">
                    <el-form-item label="收费方式" prop="price">
                        <el-row>
                            <el-col :span="2">
                                <el-radio v-model="sellType" label="1" @change='sellChange'>免费</el-radio>
                                <el-input type="hidden"  placeholder="设置价格" v-model="activity.price" ></el-input>
                             </el-col>
                        </el-row>     
                        <el-row>
                            <el-col :span="1">
                                <el-radio v-model="sellType" label="2" @change='sellChange'>收费</el-radio>
                            </el-col>
                            <el-col :span="5" :offset="1" v-if="showPriceInput">
                                <el-input type="text"  placeholder="设置价格" v-model="activity.price" ></el-input>
                            </el-col>
                        </el-row>
 
                    </el-form-item>
                </el-col>
            </el-row>

            <!-- <div class="title">活动状态</div>

            <el-row class="form-group">
                <el-col :span="14">
                    <el-form-item label="活动状态" prop="isPutaway">
                        <el-select v-model="activity.isPutaway" placeholder="请选择">
                            <el-option
                                v-for="item in actStatus"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row> -->
           

            <div class="btns">
                <div v-if="activityId == 0">
                    <span class="click-btn"  @click="submit('form','draft')">保存为草稿</span>
                    <el-button type="primary" @click="submit('form','create')">立即发布</el-button>
                </div>
                <div v-else>
                    <el-button type="primary" @click="submit('form','fix')">保存</el-button>
                </div>
            </div>
        </el-form>
    </div>
</template>


<script>
import UEditor from 'components/ueditor/ueditor'
import { getActivityTypeList, createActivity, getActivityById, getAllAreaList, updateActivity, getUserList  } from '../../../http/api.js'
import { upLoad, imgUrl } from '../../../http/config.js'

export default {
    data () {
        return {
            activity: {
                title: '',
                showImg: '',
                activityTypeCode: '',
                activityBeginTime: '',
                activityEndTime: '',
                provinceCode: '',
                cityCode: '',
                areaCode: '',
                activityAddr: '',
                content: '',
                userId: '',
                price: 0,
                isPutaway: ''
            },
            rules: {
                title: [
                    { required: true, message: '请输入活动名称', trigger: 'change' }
                ],
                showImg: [
                    { required: true, message: '请上传活动封面', trigger: 'change' }
                ],
                activityTypeCode: [
                    { required: true, message: '请选择活动分类', trigger: 'change' }
                ],
                activityBeginTime: [
                    { required: true, message: '请选择举办时间', trigger: 'change' }
                ],
                areaCode: [
                    { required: true, message: '请选择省/市/区', trigger: 'change' }
                ],
                activityAddr: [
                    { required: true, message: '请填写详细地址', trigger: 'change' }
                ],
                userId: [
                    { required: true, message: '请选择主讲人', trigger: 'change' }
                ],
                price: [
                    { required: true, message: '请填写价格', trigger: 'blur' }
                ]
            },
            fileList: [],

            // 主讲人列表
            lecturers: [],

            // 售卖方式
            sellType: '1',

            showPriceInput:false,
            activityType:[],
            selectActType:[],
            actTime:'',

            //地址options
            addressList:[],

            // 时间选择
            startTime:'',
            endTime:'',
            pickerOptionsStart: {
                disabledDate: (time) => {
                    return time < this.endTime
                }
            },
            pickerOptionsEnd:{
                disabledDate: (time) => {
                    return time < this.startTime
                }
            },
            rangeTime: [], // 范围时间v-model
            selectAddress:[], // 地址v-model
            loading: false,

            actStatus: [
                {
                    label: '草稿',
                    value: 0,
                },
                {
                    label: '已上架',
                    value: 1,
                },
                {
                    label: '已下架',
                    value: 2,
                },
            ],
            upLoad:upLoad,
            activityId: 0,
            type:'' // 是新建还是编辑进来的 edit编辑 new新建
        }
    },
    created() {
        // this.init()
        
    },
    //做了缓存的页面进入调用
    activated() {
        this.init()
    },
    beforeRouteEnter(to, from, next) {
        
        if(from.path == '/createType/activity/0' || from.path == '/activity' && to.params.type == 'edit') {
            to.meta['needFresh'] = false;
        }else{
            to.meta['needFresh'] = true;
        }
    
        next();
    },
    methods: {
        //初始化数据
        init() {
            let activityId = this.activityId = this.$route.params.id
            if(this.activityId == 0) {

            }else {
                this.getUserList()
                this.getActivityById()
            }
            this.getAddress()

            this.getTypeList()
            this.type = this.$route.params.type
            if (this.$route.meta['needFresh']) {
                this.resetForm();
            } 
        },
        // 新建进来的重置表单
        resetForm() {
            this.$refs['form'].resetFields()
            this.selectAddress = []
            this.rangeTime = []
            this.sellType = '1'
            this.showPriceInput = false
            this.fileList = []
        },
        //获取地址
        getAddress() {
            getAllAreaList().then(res => {
                this.addressList = this.getAddressList(res)
            })
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
            this.activity.showImg = ''
            this.fileList.shift()
        },
        // 图片上传成功后
        uploadSuccess(res) {
            this.activity.showImg =  res.data.filePath
        },
        getActivityById() {
            getActivityById({
                activityId: this.activityId
            }).then(res => {
                this.activity = res

                let last = res.showImg.lastIndexOf('/')
                    let name = ''
                if(last > 0 ) {
                    name = res.showImg.substring(last + 1)
                }else {
                    name = res.showImg
                }

                //填充富文本


                this.fileList = [
                    {url:`${res.showImg}`,name:name}
                ]

                if( res.price != 0 ) {
                    this.sellType = '2'
                    this.showPriceInput = true
                }

                // 填充时间
                this.rangeTime = [ res.activityBeginTime, res.activityEndTime ]

                //填充省市区
                this.selectAddress = [ res.provinceCode, res.cityCode, res.areaCode]
                this.$refs.editor.setUEContent(res.content)
            })
        },
        sellChange(val) {
            if(val == 2) {
                this.showPriceInput = true
                this.activity.price = ''
            }else {
                this.showPriceInput = false
                this.activity.price = 0
            }
            
        },
        // 获取分类列表
        getTypeList() {
            getActivityTypeList().then(res => {
                this.activityType = res
            })
        },
        // 发布
        submit(formName,type) {
            this.activity.content = this.$refs.editor.getUEContent()
            this.validForm(formName).then(res => {
                if(this.activity.content == '') {
                    this.$notify.error({
                        title: '错误',
                        message: '请填写活动详情'
                    })
                    return
                }
                


                if( this.activityId == 0 ) {

                    let tipContent = '是否存为草稿'
                    if(type === 'draft') { //草稿
                        this.activity.isPutaway = 0
                        tipContent = '存为草稿成功！'
                    }else {
                        this.activity.isPutaway = 1
                        tipContent = '发布活动成功！'
                    }

                    createActivity(this.activity).then(res => {
                        if(res) {
                            this.$message({
                                message: tipContent,
                                type: 'success'
                            })

                            setTimeout(() => {
                                this.$router.push('/activity')
                            },1500)
                        }
                    })
                }else {

                     updateActivity(this.activity).then(res => {
                        if(res) {
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            })

                            setTimeout(() => {
                                this.$router.push('/activity')
                            },1500)
                        }
                    })
                }
            }).catch(err => {
                this.$notify.error({
                    title: '错误',
                    message: '请检查必填项'
                })
            }) 

        },  
        validForm(name) {

            return new Promise((resolve, reject) => {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        resolve(valid)
                    } else {
                        reject(valid)
                    }
                });
            })
            
        },
        //时间选择
        rangeChange(val) {
            this.activity.activityBeginTime =  val[0]
            this.activity.activityEndTime = val[1]
        },
        //地址选择
        addressChange(val) {
            this.activity.provinceCode = val[0]
            this.activity.cityCode = val[1]
            this.activity.areaCode = val[2]
        },
        getAddressList(address) {
            for(var i = 0,len = address.length;i < len;i ++) {
                if( address[i]['children'].length == 0) {
                    delete address[i]['children']
                }else {
                    this.getAddressList(address[i].children)
                }
            }

            return address
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
                keywordStr: keyword
            }).then(res => {
                if(res) {
                    this.lecturers = res
                    this.loading = false
                }
            })
        }
    },
    computed: {
        
    },
    components: {
        UEditor
    }
}
</script>


<style lang="scss" scoped>
.page-container{
    padding-bottom: 200px;
    .title{
        font-weight: bold;
        font-size: 16px;
        padding: 30px 0 30px;
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

</style>
