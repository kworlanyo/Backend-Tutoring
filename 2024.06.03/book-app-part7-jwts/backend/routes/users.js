import express from "express";
import { addNewBook, getUserData, deleteUser } from "../controllers/usersController.js";
import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();

// We put the authentication function above the routes so that it will first check the validity of the tokens before allowing the routes below to be accessed.
router.use(authenticateToken);

// GET http://localhost:5000/users/:id
router.get("/:id", getUserData);

// PATCH http://localhost:5000/users/:id/books
router.patch("/:id/books", addNewBook);

// DELETE http://localhost:5000/users/:id
router.delete("/:id", deleteUser);

export default router;
