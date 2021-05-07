import store from'../store/index'
import { api } from './api'
import { cache } from './cache'

export const initRouter =
    async function(){
        const index = store.state.global.basic.activedIndex
        const user = store.state.userInfo.user
        let caseId
        if (user.identity === 1) {
            let { data: { data } } = await this.$http.get(api.GET_CASE_ID, {
                params: {
                    account: user.account
                },
                headers: {
                    token: cache.getStroage('token')
                }
            })
            caseId = data
        } else {
            this.$router.push('/case_list')
            return
        }
        switch (index) {
        case '1':
            this.$router.push(`/case_detail/${caseId}`)
            break
        case '2':
            this.$router.push('/message_list')
            break
        case '3':
            this.$router.push(`/change_fields/${caseId}`)
            break
        }
    }
