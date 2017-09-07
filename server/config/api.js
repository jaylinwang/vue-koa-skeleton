/**
 * 请求API数据配置
 */
let baseUrl = '' // api开发请求地址

if (process.env.NODE_ENV === 'production') {
  baseUrl = '' // api生产请求地址
}

module.exports = {
  basic: { 
    // 请求api所需的基础数据，比如签名所需的app_id和app_secret
    APP_ID: 'APP_ID',
    APP_SECRET: 'APP_SECRET'
  },
  url: {
    // api地址，由baseUrl和后缀组成
  }
}