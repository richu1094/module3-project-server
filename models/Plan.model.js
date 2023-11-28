const { Schema, model } = require("mongoose")

const PlanSchema = new Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    price: {
      type: Number,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    },
  },
  {
    timestamps: true
  }
);

const Plan = model('Plan', PlanSchema);
module.exports = Plan;