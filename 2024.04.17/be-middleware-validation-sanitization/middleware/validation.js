export function checkValues(req, res, next) {
  const { firstName, lastName, age, email } = req.body;

  // if any of the fields is empty, we create an error object with a message and a status code.
  // the next() function then sends the error object to the error handler in the server.js
  if (!firstName || !lastName || !age || !email) {
    const error = new Error("Missing fields");
    error.status = 401;
    next(error);
  }
  // if none of the fields is empty, the next() function will allow JavaScript to move to the next middleware if there is any or the controller function
  next();
}

export function isAbove18(req, res, next) {
  const { age } = req.body;

  // if the age is less than or equal to 18, we create an error object with a message and a status code.
  // the next() function then sends the error object to the error handler in the server.js
  if (+age <= 18) {
    const error = new Error("We can not validate your user. They are  below 18 years of age");
    error.status = 401;
    next(error);
  }

  // if none of the fields is empty, the next() function will allow JavaScript to move to the next middleware if there is any or the controller function
  next();
}
