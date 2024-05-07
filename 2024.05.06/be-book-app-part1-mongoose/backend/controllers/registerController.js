import User from "../models/User.js";

export const registerPost = async (req, res, next) => {
  // Destructure request body to get username and password
  const { username, password } = req.body;

  // Try to create a document with username, password and books property
  try {
    const newUser = await User.create({ username, password, books: [] });

    // Send success response
    res.status(201).json({ username: newUser.username, books: newUser.books });
  } catch (error) {
    const err = new Error("Database could not be reached");
    err.status = 500;
    return next(err);
  }
};
