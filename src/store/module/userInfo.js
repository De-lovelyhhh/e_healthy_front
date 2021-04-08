const state = () => ({
    user: {
        account: '',
        identity: 0,
        password: '',
        name: '',
    }
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
    }
}

export default {
    namespaced: true,
    state,
    mutations,
}
