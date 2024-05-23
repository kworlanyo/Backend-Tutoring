import { Schema, model } from "mongoose";

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  //? This property will store the date that the book was soft deleted
  deletedAt: {
    type: Date,
    default: null,
  },
});

const Book = model("Book", bookSchema);

export default Book;
