<template>
    <div class="navigation" v-if="account">
        <el-menu
            :default-active="activedIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            active-text-color="#1F7C69"
        >
            <el-menu-item index="1">{{identity === 1 ? '我的病历' : '病历列表'}}</el-menu-item>
            <el-menu-item index="2">消息中心</el-menu-item>
            <el-menu-item index="3" v-if="identity === 1">修改敏感字段</el-menu-item>
        </el-menu>
        <a @click="logout">退出登录</a>
    </div>

</template>

<script>
import store from'../../store/index'
import { api } from '../../util/api'
import { cache } from '../../util/cache'

export default {
    name: 'Navigation',
    data() {
        return {
            caseId :0
        }
    },
    computed: {
        identity() {
            return store.state.userInfo.user.identity
        },
        account() {
            return store.state.userInfo.user.account
        },
        activedIndex() {
            return store.state.global.basic.activedIndex
        }
    },
    mounted() {


    },
    watch: {
        account(val) {
            if(this.identity !== 1) return
            this.$http.get(api.GET_CASE_ID, {
                params: {
                    account: val
                },
                headers: {
                    token: cache.getStroage('token')
                }
            }).then(res => {
                this.caseId = res.data.data
            })
        }
    },
    methods: {
        handleSelect(key) {
            if(key === '1') {
                if (this.identity !== 1) {
                    this.$router.push('/case_list')
                } else {
                    this.$router.push(`/case_detail/${this.caseId}`)
                }
            } else if (key === '2') {
                this.$router.push('/message_list')
            } else if (key === '3') {
                this.$router.push(`/change_fields/${this.caseId}`)
            }
            store.commit('global/getActivedIndex', key)
        },
        logout(){
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="less">
.navigation{
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    align-items: center;
    a {
        color: #6b9fee;
        font-size: 15px;
    }
}
</style>
