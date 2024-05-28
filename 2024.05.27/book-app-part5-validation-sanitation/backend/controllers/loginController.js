import User from "../models/User.js";

export const postLogin = async (req, res, next) => {
  // Destructure request body to get username and password
  const { username, password } = req.body;

  let foundUser;

  // Try to find a document with matching username and password
  try {
    foundUser = await User.findOne({ username: username, password: password })
  } catch (error) {
    const err = new Error("Database couldn't be reached");
    err.status = 500;
    return next(err);
  }
  
  // If matching document found, send success response
  if (foundUser) {
    await foundUser.populate("books", {
      _id: 1,
      title: 1,
      author: 1,
      deletedAt: 1
    })

    res.json({ 
      id: foundUser._id,
      username: foundUser.username, 
      books: foundUser.books.filter(book => book.deletedAt === null) 
    });
  // If matching document not found, create error and forward to global error handler
  } else {
    const error = new Error("User could not be found");
    error.status = 401; // "Unauthorized"
    next(error);
  }
}