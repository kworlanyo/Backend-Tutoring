export function startWithCapital(req, res, next) {
  const { firstName, lastName } = req.body;

  req.body.firstName = firstName.slice(0, 1).toUpperCase() + firstName.slice(1).toLowerCase();
  req.body.lastName = lastName.slice(0, 1).toUpperCase() + lastName.slice(1).toLowerCase();

  console.log(firstName, lastName);

  // the next() function will allow JavaScript to move to the next middleware if there is any or the controller function
  next();
}

export function sortAlphabetically(req, res, next) {
  const { favoriteBands } = req.body;
  favoriteBands.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));

  // the next() function will allow JavaScript to move to the next middleware if there is any or the controller function
  next();
}

export function convertToNumber(req, res, next) {
  const { age } = req.body;
  req.body.age = +age;

  // the next() function will allow JavaScript to move to the next middleware if there is any or the controller function
  next();
}
