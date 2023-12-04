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

router.post("/:id/follow", verifyToken, (req, res, next) => {
  const { id } = req.params
  const { _id } = req.payload

  User
    .findById(_id)
    .then(user => {
      const isFollowing = user.following.some(item => item.project.equals(id));
      !isFollowing && user.following.push({ project: id });
      return user.save();
    })
    .then(response => res.status(200).json(response))
    .catch(err => next(err));
})

router.post("/:id/unfollow", verifyToken, (req, res, next) => {
  const { id } = req.params
  const { _id } = req.payload

  User
    .findByIdAndUpdate(_id, { $pull: { following: { project: id } } }, { new: true })
    .then(response => res.status(200).json(response))
    .catch(err => next(err))
})

router.post("/:id/support/:amount", verifyToken, (req, res, next) => {
  const { id, amount } = req.params
  const { _id } = req.payload

  User
    .findByIdAndUpdate(_id, { $push: { supported: { project: id, amount } } }, { new: true })
    .then(response => res.status(200).json(response))
    .catch(err => next(err))
})

router.post('/withdraw/:amount', verifyToken, (req, res, next) => {
  const { amount } = req.params
  const { _id } = req.payload

  User
    .findByIdAndUpdate(_id, { $inc: { balance: -amount } }, { new: true })
    .then(response => res.status(200).json(response))
    .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
  const { id } = req.params
  User
    .findById(id)
    // .populate('supported.project')
    .populate({
      path: 'supported.project',
      populate: {
        path: 'category',
        model: 'Category'
      },
    })
    .populate({
      path: 'following.project',
      populate: {
        path: 'category',
        model: 'Category'
      },
    })
    .then(response => res.status(200).json(response))
    .catch(err => next(err))
})



module.exports = router
