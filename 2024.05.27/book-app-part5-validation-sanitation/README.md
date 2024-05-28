# BE - My Books App + Validation/Sanitization

Before you start, make sure to create your own `.env` file in the `backend` directory, containing `PORT` and `MONGODB_CONNECTION_STRING` variables. For the latter, you should use your own Atlas connection string (+ "/books-app" at the end).

Please also run the `backend` seed script before you start!

## Requirements

Today we will add some validation and sanitization in the project backend.

Please try to complete **Tasks 1-3** by the end of the day. :smile:

**Hint:** Try to code as much as you can by yourself. However, if you get stuck at any stage, there may be relevant material in today's "Live Coding" repo...

---

## Tasks - Backend

All the following Tasks should be completed in the **`backend`** directory, and tested with **Thunder Client**.

### Task 1

Create a new directory in your `backend` called `validators`. This should contain a file called `checkValues.js` which exports a validation function.
  - As with this morning's live coding, the `checkValues` function should make sure that no required property in a request's `body` is falsy
  - You should define and export the function, then implement it in all the `POST` and `PATCH` endpoints for this project
  - Also make sure to remove any older validation middleware you find before testing
- Test your changes with Thunder Client and make sure you get the results you expect

### Task 2

Create Mongoose schema **validation** for the following models:
  - `User.js` (`email`, `username` and `password` fields)
  - `Book.js` (`title` and `author` fields)
- You can decide for yourself what counts as "valid" data for each field.
- You should create at least one validator per field, but you can also create more for some fields if you like
- You should use a combination of built-in validators and custom validators. Import the `validator` package, and use it whenever it is helpful
- Make sure you always create **relevant** error messages, and that these are sent in the server's response by the error handling middleware
- Make sure that you have tested all your changes with Thunder Client before moving on
- Feel free to use the following documentation if needed: [https://www.npmjs.com/package/validator]

### Task 3

Add data **sanitization** to your backend. The affected models/properties should be:
- `User.js` (`email` should be normalized, any whitespace on either side of the data should be trimmed)
- `Book` (`title` and `author` should replace the following characters with HTML entities: `<`, `>`, `&`, `"`, `'` )
- You should import and use the `express-validator` package to help you
- Feel free to use the following documentation if needed: [https://github.com/validatorjs/validator.js#sanitizers]