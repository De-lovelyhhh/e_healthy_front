const state = () => ({
    basic: {
        activedIndex: '1'
    }

})

const mutations = {
    getActivedIndex(state, index) {
        state.basic.activedIndex = index
    }
}

export default {
    namespaced: true,
    state,
    mutations,
}
