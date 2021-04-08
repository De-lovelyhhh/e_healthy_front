const BASIC_HOST = 'http://127.0.0.1:7001'
const AUTH_HOST = 'http://127.0.0.1:7002'
const CLIENT_HOST = 'http://127.0.0.1:7003'
const WS_CONNECTION = 'ws://127.0.0.1:7001'

const api = {
    LOGIN: `${BASIC_HOST}/account/login`, // 登录接口
    SIGNIN: `${BASIC_HOST}/account/signin`, // 注册接口
    CHECK_TOKEN: `${BASIC_HOST}/account/check_token`, // 检查token合法性
    PATIENT_AUTH: `${WS_CONNECTION}/ws/patient_auth`, // 病患socket授权接口
    CHECK_PATIENT: `${BASIC_HOST}/account/check_user`, // 检查患者账号是否存在
    GET_USERINFO: `${BASIC_HOST}/account/get_userinfo`, // 获取用户信息

    GET_CASE_LIST: `${BASIC_HOST}/case/case_list`, // 获取病历列表
    GET_MY_CASE_LIST: `${BASIC_HOST}/case/my_case_list`, // 获取医生取得授权的病历列表
    GET_CASE_DETAIL: `${BASIC_HOST}/case/case_detail`, // 获取病历详情
    CHANGE_PRIVATE_FIELD: `${BASIC_HOST}/case/change_field`, // 修改病历敏感字段
    PUSH_CASE: `${BASIC_HOST}/case/push`, // 上传病历
    GET_CASE_ID: `${BASIC_HOST}/case/get_id`, // 通过病患账号获取病历ID
    GET_FIELDS: `${BASIC_HOST}/case/get_fields`, // 获取敏感字段
    GET_ACCOUNT: `${BASIC_HOST}/case/get_account_by_caseid`, // 通过病历ID获取用户账号

    AGREE_AUTH: `${BASIC_HOST}/auth/agree_auth`, // 确认授权
    TO_AUTH: `${BASIC_HOST}/auth/to_auth`, // 带上授权数据访问业务后台
    GET_CODE: `${AUTH_HOST}/req_auth_code`, // 获取授权码

    RECEIVE_CLIENT_BRAND: `${CLIENT_HOST}/receive_client_brand`, // 获取客户端凭证

}

export { api }
