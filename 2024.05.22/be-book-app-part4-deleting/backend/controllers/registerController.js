import User from "../models/User.js";
import createError from "http-errors";

export async function postRegister(req, res, next) {
  const { username, password, email } = req.body;

  let foundUser;

  //? We try to check if the user already exist in the database
  try {
    foundUser = await User.findOne({ username: username });
  } catch (error) {
    next(createError(500, "Server error"));
  }

  //? If we find the user, we send a message to the frontend that the user already exist
  if (foundUser) {
    return next(createError(409, "User already exists"));
  } else {
    //? If we don't find the user, we then create a new user with the data from the req.body
    try {
      const newUser = await User.create({ username, password, email });

      //? We then send the id of the new user created back to the frontend.
      res.status(201).json({
        id: newUser._id,
      });
    } catch (error) {
      next(createError(500, "Server error"));
    }
  }
}
