import createError from "http-errors";
import Book from "../models/Book.js";

export async function createBook(req, res, next) {
  const { title, author } = req.body;

  try {
    // Try to create new "book" document in the "books" collection
    const newBook = await Book.create({ title, author });

    // If successful, send the _id of the new "book" document in the server response
    res.status(201).json({
      id: newBook._id,
    });
  } catch {
    return next(createError(500, "Server error"));
  }
}

export async function deleteBook(req, res, next) {
  try {
    const options = {
      new: true,
      runValidators: true,
    };

    //? In soft deleting, we update the books document with a date at the deletedAt property
    const deletedBook = await Book.findByIdAndUpdate(req.params.book_id, { deletedAt: new Date() }, options);

    //? We then send a message to the frontend
    if (deletedBook) {
      res.json({ message: `${deletedBook.title} has been successfully deleted!` });
    } else {
      next(createError(404, "No Book Found"));
    }
  } catch (error) {
    next(createError(500, "Server error"));
  }
}
