const router = require('express').Router()
const Category = require('../models/Category.model')
const Project = require('../models/Project.model')

router.get('/', (req, res, next) => {
  Category
    .find({})
    .then(response => res.status(200).json(response))
    .catch(err => next(err))
})

router.post('/create', (req, res, next) => {
  const { title, description } = req.body

  Category
    .create({ title, description })
    .then(() => res.sendStatus(201))
    .catch(err => next(err))
})

router.post('/:id/delete', (req, res, next) => {
  const { id } = req.params

  Project.updateMany({ category: id }, { category: "6571999c4c094f8b72687986" })
    .then(() => Category.findByIdAndDelete(id))
    .then(() => res.sendStatus(200))
    .catch(err => next(err))
})

router.post('/:id/edit', (req, res, next) => {
  const { id } = req.params
  const { title, description } = req.body

  Category
    .findByIdAndUpdate(id, { title, description })
    .then(response => res.status(200).json(response))
    .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
  const { id } = req.params
  Category
    .findById(id)
    .then(response => res.status(200).json(response))
    .catch(err => next(err))
})

module.exports = router
