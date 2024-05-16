import User from "../models/User.js";

export const postLogin = async (req, res, next) => {
  // Destructure request body to get username and password
  const { username, password } = req.body;

  let foundUser;

  // Try to find a document with matching username and password
  try {
    foundUser = await User.findOne({ username: username, password: password });
  } catch (error) {
    const err = new Error("Database couldn't be reached");
    err.status = 500;
    return next(err);
  }

  // If matching document found, send success response
  if (foundUser) {
    //* We use populate here to show the books inside the books array collection of the user when the user logs in.
    await foundUser.populate("books");

    res.json({
      id: foundUser._id,
      username: foundUser.username,
      books: foundUser.books,
    });
    // If matching document not found, create error and forward to global error handler
  } else {
    const error = new Error("User could not be found");
    error.status = 401; // "Unauthorized"
    next(error);
  }
};
