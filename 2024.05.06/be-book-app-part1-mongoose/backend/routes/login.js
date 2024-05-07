import express from "express";
import { checkLoginInputs } from "../middleware/checkInputs.js";
import { postLogin } from "../controllers/loginController.js";

const router = express.Router();

router.post("/", checkLoginInputs, postLogin);

export default router;