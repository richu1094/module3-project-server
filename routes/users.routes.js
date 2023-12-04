const router = require('express').Router()
const User = require('../models/User.model')
const { verifyToken } = require('../middlewares/verifyToken')

router.get('/', (req, res, next) => {
  User
    .find({})
    .then(response => res.status(200).json(response))
    .catch(err => next(err))
})

router.get('/profile', verifyToken, (req, res, next) => {
  const { _id } = req.payload
  User
    .findById(_id)
    .then(response => res.status(200).json(response))
    .catch(err => next(err))
})

router.get('/getbalance', verifyToken, (req, res, next) => {
  const { _id } = req.payload
  User
    .findById(_id)
    .then(response => res.status(200).json(response.balance))
    .catch(err => next(err))
})

router.post('/addfunds', verifyToken, (req, res, next) => {
  const { balance } = req.body
  const { _id } = req.payload

  User.findByIdAndUpdate(_id, { $inc: { balance } }, { runValidators: true })
    .then(response => res.sendStatus(201).json(response))
    .catch(err => next(err))
})

router.post('/:id/delete', (req, res, next) => {
  const { id } = req.params
  User
    .findByIdAndDelete(id)
    .then(response => res.status(200).json(response))
    .catch(err => next(err))
})

router.post('/:id/edit', (req, res, next) => {
  const { id } = req.params
  const { username, email, role, balance, avatar } = req.body
  User
    .findByIdAndUpdate(id, { username, email, role, balance, avatar }, { new: true })
    .then(response => res.status(200).json(response))
    .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
  const { id } = req.params
  User
    .findById(id)
    .then(response => res.status(200).json(response))
    .catch(err => next(err))
})

module.exports = router
