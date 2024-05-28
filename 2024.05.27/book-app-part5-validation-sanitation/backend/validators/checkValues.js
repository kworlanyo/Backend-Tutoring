import createHttpError from "http-errors";

/**
 * The function `checkValues` takes an array of properties and returns a middleware function that
 * checks if those properties exist in the request body, returning an error if any are missing.
 * The `props` parameter in the `checkValues` function is an array that contains the
 * names of the fields that need to be checked in the request body.
 * A middleware function is being returned that checks if the specified fields are present in
 * the request body. If any of the fields are missing, it will create an HTTP error with status code
 * 400 and a message indicating which field is required. If all fields are present, it will call the
 * next middleware function in the chain.
 */
function checkValues(props) {
  return function (req, res, next) {
    props.forEach((field) => {
      if (!req.body[field]) {
        return next(createHttpError(400, `${field} is required`));
      }
    });
    next();
  };
}

export default checkValues;
