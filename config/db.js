const mongoose = require('mongoose')

const configureDB = () => {
  mongoose.connect('mongodb://localhost:27017/counter-app')
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB', err)
    })
}

module.exports = configureDB
