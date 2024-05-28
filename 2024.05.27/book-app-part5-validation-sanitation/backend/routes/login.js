import express from "express";
import checkValues from "../validators/checkValues.js";
import { postLogin } from "../controllers/loginController.js";

const router = express.Router();

/* `checkValues(["username", "password"])` is a custom middleware function that validates the presence of the specified fields ("username" and "password") in the request body. It ensures that the request contains values for these fields before proceeding to the next middleware or controller function. If any of the specified fields are missing in the request body, it will return an error response indicating the missing fields. */

router.post("/", checkValues(["username", "password"]), postLogin);

export default router;
