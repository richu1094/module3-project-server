const router = require("express").Router();
const Project = require("../models/Project.model");
const { verifyToken } = require("../middlewares/verifyToken")

router.get('/', (req, res) => {
    Project
        .find({})
        .populate('owner')
        .then(response => res.status(200).json(response))
        .catch(err => next(err))
})

router.get('/featured', (req, res) => {
    Project
        .find({ isFeatured: true })
        .populate('owner')
        .then(response => res.status(200).json(response))
        .catch(err => next(err))
})

router.post('/', verifyToken, (req, res, next) => {
    const { title, description, image, category, endDate, goal, isFeatured } = req.body
    const { _id: owner } = req.payload

    //Falta goal y fecha por añadir
    if (!title || !description) {
        return res.status(400).json({ message: 'Missing some required values' })
    }
    if (goal < 0 || goal == 0) {
        return res.status(400).json({ message: 'The goal can not be 0 or less than 0' })
    }

    Project
        .create({ title, description, image, owner, category, endDate, goal, isFeatured })
        .then(response => res.status(201).json(response))
        .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
    const { id } = req.params

    Project
        .findById(id)
        .then(response => res.status(200).json(response))
        .catch(err => next(err))
});


router.post('/:id', (req, res, next) => {
    const { id } = req.params
    const { title, description, image, owner, category, endDate, goal } = req.body

    Project
        .findByIdAndUpdate(id, { title, description, image, owner, category, endDate, goal })
        .then(response => res.status(200).json(response))
        .catch(err => console.log(err))

});

router.post('/:id', (req, res, next) => {
    const { id } = req.params

    Project
        .findByIdAndDelete(id)
        .then(response => res.status(200).json(response))
        .catch(err => next(err))
});

module.exports = router;