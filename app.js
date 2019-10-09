const express = require('express')
const path = require('path')
const usersRoute = require('./routes/users')
const cardsRoute = require('./routes/cards')
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  req.user = {
    _id: '5d9dbaa2b4c7ac154caeaf12'
  };

  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.use(express.static(path.join(__dirname, 'public')))
app.use('/users', usersRoute)
app.use('/cards', cardsRoute)
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Page not found' })
})

app.listen(PORT, () => {
  console.log('App is listening to port ', PORT)
})