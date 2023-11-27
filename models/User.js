const { Schema, model } = require("mongoose")

const userSchema = new Schema({
  
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
  supportPj: [{
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }],
  selectPlan: [{
    type: Schema.Types.ObjectId,
    ref: 'Plan'
  }]
});


const User = model("User", userSchema)
module.exports = User
