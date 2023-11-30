const { Schema, model } = require("mongoose")

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      minlength: [3, 'Title must have at least 10 characters'],
      maxlength: [50, 'Title must have at most 50 characters'],
    },
    description: {
      type: String,
      minlength: [10, 'Description must have at least 10 characters'],
      maxlength: [200, 'Title must have at most 50 characters'],
    }
  },
  {
    timestamps: true
  }
);

const Category = model('Category', CategorySchema);

module.exports = Category;