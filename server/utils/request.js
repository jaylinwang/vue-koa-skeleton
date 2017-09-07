const axios = require('axios')
const qs = require('querystring')
const api = require('../config/api')
const sign = require('./sign')
const ApiError = require('../common/ApiError')
const logger = require('./logger')

let _ctx = {}

/**
 * get 方式请求公有api
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} config 附加配置
 */
let get = function (url, data, config) {
  const nostr = new Date().getTime()
  const signStr = sign.generateSign(data, nostr)
  const _config = Object.assign({
    headers: {
      'X-APPID': api.basic.APP_ID,
      'X-NOSTR': nostr,
      'X-SIGN': signStr
    },
    params: data
  }, config)
  const p = new Promise((resolve, reject) => {
    axios.get(url, _config).then((res) => {
      logger.info({
        title: '请求成功',
        url,
        params: data,
        data: res.data
      })
      const apiData = res.data
      if (apiData && !apiData.errcode) { // api正常返回
        resolve(apiData)
      } else {
        if (apiData.errcode) {
          reject(new ApiError(apiData.errcode, apiData.message))
        } else {
          resolve(null)
        }
      }
    }).catch((err) => {
      logger.error({
        title: '网络请求失败',
        url: url,
        params: data
      })
      reject(new ApiError(500, err.message))
    })
  })
  return p
}
exports.get = get

/**
 * post 方式请求公有api
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} config 附加配置
 */
let post = function (url, data, config) {
  const nostr = new Date().getTime()
  const signStr = sign.generateSign(data, nostr)
  const _config = Object.assign({
    headers: {
      'X-APPID': api.basic.APP_ID,
      'X-NOSTR': nostr,
      'X-SIGN': signStr
    }
  }, config)
  const p = new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(data), _config).then((res) => {
      logger.info({
        title: '请求成功',
        url,
        params: data,
        data: res.data
      })
      const apiData = res.data
      if (apiData && !apiData.errcode) { // api正常返回
        resolve(apiData)
      } else {
        if (apiData.errcode) {
          reject(new ApiError(apiData.errcode, apiData.message))
        } else {
          resolve(null)
        }
      }
    }).catch((err) => {
      logger.error({
        title: '网络请求失败',
        url: url,
        params: data
      })
      reject(new ApiError(500, err.message))
    })
  })
  return p
}
exports.post = post

/**
 * get 方式请求私有API
 * @param {String} url
 * @param {Object} data
 */
let privateGet = function (url, data) {
  const nostr = new Date().getTime()
  const signStr = sign.generateSign(data, nostr)
  const accessToken = _ctx.session.accessToken
  const p = new Promise((resolve, reject) => {
    if (!accessToken) { // token 不存在，提示其需要授权
      reject(new ApiError(403, '请求需要授权'))
    } else {
      get(url, data, {
        headers: {
          'X-APPID': api.basic.APP_ID,
          'X-NOSTR': nostr,
          'X-SIGN': signStr,
          'X-TOKEN': accessToken
        }
      }).then((data) => {
        resolve(data)
      }).catch((err) => {
        reject(err)
      })
    }
  })
  return p
}
exports.privateGet = privateGet

/**
 * post 方式请求私有API
 * @param {String} url
 * @param {Object} data
 */
let privatePost = function (url, data) {
  const nostr = new Date().getTime()
  const signStr = sign.generateSign(data, nostr)
  const accessToken = _ctx.session.accessToken
  const p = new Promise((resolve, reject) => {
    if (!accessToken) { // token 不存在，提示其需要授权
      reject(new ApiError(403, '请求需要授权'))
    } else {
      get(url, data, {
        headers: {
          'X-APPID': api.basic.APP_ID,
          'X-NOSTR': nostr,
          'X-SIGN': signStr,
          'X-TOKEN': accessToken
        }
      }).then((data) => {
        resolve(data)
      }).catch((err) => {
        reject(err)
      })
    }
  })
  return p
}
exports.privatePost = privatePost

// 接收koa上下文,供 request 使用
exports.context = () => {
  return (ctx, next) => {
    _ctx = ctx
    return next()
  }
}
