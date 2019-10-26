const express = require('express')
const mongoose = require('mongoose')
const { celebrate, Joi, errors } = require('celebrate')
const { requestLogger, errorLogger } = require('./middlewares/logger')
const usersRoute = require('./routes/users')
const cardsRoute = require('./routes/cards')
const urlRegExp = require('./models/card')
const { createUser, login } = require('./controllers/users')
const auth = require('./middlewares/auth')

const { PORT = 3000 } = process.env
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
app.use(requestLogger)
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login)
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().regex(urlRegExp),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
  query: {
    token: Joi.string().token().required(),
  },
}), createUser)
app.use(auth)
app.use('/users', usersRoute)
app.use('/cards', cardsRoute)
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Page not found' })
})
app.use(errorLogger)
app.use(errors())
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    })
})
app.listen(PORT, () => {
  console.log('App is listening to port ', PORT)
})
