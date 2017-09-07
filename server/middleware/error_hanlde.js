let init = () => {
  return (ctx) => {
    if (!ctx.error) {
      return ctx.render('400')
    } else {
      return ctx.render('500')
    }
  }
}

module.exports = init