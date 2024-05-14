import express from "express";
import { addNewBook } from "../controllers/usersController.js";

const router = express.Router();

router.patch("/:id/books", addNewBook);

export default router;
