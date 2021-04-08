<template>
    <div class="detail">
        <el-form ref="form" :model="form" label-width="80px" class="case-detail">
            <div class="detail_userinfo">
                <el-form-item label="姓名">
                    <el-input v-model="form.name" :disabled="identity !== 1"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio v-model="form.sex" :label="0" disabled>男</el-radio>
                    <el-radio v-model="form.sex" :label="1" disabled>女</el-radio>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="form.age" :disabled="identity !== 1"></el-input>
                </el-form-item>
            </div>
            <div class="detail_userinfo">
                <el-form-item label="住址">
                    <el-input v-model="form.from" :disabled="identity !== 1"></el-input>
                </el-form-item>
                <el-form-item label="工作单位">
                    <el-input v-model="form.work" :disabled="identity !== 1"></el-input>
                </el-form-item>
            </div>

            <el-form-item label="过往病史">
                <el-input type="textarea" v-model="form.present_illness" :disabled="disable"></el-input>
            </el-form-item>
            <el-form-item label="过敏史">
                <el-input type="textarea" v-model="form.allergy" :disabled="disable"></el-input>
            </el-form-item>
            <el-form-item label="家庭病史">
                <el-input type="textarea" v-model="form.family_history" :disabled="disable"></el-input>
            </el-form-item>
            <el-form-item label="症状">
                <el-input type="textarea" v-model="form.illness" :disabled="disable"></el-input>
            </el-form-item>
            <el-form-item label="初步诊断">
                <el-input type="textarea" v-model="form.diagnosis" :disabled="disable"></el-input>
            </el-form-item>
            <div class="detail_record">
<!--                <el-form-item label="记录日期">-->
<!--                    <el-input v-model="form.record_date" disabled></el-input>-->
<!--                </el-form-item>-->
                <el-form-item label="诊断医生">
                    <el-input v-model="form.doctor_account" disabled></el-input>
                </el-form-item>
            </div>
            <el-form-item v-if="!disable || identity === 1">
                <el-button type="primary" @click="pushCase">更新病历</el-button>
            </el-form-item>
            <el-form-item v-if="disable && identity !== 1">
                <el-button type="primary" @click="toAuth">请求授权</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {api} from '../../util/api'
import {cache} from '../../util/cache'
import store from '../../store/index'
import qs from 'qs'
import { send } from '../../util/websocket'

let caseId
export default {
    name: 'CaseDetail',
    data() {
        return {
            form: {
                age:0,
                allergy:'--',
                diagnosis:'--',
                from:'--',
                illness:'--',
                name:'--',
                recorder:'--',
                sex:0,
                work:'--',
                case_id:14,
                doctor_account:'--',
                family_history:'--',
                patient_account:'--',
                present_illness:'--',
                record_date:'0001-01-01T00:00:00Z',
            },
            disable: true
        }
    },
    computed: {
        identity() {
            return store.state.userInfo.user.identity
        },
        user() {
            return store.state.userInfo.user
        }
    },
    created(){
        this.getCaseDetail()
    },
    methods: {
        async getCaseDetail(){
            caseId = this.$route.params.caseId
            console.log(this)
            let { data } = await this.$http.get(api.GET_CASE_DETAIL, {
                headers:{
                    token: cache.getStroage('token')
                },
                params: {
                    caseId
                }
            })

            if (data.code !== 0) {
                this.$message.error('请求错误')
                return
            }

            let caseHistory = data.data.case
            let privateCase = {}
            if (data.data.private){
                privateCase = data.data.private
                this.disable = Boolean(store.state.userInfo.user.identity)
            }
            this.form = {
                age: caseHistory.Age || privateCase.Age || 0,
                allergy: caseHistory.Allergy || privateCase.Allergy || '--',
                diagnosis: caseHistory.Diagnosis || privateCase.Dianosis || '--',
                from: caseHistory.From || privateCase.From || '--',
                illness: caseHistory.Illness || privateCase.Illness || '--',
                name: caseHistory.Name || privateCase.Name || '--',
                recorder: caseHistory.Recorder || privateCase.Recorder || '--',
                sex: caseHistory.Sex || privateCase.Sex || 0,
                work: caseHistory.Work || privateCase.Work || '--',
                case_id: caseHistory.case_id || privateCase.case_id || 0,
                doctor_account: caseHistory.doctor_account || privateCase.doctor_account || '--',
                family_history: caseHistory.family_history || privateCase.family_history || '--',
                patient_account: caseHistory.patient_account || privateCase.patient_account || '--',
                present_illness:caseHistory.present_illness || privateCase.present_illness || '--',
                record_date: caseHistory.record_date || privateCase.record_date || '0001-01-01T00:00:00Z',
            }
        },
        async pushCase() {

            let { data } = await this.$http.post(api.PUSH_CASE, qs.stringify(this.form), {
                headers: {
                    token: cache.getStroage('token'),
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            })
            if (data.code === 0) {
                this.$message('更新成功！')
            }
        },
        async toAuth() {
            let { data } = await this.$http.get(api.GET_ACCOUNT, {
                params:{
                    case_id: caseId
                },
                headers: {
                    token: cache.getStroage('token')
                }
            })
            let account = data.data
            let { data2 } = await this.$http.get(api.CHECK_PATIENT, {
                params: {
                    patient_account: account
                },
                headers: {
                    token: cache.getStroage('token')
                }
            })

            if (data2.code !== 0){
                this.$message.error(data.message)
                return
            }
            send.call(this, {
                account: this.user.account,
                identity: this.user.identity,
                target: account,
                message: ''
            })
        }
    }
}
</script>

<style lang="less" src="./CaseDetail.less">
</style>
