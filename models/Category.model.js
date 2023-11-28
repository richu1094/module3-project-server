const { Schema, model } = require("mongoose")

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      minlength: [10, 'Title must have at least 10 characters'],
    },
    descriptions: {
      type: String,
      minlength: [100, 'Description must have at least 100 characters']
    }
  },
  {
    timestamps: true
  }
);

const Category = model('Category', CategorySchema);

module.exports = Category;