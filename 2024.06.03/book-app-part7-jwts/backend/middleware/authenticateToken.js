import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

export default function authenticateToken(req, res, next) {
  try {
    // Destructure authorization from the req.headers
    const { authorization } = req.headers;

    // Get the token by splitting the authorization string
    const token = authorization.split(" ")[1];

    // If the token is a falsy value, throw error to the catch block
    if (!token) throw new Error("User could not be authenticated. Please try again");

    // if the token is a truthy value, verify the token to be sure that it is valid
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    console.log(decoded);

    // If the token is valid, move to the next middleware or controller.
    next();
  } catch (error) {
    next(createHttpError(401, error.message));
  }
}
