import User from "../models/User.js";

export const postLogin = async (req, res, next) => {
  // Destructure request body to get username and password
  const { username, password } = req.body;

  let foundUser;

  // Try to find a document with matching username and password
  try {
    foundUser = await User.findOne({ username: username, password: password });
  } catch (error) {
    const err = new Error("Database could not be reached");
    err.status = 500;
    return next(err);
  }

  // If matching document found, send success response
  if (foundUser) {
    res.json({ username: foundUser.username, books: foundUser.books });
    // If matching document not found, create error and forward to global error handler
  } else {
    const err = new Error("User could not be found");
    err.status = 401;
    next(err);
  }
};
