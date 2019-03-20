<template>
    <div class="page-container">
        <h2>项目信息</h2>
        <el-table :data="projectDetail" style="width: 100%" class="table">
            <el-table-column prop="answerNum" label="项目名称/价格">
                <template slot-scope="scope">
                    <p>{{scope.row.title}}</p>
                    <p class="price-text">{{scope.row.productPriceStr}}元</p>
                </template>
            </el-table-column>
            <el-table-column prop="answerNum" align="center" label="投标人数">
                <template slot-scope="scope">
                    {{scope.row.bidsCount}}人
                </template>
            </el-table-column>
            <el-table-column prop="productTypeName" align="center" label="产品类型"></el-table-column>
            <el-table-column prop="brokerName" align="center" label="经纪人"></el-table-column>
            <el-table-column label="项目地址" align="center">
                <template slot-scope="scope">
                    {{scope.row.fullDetailAddress + scope.row.detailAddress}}
                </template>
            </el-table-column>
            <el-table-column prop="bidprojectStatus" label="状态" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.bidprojectStatus == 1">草稿</span>
                    <span v-if="scope.row.bidprojectStatus == 2">招标中</span>
                    <span v-if="scope.row.bidprojectStatus == 3">招标结束</span>
                    <span v-if="scope.row.bidprojectStatus == 4">已下架</span>
                </template>
            </el-table-column>
            <el-table-column prop="deadline" label="截止时间" align="center"></el-table-column>
        </el-table>

        <h2>主题信息</h2>
        <el-table :data="themeList" style="width: 100%" class="table">
            <el-table-column type="index" width="200" label='序号'></el-table-column>
            <el-table-column prop="title" label="主题标题"></el-table-column>
            <el-table-column prop="desc" label="主题描述"></el-table-column>
        </el-table>

        

        <div class='robot-title'>
            <h2>投标记录（{{total}}条）</h2>

            <el-button type="primary" @click="addRobot(projectId)">自动添加投标人</el-button>
        </div>

        <el-table :data="bidPeopleList" style="width: 100%"  v-if="bidPeopleList.length > 0">
            <el-table-column prop="answerNum" label="头像/姓名/手机号">
                <template slot-scope="scope">
                    <div class="user-box">
                        <div class="avatar">
                            <img :src="scope.row.bidderHeadImg">
                        </div>
                        <div>
                            <p>{{scope.row.bidderName}}</p>
                            <p>{{scope.row.bidderPhone}}</p>
                            <router-link class="click-btn none show-detail" :to="{path:`/editUserInfo`, query: { userId: scope.row.bidderId , recordId : scope.row.recordId , listType : 'apply' , applyStatus : 3}}">查看顾问详细信息</router-link>
                        </div>
                    </div>
                    
                </template>
            </el-table-column>
            <el-table-column prop="consultantLevelName" label="顾问等级">
                <template slot-scope="scope">
                    {{scope.row.consultantLevelName || '无'}}
                </template>
            </el-table-column>
            <el-table-column prop="serviceProductName" label="服务类型">
                <template slot-scope="scope">
                    {{scope.row.consultantLevelName || '无'}}
                </template>
            </el-table-column>
            <el-table-column prop="desc" width="450" label="投标内容">
                <template slot-scope="scope">
                    <p class="bid-content">{{scope.row.title}}</p>
                    <p class="bid-content">{{scope.row.desc}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="answerNum" align="center" label="操作">
                <template slot-scope="scope">
                    <span class="bid-people">
                        <i class="el-icon-success"></i>
                        <div>中标人</div>
                    </span>
                </template>
            </el-table-column>
        </el-table>

        <div class="bid-season" v-if="bidPeopleList.length > 0">
            <div>{{bidPeopleList[0].bidderName}}中标的理由</div>
            <span class="season">{{bidPeopleList[0].bidReason}}</span>
        </div>

        <el-table :data="bidList" style="width: 100%" :show-header='showHeader'  v-if="bidList.length > 0">
            <el-table-column prop="answerNum" label="头像/姓名/手机号">
                <template slot-scope="scope">
                    <div class="user-box">
                        <div class="avatar">
                            <img :src="scope.row.bidderHeadImg">
                        </div>
                        <div>
                            <p>{{scope.row.bidderName}} <span class='tag' v-if="scope.row.isRobot">机器人</span></p>
                            <p>{{scope.row.bidderPhone}}</p>
                            <router-link class="click-btn none show-detail" :to="{path:`/editUserInfo`, query: { userId: scope.row.bidderId , recordId : scope.row.recordId , listType : 'apply' , applyStatus : 3}}">查看顾问详细信息</router-link>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="consultantLevelName" label="顾问等级">
                <template slot-scope="scope">
                    {{scope.row.consultantLevelName || '无'}}
                </template>
            </el-table-column>
            <el-table-column prop="serviceProductName" label="服务类型">
                <template slot-scope="scope">
                    {{scope.row.serviceProductName || '无'}}
                </template>
            </el-table-column>
            <el-table-column prop="desc" width="450" label="投标内容">
                <template slot-scope="scope">
                    <p class="bid-content">{{scope.row.title}}</p>
                    <p class="bid-content">{{scope.row.desc}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="answerNum" align="center" label="操作">
                <template slot-scope="scope">

                    <span v-if="!projectIsBid ">
                        <span v-if="scope.row.bidrecordStatus == 3">
                            <span class="click-btn" @click="select(scope.row.bidprojectBidrecordId)">选为中标人</span>
                            <span class="click-btn none" @click="block(scope.row.bidprojectBidrecordId,'true')">屏蔽投标内容</span>
                        </span>
                        <span v-else-if="scope.row.bidrecordStatus == 2">
                            <span class="click-btn none" @click="block(scope.row.bidprojectBidrecordId,'false')">取消屏蔽</span>
                        </span>
                        <span class="bid-people" v-else>
                            <i class="el-icon-success"></i>
                            <div>中标人</div>
                        </span>
                    </span>

                    <span v-else>
                        <span class="give-people">
                            <i class="el-icon-remove"></i>
                            <div>中标放弃</div>
                        </span>
                    </span>
                </template>
            </el-table-column>
        </el-table>
        <div v-if="total == 0">
            当前无投标记录
        </div>

        <el-dialog
        title="提示"
        :visible.sync="show"
        width="30%"
        center>
            <el-input type="textarea" rows="3" placeholder="请输入中标理由" v-model="bidSeason"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="show = false">取 消</el-button>
                <el-button type="primary" @click="selectBid">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { bidprojectDetail, makeBidBidproject, blockBid, bidBidproject } from '../../../http/api.js'
    export default {
        name: 'viewTender',
        data() {
            return {
                projectDetail:[],
                projectId: 0,
                themeList: [],
                bidPeopleList: [],
                bidList: [],
                selectId: '', // 选取的中标人ID
                show: false, // 是否显示弹层
                bidSeason: '', //中标理由
                showHeader: true, // 是否显示所有投标记录表头
                total:0, // 投标数
                projectIsBid: false, // 项目是否中标
            }
        },
        created() {

            let projectId = this.projectId = this.$route.params.id

            this.getProjectDetail()
        },
        methods: {
            // 选取中标人
            select(id) {
                    this.selectId = id
                    this.show = true
            },
            // 提交中标理由
            selectBid() {
                if(this.bidSeason == '') {
                    this.$message.error('请填写中标理由')
                    return
                }

                makeBidBidproject({
                    bidprojectBidrecordId: this.selectId,
                    bidReason:this.bidSeason
                }).then(res => {
                    if(res) {
                        this.getProjectDetail()

                        this.$message({
                            message: '选取中标人成功',
                            type: 'success'
                        })
                        
                        this.show = false
                    }
                })
            },
            // 屏蔽投标
            block(id,onOff) {
                blockBid({
                    bidprojectBidrecordId: id,
                    onOff: onOff
                }).then(res => {

                    if(onOff) {
                        if(res) {
                            this.$message({
                                message: '屏蔽投标成功',
                                type: 'success'
                            })
                        }
                    }else {
                        if(res) {
                            this.$message({
                                message: '解除屏蔽成功',
                                type: 'success'
                            })
                        }
                    }

                    this.getProjectDetail()
                    
                })
            },
            //添加机器人投标
            addRobot(id) {
                bidBidproject({
                    bidprojectId:id
                }).then(res => {
                    if(res) {
                        this.$message({
                            message: '机器人添加成功',
                            type: 'success'
                        })
                    }
                })
            },
            // 获取招标详细信息
            getProjectDetail() {
                bidprojectDetail({
                    bidprojectId: this.projectId
                }).then( res => {
                    if(res ) {
                        this.total = res.bidlist.length
                        this.projectDetail.push(res)

                        this.themeList = res.topiclist

                        res.bidlist.map((item,index) => {
                            if(item.bidrecordStatus == 1) {
                                this.projectIsBid = true
                                this.showHeader = false
                                this.bidPeopleList.push(item)
                            }
                        })
                       
                       this.bidList =  this.projectIsBid ? res.bidlist.slice(1,res.bidlist.length) : res.bidlist
                    }
                })
            },
            // table下标
            indexMethod(index) {
                 return index + 1;
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../../../assets/css/common.scss';
    .page-container {
        background-color: #fff;
        padding-bottom:50px; 
        h2 {
            font-weight: 900;
            padding: 50px 0 36px;
        }

        .robot-title{
            padding: 50px 0 36px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .user-box{
            display: flex;
            align-items: center;
            .avatar{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 15px;
                flex-grow: 0;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .show-detail{
                padding:0;
            }
        }

        .bid-content {
            padding: 15px 0;
            &:last-child {
                border-top:1px dashed #dddddd;
            }
        }

        .bid-people{
            color: $active-bg;
            text-align: center;
            .el-icon-success{
                font-size: 37px;
            }
            div{
                padding-top: 5px;
                font-size: 14px;
            }
        }

        .give-people{
            color:#e1e1e1;
            .el-icon-remove{
                font-size: 37px;
            }
            div{
                padding-top: 5px;
                font-size: 14px;
            }
        }
        

        .bid-season {
            // margin-top: 20px;
            padding:20px 15px 40px;
            background: $tb-bg;
            font-size: 14px;
            div{
                font-weight: bold;
                padding-bottom: 20px;
            }
        }
    }
</style>
