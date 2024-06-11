import jwt from "jsonwebtoken";
import { hash } from "bcrypt";
import createError from "http-errors";
import User from "../models/User.js";

async function createUser(req, res, next) {
  const { email, username, password } = req.body;

  try {
    // Try to find a document in the "users" collection with either the same email OR the same username as the request body
    const foundUser = await User.findOne({ $or: [{ email }, { username }] });

    if (foundUser) {
      // If the document we found has the same email as the one in the request body...
      if (foundUser.email === email) {
        return next(createError(409, "Email address already in use. Please try a different email address"));
      }
      // If the document we found has the same username as the one in the request body...
      if (foundUser.username === username) {
        return next(createError(409, "Username has already been taken. Please try a different username"));
      }
    }

    // Use bcrypt to hash and salt the user's password
    const hashedPassword = await hash(password, 10);

    // If we didn't send anything to the error handling middleware yet, try to create a new "user" document with the data from req.body
    const newUser = await User.create({ email, username, password: hashedPassword });

    // Create JWTs
    const accessToken = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY, { expiresIn: "1d" });

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    };

    const accessOptions = {
      ...cookieOptions,
      maxAge: 1000 * 60 * 15,
    };

    const refreshOptions = {
      ...cookieOptions,
      maxAge: 1000 * 60 * 60 * 24,
      path: "/refresh",
    };

    res.cookie("accessCookie", accessToken, accessOptions);
    res.cookie("refreshCookie", refreshToken, refreshOptions);

    // If we successfully created the new document, send back a success response
    // Including the JWTs
    res.status(201).json({
      id: newUser.id,
    });
  } catch (err) {
    // If the error was caused by your Mongoose schema validation
    if (err.name === "ValidationError") {
      // Create an error including a specific error message from your schema validation...
      // And pass it to the error handling middleware
      const errMsg = Object.values(err.errors)[0].message;

      return next(createError(400, errMsg));
    }

    next(createError(500, "Registration could not be completed. Please try again"));
  }
}

export default createUser;
