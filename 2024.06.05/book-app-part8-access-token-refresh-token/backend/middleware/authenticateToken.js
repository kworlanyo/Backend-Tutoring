import jwt from "jsonwebtoken";
import createError from "http-errors";
import User from "../models/User.js";

// Here we want to check whether, as part of their request, the user provided a VALID token
// If they did, call next() to allow the request to go forward to the next middleware
// If they did not, immediately send a 401 error response back to the frontend
async function authenticateToken(req, res, next) {
  const { authorization } = req.headers;

  try {
    // When we get the "authorization" header, its value will be: "Bearer <JWT>"
    const token = authorization.split(" ")[1]; // split string: index 0 = "Bearer", index 1 = token

    if (!token) {
      throw new Error("User could not be authenticated. Please try again");
    }

    // If we got a token from the header, try to verify it
    //* Destructure the id from the verified token
    const { id } = jwt.verify(token, process.env.SECRET_KEY);

    //* Use the id to find the user
    const foundUser = await User.findById(id);

    //* If the user is found, create a property on the req called "user" and assign the found user document or object to it.
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
