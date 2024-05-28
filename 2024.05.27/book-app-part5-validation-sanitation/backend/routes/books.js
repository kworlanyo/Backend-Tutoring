import express from "express";
import checkValues from "../validators/checkValues.js";
import { createBook, deleteBook } from "../controllers/booksController.js";
import { body } from "express-validator";

const router = express.Router();

// POST http://localhost:5000/books
/* `checkValues(["title", "author"])` is a custom middleware function that validates the presence of the specified fields ("title" and "author") in the request body. It ensures that the request contains values for these fields before proceeding to the next middleware or controller function. If any of the specified fields are missing in the request body, it will return an error response indicating the missing fields. */

/* The `[body("title").escape(), body("author").escape()]` code snippet is using the `express-validator` library to sanitize the input data received in the request body for the "title" and "author" fields. */
router.post("/", checkValues(["title", "author"]), [body("title").escape(), body("author").escape()], createBook);

// DELETE http://localhost:5000/books/:book_id
router.delete("/:book_id", deleteBook);

export default router;
