const jwt = require('jsonwebtoken')
const AuthError = require('../errors/auth-err')


// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.headers.jwt
  let payload

  try {
    payload = jwt.verify(token, 'secret-key')
  } catch (e) {
    const err = new AuthError('Ошибка авторизации')
    next(err)
  }
  req.user = payload

  next()
}
