const { Schema, model } = require('mongoose')

const PlanSchema = new Schema(
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
      maxlength: [200, 'Title must have at most 200 characters']
    },
    image: {
      type: String
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      minlength: [10, 'Content must have at least 10 characters'],
      maxlength: [200, 'Content must have at most 200 characters']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [1, 'Price must be at least 1'],
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    },
    isRecommended: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

const Plan = model('Plan', PlanSchema)
module.exports = Plan
