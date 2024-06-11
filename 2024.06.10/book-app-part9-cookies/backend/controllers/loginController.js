import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import createError from "http-errors";
import User from "../models/User.js";

export const postLogin = async (req, res, next) => {
  // Destructure request body to get username and password
  const { username, password } = req.body;

  // Try to find a document with matching username and password
  // The password in req.body now needs to be compared with the hashed password in the db
  try {
    const foundUser = await User.findOne({ username });
    const isMatchingPassword = await compare(password, foundUser.password);

    // If matching document found, send success response
    if (foundUser && isMatchingPassword) {
      await foundUser.populate("books", {
        _id: 1,
        title: 1,
        author: 1,
        deletedAt: 1,
      });

      // Create JWTs
      const accessToken = jwt.sign({ id: foundUser.id }, process.env.SECRET_KEY, { expiresIn: "15m" });
      const refreshToken = jwt.sign({ id: foundUser.id }, process.env.SECRET_KEY, { expiresIn: "1d" });

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

      res.json({
        id: foundUser._id,
      });
      // If matching document not found, create error and forward to global error handler
    } else {
      next(createError(401, "Login unsuccessful - please try again"));
    }
  } catch {
    next(createError(500, "Login could not be completed - please try again"));
  }
};
