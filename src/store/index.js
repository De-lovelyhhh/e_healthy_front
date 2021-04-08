import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './module/userInfo'
import global from './module/global'
import auth from './module/auth'
import messageList from './module/messageList'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        global,
        userInfo,
        auth,
        messageList
    }
})
