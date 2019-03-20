<template>
    <div class="page-container">

        <el-form label-width="100px" :model="form" :rules="rules" ref="form">
            <h2>基本信息</h2>
            <el-row>
                <el-col :span="15">
                    <el-form-item label="项目标题" prop="title">
                        <el-input v-model="form.title" clearable maxlength="35"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="5">
                    <el-form-item label="产品类型" prop="productTypeCode">
                        <el-select v-model="form.productTypeCode" placeholder="请选择">
                            <el-option v-for="item in productType" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="项目类型" prop="projectTypeCode">
                        <el-select v-model="form.projectTypeCode" placeholder="请选择">
                            <el-option v-for="item in projectType" :key="item.dictCode" :label="item.dictName" :value="item.dictCode" >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="价格" prop="productPrice">
                        <el-input clearable v-model.number="form.productPrice"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1" v-if="form.projectTypeCode == '7001'">
                    <span style="line-height:40px;font-size:14px;">按月</span>
                </el-col>
                <el-col :span="1" v-else-if="form.projectTypeCode == '7002'">
                    <span style="line-height:40px;font-size:14px;">总价</span>
                </el-col>
            </el-row>

            <h2>投标截止时间</h2>
            <el-row>
                <el-col :span="7">
                    <el-form-item label="截止时间" prop="deadline">
                        <el-date-picker v-model="form.deadline" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择截止时间">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>

            <h2>项目地址</h2>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="省/市/区" prop="areaCode">
                        <el-cascader expand-trigger="hover" :options="addressList" filterable  @change="addressChange" v-model="selectAddress"></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="9">
                    <el-form-item label="详细地址" prop="detailAddress">
                        <el-input clearable v-model="form.detailAddress"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <h2>经纪人信息</h2>
            <el-row>
                <el-col :span="15">
                    <el-form-item label="经纪人" prop="brokerId">
                        <el-select
                            v-model="form.brokerId"
                            filterable
                            remote
                            reserve-keyword
                            clearable
                            placeholder="请输入关键词"
                            :remote-method="remoteMethod"
                            :loading="loading">
                                <el-option
                                    v-for="item in broker"
                                    :key="item.userId"
                                    :label="(item.name || item.nickname) + item.phone"
                                    :value="item.userId">
                                </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <h2>项目主题 <el-button type="primary" @click="addTheme()">新增项目主题</el-button></h2>
            <div class="themeBox">
                <div class="theme" v-for="(item, i) in themeList" :key="i">
                    <el-row :gutter="20" class="form-group">
                        <el-col :span="15" class="custom-group">
                            <label class="label"><span class="require">*</span>主题标题</label>
                            <el-input clearable placeholder="请输入主题标题" v-model="form['list['+i+'].title']"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <el-button type="info" @click="delThemeItem(i)">删除</el-button>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" class="form-group">
                        <el-col :span="15" class="custom-group">
                            <label class="label"><span class="require">*</span>主题描述</label>
                            <el-input
                                type="textarea"
                                clearable
                                :autosize="{ minRows: 4}"
                                placeholder="请输入主题描述"
                                v-model="form['list['+i+'].desc']">
                                
                            </el-input>
                        </el-col>
                    </el-row>
                </div>
            </div>

            

           <!--  <h2>发布设置</h2>
            <el-row>
                <el-form-item label="项目状态" prop="bidprojectStatus">
                    <el-col>
                        <el-radio v-model="form.bidprojectStatus" label="1">草稿</el-radio>
                        <el-radio v-model="form.bidprojectStatus" label="2">招标中</el-radio>
                        <el-radio v-model="form.bidprojectStatus" label="3">招标结束</el-radio>
                        <el-radio v-model="form.bidprojectStatus" label="4">已下架</el-radio> 
                        <el-select v-model="form.bidprojectStatus">
                                <el-option
                                    v-for="item in projectStatus"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value">
                                </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-row>-->
            <el-row class="btn">
                <el-col  :span="21">
                    <span class="click-btn none" v-if="projectId == 0" @click="publish('form','draft')">保存草稿</span>
                    <el-button type="primary" @click="publish('form','created')" v-if="projectId == 0">马上发布</el-button>
                    <el-button type="primary" @click="publish('form','save')" v-else>保存修改</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import { createBidproject,editBidproject, getAllAreaList, getProductTypeList, getProjectTypeList, brokerList, bidprojectDetail   } from '../../../http/api.js'
    export default {
        name: 'tenderDetail',
        data() {
            //自定义检测价钱规则
            var checkPrice = (rule, value, callback) =>  {
                if( value < 0) {
                    callback(new Error('请输入大于零的数字'));
                }else {
                     callback();
                }
            };
            return {
                loading: false,
                form: {
                    title: '',
                    'list[0].title': '',
                    'list[0].desc': '',
                    productPrice: '',
                    deadline: '', // 截止时间
                    detailAddress: '', // 地址
                    brokerId: '', // 经纪人
                    productTypeCode: '',// 产品类型
                    projectTypeCode: '', // 项目类型
                    provinceCode: '', // 省份 code
                    cityCode: '', // 城市 code
                    areaCode: '',// 区域 code
                    bidprojectStatus: '', //项目状态
                },
                // 周期制为按月 项目制按总价
                cycle:'',
                broker:[],
                productType: [],
                projectType: [],
                projectStatus: [
                    {
                        name: '草稿',
                        value:1
                    },
                    {
                        name: '招标中',
                        value:2
                    },
                   /*  {
                        name: '招标结束',
                        value:3
                    },
                    {
                        name: '下架',
                        value:4
                    }, */
                ],
                //编辑的地址
                selectAddress:[],

                rules: {
                    title:[
                        { required: true, message: '请填写项目标题', trigger: 'change' }
                    ],
                    'list[0].title': [
                        { required: true, message: '请填写主题标题', trigger: 'change' }
                    ],
                    'list[0].desc': [
                        { required: true, message: '请填写主题描述', trigger: 'change' }
                    ],
                    deadline: [
                        { required: true, message: '请选择截止时间', trigger: 'change' }
                    ],
                    detailAddress: [
                        { required: true, message: '请填写详细地址', trigger: 'change' }
                    ],
                    brokerId: [
                        { required: true, message: '请选择经纪人', trigger: 'change' }
                    ],
                    productTypeCode: [
                        { required: true, message: '请选择产品类型', trigger: 'change' }
                    ],
                    projectTypeCode: [
                        { required: true, message: '请选择项目类型', trigger: 'change' }
                    ],
                    areaCode: [
                        { required: true, message: '请选择省/市/区', trigger: 'change' }
                    ],
                    productPrice: [
                        { required: true, message: '请填写价格', trigger: 'change' },
                        { validator: checkPrice, trigger: 'change' }
                    ]
                },
                themeList: [
                    {
                        title: '',
                        desc: ''
                    }
                ],
                addressList: [],//所有地址
                projectId: 0,
            }
        },
        created() {
            let _this = this
            let id = this.projectId = this.$route.params.id

            this.getTypeList()
            this.getAddress()
            
            if(id == 0) {
                
            }else {  
                this.getprojectDetail().then(res => {
                    if(res) {
                        //重新赋值
                        _this.themeList = res.topiclist

                        //填充经纪人
                        _this.getBroker(res.brokerName)

                        //删除不必要字段
                        delete res.bidlist
                        delete res.topiclist
                        delete res.fullDetailAddress
                        delete res.productTypeName
                        delete res.projectTypeName
                        delete res.areaName
                        delete res.isBided
                        delete res.brokerName
                        // 填充项目主题
                        _this.form = res

                        _this.themeList.forEach((item,index) => {
                            let formTitle = `list[${index}].title`
                            let formDesc = `list[${index}].desc`
                            _this.form[formTitle] = item.title
                            _this.form[formDesc] = item.desc
                        })

                        
                        //填充地址
                        _this.selectAddress = [res.provinceCode, res.cityCode, res.areaCode]
                        
                    }
                })
            }
            
        },
        methods: {

            // 根据id查询（编辑招标）
            getprojectDetail() {
                return bidprojectDetail({
                    bidprojectId:this.projectId
                })
            },
            // 删除项目主题
            delThemeItem(key) {
                

                let len =  this.themeList.length - 1 
                this.themeList.splice(key,1)

                delete this.form[`list[${key}].title`]
                delete this.form[`list[${key}].desc`]
                
                
                // 删除数据逻辑
                if(key < len) {
                    this.themeList.forEach((val,index) => {
                        if(index >= key) {
                            // 缓存值
                            let title = this.form[`list[${index + 1}].title`]
                            let desc = this.form[`list[${index + 1}].desc`]

                            // 删除满足条件的所有项
                            delete  this.form[`list[${index + 1}].title`]
                            delete  this.form[`list[${index + 1}].desc`]
                            delete  this.rules[`list[${index + 1}].title`]
                            delete  this.rules[`list[${index + 1}].desc`]

                            // 重新赋值
                            this.form[`list[${index}].title`] = title
                            this.form[`list[${index}].desc`] = desc
                            this.rules[`list[${index}].title`] = [{ required: true, message: '请填写主题标题', trigger: 'blur' }]
                            this.rules[`list[${index}].desc`] = [{ required: true, message: '请填写主题描述', trigger: 'blur' }]
                        }
                    })
                }

            },
            // 添加项目主题
            addTheme() {
                this.themeList.push({title:'',desc:''})

                let key = this.themeList.length -1

                this.form[`list[${key}].title`] = ''
                this.form[`list[${key}].desc`] = ''

                this.rules[`list[${key}].title`] = [{ required: true, message: '请填写主题标题', trigger: 'blur' }]
                this.rules[`list[${key}].desc`] = [{ required: true, message: '请填写主题描述', trigger: 'blur' }]
 
            },
            addressChange(val) {
                this.form.provinceCode = val[0]
                this.form.cityCode = val[1]
                this.form.areaCode = val[2]
            },
            // 搜索逻辑
            remoteMethod(query) {
                if (query !== '') { 
                    this.loading = true
                    this.getBroker(query)
                }else {
                    this.broker = []
                }
            },
            // 获取经济人
            getBroker(keyword) {
                brokerList({
                    keyWords: keyword
                }).then(res => {
                    if(res) {
                        this.broker = res
                        this.loading = false
                    }
                })
            },
            // 获取产品、项目类型
            getTypeList() {
                getProductTypeList().then(res => {
                    this.productType = res
                })

                getProjectTypeList().then(res => {
                    this.projectType = res
                })
            },
            // 获取地址选择所需数据
            getAddress() {
                getAllAreaList().then(res => {
                    this.addressList =  this.getAddressList(res)
                })
            },
            publish(name,type) {
                this.validForm(name).then((res) => {
                    if( this.themeList.length > 0 ) {
                        let isfalse = false
                        this.themeList.forEach((item, index) => {
                            let formtitle = 'list['+index+'].title'
                            let formdesc = 'list['+index+'].desc'
                            
                            if(this.form[formtitle] == '' || this.form[formdesc] == '') {
                                this.$notify.error({
                                    title: '错误',
                                    message: '项目主题未填写'
                                })
    
                                isfalse = true
                            }

                        })

                        if(isfalse) {
                            return false 
                        }
                    }else {
                        this.$notify.error({
                            title: '错误',
                            message: '至少填写一个项目主题'
                        })

                        return false
                    }

                    if(this.projectId == 0) {
                        let successTip = ''
                        if(type === 'draft') { // 草稿
                            this.form.bidprojectStatus = 1
                            successTip = '保存草稿成功'
                        }else if(type === 'created'){
                            this.form.bidprojectStatus = 2
                            successTip = '发布成功'
                        }
                        
                        createBidproject(this.form).then( res => {
                            if(res) {
                                this.$message({
                                    message:successTip,
                                    type: 'success'
                                })

                                setTimeout(() => {
                                    this.$router.push('/tender')
                                }, 1500);
                            }
                        })
                    }else {
                        editBidproject(this.form).then(res => {
                            if(res) {
                                this.$message({
                                    message: '编辑成功！',
                                    type: 'success'
                                })

                                setTimeout(() => {
                                    this.$router.push('/tender')
                                }, 1500);
                            }
                        })
                    }
                }).catch((err)=>{
                    this.$notify.error({
                        title: '错误',
                        message: '请检查必填项'
                    })
                })
    
            },
            validForm(formName) {

                return new Promise((reslove,reject) => {
                    this.$refs[formName].validate((valid) => {

                        if (valid) {

                            reslove(valid)
                        } else {
                            reject(valid)
                        }
                    })
                })
                
            },
            // 处理地址
            getAddressList(address) {
                for(var i = 0,len = address.length;i < len;i ++) {
                    if( address[i]['children'].length == 0) {
                        delete address[i]['children']
                    }else {
                        this.getAddressList(address[i].children)
                    }
                }
                return address
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page-container {
        h2 {
            padding: 20px 0;
            padding-left: 20px;
            font-weight: 900;
            font-size: 16px;
        }

        .theme {
            padding-top: 20px;
            margin-bottom: 20px;
            margin-left: 90px;
            border: 1px dashed #BBB;
        }

        .btn {
            margin: 100px 0 100px 80px;
        }
    }

    .form-group {
        padding: 26px 0;
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
</style>
