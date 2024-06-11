import createError from "http-errors";
import Book from "../models/Book.js";

export async function createBook(req, res, next) {
  const { title, author } = req.body;

  try {
    // Try to create new "book" document in the "books" collection
    const newBook = await Book.create({ title, author });

    // If successful, send the _id of the new "book" document in the server response
    res.status(201).json({
      id: newBook._id
    })
  } catch (err) {
    // If the error was caused by your Mongoose schema validation
    if (err.name === "ValidationError") {
      // Create an error including a specific error message from your schema validation... 
      // And pass it to the error handling middleware
      const errMsg = Object.values(err.errors)[0].message;
  
      return next(createError(400, errMsg));
    }
  
    next(createError(500, "Book could not be added. Please try again"));
  }
}

// Function to "soft" delete a "book" document
export async function deleteBook(req, res, next) {
  try {
    const options = {
      new: true,
      runValidators: true
    };

    const deletedBook = await Book.findByIdAndUpdate(req.params.book_id, { deletedAt: new Date() }, options);

    if (deletedBook) {
      res.json({
        message: "Book deleted successfully"
      })
    } else {
      next(createError(404, "User not found"));
    }
  } catch {
    next(createError(500, "Server error"));
  }
}