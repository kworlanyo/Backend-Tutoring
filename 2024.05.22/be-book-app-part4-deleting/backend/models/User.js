import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
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
      {
        type: mongoose.ObjectId,
        required: true,
        ref: "Book", // ref
      },
    ],
    required: true,
    default: [],
  },
});

const User = model("User", userSchema);

export default User;
