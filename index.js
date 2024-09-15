const express = require('express')
const cors = require('cors')
const { checkSchema } = require('express-validator')
const configureDB = require('./config/db')
const counterCltr = require('./app/controller/counter-controller')
const { counterValidationSchema, idCounterValidationSchema } = require('./app/validators/counter-validator')

const port = 5000
const app = express()

app.use(express.json())
app.use(cors())
configureDB()

// Create Counter
app.post('/api/counters', checkSchema(counterValidationSchema), counterCltr.create);

// Get all Counters
app.get('/api/counters', counterCltr.list)

// Get single Counter
app.get('/api/counters/:id', checkSchema(idCounterValidationSchema), counterCltr.show)

// Update Counter
app.put('/api/counters/:id', checkSchema({ ...idCounterValidationSchema, ...counterValidationSchema }), counterCltr.update)

// Delete Counter
app.delete('/api/counters/:id', checkSchema(idCounterValidationSchema), counterCltr.remove)

app.listen(port, () => {
  console.log('Server running on port', port)
})
