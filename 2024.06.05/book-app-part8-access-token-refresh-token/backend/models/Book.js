import { Schema, model } from "mongoose";
import validator from "validator";

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    // * For more than 1 validator, pass an array!
    validate: [
      // Validation 1: Is the length <= 50?
      {
        validator: function(value) {
          return validator.isLength(value, { min: 1, max: 50 })
        },
        message: "Title must be no more than 50 characters long"
      },
      // ? Example Validation 2: No Jamies!
      // {
      //   validator: function(value) {
      //     return !value.toLowerCase().includes("jamie");
      //   },
      //   message: "No Jamies allowed!"
      // }
    ]
  },
  author: {
    type: String,
    required: true,
    minLength: [2, "Author must be at least 2 characters long"],
    maxLength: [50, "Author must be no more than 50 characters long"]
  },
  deletedAt: {
    type: Date,
    default: null
  }
})

const Book = model("Book", bookSchema);

export default Book;