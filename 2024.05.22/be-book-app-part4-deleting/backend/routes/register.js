import express from "express";
import { checkLoginInputs } from "../middleware/checkInputs.js";
import { postRegister } from "../controllers/registerController.js";

const router = express.Router();

// POST http://localhost:5000/users
router.post("/", checkLoginInputs, postRegister);

export default router;
