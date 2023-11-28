const router = require("express").Router();

const User = require("../models/User.model");

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

router.post('/', (req, res, next) => {
    const { username, email, password, avatar } = req.body

    User
        .create({ username, email, password, avatar })
        .then(() => res.sendStatus(201))
        .catch(err => next(err))
})

module.exports = router;