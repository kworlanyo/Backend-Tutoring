import createError from "http-errors";
import User from "../models/User.js";

export async function addNewBook(req, res, next) {
  // The bookId is from the id of the created book after the first post request in the Addbook.jsx in the frontend
  const { bookId } = req.body;

  // The id is from the logged in user's id which we have destructured.
  const { id } = req.params;

  let foundUser;

  // We try to find the user in the users collection first before we add the bookId
  try {
    foundUser = await User.findById(id);
  } catch {
    return next(createError(500, "Server error"));
  }

  // If we find the user, we will try and update the user's document with the bookId from the request body.
  if (foundUser) {
    try {
      const options = {
        new: true,
        runValidators: true,
      };

      const updatedUser = await User.findByIdAndUpdate(id, { $push: { books: bookId } }, options);

      // We then populate the books array documents before we send the response
      //? Note that if you are sending everything in the books array documents in the response, then you will not need a second argument in the populate method.
      /* `await updatedUser.populate("books");` is a Mongoose method used to populate referenced
      documents in a document. In this case, it populates the `books` field in the `updatedUser`
      document with actual book documents from the `books` collection based on the references stored
      in the `updatedUser` document. This allows you to retrieve the full details of the books
      associated with the user in a single query and include them in the response sent back to the
      client. */
      await updatedUser.populate("books");

      // We send the response back to the client
      res.status(201).json({
        id: updatedUser._id,
        username: updatedUser.username,
        books: updatedUser.books,
      });
    } catch {
      next(createError(500, "Server error"));
    }
  } else {
    next(createError(404, "User not found"));
  }
}
