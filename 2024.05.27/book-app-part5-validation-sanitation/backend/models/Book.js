import { Schema, model } from "mongoose";

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        if (value.length <= 1) {
          return false;
        }
      },
      message: function ({ value }) {
        // We destructured the value parameter above in this function because the value property is inside a "props" object.
        if (value.length <= 1) {
          return "Book title should be more than one character";
        }
      },
    },
  },
  author: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        if (value.length <= 1) {
          return false;
        }
      },
      message: function ({ value }) {
        // We destructured the value parameter above in this function because the value property is inside a "props" object.
        if (value.length <= 1) {
          return "Book author should be more than one character";
        }
      },
    },
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

const Book = model("Book", bookSchema);

export default Book;
