const router = require('express').Router()
const Plan = require('../models/Plan.model')
const { verifyToken } = require('../middlewares/verifyToken')

router.get('/', (req, res, next) => {
  Plan
    .find()
    .populate('project')
    .then(response => res.status(200).json(response))
    .catch(err => next(err))
})

router.post('/', verifyToken, (req, res, next) => {
  const { title, description, image, content, price, project, isRecommended } = req.body

  Plan
    .create({ title, description, image, content, price, project, isRecommended })
    .then(() => res.sendStatus(201))
    .catch(err => next(err))
})

router.get('/:id/filter', (req, res, next) => {
  const { id } = req.params

  Plan
    .find({ project: id })
    .populate('project')
    .then(response => res.status(200).json(response))
    .catch(err => next(err))
})

router.post('/:id/delete', (req, res, next) => {
  const { id } = req.params

  Plan
    .findByIdAndDelete(id)
    .then(response => res.status(200).json(response))
    .catch(err => next(err))
})

router.post('/:id/edit', (req, res, next) => {
  const { id } = req.params
  const { title, description, image, content, price, isRecommended } = req.body

  Plan
    .findByIdAndUpdate(id, { title, description, image, content, price, isRecommended }, { new: true })
    .then(response => res.status(200).json(response))
    .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
  const { id } = req.params

  Plan
    .findById(id)
    .then(response => res.status(200).json(response))
    .catch(err => next(err))
})

module.exports = router
