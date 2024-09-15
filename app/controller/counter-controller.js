const Counter = require('../model/counter-model')
const { validationResult } = require('express-validator')
const counterCltr = {}

// List all counters
counterCltr.list = (req, res) => {
  Counter.find()
    .then((counters) => {
      res.json(counters)
    })
    .catch((err) => {
      res.status(500).json({ error: err.message })
    })
}

// Create a new counter
counterCltr.create = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { value } = req.body;
  const counter = new Counter({ value })

  counter.save()
    .then((savedCounter) => {
      res.status(201).json(savedCounter)
    })
    .catch((err) => {
      res.status(500).json({ error: err.message })
    })
}

// Show a specific counter by ID
counterCltr.show = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { id } = req.params
  Counter.findById(id)
    .then((counter) => {
      if (!counter) {
        return res.status(404).json({ error: 'Counter not found' })
      }
      res.json(counter)
    })
    .catch((err) => {
      res.status(500).json({ error: err.message })
    })
}

// Delete a specific counter by ID
counterCltr.remove = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { id } = req.params;
  Counter.findByIdAndDelete(id)
    .then((deletedCounter) => {
      if (!deletedCounter) {
        return res.status(404).json({ error: 'Counter not found' })
      }
      res.json(deletedCounter)
    })
    .catch((err) => {
      res.status(500).json({ error: err.message })
    })
}

// Update a specific counter by ID
counterCltr.update = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { id } = req.params
  const { value } = req.body

  Counter.findByIdAndUpdate(id, { value }, { new: true })
    .then((updatedCounter) => {
      if (!updatedCounter) {
        return res.status(404).json({ error: 'Counter not found' })
      }
      res.json(updatedCounter)
    })
    .catch((err) => {
      res.status(500).json({ error: err.message })
    })
}

module.exports = counterCltr
