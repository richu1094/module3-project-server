const { Schema, model } = require("mongoose")

const CategorySchema = new Schema({
  title: {
    type: String,
  },
  detail: {
    type: String,
  },
  project: [{
    type: Schema.Types.ObjectId,
    ref: 'Project',
  }],

});

const Category = model('Category', CategorySchema);

module.exports = Category;