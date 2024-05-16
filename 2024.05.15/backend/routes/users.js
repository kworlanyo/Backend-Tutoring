import express from "express";
import { addNewBook } from "../controllers/usersController.js";

const router = express.Router();

// PATCH http://localhost:5000/users/:id/books
router.patch("/:id/books", addNewBook)

export default router;