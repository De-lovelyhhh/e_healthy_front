import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueRouter from 'vue-router'
import Login from './components/Login'
import Home from './components/Home'
import CaseList from './components/CaseList/CaseList'
import AgreeAuth from './components/AgreeAuth/AgreeAuth'
import CaseDetail from './components/CaseDetail/CaseDetail'
import MessageList from './components/AgreeAuth/MessageList'
import ChangeField from './components/ChangeField/ChangeField'
import Vuex from 'vuex'
import store from './store/index'
import { cache } from './util/cache'
import { wsClose } from './util/websocket'

Vue.prototype.$router = VueRouter
Vue.prototype.$store = Vuex
Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(Vuex)

const router = new VueRouter({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/case_list',
            name: 'CaseList',
            component: CaseList
        },
        {
            path: '/auth/:sender',
            name: 'AgreeAuth',
            component: AgreeAuth
        },
        {
            path: '/case_detail/:caseId',
            name: 'CaseDetail',
            component: CaseDetail
        },
        {
            path: '/message_list',
            name: 'MessageList',
            component: MessageList
        },
        {
            path: '/change_fields/:caseId',
            name: 'ChangeField',
            component: ChangeField
        }
    ]
})

router.afterEach((to, from, next) => {
    if (to.path === '/login') {

        wsClose.call(Vue)
        cache.clearStorage('token')
        store.commit('userInfo/deleteUserInfo')
    }
    if (to.path === '/case_list') {
        store.commit('global/getActivedIndex', '2')
    }
})

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
