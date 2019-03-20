<template>
    <div class="page-container">
        <div class="ratio-type">
            <div class="total">
               
                 <el-row :gutter="15" class='search'>
                    <el-col :span="5" >
                         <h2 class="title">学员/顾问</h2>
                    </el-col>
                    <el-col :span="3" :offset="selectType != '指定日期' ? 14 :8">
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
                        <li class="title">回答分享</li>
                        <li class="data">新增 {{dataList.xgWenDaFenXiangXinZeng }}</li>
                        <li class="data">累计 {{dataList.xgWenDaFenXiangLeiJi }}</li>
                    </ul>
                </el-col>
                <el-col :span="4"  class="detail-item">
                    <ul>
                        <li class="title">课程分享</li>
                        <li class="data">新增 {{dataList.xgKeChengFenXiangXinZeng }}</li>
                        <li class="data">累计 {{dataList.xgKeChengFenXiangLeiJi }}</li>
                    </ul>
                </el-col>
                <el-col :span="4"  class="detail-item">
                    <ul>
                        <li class="title">活动分享</li>
                        <li class="data">新增 {{dataList.xgHuoDongFenXiangXinZeng }}</li>
                        <li class="data">累计 {{dataList.xgHuoDongFenXiangLeiJi  }}</li>
                    </ul>
                </el-col>
                <el-col :span="4"  class="detail-item">
                    <ul>
                        <li class="title">邀请回答</li>
                        <li class="data">新增 {{dataList.xgYaoQingHuiDaXinZeng }}</li>
                        <li class="data">累计 {{dataList.xgYaoQingHuiDaLeiJi }}</li>
                    </ul>
                </el-col>
                <el-col :span="4"  class="detail-item">
                    <ul>
                        <li class="title">邀请投标</li>
                        <li class="data">新增 {{dataList.xgYaoQingTouBiaoXinZeng }}</li>
                        <li class="data">累计 {{dataList.xgYaoQingTouBiaoLeiJi }}</li>
                    </ul>
                </el-col>
                <el-col :span="4"  class="detail-item">
                    <ul>
                        <li class="title">讲授课程</li>
                        <li class="data">新增 {{dataList.xgJiangShouKeChengXinZeng }}</li>
                        <li class="data">累计 {{dataList.xgJiangShouKeChengLeiJi }}</li>
                    </ul>
                </el-col>
                <el-col :span="4"  class="detail-item">
                    <ul>
                        <li class="title">主办活动</li>
                        <li class="data">新增 {{dataList.xgZhuBanHuoDongXinZeng }}</li>
                        <li class="data">累计 {{dataList.xgZhuBanHuoDongLeiJi }}</li>
                    </ul>
                </el-col>
                <el-col :span="4"  class="detail-item">
                    <ul>
                        <li class="title">转发小程序</li>
                        <li class="data">新增 {{dataList.xgZhuanFaMiniappXinZeng }}</li>
                        <li class="data">累计 {{dataList.xgZhuanFaMiniappLeiJi }}</li>
                    </ul>
                </el-col>
            </el-row>
        </div>
        <div class="ratio-type">
            <div class="total">
                <h2 class="title">平台</h2>
            </div>

            <el-row class="inner">
                <el-col :span="4"  class="detail-item">
                    <ul>
                        <li class="title">上架课程</li>
                        <li class="data">新增 {{dataList.ptShangJiaKeChengXinZeng}}</li>
                        <li class="data">累计 {{dataList.ptShangJiaKeChengLeiJi }}</li>
                    </ul>
                </el-col>
                <el-col :span="4"  class="detail-item">
                    <ul>
                        <li class="title">上架活动</li>
                        <li class="data">新增 {{dataList.ptShangJiaHuoDongXinZeng }}</li>
                        <li class="data">累计 {{dataList.ptShangJiaHuoDongLeiJi }}</li>
                    </ul>
                </el-col>
                <el-col :span="4"  class="detail-item">
                    <ul>
                        <li class="title">发布招标</li>
                        <li class="data">新增 {{dataList.ptFaBuZhaoBiaoXinZeng }}</li>
                        <li class="data">累计 {{dataList.ptFaBuZhaoBiaoLeiJi }}</li>
                    </ul>
                </el-col>
                <el-col :span="4"  class="detail-item">
                    <ul>
                        <li class="title">提请签约</li>
                        <li class="data">新增 {{dataList.ptTiQingQianYueXinZeng }}</li>
                        <li class="data">累计 {{dataList.ptTiQingQianYueLeiJi }}</li>
                    </ul>
                </el-col>
                <el-col :span="4"  class="detail-item">
                    <ul>
                        <li class="title">自由流量</li>
                        <li class="data">新增 {{dataList.ptZhiYouLiuLiangXinZeng }}</li>
                        <li class="data">累计 {{dataList.ptZhiYouLiuLiangLeiJi }}</li>
                    </ul>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import dataType from 'components/dataType/dataType'
import { getOperationData } from '@/http/api.js'
import utils from '../../utils/utils.js'
export default {
    data () {
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
        getData() {
            getOperationData().then(res => {
                this.dataList = res
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


            let url = `/statistics/exportOperationDataStatistics?beginDateStr=${that.beginDateStr}&endDateStr=${that.endDateStr}`

            utils.download(url)
        }
    },
    components: {
        dataType
    }
}
</script>


<style lang="scss" scoped>
.page-container{
    bottom:0;
    .ratio-type{
    padding-bottom: 40px;
        .total{
            width: 100%;
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

.search{
    display: flex;
    align-items: center;
}
</style>