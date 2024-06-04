# BE - My Books App + JWT Authentication/Authorization

Before you start, make sure to create your own `.env` file in the `backend` directory, containing `PORT` (5000) and `MONGODB_CONNECTION_STRING` variables. For the latter, you should use your own Atlas connection string (+ "/books-app" at the end).

Please also run the `backend` seed script before you start!

## Requirements

Today we will add authentication and authorization of users to the project, using JSON Web Tokens (JWTs).

Please try to complete **Tasks 1-4** by the end of the day. If you can complete **Tasks 5-7** as well, that is even better. 

There is also a Bonus Task, but you should only do this if you have extra time at the end! :smile:

**Hint:** Try to code as much as you can by yourself. However, if you get stuck at any stage, there may be relevant material in today's "Live Coding" repo...

## Note

The project has had all "verification" content (the topic demonstrated in our last lesson) **removed** from the `backend` directory. This includes:

- The `GET /verify` endpoint
- All `nodemailer` content
- The `verified` field from the `User` model's schema
- The `UserVerification` model

---

## Part 1 - Backend

All the following Tasks should be completed in the **`backend`** directory, and tested with Thunder Client.

### Task 1

- Use `npm` to install the `jsonwebtoken` package in your `backend` directory

### Task 2

- Whenever the user successfully logs in, your server should create a JSON web token and send it back as part of the success response. 
  - The JWT should include the user's `id`
  - Make sure to also create a new environment variable for your "secret" key, and use it when creating the JWT
  - The JWT should expire in 30 minutes (research how to do this if you need to!)
- Use Thunder Client to simulate a user logging in, and make sure you get the expected response!

### Task 3

- Repeat Task 2, for whenever a new user successfully registers

---

## Part 2 - Frontend

All the following Tasks should be completed in the **`frontend`** directory, and tested in the browser.

### Task 4

- After the user logs in successfully in the browser, they should receive a JWT in the server's response
  - Save this JWT in the browser's local storage. 
  - Make sure this has worked by logging in in the browser and checking the browser's local storage
  
- Repeat the above process for a successful registration

---

## Part 3 - Backend

If you have successfully completed Tasks 1-4, it is time to start using JWTs to protect your some of your routes. 

All the following Tasks should be completed in the **`backend`** directory, and tested with Thunder Client.

### Task 5

- Create a new `authenticateToken` middleware. This should:
  - Check a received HTTP request for an `authorization` header, and extract the JWT from it
  - Decode the JWT
  - If the token is valid, go to the next middleware 
  - If the token is invalid, immediately pass a 401 error on to the error handling middleware

### Task 6

- Use your new `authenticateToken` middleware in the correct routers to protect all your `/books` and `/users` routes
  - Only users who provide a valid JWT with their HTTP requests should be able to access these routes!

---

## Part 4 - Frontend

If you have successfully protected your `/books` and `/users` routes, it is time to make sure the user provides a JWT whenever they try to access one of those routes. 

All the following Tasks should be completed in the **`frontend`** directory, and tested in the browser.

### Task 7

- Make sure the JWT stored in the browser's local storage is sent with **every** HTTP request whenever:
  - The `MyBooks` component first renders
  - The user tries to add a new book to their Library
  - The user tries to "soft delete" a book from their Library
  - The user tries to "hard delete" their own account (if this works, the JWT should also be removed from the browser's local storage after the success response is received, and before the user is logged out)

---

## Part 5 - Bonus

**Note:** You only need to complete this part if you have some spare time at the end!

You will probably have already noticed that we are still saving users' passwords in **plaintext** in our database. This is not good!

Try to use what you learned last week to:
- Use `npm` to install the `bcrypt` package
- Use it to ensure that whenever a new user successfully registers, their password is hashed and salted before their document is saved in the database