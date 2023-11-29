const router = require("express").Router();
const Category = require("../models/Category.model");

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

router.post('/:id/delete', (req, res) => {
    const { id } = req.params
    Category
        .findByIdAndDelete(id)
        .then(response => res.status(200).json(response))
        .catch(err => next(err))
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Category
        .findById(id)
        .then(response => res.status(200).json(response))
        .catch(err => next(err))
})

module.exports = router;