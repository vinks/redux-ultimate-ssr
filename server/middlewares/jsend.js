export default function() {
  const _success = function(data, message) {
    return _response.call(this, 'success', data, message)
  }

  const _fail = function(message, data, code) {
    return _response.call(this, 'fail', data, message, code)
  }

  const _error = function(message, data, code) {
    return _response.call(this, 'error', data, message, code)
  }

  const _jsend = function(err, data, code) {
    if (err) {
      return _error(err, data, code)
    }

    return _success(data)
  }

  const _response = function(status, data, message, code) {
    const response = { status }

    if (code) {
      response.code = code
    }

    if (message) {
      response.message = message
    }

    if (data) {
      response.data = data
    }

    this.json(response)
  }

  return function(req, res, next) {
    res.success = _success
    res.fail = _fail
    res.error = _error
    res.jsend = _jsend

    next()
  }
}
