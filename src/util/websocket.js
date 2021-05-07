import { api } from './api.js'
import Vue from 'vue'
import store from '../store/index'

export function initSocket() {
    if(typeof(WebSocket) === 'undefined'){
        alert('您的浏览器不支持socket')
    }else{
        Vue.prototype.socket = new WebSocket(api.PATIENT_AUTH)
        this.socket.onopen = open
        this.socket.onerror = error
        this.socket.onmessage = getMessage
    }
}

function open() {
    console.log('socket连接成功')
}
function error() {
    console.log('连接错误')
}
function getMessage(msg) {
    if (store.state.userInfo.user.identity === 1) {
        store.commit('messageList/pushMessage', {
            sender: msg.data
        })
        Vue.prototype.$notify.info({
            title: '新信息',
            dangerouslyUseHTMLString: true,
            message: `<b>${msg.data}</b>向您请求授权`
        })
    } else {

    }


}

export function send(data) {
    setTimeout(() => {
        console.log(this.socket.readyState)
        if (this.socket.readyState === 1) {
            if (typeof data === 'object') {
                data = JSON.stringify(data)
            }
            this.socket.send(data)
        }
    }, 1000)

}
export function wsClose() {
    this.prototype.socket.close()
    console.log('socket已经关闭')
}
