/**
 * 嘉祥在线启动脚本
 */
const server = require('../server')
const path = require('path')

const config = {
  port: 9000,
  viewPath: path.join(__dirname, 'view'),
  publicPath: path.join(__dirname, 'public')
}

server('app', config)
