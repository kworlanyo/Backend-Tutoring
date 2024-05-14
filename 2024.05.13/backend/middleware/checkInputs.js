export const checkLoginInputs = (req, res, next) => {
  console.log("Checking login inputs...");
  const { username, password } = req.body;

  // Error handling
  if (!username || !password) {
    const error = new Error("Missing fields");
    error.status = 400;
    next(error);
  }

  next();
};

// ! Do not do this today!
// export const checkBookInputs = (req, res, next) => {
//   console.log("Checking book inputs...");
//   const { title, author } = req.body;

//   // Error handling
//   if (!title || !author) {
//     const error = new Error("Missing fields");
//     error.status = 400;
//     next(error);
//   }

//   next();
// };