const { Schema, model } = require("mongoose")

const PlanSchema = new Schema(
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
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
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
);

const Plan = model('Plan', PlanSchema);
module.exports = Plan;