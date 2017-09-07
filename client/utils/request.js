const axios = require('axios')
const qs = require('querystring')
const _ = require('lodash')

/**
 * get 方式请求服务端数据
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} config 附加配置
 */
let get = function (url, data, config) {
  const _config = _.assign({
    params: data
  }, config)
  const p = new Promise((resolve, reject) => {
    axios.get(url, _config).then((res) => {
      const apiData = res.data
      if (apiData.errcode) {

      }
      resolve(apiData)
    }).catch((err) => {
      console.warn('网络请求失败>>>>>>>>>')
      console.warn({
        url,
        params: data
      })
      reject(new Error(err.message))
    })
  })
  return p
}
exports.get = get

/**
 * post 方式请求服务端数据
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} config 附加配置
 */
let post = function (url, data, config) {
  const _config = _.assign({
    // 额外配置
  }, config)
  const p = new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(data), _config).then((res) => {
      const apiData = res.data
      resolve(apiData)
    }).catch((err) => {
      console.warn('网络请求失败>>>>>>>>>')
      console.warn({
        url,
        params: data
      })
      reject(new Error(err.message))
    })
  })
  return p
}
exports.post = post
