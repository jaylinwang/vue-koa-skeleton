/**
 * 页面分发路由
 */
const Router = require('koa-router')
const router = new Router()

router.get('/', (ctx) => {
  return ctx.render('home')
})

module.exports = router
