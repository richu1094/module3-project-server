const { Schema, model } = require('mongoose')

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [3, 'Title must have at least 3 characters'],
      maxlength: [50, 'Title must have at most 50 characters']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [10, 'Description must have at least 10 characters'],
      maxlength: [200, 'Description must have at most 200 characters']
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
