import express from "express";
import { addNewBook, getUserData, deleteUser } from "../controllers/usersController.js";

const router = express.Router();

// GET http://localhost:5000/users/:id
router.get("/:id", getUserData)

// PATCH http://localhost:5000/users/:id/books
router.patch("/:id/books", addNewBook)

// DELETE http://localhost:5000/users/:id
router.delete("/:id", deleteUser)


export default router;