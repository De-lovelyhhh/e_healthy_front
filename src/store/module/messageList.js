const state = () => ({
    messageList: []
})

const mutations = {
    pushMessage: function (state, data) {
        if (data) {
            state.messageList.push(data)
        }
    },
    getMessage: function (state) {
        return state.messageList
    },
    deleteMessage: function (state, index) {
        state.messageList.splice(index, 1)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
}
