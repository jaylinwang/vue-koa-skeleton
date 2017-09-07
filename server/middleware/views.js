const resolve = require('path').resolve
const nunjucks = require('nunjucks')

/**
 * 配置 nunjunk 视图
 * See: http://mozilla.github.io/nunjucks/api.html#configure
 * @param  {String} path nunjucks configure path
 * @param  {Object} opts nunjucks configure opts
 */
let init = (path, opts) => {
  path = resolve(path || 'views')
  opts = opts || {}
  const ext = '.' + (opts.ext || 'html')
  const env = nunjucks.configure(path, opts)

  const filters = opts.filters || {}
  const globals = opts.globals || {}

  Object.keys(filters).forEach(k => {
    env.addFilter(k, filters[k])
  })

  Object.keys(globals).forEach(k => {
    env.addGlobal(k, globals[k])
  })

  return function view (ctx, next) {
    if (ctx.render) {
      return next()
    }
    const render = nunjucks.render
    // Render `view` with `locals` and `koa.ctx.state`.
    ctx.render = (view, locals) => {
      const state = Object.assign({}, ctx.state, locals)
      return new Promise((resolve, reject) => {
        render(view + ext, state, (err, html) => {
          if (err) {
            return reject(err)
          }
          ctx.type = ctx.type || 'text/html'
          ctx.body = html
          resolve()
        })
      })
    }
    return next()
  }
}

module.exports = init
