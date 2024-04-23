import express from "express";
import cors from "cors";
import users from "./data.js";
import { v4 as uuidv4 } from "uuid";

// initialize express app
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// post request to send a user object back as a response
app.post("/users", (req, res, next) => {
  const { username, password } = req.body;

  // find user whose username and password is the same as the values from the username and password input fields in the frontend
  const foundUser = users.find((user) => user.username === username && user.password === password);

  if (foundUser) {
    // if user is found, we send the user object as a response
    res.status(201).json(foundUser);
  } else {
    // if the user object is not found, we create an error and send it to the error middleware.
    const error = new Error("There is no user");
    error.status = 400;
    next(error);
  }
});

// post request to send a user object with its book array property updated as a response
app.post("/books", (req, res, next) => {
  const { title, author, id } = req.body;

  // find a user whose id property is the same as the id sent in the request
  const foundUser = users.find((user) => user.id === id);

  if (foundUser) {
    // if the user is found, check if both title and author inputs are not empty. If they are not empty, then create a book object and add it to the user object book array property
    if (title !== "" && author !== "") {
      const newBook = {
        title: title,
        author: author,
        id: uuidv4(),
      };

      foundUser.books.push(newBook);
    }

    // send the response with the user object updated
    res.status(201).json(foundUser);
  } else {
    // create and send error to the error middleware
    const error = new Error("There is no user");
    error.status = 400;
    next(error);
  }
});

// port listener
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

// error middleware
app.use((err, req, res, next) => {
  res.status(err.status || 400).send({
    error: {
      message: err.message,
      status: err.status,
    },
  });
});
