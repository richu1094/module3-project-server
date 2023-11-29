const { Schema, model } = require("mongoose")

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    image: {
      type: String,
    },
    plans: [{
      type: Schema.Types.ObjectId,
      ref: 'Plan'
    }],
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    endDate: {
      type: Date,
    },
    balance: {
      goal: {
        type: Number,
        // required: [true, 'Goal is required'],
      },
      current: {
        type: Number,
        default: 0
      }
    },
    supporters: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    timestamps: true
  }
);

const Project = model("Project", ProjectSchema)
module.exports = Project