const state = () => ({
    user: {
        account: '',
        identity: 0,
        password: '',
        name: '',
    },
    token: ''
})

const mutations = {
    changeUserInfo(state, userInfo) {
        state.user = userInfo
    },
    deleteUserInfo(state) {
        state.user = {
            account: '',
            identity: 0,
            password: '',
            name: '',
        }
    },
    setToken(state, token) {
        state.token = token
    },
    deleteToken(state) {
        state.token = undefined
    }
}

export default {
    namespaced: true,
    state,
    mutations,
}
