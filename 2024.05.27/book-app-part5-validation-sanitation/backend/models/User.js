import mongoose, { Schema, model } from "mongoose";
import validator from "validator";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        if (!validator.isEmail(value)) {
          return false;
        }
      },
      message: function ({ value }) {
        // We destructured the value parameter above in this function because the value property is inside a "props" object.
        if (!validator.isEmail(value)) {
          return "Please enter a valid email address";
        }
      },
    },
  },
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        if (!validator.isLowercase(value)) {
          return false;
        }
        //! NB: isLowercase() and toLowerCase() are two different methods.
        // The isLowercase method() is a method that comes with the validator package and the toLowerCase() method is a string method.

        // custom validation
        if (!value.includes("_")) {
          return false;
        }
      },
      message: function ({ value }) {
        // We destructured the value parameter above in this function because the value property is inside a "props" object.
        if (!validator.isLowercase(value)) {
          return "Username should be in lowercase";
        }

        // custom validation
        if (!value.includes("_")) {
          return "Username should include an underscore _";
        }
      },
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Default values for isStrongPassword are: 8 characters long {minLength: 8}, at least 1 lowercase letter {minLowercase: 1}, at least 1 uppercase letter {minUppercase: 1}, at least 1 number {minNumbers: 1}, at least 1 symbol {minSymbols: 1}
        if (!validator.isStrongPassword(value, { minLength: 6 })) {
          return false;
        }
      },
      message: function ({ value }) {
        // We destructured the value parameter above in this function because the value property is inside a "props" object.
        if (!validator.isStrongPassword(value, { minLength: 6 })) {
          return "Password should be at least 8 characters long, and include a mix of uppercase, lowercase, numbers and symbols";
        }
      },
    },
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
