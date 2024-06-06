import { Router } from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import { refreshTokens } from "../controllers/refreshTokenController.js";

const router = Router();

//* Use authentication middleware to protect all /users routes
router.use(authenticateToken);

router.get("/", refreshTokens);

export default router;
