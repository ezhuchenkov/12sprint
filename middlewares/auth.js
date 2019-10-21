const jwt = require('jsonwebtoken')


// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.headers.jwt
  let payload

  try {
    payload = jwt.verify(token, 'secret-key')
  } catch (err) {
    return res.status(401).send({ message: 'Ошибка авторизации' })
  }
  req.user = payload

  next()
}
