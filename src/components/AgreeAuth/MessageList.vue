<template>
    <div v-if="messageList && messageList.length" class="message">
        <div v-for="(item, index) in messageList" :key="index" @click="toAuth(item.sender, index)" class="msg-list">
            <div>{{item.sender}}请求您的授权</div>
            <div class="el-icon-close" @click.stop="deleteMsg(index)"></div>
        </div>
    </div>
</template>

<script>
import store from '../../store/index'
export default {
    name: 'MessageList',
    data() {
        return {
            messageList: []
        }
    },
    created() {
        this.messageList = store.state.messageList.messageList
    },
    computed: {
        message() {
            return store.state.messageList.messageList
        }
    },
    watch: {
        message(val) {
            this.messageList = val
        }
    },
    methods: {
        deleteMsg(index) {
            store.commit('messageList/deleteMessage', index)
        },
        toAuth(sender, index) {
            this.$router.push(`/auth/${sender}/${index}`)
        }
    },
}
</script>

<style lang="less">
.message {
    padding: 20px;
    .msg-list{
        background-color: #ffffffb8;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 50px;
        border-radius: 30px;
        margin: 20px auto;
        max-width: 700px;
        &:hover{
           background-color: #e6e6e6;
        }
    }
}
</style>
