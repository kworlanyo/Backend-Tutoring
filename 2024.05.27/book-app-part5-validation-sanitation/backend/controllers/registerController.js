import User from "../models/User.js";
import createHttpError from "http-errors";

export async function postRegister(req, res, next) {
  const { email, username, password } = req.body;

  let foundUser;

  try {
    foundUser = await User.findOne({ username: username, email: email });
  } catch (error) {
    return next(createHttpError(500, "Server error"));
  }

  if (foundUser) {
    return next(createHttpError(409, "User already exists"));
  } else {
    try {
      const newUser = await User.create({ username, password, email });

      res.status(201).json({
        id: newUser._id,
      });
    } catch (err) {
      /* This part of the code is handling a specific error scenario where the error name is
      "ValidationError". When a validation error occurs during the creation of a new user (for
      example, if the input data does not meet the defined schema requirements), the code extracts
      the error message from the first validation error encountered and creates a custom HTTP error
      response with a status code of 400 (Bad Request) and the extracted error message. This helps
      provide more specific feedback to the client about what went wrong with their input data. */
      if (err.name === "ValidationError") {
        const errMessage = Object.values(err.errors)[0].message;

        return next(createHttpError(400, errMessage));
      }
      next(createHttpError(500, "Registration could not be completed. Please try again"));
    }
  }
}
