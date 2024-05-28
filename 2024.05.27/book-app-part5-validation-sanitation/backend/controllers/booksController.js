import createError from "http-errors";
import Book from "../models/Book.js";
import createHttpError from "http-errors";

export async function createBook(req, res, next) {
  const { title, author } = req.body;

  try {
    // Try to create new "book" document in the "books" collection
    const newBook = await Book.create({ title, author });

    // If successful, send the _id of the new "book" document in the server response
    res.status(201).json({
      id: newBook._id,
    });
  } catch (err) {
    /* This part of the code is handling a specific error scenario where the error name is
      "ValidationError". When a validation error occurs during the creation of a new book (for
      example, if the input data does not meet the defined schema requirements), the code extracts
      the error message from the first validation error encountered and creates a custom HTTP error
      response with a status code of 400 (Bad Request) and the extracted error message. This helps
      provide more specific feedback to the client about what went wrong with their input data. */
    if (err.name === "ValidationError") {
      const errMessage = Object.values(err.errors)[0].message;
      return next(createHttpError(400, errMessage));
    }
    return next(createError(500, "Book could not be created"));
  }
}

// Function to "soft" delete a "book" document
export async function deleteBook(req, res, next) {
  try {
    const options = {
      new: true,
      runValidators: true,
    };

    const deletedBook = await Book.findByIdAndUpdate(req.params.book_id, { deletedAt: new Date() }, options);

    if (deletedBook) {
      res.json({
        message: "Book deleted successfully",
      });
    } else {
      next(createError(404, "User not found"));
    }
  } catch {
    next(createError(500, "Server error"));
  }
}
