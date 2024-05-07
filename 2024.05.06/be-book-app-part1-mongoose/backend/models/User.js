import { Schema, model } from "mongoose";

// Create userSchema to define a structure for the user.
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  books: {
    type: Array,
    required: true,
    default: [],
  },
});

// Create an instance using a model
const User = model("user", userSchema);
export default User;
