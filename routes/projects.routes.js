const router = require('express').Router()
const Project = require('../models/Project.model')
const { verifyToken } = require('../middlewares/verifyToken')

router.get('/', (req, res, next) => {
  Project
    .find({})
    .populate('owner')
    .then(response => res.status(200).json(response))
    .catch(err => next(err))
})

router.get('/featured', (req, res, next) => {
  Project
    .find({ isFeatured: true })
    .populate('owner')
    .then(response => res.status(200).json(response))
    .catch(err => next(err))
})

router.get('/search', (req, res, next) => {
  console.log(req.query)
  const { title } = req.query

  Project
    .find({ title: { $regex: title, $options: 'i' } })
    .limit(5)
    .then(response => res.status(200).json(response))
    .catch(err => next(err))
})

router.post('/', verifyToken, (req, res, next) => {
  const { title, description, image, category, endDate, goal, isFeatured } = req.body
  const { _id: owner } = req.payload

  Project
    .create({ title, description, image, owner, category, endDate, balance: { goal }, isFeatured })
    .then(response => res.status(201).json(response))
    .catch(err => next(err))
})

router.post('/:id/follow', verifyToken, (req, res, next) => {
  const { id } = req.params
  const { _id } = req.payload

  Project
    .findByIdAndUpdate(id, { $addToSet: { followers: _id } }, { new: true })
    .then(response => res.status(200).json(response))
    .catch(err => next(err))
})

router.post('/:id/unfollow', verifyToken, (req, res, next) => {
  const { id } = req.params
  const { _id } = req.payload

  Project
    .findByIdAndUpdate(id, { $pull: { followers: _id } }, { new: true })
    .then(response => res.status(200).json(response))
    .catch(err => next(err))
})

router.post('/:id/delete', (req, res, next) => {
  const { id } = req.params

  Project
    .findByIdAndDelete(id)
    .then(response => res.status(200).json(response))
    .catch(err => next(err))
})

router.post('/:id/support/:amount', verifyToken, (req, res, next) => {
  const { id, amount } = req.params
  const { _id } = req.payload

  Project
    .findByIdAndUpdate(id, { $push: { supporters: { user: _id, amount } } }, { new: true })
    .then(response => res.status(200).json(response))
    .catch(err => next(err))
})

router.post('/:id/addbalance/:amount', verifyToken, (req, res, next) => {
  const { id, amount } = req.params

  Project
    .findByIdAndUpdate(id, { $inc: { 'balance.current': amount } }, { new: true })
    .then(response => res.status(200).json(response))
    .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
  const { id } = req.params

  Project
    .findById(id)
    .populate('owner')
    .then(response => res.status(200).json(response))
    .catch(err => next(err))
})

router.post('/:id', (req, res, next) => {
  const { id } = req.params
  const { title, description, image, category, endDate, goal, isFeatured } = req.body

  Project
    .findByIdAndUpdate(id, { title, description, image, category, endDate, balance: { goal }, isFeatured }, { new: true })
    .then(response => res.status(200).json(response))
    .catch(err => next(err))
})

module.exports = router
