const state = () => ({
    userState: {
        patientAccount: '',
        state: '',
    },
    code: '',
})

const mutations = {
    setUserState(state, userState) {
        state.userState = userState
    },
    setCode(state, code){
        state.code = code
    }
}

export default {
    namespaced: true,
    state,
    mutations,
}
