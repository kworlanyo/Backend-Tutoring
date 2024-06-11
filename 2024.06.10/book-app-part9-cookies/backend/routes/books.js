import express from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import { createBook, deleteBook } from "../controllers/booksController.js";

const router = express.Router();

// Use authentication middleware to protect all /books routes
router.use(authenticateToken)

// POST http://localhost:5000/books
router.post("/", createBook)

// DELETE http://localhost:5000/books/:book_id
router.delete("/:book_id", deleteBook)

export default router;