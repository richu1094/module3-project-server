const router = require("express").Router();
const User = require("../models/User.model");
const { verifyToken } = require("../middlewares/verifyToken")

router.get('/', (req, res, next) => {
    User
        .find({})
        .then(response => res.status(200).json(response))
        .catch(err => next(err))
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    User
        .findById(id)
        .then(response => res.status(200).json(response))
        .catch(err => next(err))
})

router.get('/profile', verifyToken, (req, res) => {
    const { _id } = req.payload
    User
        .findById(_id)
        .then(response => res.status(200).json(response))
        .catch(err => next(err))
})

router.post('/', (req, res, next) => {
    const { username, email, password, avatar } = req.body

    User
        .create({ username, email, password, avatar })
        .then(() => res.sendStatus(201))
        .catch(err => next(err))
})

router.post('/addfunds', verifyToken, (req, res, next) => {
    const { balance } = req.body
    const { _id } = req.payload

    User.findByIdAndUpdate(_id, { $inc: { balance } })
        .then(() => res.sendStatus(201))
        .catch(err => next(err))
})

module.exports = router;