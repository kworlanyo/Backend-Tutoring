import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  books: {
    type: [
      {
        title: {
          type: String,
          required: true
        },
        author: {
          type: String,
          required: true
        }
      }
    ],
    required: true,
    default: []
  }  
});

const User = model("User", userSchema);

export default User;