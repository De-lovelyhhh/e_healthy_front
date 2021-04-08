<template>
    <div class="case">
        <div class="case-left">
            <div
                v-for="(item, index) in menuList"
                :key="index"
                @click="changeItem(index)"
                :class="index === clickIndex ? 'choose-item' : ''"
            >
                <i :class="item.icon"></i>
                {{item.name}}
            </div>
        </div>
        <div class="case-main">
            <div class="auth-input">
                <el-input v-model="patientAccount" placeholder="请输入患者账号，请求患者授权" style="width:300px"></el-input>
                <el-button type="primary" style="background-color: #1F7C69; border-color: #1F7C69" @click="authRequest">发送请求</el-button>
            </div>
            <div class="case-list">
                <div v-for="(item, index) in caseList" :key="item.case_id" @click="toDetail(index)" class="case-item">
                    <img src="../../assets/case.png">
                    <div>病历号：{{item.case_id}}</div>
                    <div v-if="clickIndex === 1">患者：{{item.Name}}</div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { send } from '../../util/websocket'
import store from '../../store/index'
import { api } from '../../util/api'
import { cache } from '../../util/cache'

export default {
    name: 'CaseList',
    data() {
        return {
            menuList: [
                {
                    icon: 'el-icon-document',
                    name: '病历列表'
                },
                {
                    icon: 'el-icon-document-copy',
                    name: '授权病历'
                }
            ],
            clickIndex: 0,
            loading: true,
            patientAccount: '',
            caseList: []
        }
    },
    computed: {
        user() {
            return store.state.userInfo.user
        }
    },
    created() {
        this.getCaseList()
    },
    watch: {
        clickIndex(val){
            if (val === 0) {
                this.getCaseList()
            } else if (val === 1) {
                this.getMyCaseList()
            }
        }
    },
    methods: {
        changeItem(index) {
            this.clickIndex = index
        },
        async authRequest() {
            if (this.patientAccount === '') return
            let { data } = await this.$http.get(api.CHECK_PATIENT, {
                params: {
                    patient_account: this.patientAccount
                },
                headers: {
                    token: cache.getStroage('token')
                }
            })

            if (data.code !== 0){
                this.$message.error(data.message)
                return
            }
            send.call(this, {
                account: this.user.account,
                identity: this.user.identity,
                target: this.patientAccount,
                message: ''
            })
        },
        async getCaseList() {
            let { data } = await this.$http.get(api.GET_CASE_LIST,{
                headers: {
                    token: cache.getStroage('token')
                }
            })

            if (data.code !== 0) {
                this.$message.error(data.msg || data.message || '请求出错')
                return
            }

            this.caseList = data.data
        },
        toDetail(index) {
            this.$router.push(`/case_detail/${this.caseList[index].case_id}`)
        },
        async getMyCaseList() {
            let { data } = await this.$http.get(api.GET_MY_CASE_LIST, {
                headers: {
                    token: cache.getStroage('token')
                }
            })
            if (data.code !== 0) {
                this.$message.error(data.data)
            }
            this.caseList = data.data
        }
    }
}
</script>

<style lang="less" src="./CaseList.less">
</style>
