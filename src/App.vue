<template>
    <div id="app">
        <Navigation/>
<!--        <CaseDetail/>-->
        <router-view></router-view>
    </div>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation'
import CaseDetail from './components/CaseDetail/CaseDetail'
import { api } from './util/api'
import { cache } from './util/cache'
import { initSocket, send } from './util/websocket'
import store from'./store/index'

export default {
    name: 'App',
    components: {
        Navigation,
        // CaseDetail
    },
    mounted() {
        this.checkToken()
        initSocket.call(this)
    },
    methods: {
        checkToken() {
            let token = cache.getStroage('token')

            if (!token) {
                this.$router.push('/login')
                return
            }

            this.$http.post(api.CHECK_TOKEN, {}, {
                headers: {
                    token
                }
            }).then(res => {
                if (res.data.code !== 0) {
                    this.$router.push('/login')
                } else {
                    const userInfo = {}
                    userInfo.account = res.data.data.Account
                    userInfo.identity = res.data.data.Identity || 0
                    userInfo.name = res.data.data.Name || ''
                    userInfo.password = res.data.data.Password
                    store.commit('userInfo/changeUserInfo', userInfo)
                    send.call(this, {account: userInfo.account, identity: userInfo.identity, target: '', message: ''})
                }
            })
        }
    }
}
</script>

<style lang="less">
#app {
  background-color: #eeeeee;
  height: calc(100vh - 16px);
    a {
        cursor: pointer;
    }
}
</style>
