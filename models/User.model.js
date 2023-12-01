const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    avatar: {
      type: String,
    },
    balance: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema)
module.exports = User