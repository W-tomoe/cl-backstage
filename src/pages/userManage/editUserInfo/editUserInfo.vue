<template>
    <div class="page-container">
        <el-form :model="userInfo" :rules="rules" ref="form" label-width="120px">
            <div class="title">基本信息</div>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名" prop="userName">
                        <el-input v-model="userInfo.name" placeholder="请填写姓名"></el-input>
                    </el-form-item>

                    <el-form-item label="星座" prop="star">
                        <el-select v-model="userInfo.constellation" placeholder="请选择星座">
                            <el-option v-for="item in stars" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="电话" prop="phone">
                        <el-input type='number' v-model="userInfo.phone" placeholder="请填写"></el-input>
                    </el-form-item>

                    <el-form-item label="工作电话" prop="workPhone">
                        <el-input type='number' v-model="userInfo.otherPhone" placeholder="如有工作电话，请添加"></el-input>
                    </el-form-item>

                    <el-form-item label="工作年限" prop="workLife">
                        <el-input type='number' v-model="userInfo.workYear" placeholder="请填写"></el-input>
                    </el-form-item>

                    <el-form-item label="工作岗位" prop="job">
                        <el-input v-model="userInfo.workPost" placeholder="请选择"></el-input>
                    </el-form-item>

                    <el-form-item label="职业证书" prop="jobCertificate">
                        <el-select v-model="userInfo.jobCertificateList" multiple filterable allow-create default-first-option @change="jobCertificateListChange" placeholder="请选择，可以多选">
                            <el-option v-for="item in certificates" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item label="经历" prop="experience">
                        <el-input type="textarea" :rows="8" v-model="userInfo.experience" placeholder="工作经历/教育经历等"></el-input>
                    </el-form-item>


                    <el-form-item label="个性签名" prop="signature">
                        <el-input type="text" v-model="userInfo.signature" placeholder="请填写"></el-input>
                    </el-form-item>

                    <div class="input-group">
                        <label>附件</label>
                        <!-- <div class="file-name">123.doc</div> -->
                        
                        <span  class="none-tip" v-if="!userInfo.fileUrl">该用户没有个人简历附件</span>
                        <span :href="userInfo.fileUrl" class="file-name"  @click="down" v-else>{{userInfo.fileUrl}}</span>
                    </div>

                </el-col>
                <el-col :offset="4" :span="8">
                    <div class="avatar" @click="showUploadBox">
                        <img :src="preViewImg || userInfo.resumeImg" alt="">
                    </div>
                </el-col>
            </el-row>

            <div class="title" v-if="(!(listType == 'user' && userInfo.userType == 1))">补充信息</div>
            <el-row>
                <el-col :span="20">
                    <div class="list" v-if="(!(listType == 'user' && userInfo.userType == 1))">
                        <el-form-item label="顾问身份证号码" prop="idcard">
                            <el-input type="text" v-model="userInfo.idcard" placeholder="请输入身份证"></el-input>
                        </el-form-item>

                        <el-form-item label="住址" prop="address">
                            <el-input type="text" v-model="userInfo.address" placeholder="请输入住址"></el-input>
                        </el-form-item>

                        <el-form-item label="邮箱" prop="email">
                            <el-input type="text" v-model="userInfo.email" placeholder="请输入邮箱"></el-input>
                        </el-form-item>

                        <el-form-item label="服务类型" prop="signedItemList">
                            <el-select v-model="userInfo.signedItemList" multiple allow-create default-first-option placeholder="请选择，可以多选">
                                <el-option v-for="item in signingType" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="顾问等级" prop="counselorLevelCode">
                            <el-select v-model="userInfo.counselorLevelCode" filterable allow-create default-first-option placeholder="请选择">
                                <el-option v-for="item in adviserLevel" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="关联经纪人" prop="brokerUserId">
                            <el-select v-model="userInfo.brokerUserId" filterable remote reserve-keyword clearable placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading">
                                <el-option v-for="item in broker" :key="item.userId" :label="item.name" :value="item.userId">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="评级证书" prop="relationAgent">
                                    <!-- <el-upload class="upload-demo" 
                                    :limit="1" :on-exceed="upLoadExceed" :action="upLoad" :on-remove="handleRemove" :on-success="upLoadSuccess" :file-list="fileList" list-type="picture">
                                        <el-button size="small" type="primary">点击上传</el-button>
                                        <div slot="tip" class="el-upload__tip">格式支持jpg，png，jpeg，为保证图片加载流畅，建议上传大小不超过2M</div>
                                    </el-upload> -->
                                    <el-upload
                                        class="upload-demo"
                                        :action="upLoad"
                                        :on-success='upLoadSuccess'
                                        :on-remove='handleRemove'
                                        :file-list="fileList"
                                        :limit='1'
                                        :before-upload="beforeUpload"
                                        accept=''
                                        list-type="picture">
                                        <el-button size="small" type="primary" >点击上传</el-button>
                                        <div slot="tip" class="el-upload__tip">格式支持jpg，png，jpeg，为保证图片加载流畅，建议上传大小不超过2M</div>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-form-item label="身份">
                            <input type="checkbox" v-model="userInfo.isBroker"> 设为经纪人
                            <input type="checkbox" v-model="userInfo.isSell"> 设为销售
                        </el-form-item>

                    </div>
                    <el-form-item label="备注" prop="relationAgent">
                        <el-input type="textarea" rows="5" v-model="userInfo.extRemark"></el-input>
                    </el-form-item>

                    <div class="input-group">
                        <el-button type="primary" @click="save">保存信息</el-button>
                        <!-- <el-button type="primary">预览合同</el-button> -->
                        <el-button v-if="(applyStatus != '' && applyStatus != 3)" type="primary" @click="pass">通过审核</el-button>
                    </div>
                    <el-form-item label="拒绝理由" prop="relationAgent" v-if="(applyStatus != '' && applyStatus != 3)">
                        <el-input type="textarea" rows="5" v-model="repulseReason"></el-input>
                    </el-form-item>

                    <div class="input-group" v-if="(applyStatus != '' && applyStatus != 3)">
                        <el-button type="primary" @click="reject">拒绝申请</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-form>

        <!-- <my-upload url="https://httpbin.org/post"
            @crop-success="cropSuccess"
            @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadFail"
            :no-circle="true"
            field="file"
            ki="0"
            lang-type="zh"
            v-model="dialogVisible"
            :params="otherParams"></my-upload> -->

        <el-dialog
            title="上传头像"
            :visible.sync="dialogVisible"
            width="50%" 
            :show-close='false'>
                
                <croppa v-model="myCroppa"
                    :width="200"
                    :height="200"
                    :canvas-color="'#dddddd'"
                    :placeholder="'+'"
                    :placeholder-font-size="60"
                    :placeholder-color="'default'"
                    :accept="'image/*'"
                    :file-size-limit="0"
                    :disable-drag-and-drop="false"
                    :disable-click-to-choose="false"
                    :disable-drag-to-move="false"
                    :disable-scroll-to-zoom="false"
                    :disable-rotation="false"
                    :prevent-white-space="true"
                    :reverse-scroll-to-zoom="true"
                    :show-remove-button="true"
                    :remove-button-color="'red'"
                    :remove-button-size="0"
                    :initial-image="userInfo.resumeImg"></croppa>
    
                <div>提示：滚动鼠标滚轮放大/缩小图片，拖动图片调整位置</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureUpload">确 定</el-button>
            </span>
        </el-dialog>
        
            
    </div>
