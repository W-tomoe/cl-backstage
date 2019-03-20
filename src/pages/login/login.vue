<template>
    <div class="login-page">
        <div class="login-box">
            <div class="left">
                <div class="logo">
                    <img src="../../assets/img/logo.jpg">
                </div>
                <div class="company-name">橙链</div>
                <span>财务知识变现平台</span>
            </div>
            <div class="right">
                <div class="input-group">
                    <label for="">登陆账号<span class="require">*</span></label>
                    <div>
                        <input type="text" v-model="account" class="account">
                    </div>
                </div>
                <div class="input-group">
                    <label for="">登陆密码<span class="require">*</span></label>
                    <div>
                         <input type="password" v-model="password" class="password">
                    </div>
                </div>
                <el-button type='primary' class="submit" @click="submit">登 陆</el-button>
            </div>
        </div>
    </div>
</template>

<script>

import { login } from '../../http/api.js'
import { appid } from '../../utils/config.js'
import util from '@/utils/utils.js'
export default {
    data () {
        return {
            account: "",
            password: '',
        }
    },
    created() {
       
    },
    mounted() {
        /*  wechatLogin({
            code:'123456'
        }).then(res => {
            
        }) */
    },
    methods: {
        // 登陆
        submit() {
            login({
                loginname: this.account,
                password: this.password
            }).then(res => {
                
                if(res.token){
                    
                    // sessionStorage.setItem('adminToken',res.token)
                    util.setCookie('adminToken',res.token)

                    this.$message({
                        message: '登陆成功！',
                        type: 'success'
                    })

                    this.$router.push('/')
                }else {

                }
            })
        }
    }
}
</script>


<style lang="scss" scoped>
@import '../../assets/css/common.scss';
.login-page {
    background: $mian-bg;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .login-box {
        display: flex;
        position: fixed;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        .left {
            width: 267px;
            height: 389px;
            background: $menu-bg;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            color: white;
            .logo{
                width: 131px;
                height: 131px;
                border-radius: 50%;
                overflow: hidden;
                margin-top: 63px;
                img{
                    width: 100%;
                }
            }
            .company-name{
                font-size: 28px;
                padding: 20px 0 15px;
            }
            span{
                font-size: 14px;
            }
        }
        .right{
            width: 532px;
            height: 389px;
            padding:34px 32px 55px 54px;
            background: white;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            box-sizing: border-box;
            .input-group {
                padding-bottom: 22px;
                label{
                    font-size: 16px;
                }
                .account,.password{
                    background: white;
                    margin-top: 15px;
                    width: 100%;
                    height: 50px;
                    line-height: 60px;
                    font-size: 15px;
                    padding-left: 10px;
                    box-sizing: border-box;
                    border: 1px solid #cccccc;
                }
            }
            .submit{
                height: 60px;
                font-size:18px;
            }
        }
    }
}

</style>

