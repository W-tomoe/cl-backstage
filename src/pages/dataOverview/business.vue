<template>
    <div class="page-container">
        <div class="ratio-type">
            <div class="total">
                <el-row :gutter="15">
                    <el-col :span="10" >
                        <h2 class='title'>学员</h2> 
                        <span>昨日累计 {{dataList.xyZuoRiLeiJi}}</span>
                        <span>今日新增 {{dataList.xyJinRiXinZeng}}</span>
                        <span>今日累计 {{dataList.xyJinRiLeiJi }}</span>
                        <span>变化比例 {{dataList.xyBianHuaBiLi}}%</span>
                    </el-col>
                    <el-col :span="3" :offset="selectType != '指定日期' ? 8 :2">
                        <el-select v-model='selectType'  placeholder="请选择">
                            <el-option
                            v-for="item in exportType"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6" v-if="selectType == '指定日期'">
                        <el-date-picker
                            @change="changTime"
                            v-model="timeRange"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            value-format='yyyy-MM-dd'
                            format='yyyy-MM-dd'
                            end-placeholder="结束日期"
                            unlink-panels>
                        </el-date-picker>
                    </el-col>

                    <el-col :span='3'>
                        <el-button type='primary' @click="exportExcel">导出Excel</el-button>
                    </el-col>
                </el-row>
                
                
            </div>

            <el-row class="inner">
                <el-col :span="4"  class="detail-item">
                    <ul>
                        <li class="title">提出问题</li>
                        <li class="data">新增 {{dataList.xyTiWenXinZeng}}</li>
                        <li class="data">累计 {{dataList.xyTiWenLeiJi }}</li>
                    </ul>
                </el-col>
                <el-col :span="4"  class="detail-item">
                    <ul>
                        <li class="title">回答问题</li>
                        <li class="data">新增 {{dataList.xyHuiDaXinZeng}}</li>
                        <li class="data">累计 {{dataList.xyHuiDaLeiJi }}</li>
                    </ul>
                </el-col>
                <el-col :span="4"  class="detail-item">
                    <ul>
                        <li class="title">报名课程</li>
                        <li class="data">新增 {{dataList.xyBaoMingKeChengXinZeng }}</li>
                        <li class="data">累计 {{dataList.xyBaoMingKeChengLeiJi }}</li>
                    </ul>
                </el-col>
                <el-col :span="4"  class="detail-item">
                    <ul>
                        <li class="title">参与课程</li>
                        <li class="data">新增 {{dataList.xyCanYuKeChengXinZeng }}</li>
                        <li class="data">累计 {{dataList.xyCanYuKeChengLeiJi }}</li>
                    </ul>
                </el-col>
                <el-col :span="4"  class="detail-item">
                    <ul>
                        <li class="title">报名活动</li>
                        <li class="data">新增 {{dataList.xyBaoMingHuoDongXinZeng }}</li>
                        <li class="data">累计 {{dataList.xyBaoMingHuoDongLeiJi }}</li>
                    </ul>
                </el-col>
                <el-col :span="4"  class="detail-item">
                    <ul>
                        <li class="title">推荐项目</li>
                        <li class="data">新增 {{dataList.xyTuiJianXiangMuXinZeng }}</li>
                        <li class="data">累计 {{dataList.xyTuiJianXiangMuLeiJi}}</li>
                    </ul>
                </el-col>
                <el-col :span="4"  class="detail-item">
                    <ul>
                        <li class="title">申请顾问</li>
                        <li class="data">新增 {{dataList.xyShengQingGuWenXinZeng }}</li>
                        <li class="data">累计 {{dataList.xyShengQingGuWenLeiJi }}</li>
                    </ul>
                </el-col>
            </el-row>

        </div>
        <div class="ratio-type">
            <div class="total">
                <h2 class="title">顾问</h2>
                <span>昨日累计 {{dataList.gwZuoRiLeiJi }}</span>
                <span>今日新增 {{dataList.gwJinRiXinZeng }}</span>
                <span>今日累计 {{dataList.gwJinRiLeiJi }}</span>
                <span>变化比例 {{dataList.gwBianHuaBiLi}}%</span>
            </div>

            <el-row class="inner">
                <el-col :span="4"  class="detail-item">
                    <ul>
                        <li class="title">提出问题</li>
                        <li class="data">新增 {{dataList.gwTiWenXinZeng}}</li>
                        <li class="data">累计 {{dataList.gwTiWenLeiJi }}</li>
                    </ul>
                </el-col>
                <el-col :span="4"  class="detail-item">
                    <ul>
                        <li class="title">回答问题</li>
                        <li class="data">新增 {{dataList.gwHuiDaXinZeng}}</li>
                        <li class="data">累计 {{dataList.gwHuiDaLeiJi }}</li>
                    </ul>
                </el-col>
                <el-col :span="4"  class="detail-item">
                    <ul>
                        <li class="title">报名课程</li>
                        <li class="data">新增 {{dataList.gwBaoMingKeChengXinZeng }}</li>
                        <li class="data">累计 {{dataList.gwBaoMingKeChengLeiJi }}</li>
                    </ul>
                </el-col>
                <el-col :span="4"  class="detail-item">
                    <ul>
                        <li class="title">参与课程</li>
                        <li class="data">新增 {{dataList.gwCanYuKeChengXinZeng }}</li>
                        <li class="data">累计 {{dataList.gwCanYuKeChengLeiJi }}</li>
                    </ul>
                </el-col>
                <el-col :span="4"  class="detail-item">
                    <ul>
                        <li class="title">报名活动</li>
                        <li class="data">新增 {{dataList.gwBaoMingHuoDongXinZeng}}</li>
                        <li class="data">累计 {{dataList.gwBaoMingHuoDongLeiJi }}</li>
                    </ul>
                </el-col>
                <el-col :span="4"  class="detail-item">
                    <ul>
                        <li class="title">推荐项目</li>
                        <li class="data">新增 {{dataList.gwTuiJianXiangMuXinZeng}}</li>
                        <li class="data">累计 {{dataList.gwTuiJianXiangMuLeiJi}}</li>
                    </ul>
                </el-col>
                <el-col :span="4"  class="detail-item">
                    <ul>
                        <li class="title">今日签约</li>
                        <li class="data">新增 {{dataList.gwJinRiQianYueXinZeng}}</li>
                        <li class="data">累计 {{dataList.gwJinRiQianYueLeiJi}}</li>
                    </ul>
                </el-col>
            </el-row>

        </div>
    </div>