</template>


<script>
    import { getUserDetail, brokerList, editUserDetail, getUserApplyConfig, passUserApply, repulseUserApply } from '@/http/api.js'
    import { upLoad } from '@/http/config.js'
    import { post } from '@/http/api.js'
    import utils from '../../../utils/utils.js'
    import Vue from 'vue'

    export default {
        data() {
            var idcardValid = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入身份证号码'));
                } else {
                    var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  

                    if(!regIdNo.test(this.userInfo.idcard)) {
                        callback(new Error('身份证号码不正确'));
                    }
                    callback()
                }
            }

            var phoneValid = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号码'));
                } else {
                    var regPhone = /^1[34578]\d{9}$/
                    if(!regPhone.test(this.userInfo.phone)) {
                        callback(new Error('手机号码不正确'));
                    }
                    callback()
                }
            }

            var emailValid = (rule, value, callback) => {
                var emailReg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
                console.log(this.userInfo.email,emailReg.test(this.userInfo.email))
                if(!emailReg.test(this.userInfo.email) && this.userInfo.email != '') {
                    callback(new Error('邮箱格式不正确'));
                }
                callback()
            }
            return {
                userInfo: {},
                rules: {
                    /* userName: [
                        { required: true, message: '请填写姓名', trigger: 'blur' }
                    ],
                    star: [
                        { required: true, message: '请选择星座', trigger: 'blur' }
                    ],
                    star: [
                        { required: true, message: '请选择星座', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, validator:phoneValid, trigger: 'blur' }
                    ],
                    workLife: [
                        { required: true, message: '请填写工作年限', trigger: 'blur' }
                    ],
                    job: [
                        { required: true, message: '请填写工作岗位', trigger: 'blur' }
                    ],
                    experience: [
                        { required: true, message: '请填写工作/教育经历', trigger: 'blur' }
                    ],
                    signature: [
                        { required: true, message: '请填写个性签名', trigger: 'blur' }
                    ], */
                    idcard: [
                        { required: true,validator:idcardValid, trigger: 'blur' }
                    ],
                    /* email: [
                        {validator:emailValid , trigger: 'blur'}
                    ], */
                    signedItemList: [
                        { required: true, message: '请选择服务类型', trigger: 'blur' }
                    ],
                    counselorLevelCode: [
                        { required: true, message: '请选择顾问等级', trigger: 'blur' }
                    ],
                    brokerUserId: [
                        { required: true, message: '请选择关联经纪人', trigger: 'blur' }
                    ],
                },
                broker: [],
                loading: false,
                stars: [
                    { name: '白羊座', value: '白羊座' },
                    { name: '金牛座', value: '金牛座' },
                    { name: '双子座', value: '双子座' },
                    { name: '巨蟹座', value: '巨蟹座' },
                    { name: '狮子座', value: '狮子座' },
                    { name: '处女座', value: '处女座' },
                    { name: '天秤座', value: '天秤座' },
                    { name: '天蝎座', value: '天蝎座' },
                    { name: '射手座', value: '射手座' },
                    { name: '魔羯座', value: '魔羯座' },
                    { name: '水瓶座', value: '水瓶座' },
                    { name: '双鱼座', value: '双鱼座' },
                ],
                signingType: [],
                certificates: [],
                adviserLevel: [],
                fileList: [],
                upLoad: upLoad,
                listType: '',
                applyStatus:'',
                repulseReason: '',// 拒绝理由
                isSaveMsg: false, // 是否保存过信息了，保存后才能通过审核
                preViewImg:'',

                dialogVisible: false, // 上传头像弹出层
                myCroppa: {},
                
            }
        },
        created() {

            this.listType = this.$route.query.listType
            this.applyStatus = this.$route.query.applyStatus
            this.getUserDetail()
            this.getUserApplyConfig()

        },
        methods: {
            jobCertificateListChange(val) {
                console.log(val,'jobCertificateListChange')
            },
            //证书图片上传
            upLoadSuccess(res) {
                this.userInfo.ratingCertificateUrl = res.data.filePath
            },
            upLoadError(err, file, fileList) {
                console.log(err, file, fileList)
            },
            handleRemove(file, fileList) {
                this.userInfo.ratingCertificateUrl = ''
                this.fileList.shift()
            },
            beforeUpload(file) {

                const isLt2M = file.size / 1024 / 1024 < 2;


                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!')
                }

                return  isLt2M 
            },
            upLoadExceed(file) {
                this.$message({
                    message: '只能上传一张证书',
                    type: 'error'
                })
            },
            // 保存信息
            save() {
                // 修改成 0 1
                this.userInfo.isBroker = Number(this.userInfo.isBroker)
                this.userInfo.isSell = Number(this.userInfo.isSell)

                this.validForm().then(res => {
                    editUserDetail(this.userInfo).then(res => {
                        if (res) {
                            this.$message({
                                message: '信息保存成功',
                                type: 'success'
                            })

                            this.isSaveMsg = true

                            setTimeout(()=> {
                                if(this.listType == 'user'){
                                    this.$router.push('/userManage')
                                }
                            },1500)
                            
                        }
                    })
                }).catch(err => {
                    this.$notify.error({
                        title: '错误',
                        message: '请填写必填项！'
                    })
                })
            },
            // 通过审核
            pass() {

                console.log(this.userInfo,'userinfo')

                this.validForm().then(res => {
                    if(!this.isSaveMsg) {
                        this.$notify.error({
                            title: '错误',
                            message: '先保存信息再通过审核！'
                        })
                        return
                    }
                    

                    passUserApply({
                        recordId: this.$route.query.recordId
                    }).then(res => {
                        if (res) {
                            this.$message({
                                message: '通过审核成功',
                                type: 'success'
                            })
                            this.$router.push('/userManage')
                        }
                    })
                }).catch(err => {
                    this.$notify.error({
                        title: '错误',
                        message: '请填写必填项！'
                    })
                })
            },
            // 表单验证
            validForm() {
                return new Promise((resolve, reject) => {
                    this.$refs['form'].validate((valid) => {
                        if(valid) {
                            resolve(valid)
                        }else {
                            reject()
                        }
                    })
                })
            },
            // 拒绝申请
            reject() {
                if(this.repulseReason === '') {
                    this.$notify.error({
                        title: '错误',
                        message: '请输入拒绝理由'
                    });
                    return
                }
                
                repulseUserApply({
                    recordId: this.$route.query.recordId,
                    repulseReason: this.repulseReason
                }).then(res => {
                    if (res) {
                        this.$message({
                            message: '拒绝申请成功',
                            type: 'success'
                        })
                        this.$router.push('/userManage')
                    }
                })
            },
            // 搜索逻辑
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true
                    this.getBroker(query)
                } else {
                    this.broker = []
                }
            },
            // 获取经济人
            getBroker(keyword) {
                brokerList({
                    keyWords: keyword
                }).then(res => {
                    if (res) {
                        this.broker = res
                        this.loading = false
                    }
                })
            },
            // 获取个人详情
            getUserDetail() {
                getUserDetail({
                    userId: this.$route.query.userId,
                }).then(res => {
                    if (res) {
                        // 处理返回为null时的array
                        if(res.signedItemList == null) {
                            res.signedItemList = []
                        }

                        if(res.jobCertificateList == null) {
                            res.jobCertificateList = []
                        }

                        // 填充关联经纪人
                        if(res.brokerUserName) {
                            this.getBroker(res.brokerUserName)
                        }
                        
                        this.userInfo = res

                        if(res.ratingCertificateUrl !== '' && res.ratingCertificateUrl !== null) {
                            this.fileList = [{url:res.ratingCertificateUrl }]
                        }
                    }
                })
            },
            // 获取用户配置
            getUserApplyConfig() {
                getUserApplyConfig().then(res => {
                    if (res) {
                        this.adviserLevel = res.counselorLevelList // 顾问等级
                        this.certificates = res.jobCertificateList // 职业证书
                        this.signingType = res.signedItemList // 服务项目
                    }
                })
            },
            // 下载简历附件
            down() {
                this.$confirm('是否下载该用户的简历附件?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    utils.down(`url`)
                })
            },
            showUploadBox() {
                
                this.dialogVisible = true
            },
            handleClose() {
                this.dialogVisible = false
            },
            sureUpload() {


                if (!this.myCroppa.hasImage()) {
                    this.$notify.error({
                        title: '错误',
                        message: '请选择上传文件'
                    });
                    return
                }
                
                this.myCroppa.generateBlob((blob) => {
                    var fd = new FormData()
                    fd.append('file', blob, 'filename.jpg')
                    
                    post({
                        url: this.upLoad,
                        data: fd
                    }).then(res => {

                        Vue.set(this.userInfo,'resumeImg',res.filePath)

                        this.preViewImg = res.prefix

                        console.log(res.prefix,'res')

                    })
                })

                this.dialogVisible = false
            }   
        },
        components: {
            
        }
    }
</script>


<style lang="scss" scoped>
    @import '../../../assets/css/common.scss';

    .page-container {
        .title {
            font-size: 14px;
            font-weight: bold;
            padding-bottom: 20px;
        }

        .input-group {
            display: flex;
            margin-bottom: 20px;

            label {
                text-align: right;
                float: left;
                font-size: 14px;
                color: #606266;
                line-height: 40px;
                padding: 0 12px 0 0;
                box-sizing: border-box;
                width: 100px;
            }

            .el-input,
            .el-select {
                flex-grow: 1;
            }

            .file-name {
                line-height: 40px;
                color: $active-bg;
                font-size: 14px;
                cursor: pointer;
            }
            .none-tip {
                line-height: 40px;
                font-size: 14px;
                color: gray
            }

            &:after {
                display: block;
                clear: both;
                content: ' ';
            }
        }

        .avatar {
            width: 400px;
            height: 400px;
            background: #dddddd;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .croppa-container{
        position: relative;
        margin:0 auto 20px;
    }

    .el-select {
        width: 100%;
    }
</style>
