import express from "express";
import checkValues from "../validators/checkValues.js";
import { body } from "express-validator";
import { postRegister } from "../controllers/registerController.js";

const router = express.Router();

/* `checkValues(["email", "username", "password"])` is a custom middleware function that validates the presence of the specified fields ("email", "username" and "password") in the request body. It ensures that the request contains values for these fields before proceeding to the next middleware or controller function. If any of the specified fields are missing in the request body, it will return an error response indicating the missing fields. */

/* The `[body("email").normalizeEmail().trim()]` code snippet is using the `express-validator` library to sanitize the input data received in the request body for the "email" field. */

router.post("/", checkValues(["email", "username", "password"]), [body("email").normalizeEmail().trim()], postRegister);

export default router;
