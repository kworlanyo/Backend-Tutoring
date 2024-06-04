import express from "express";
import { createBook, deleteBook } from "../controllers/booksController.js";
import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();

// We put the authentication function above the routes so that it will first check the validity of the tokens before allowing the routes below to be accessed.
router.use(authenticateToken);

// POST http://localhost:5000/books
router.post("/", createBook);

// DELETE http://localhost:5000/books/:book_id
router.delete("/:book_id", deleteBook);

export default router;
