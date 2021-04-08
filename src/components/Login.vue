<template id="login">
    <div class="login-main">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="账号">
                <el-input v-model="form.account"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
            </el-form-item>
            <el-form-item label="性别" v-if="isSign">
                <el-radio v-model="form.sex" :label="0">男</el-radio>
                <el-radio v-model="form.sex" :label="1">女</el-radio>
            </el-form-item>
            <el-form-item label="姓名" v-if="isSign">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="机构" v-if="isSign && form.identity !== 1">
                <el-input v-model="form.organization"></el-input>
            </el-form-item>
            <el-form-item label="身份">
                <el-radio-group v-model="form.identity">
                    <el-radio :label="0">医生</el-radio>
                    <el-radio :label="1">患者</el-radio>
                    <el-radio :label="2">其他</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login">{{isSign ? '注册' : '登录'}}</el-button>
                <el-button>取消</el-button>
            </el-form-item>
            <a  @click="changeAction">{{isSign ? '去登录>' : '去注册>'}}</a>
        </el-form>
    </div>
</template>

<script>
import { api } from '../util/api.js'
import { cache } from '../util/cache.js'
import { initSocket } from '../util/websocket'
import store from '../store/index'
export default {
    name: 'Login',
    data() {
        return {
            isSign: false,
            form: {
                account: '',
                password: '',
                identity: 0,
                name: '',
                organization: '',
                sex: 0
            }
        }
    },
    methods: {
        login() {
            if (this.isSign) {
                this.$http.post(api.SIGNIN, {
                    Account: this.form.account,
                    Password: this.form.password,
                    identity: this.form.identity,
                    name: this.form.name,
                    organization: this.form.organization,
                    sex: this.form.sex,
                }).then(res => {
                    if (res.data.code !== 0) {
                        console.log('sign in error')
                    } else {
                        cache.setStorage('token', res.data.token)
                    }
                })
            } else {
                this.$http.post(api.LOGIN, {
                    Account: this.form.account,
                    Password: this.form.password,
                    identity: this.form.identity,
                }).then(res => {
                    if (res.data.code !== 0) {
                        console.log('sign in error')
                    } else {
                        cache.setStorage('token', res.data.token)
                        const userInfo = {
                            account: this.form.account,
                            identity: this.form.identity,
                            password: this.form.password,
                            name: this.form.name
                        }
                        store.commit('userInfo/changeUserInfo', userInfo)
                        initSocket.call(this)
                        this.$router.push('/')
                    }
                })
            }
        },
        changeAction() {
            this.isSign = !this.isSign
        }
    }
}
</script>

<style lang="less">
.login-main{
    background-image: url("../assets/background.jpg");
    height: 97.5vh;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding-top: 100px;
    form {
        width: 300px;
        margin: 0 auto;
        box-shadow: 0 0 10px #ccc;
        padding: 20px;
        border-radius: 20px;
        background-color: rgb(248 248 248 / 70%)
    }
    a {
        color: #409eff;
        font-size: 14px;
        float: right;
        margin-top: -20px;
    }
}

</style>
