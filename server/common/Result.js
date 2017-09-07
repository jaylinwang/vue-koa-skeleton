/**
 * 服务端返回结果
 */
class Result {
  /**
   * @param {Number} errcode 错误代码，默认为0
   * @param {String} message 提示消息
   * @param {Any} data 返回数据
   */
  constructor (errcode, message, data) {
    this.errcode = errcode || 0
    this.message = message
    this.data = data
  }
}

Result.success = function () {
  return new Result(0, '成功', null)
}

Result.successWithData = function (data) {
  return new Result(0, '成功', data)
}

Result.fail = function (errcode, message) {
  return new Result(errcode, message, null)
}

Result.failWithData = function (errcode, message, data) {
  return new Result(errcode, message, data)
}

module.exports = Result
