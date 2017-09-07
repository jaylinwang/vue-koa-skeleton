/**
 * 系统日志处理
 */
const bunyan = require('bunyan')

let logger = bunyan.createLogger({
  name: 'logger',
  streams: [{
    level: 'info',
    stream: process.stdout
  }, {
    level: 'error',
    stream: process.stdout
  }]
})

let debug = function (content) {
  logger.debug(content)
}

let info = function (content) {
  logger.info(content)
}

let warn = function (content) {
  logger.warn(content)
}

let error = function (content) {
  logger.error(content)
}

module.exports = {
  debug,
  info,
  warn,
  error
}
