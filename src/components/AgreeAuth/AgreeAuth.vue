<template>
    <div class="auth">
        <p>授权信息</p>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="请求人员">
                <el-input v-model="form.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="身份信息">
                <el-input v-model="form.identity" disabled></el-input>
            </el-form-item>
            <el-form-item label="来源机构">
                <el-input v-model="form.organization" disabled></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="comform(1)">同意</el-button>
                <el-button @click="comform(0)">拒绝</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { api } from '../../util/api'
import store from '../../store/index'
import { Base64 } from '../../util/createBrand'
import { cache } from '../../util/cache'

export default {
    name: 'AgreeAuth',
    data() {
        return {
            form: {
                name: '',
                organization: '',
                identity: 0
            },
            sender: this.$route.params.sender,
            index: this.$route.params.index
        }
    },
    computed: {
        userAccount() {
            return store.state.userInfo.user.account
        }
    },
    created() {
        this.getSenderInfo()
    },
    methods: {
        getSenderInfo() {
            this.$http.get(api.GET_USERINFO, {
                params: {
                    user_account: this.sender
                },
                headers: {
                    token: cache.getStroage('token')
                }
            }).then(res => {
                if(res.data.code !== 0) {
                    this.$message.error('请求失败')
                } else {
                    this.form = {
                        name: res.data.data.name,
                        identity: res.data.data.identity,
                        organization: res.data.data.organization
                    }
                }
            })
        },
        async comform(agreeCode) {
            let { data} = await this.$http.get(api.AGREE_AUTH, {
                params: {
                    patient_account: this.userAccount,
                    sender_account: this.sender,
                    agree_code: agreeCode
                },
                headers: {
                    token: cache.getStroage('token')
                }
            })
            if (data.code !== 0) {
                this.$message.error('请求错误')
                return
            } else if (data.data) {
                // 拿授权码
                let userState = {
                    patientAccount: this.userAccount,
                    state: data.data.state
                }
                store.commit('auth/setUserState', userState)
                this.$http.get(api.GET_CODE, {
                    params: {
                        state: data.state,
                        patientAccount: this.userAccount,
                    },
                    headers: {
                        token: cache.getStroage('token')
                    }
                }).then(res => {
                    if (res.data.code !== 0) {
                        this.$message.error('请求失败')
                    } else {
                        store.commit('auth/setCode', res.data.data.code)
                    }
                })
            } else {
                store.commit('messageList/deleteMessage', this.index)
                this.$router.go(-1)
                return
            }

            // 生成客户端记号
            let clientBrandTool = new Base64()
            let clientBrand = clientBrandTool.encode(this.userAccount)
            let res = await this.$http.get(api.RECEIVE_CLIENT_BRAND, {
                params: {
                    clientBrand
                },
                headers: {
                    token: cache.getStroage('token')
                }
            })
            let clientCertificate = res.data.data.clientCertificate

            // 请求业务后台
            let resBasic = await this.$http.get(api.TO_AUTH, {
                params: {
                    code: store.state.auth.code,
                    clientCertificate,
                    reqAccount: this.sender,
                    identity: this.form.identity
                },
                headers: {
                    token: cache.getStroage('token')
                }
            })
            if (resBasic.data.code !== 0) {
                this.$message.error(resBasic.data.data.message)
                return
            }
            this.$message.success('授权成功')

            store.commit('messageList/deleteMessage', this.index)
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="less">
.auth {
    max-width: 300px;
    margin: 0 auto;
    text-align: center;
    /deep/ .el-input.is-disabled .el-input__inner{
        color: #919395;
        background-color: #fff;
    }
}
</style>
