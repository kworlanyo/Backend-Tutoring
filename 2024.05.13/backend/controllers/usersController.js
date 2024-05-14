import User from "../models/User.js";
import createHttpError from "http-errors";

export async function addNewBook(req, res, next) {
  // Destructuring id from req.params
  const { id } = req.params;

  let foundUser;

  // try to first find the user we want to edit their books array.
  try {
    foundUser = await User.findById(id);
  } catch (error) {
    return next(createHttpError(500, "Server error"));
  }

  // if we find the user, we will try and update the user
  if (foundUser) {
    try {
      const options = {
        new: true,
        runValidators: true,
      };

      const updatedUser = await User.findByIdAndUpdate(id, { $push: { books: req.body } }, options);

      res.status(201).json({
        id: updatedUser._id,
        username: updatedUser.username,
        books: updatedUser.books,
      });
    } catch (error) {
      next(createHttpError(500, "Server error"));
    }
  } else {
    next(createHttpError(404, "User not found"));
  }
}
