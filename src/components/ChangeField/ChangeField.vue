<template>
    <div class="field">
        <el-checkbox-group v-model="checkList" class="checklist">
            <el-checkbox label="sex">性别</el-checkbox>
            <el-checkbox label="name">姓名</el-checkbox>
            <el-checkbox label="work">工作</el-checkbox>
            <el-checkbox label="from">住址</el-checkbox>
            <el-checkbox label="present_illness">过往病史</el-checkbox>
            <el-checkbox label="age">年龄</el-checkbox>
            <el-checkbox label="illness">症状</el-checkbox>
            <el-checkbox label="record_date">记录日期</el-checkbox>
            <el-checkbox label="family_history">家庭病史</el-checkbox>
            <el-checkbox label="diagnosis">初步诊断</el-checkbox>
            <el-checkbox label="allergy">过敏史</el-checkbox>
            <el-checkbox label="recorder">记录者</el-checkbox>
            <el-checkbox label="doctor_account">医生账号</el-checkbox>
        </el-checkbox-group>
        <el-button @click="setFields">提交</el-button>
    </div>
</template>

<script>
import { api } from '../../util/api'
import { cache } from '../../util/cache'

let checkListBefore
export default {
    name: 'ChangeField',
    data(){
        return {
            checkList:[],
            caseId: 0
        }
    },
    created() {
        this.caseId = this.$route.params.caseId
        this.getOriginField(this.caseId)
    },
    methods: {
        async getOriginField(caseId) {
            let { data } = await this.$http.get(api.GET_FIELDS, {
                params: {
                    case_id: caseId
                },
                headers: {
                    token: cache.getStroage('token')
                }
            })
            if (data.code !== 0){
                this.$message('请求错误')
                return
            }
            checkListBefore = data.data
            this.checkList = JSON.parse(JSON.stringify(data.data))
        },
        async setFields() {
            let fields = this.checkList.join(';') + ';'

            let { deleteData, newData } = this.getDiff(checkListBefore, JSON.parse(JSON.stringify(this.checkList)))
            // TODO 修改参数
            let { data } = await this.$http.get(api.CHANGE_PRIVATE_FIELD, {
                params: {
                    caseId: this.caseId,
                    fields,
                    deleteData: deleteData,
                    newData: newData,
                },
                headers: {
                    token: cache.getStroage('token')
                }
            })
            if (data.code !== 0){
                this.$message('请求错误')
            } else {
                checkListBefore = this.checkList
                this.$message('修改成功')
            }
        },
        getDiff(beforeArr, afterArr) {
            let deleteData = []
            beforeArr.forEach(val => {
                let idx = afterArr.indexOf(val)
                if (idx === -1) {
                    deleteData.push(val)
                } else {
                    afterArr.splice(idx, 1)
                }
            })
            return {
                deleteData,
                newData: afterArr
            }
        }
    }
}
</script>

<style lang="less">
.field{
    text-align: left;
    width: 400px;
    margin: 100px auto;
    /deep/ .el-checkbox__input.is-checked{
        .el-checkbox__inner{
            background-color: #1F7C69;
            border-color: #1F7C69;
        }
        &+.el-checkbox__label{
            color: #1F7C69;
        }
    }
    /deep/ .el-button:focus, .el-button:hover{
        color: #1F7C69;
        border-color: #88d99d;
        background-color: #dff0e3;
    }

    label{
        width: 100px;
        margin: 5px 0;
        font-size: 20px;
    }
}
</style>
