import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import createHttpError from "http-errors";

export const postLogin = async (req, res, next) => {
  // Destructure request body to get username and password
  const { username, password } = req.body;

  let foundUser;

  // Try to find a document with matching username and password
  try {
    foundUser = await User.findOne({ username: username });
  } catch (error) {
    const err = new Error("Database couldn't be reached");
    err.status = 500;
    return next(err);
  }

  // If matching document found, send success response
  if (foundUser) {
    // check whether the password coming from the user is the same as the password in the database
    const matchPassword = await compare(password, foundUser.password);

    // If the passwords don't match, send an error message
    if (!matchPassword) {
      return next(createHttpError(400, "Password is not correct"));
    }

    // Populate the books array inside the user document
    await foundUser.populate("books", {
      _id: 1,
      title: 1,
      author: 1,
      deletedAt: 1,
    });

    // Create a new token and add it as part of the response.
    const newToken = jwt.sign({ id: foundUser.id }, process.env.SECRET_KEY, { expiresIn: "30m" });

    res.json({
      id: foundUser._id,
      username: foundUser.username,
      books: foundUser.books.filter((book) => book.deletedAt === null),
      token: newToken,
    });
    // If matching document not found, create error and forward to global error handler
  } else {
    const error = new Error("User could not be found");
    error.status = 401; // "Unauthorized"
    next(error);
  }
};
