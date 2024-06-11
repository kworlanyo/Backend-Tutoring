import jwt from "jsonwebtoken";
import createError from "http-errors";
import User from "../models/User.js";

// Here we want to check whether, as part of their request, the user provided a VALID token
// If they did, call next() to allow the request to go forward to the next middleware
// If they did not, immediately send a 401 error response back to the frontend
async function authenticateToken(req, res, next) {
  const { accessCookie, refreshCookie } = req.cookies;

  try {
    if (!accessCookie && !refreshCookie) {
      throw new Error("User could not be authenticated. Please try again");
    }

    let token;

    if (refreshCookie) {
      token = refreshCookie;
    } else {
      token = accessCookie;
    }

    // If we got a token from the header, try to verify it
    const { id } = jwt.verify(token, process.env.SECRET_KEY);

    const foundUser = await User.findById(id);

    if (foundUser) {
      req.user = foundUser;
    } else {
      return next(createError(404, "User not found"));
    }

    // If the token is valid, go on to the next middleware
    next();
  } catch (err) {
    next(createError(401, err.message));
  }
}

export default authenticateToken;
