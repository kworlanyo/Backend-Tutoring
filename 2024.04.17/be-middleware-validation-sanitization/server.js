// import express
import express from "express";

// import middleware functions
import { checkValues, isAbove18 } from "./middleware/validation.js";
import { showUserValidationComplete, showSanitizeUser } from "./controllers/userController.js";
import { startWithCapital, sortAlphabetically, convertToNumber } from "./middleware/sanitization.js";

// initialize express
const app = express();

// express.json() middleware is needed to parse the data in the request body during a post request
app.use(express.json());

// post request to validate user
// notice that the middleware functions come first before the controller functions
// if there is an error in any of the middleware functions, the error will be sent to the error function and the controller function (in this case showUserValidationComplete) will not run.
app.post("/validateUser", checkValues, isAbove18, showUserValidationComplete);

// in this case, however, we are not handling errors in the middleware functions. So if the code is not correct in the middleware functions, the controller function (in this case showSanitizeUser) will still run.
app.post("/sanitizeUser", startWithCapital, sortAlphabetically, convertToNumber, showSanitizeUser);

// port to listen for requests
app.listen(7000, () => {
  console.log("Server is running on port 7000");
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 400).send({
    // if we write a status code in the middleware, we will see it in the error object that we create and send back to the user.
    error: {
      message: err.message,
      status: err.status,
    },
  });
});