</template>

<script>
import dataType from 'components/dataType/dataType'
import { getBusinessData } from '@/http/api.js'
import utils from '../../utils/utils.js'

export default {
    data() {
        return {
            dataList:[],
            beginDateStr:'',
            endDateStr: '',
            timeRange:[],

            exportType: [
                {
                    name:'当天',
                    value: '当天'
                },
                {
                    name:'当周',
                    value: '当周'
                },
                {
                    name:'当月',
                    value: '当月'
                },
                {
                    name:'指定日期',
                    value: '指定日期'
                },
            ],
            selectType:'当天'
        }
    },
    created() {
        this.getData()
    },
    methods: {
        select(val) {
            console.log(111,val,'val')
        },
        getData() {
            getBusinessData().then( res => {
                if(res) {
                    this.dataList = res
                }
            })
        },
        changTime(val) {
            this.beginDateStr = val[0]
             this.endDateStr = val[1]
        },
        exportExcel() {

            let that = this
            
            switch(this.selectType) {
                case '当天': 
                    let day = utils.formatDateType('day')
                    that.beginDateStr = day.beginDateStr
                    that.endDateStr = day.endDateStr
                    break;
                case '当周': 
                    let week = utils.formatDateType('week')
                    that.beginDateStr = week.beginDateStr
                    that.endDateStr = week.endDateStr
                    break;
                case '当月': 
                    let moth = utils.formatDateType('moth')
                    that.beginDateStr = moth.beginDateStr
                    that.endDateStr = moth.endDateStr
                    break;
            }


            let url = `/statistics/exportBusinessDataStatistics?beginDateStr=${that.beginDateStr}&endDateStr=${that.endDateStr}`

            utils.download(url)
        },
    },
    components: {
        dataType
    }
}
</script>


<style lang="scss" scoped>
.page-container {
    position: absolute;
    bottom:0;
    .ratio-type{
    padding-bottom: 40px;
        .total{
            padding-bottom: 20px;
            border-bottom: 1px solid #dddddd;
            .title{
                font-size: 28px;
                display: inline;
            }
            span{
                font-size: 14px;
                padding-left: 15px;
            }
        }
        .inner{
            .detail-item {
                padding-top: 30px;
                padding-left: 25px;
                position: relative;
                &::after {
                    display: block;
                    content: ' ';
                    border-right:1px solid #dddddd;
                    position: absolute;
                    right: 0px;
                    top: 35px;
                    height: 60px;
                    width: 1px;
                }
                .title{
                    font-size: 16px;
                    padding-bottom: 15px;
                }
                .data{
                    cursor: pointer;
                    color:#E51C23;
                    font-size: 14px;
                    padding-bottom: 10px;
                }
            }
            
        }
    }
}
</style>