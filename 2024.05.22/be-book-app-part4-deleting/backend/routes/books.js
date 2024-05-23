import express from "express";
import { createBook, deleteBook } from "../controllers/booksController.js";

const router = express.Router();

// POST http://localhost:5000/books
router.post("/", createBook);

// DELETE http://localhost:5000/books/:book_id
router.delete("/:book_id", deleteBook);

export default router;
