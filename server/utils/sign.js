/**
 * API 签名方式
 */
const crypto = require('crypto')
const api = require('../config/api')
const logger = require('./logger.js')

const IGNORE_PARA = ['access_token']

const generateSign = function (params, nostr) {
  let paramStr = ''
  if (params && params !== {}) {
    const keys = Object.keys(params).sort()
    keys.forEach((key) => {
      if (IGNORE_PARA.indexOf(key) === -1 && params[key] != null) {
        paramStr += params[key]
      }
    })
  }
  const signStr = paramStr + api.basic.APP_SECRET + nostr
  logger.info(`sign string: ${signStr}`)
  return crypto.createHash('md5').update(signStr).digest('hex')
}

exports.generateSign = generateSign
