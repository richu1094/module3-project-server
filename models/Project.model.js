const { Schema, model } = require("mongoose")

const ProjectSchema = new Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  image: {
    type: String,
  },
  plan: [{
    type: Schema.Types.ObjectId,
    ref: 'Plan'
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  goal: {
    type: Number,
  },
  endDate: {
    type: Date,
  },
  image: {
    type: String
  },
  balance: {
    type: Number,
    default: 0
  },
  supporters: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const Project = model("Project", ProjectSchema)
module.exports = Project