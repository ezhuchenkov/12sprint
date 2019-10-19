const express = require('express')
const mongoose = require('mongoose')
const usersRoute = require('./routes/users')
const cardsRoute = require('./routes/cards')
const { createUser, login } = require('./controllers/users')

const { PORT = 3000 } = process.env
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  req.user = {
    _id: '5d9dbaa2b4c7ac154caeaf12',
  }

  next()
})

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})


app.use('/users', usersRoute)
app.use('/cards', cardsRoute)
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Page not found' })
})
app.post('/signin', login)
app.post('/signup', createUser)

app.listen(PORT, () => {
  console.log('App is listening to port ', PORT)
})
