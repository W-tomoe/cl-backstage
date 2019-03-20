<template>
    <el-container direction="vertical" class="login">
        <!-- <el-header height='100px' class="header">
            <el-row>
                <el-col :span='1'>
                    橙链
                </el-col>
                <el-col :span="10">
                    知识变现平台
                </el-col>
            </el-row>
        </el-header> -->
        <el-main class="main">
            <div class="login-box">
                <!-- 二维码容器 -->
                <div id="login-code"></div>
            </div>
        </el-main>
        <!-- <el-footer height='100px' class="footer">
            版权所有@ 深圳市云桥信息技术有限公司2016粤ICP备08036625号
        </el-footer> -->
    </el-container>
</template>

<script>
import config  from '@/utils/config.js'

export default {
    mounted() {
        var code = new WxLogin({
            self_redirect:false,
            id:"login-code",
            appid:config.appid,
            scope:"snsapi_login",
            redirect_uri:'https://'+encodeURIComponent('blockchain.orancrab.com'),
            state:parseInt(Math.random()*100)
        })
    }
}
</script>

<style scoped>
.login{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom:0;
    height: 100%;
}
.header{
    line-height: 100px;
    font-size: 22px;
}
.p-l-30{
    padding-left: 30px;
}
.footer{
    line-height: 100px;
    text-align: center;
    flex-grow: 0
}
.main{
    flex-shrink: 1;
    background: #f7f7f7;
    position: relative;
    padding:0;
}
.login-box{
    height: 600px;
    width:500px; 
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    /* background: #fff; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.tip{
    font-size: 20px;
    padding-bottom: 15px;
    text-align: center
}
</style>
