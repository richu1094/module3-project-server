const { Schema, model } = require("mongoose")

const PlanSchema = new Schema({
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
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  supporters: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const Plan = model('Plan', PlanSchema);
module.exports = Plan;