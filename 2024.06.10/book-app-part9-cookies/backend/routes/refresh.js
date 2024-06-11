import express from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import { refreshTokens } from "../controllers/refreshController.js";

const router = express.Router();

// Use authentication middleware to protect /refresh route
router.use(authenticateToken);

// GET http://localhost:5000/refresh
router.get("/", refreshTokens);

export default router;