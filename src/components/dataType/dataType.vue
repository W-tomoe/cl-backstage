<template>
    <div>
        <div v-for="(item,index) in list" :key="index" class="ratio-type">
            <div class="total">
                <h2 class="title">{{item.name}}</h2>
                <span v-if="item.total">昨日累计 {{item.total.yesterday}}</span>
                <span v-if="item.total">今日新增 {{item.total.addToday}}</span>
                <span v-if="item.total">今日累计 {{item.total.today}}</span>
                <span v-if="item.total">变化比例 {{item.total.changeRatio}}</span>
            </div>

            <el-row class="inner">
                <el-col :span="4" v-for="(inner,innerKey) in item.detail" :key="innerKey" class="detail-item">
                    <ul>
                        <li class="title">{{inner.name}}</li>
                        <li class="data">新增 {{inner.add}}</li>
                        <li class="data">累计 {{inner.total}}</li>
                    </ul>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
}
</script>


<style lang="scss" scoped>
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
</style>
