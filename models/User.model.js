const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      minlength: [3, 'Username must be at least 3 characters long']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [3, 'Password must be at least 3 characters long']
    },
    avatar: {
      type: String,
      default: 'https://res.cloudinary.com/db6gxc2n0/image/upload/v1701465381/ifhpblqmxlbi2ir0jw5u.png'
    },
    balance: {
      type: Number,
      default: 0
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
    },
    supported: [{
      project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
      },
      amount: {
        type: Number,
        default: 0
      },
      donatedAt: {
        type: Date,
        default: Date.now
      }
    }],
    following: [
      {
        project: {
          type: Schema.Types.ObjectId,
          ref: 'Project'
        },
        followingAt: {
          type: Date,
          default: Date.now
        }
      }],
    description: {
      type: String
    },
    location: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', function (next) {
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword
  next()
})

userSchema.methods.signToken = function () {
  const { _id, username, email, role } = this
  const payload = { _id, username, email, role }
  const authToken = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { algorithm: 'HS256', expiresIn: '6h' }
  )
  return authToken
}

userSchema.methods.validatePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password)
}

const User = model('User', userSchema)
module.exports = User
