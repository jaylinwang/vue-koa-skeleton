const Koa = require('koa')
const serve = require('koa-static')
const koaBody = require('koa-body')
const koaJson = require('koa-json')
const session = require('koa-session')
const chalk = require('chalk')
const path = require('path')
const request = require('./utils/request')
const dataRouter = require('./router/data')
const pageRouter = require('./router/page')
const views = require('./middleware/views')
const errorHandle = require('./middleware/error_hanlde')

/**
 *
 * @param {String} appName 应用名称
 * @param {*} config 应用配置
 *  - port 应用运行端口
 *  - viewPath 视图路径
 *  - publicPath 静态资源路径
 */
const init = (appName, config) => {
  const app = new Koa()
  // 设置默认 appName 和 config
  appName = appName || 'app'
  config = Object.assign({
    port: 3000,
    publicPath: path.resolve(__dirname, '../app/public'),
    viewPath: path.resolve(__dirname, '../app/view')
  }, config)
  app.context.appName = appName
  app.keys = [appName]
  // 支持json数据
  app.use(koaBody())
  app.use(koaJson())
  // session配置
  app.use(session({
    key: appName,
    maxAge: 1000 * 60 * 60 * 2,
    overwrite: true,
    httpOnly: true,
    signed: true
  }, app))

  app.use(request.context())
  app.use(views(config.viewPath))
  app.use(serve(config.publicPath))
  app.use(pageRouter.routes())
  app.use(dataRouter.routes())
  app.use(errorHandle())
  app.listen(config.port, () => {
    console.log(chalk.green(`应用 ${chalk.bgGreen.black(appName)} 启动成功`))
    console.log(chalk.green(`访问地址为：${chalk.bgGreen.black(config.port)}`))
  })
}

module.exports = init
