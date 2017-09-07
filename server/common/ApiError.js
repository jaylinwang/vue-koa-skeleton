/**
 * 后台请求API错误
 */
class ApiError extends Error {
  constructor (code, message) {
    super(message)
    this.code = code
    this.message = message
  }
}

module.exports = ApiError
