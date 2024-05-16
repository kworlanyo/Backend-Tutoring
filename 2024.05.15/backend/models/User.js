import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  books: {
    type: [
      /* This part of the `userSchema` in the Mongoose model is defining a subdocument array field named `books`. Each element in the `books` array is expected to be an ObjectId referencing a document in the "Book" collection. */
      {
        type: mongoose.ObjectId,
        required: true,
        ref: "Book",
      },
    ],
    required: true,
    default: [],
  },
});

const User = model("User", userSchema);

export default User;
