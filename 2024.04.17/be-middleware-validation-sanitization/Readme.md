# Server Middleware

In this particular exercise, you will be writing Express middleware to validate that a user is above 18, and to sanitize the user input.

## What you will be doing

You will be creating a server with two endpoints, both of which will be accepting **POST** requests.

Both of these endpoints will be expecting a JSON object with user data, which will be processed by the middleware functions you create.

### Example JSON

```json
{
  "firstName" : "steve",
  "lastName" : "stevenson",
  "age": "29",
  "profession" : "Musician",
  "favoriteBands" : [ "Radiohead", "Motorhead", "Alice in chains","The Talking Heads" ],
  "email" : "steve@steve.com"
}
```

## Tasks

### Task 1 - Getting ready

1. Initialise npm into your project with `npm init -y`
2. Install the express.js npm package `npm i express`
3. Create the file `server.js`

### Task 2 - Setting up your server

Create your **express.js** server in the `server.js` file

### Task 3 - Creating the validateUser endpoint

Create an endpoint which;

1. Responds to the path `/validateUser`
2. Responds to **POST** request methods

### Task 4 - Creating middleware

1. Create `validation.js` in a folder called `middleware`. Write **middleware function** that checks the object contains **values** for the keys `firstName`, `lastName`, `age`, and `email`
2. Write a **middleware function** that will check if the user is above **18** years old
3. If any of the middleware fails, you should send a response with an **error** message that says why the user is not valid

   **Example failure response**

   ```json
   {
     "message": "We can not validate your user. They are  below 18 years of age"
   }
   ```

### Task 5 - Applying the middleware

1. Import all the middleware functions from `validation.js` to `server.js`. Apply all the middleware you created in **Task 4** to the **validateUser** endpoint

2. If the request passes successfully through the middleware, **validateUser** should send a response with a **success** message

   **Example success response**

   ```json
   {
     "message": "user validation completed, valid user"
   }
   ```

### Task 6 - Creating the sanitizeUser endpoint

Create an endpoint which;

1. Responds to the path `/sanitizeUser`
2. Responds to **POST** request method

### Task 7 - Creating middleware

1. Write a **middleware function** that makes the `firstName` and `lastName` start with a capital letter
2. Write a **middleware function** that sorts the `favoriteBands` array alphabetically
3. Write a **middleware function** that will convert `age` to number

### Task 8 - Applying the middleware

1. Import all the middleware functions from `sanitization.js` to `server.js`. Apply all the middleware you created in **Task 7** to the **sanitizeUser** endpoint

2. If the request passes successfully through the middleware, **sanitizeUser** should send a response with the updated **POST** data

   **Example response**

   ```json
   {
    "firstName": "Steve",
    "lastName": "Stevenson",
    "age": 29,
    "profession": "Musician",
    "favoriteBands": [
        "Alice in chains",
        "Motorhead",
        "Radiohead",
        "The Talking Heads"
  ],
  "email": "steve@steve.com"
   }
   ```
