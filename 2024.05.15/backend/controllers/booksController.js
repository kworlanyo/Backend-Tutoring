import Book from "../models/Book.js";
import createHttpError from "http-errors";

export async function addBook(req, res, next) {
  try {
    // Try to create a book document in the "books collection
    const newBook = await Book.create(req.body);

    // If successful, then send the _id of the new book document created in the server response to the client.
    res.status(201).json({
      id: newBook._id,
    });
  } catch (error) {
    return next(createHttpError(500, "Server error"));
  }
}
