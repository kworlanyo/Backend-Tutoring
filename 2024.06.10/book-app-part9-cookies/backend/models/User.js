import mongoose, { Schema, model } from "mongoose";
import validator from "validator";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    // Custom validation
    // Email must be in correct "email" format
    validate: {
      validator: function(value) {
        // If value is valid email format return true
        // If not, return false
        return validator.isEmail(value);    
      },
      message: "Email address is not in a correct format"
    }
  },
  username: {
    type: String,
    required: true,
    unique: true,
    // Built-in validation
    minLength: [5, "Username must be at least 5 characters long"],
    maxLength: [20, "Username must be no more than 20 characters long"]
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        // If the password is strong, return true
        // If not, return false
        return validator.isStrongPassword(value);
      },
      message: "Password must contain at least 8 characters, including at least 1 lowercase character, 1 uppercase character, 1 number and 1 symbol"
    }
  },
  books: {
    type: [
      {
        type: mongoose.ObjectId,
        required: true,
        ref: "Book" // ref
      }  
    ],
    required: true,
    default: []
  }
});

const User = model("User", userSchema);

export default User;