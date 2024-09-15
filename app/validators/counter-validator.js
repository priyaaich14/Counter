const { body, param } = require('express-validator')
const Counter = require('../model/counter-model')

const counterValidationSchema = {
  value: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Value is required'
    },
    isInt: {
      options: { min: 0 },
      errorMessage: 'Value must be a non-negative integer'
    },
    custom: {
      options: async (value) => {
        if (value < 0) {
          throw new Error('Value must be greater than or equal to 0')
        }
      }
    }
  }
}

const idCounterValidationSchema = {
  id: {
    in: ['params'],
    notEmpty: {
      errorMessage: 'ID is required'
    },
    isMongoId: {
      errorMessage: 'Invalid counter ID'
    },
    custom: {
      options: async (value) => {
        const counter = await Counter.findById(value)
        if (!counter) {
          throw new Error('Counter not found')
        }
      }
    }
  }
}

module.exports = {
  counterValidationSchema,
  idCounterValidationSchema
}
