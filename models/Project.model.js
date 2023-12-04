const { Schema, model } = require('mongoose')

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required']
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    image: {
      type: String,
      required: [true, 'Image is required']
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Owner is required']
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required']
    },
    endDate: {
      type: Date
    },
    balance: {
      goal: {
        type: Number,
        required: [true, 'Goal is required']
      },
      current: {
        type: Number,
        default: 0
      }
    },
    supporters: [{
      project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
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
)

const Project = model('Project', ProjectSchema)
module.exports = Project
