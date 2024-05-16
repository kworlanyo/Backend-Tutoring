import express from "express";
import { addBook } from "../controllers/booksController.js";

const router = express.Router();

// POST request
router.post("/", addBook);

export default router;
