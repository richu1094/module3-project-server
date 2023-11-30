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
    }],
    followers: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    isFeatured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Project = model("Project", ProjectSchema)
module.exports = Project