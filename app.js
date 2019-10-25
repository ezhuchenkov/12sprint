const express = require('express')
const mongoose = require('mongoose')
const usersRoute = require('./routes/users')
const cardsRoute = require('./routes/cards')
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
app.post('/signin', login)
app.post('/signup', createUser)
app.use(auth)
app.use('/users', usersRoute)
app.use('/cards', cardsRoute)
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Page not found' })
})
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
