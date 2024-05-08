# Express Bank Accounts

We will practice error handling by making an API for a small bank.

After completing each task, you should test the relevant endpoint using **Thunder Client**.

**Note:** Please write all the code for this exercise by yourself. 
- It is ok to review your past work in case you have forgotten how to do some things 
- However, you should **not** simply copy and paste any code from your previous repos! 
- Remember: "practice makes perfect" :smile:

---

## Tasks

### Task 1

Please run **npm install** to install the project's dependencies. Then run `npm install mongoose` to install mongoose.

Next, create a `.env` file. This should contain the following variables:
- `PORT` (5000)
- `MONGODB_CONNECTION_STRING` (the connection string to your MongoDB cluster + `/bank`, as we will want to create a new database called `bank`)

Next, create an `Account` mongoose model. This should use a simple schema to ensure all accounts have an `owner` (a string), and an `amount` (a number). Both properties should be required.

Update `index.js` to use your environment variables to (1) connect to the `bank` database and (2) listen on the correct port

Try to start your server. Does this work? Can you connect to your database?

**Note:** When starting your server, use the `devStart` script: `npm run devStart`.

---

### Task 2

Create a seed script to insert at least 3 documents into your `accounts` collection.

When you have created and run this script, check Atlas to make sure the correct documents are in the `accounts` collection.

---

### Task 3

Create error handling middleware.

In the remaining tasks, any errors should be forwarded to this middleware, so it can send the correct response.

---

### Task 4

Implement the `GET /accounts` endpoint.

- `try` to use a Mongoose query to find all the accounts in your collection
    - In case there is a server error, respond with code **500** and a relevant error message
- The server should send back an array with all account owners. No account balances should be sent

---

### Task 5

Implement the `GET /accounts/:id` endpoint to return the details of one account.

Before you start, remember:

- Each document in your MongoDB collection should have an `_id` property (type: `ObjectId`)
- Mongoose gives you access to an `id` virtual getter, which lets you use a **string** version of a document's `_id`
- E.g. 
    - If the value of `_id` is `ObjectId("663b0d429a7f176f7a775500")` 
    - The value of `id` will be "663b0d429a7f176f7a775500"

Using this knowledge, you can continue setting up your endpoint:

- Try to use a Mongoose query to see if there is an account with the same `id` as the `:id` param
    - In case there is a server error, respond with code **500** and a relevant error message
- If the account exists, send a response with the account details
- If not, respond with a relevant error code and message

---

### Task 6

Implement the `GET /accounts/:id/balance` endpoint to find the current balance of an account.

- Try to use a Mongoose query to see if there is an account with the same `id` as the `:id` param
    - In case there is a server error, respond with code **500** and a relevant error message
- If the account exists, send a response containing only the amount in the account
- If not, respond with a relevant error code and message

---

### Task 7

Implement the `POST /accounts` endpoint to create a new account.

When creating your request using Thunder Client, the `body` of your request should contain a JSON object with `owner` and `amount` properties

- Check the `owner` property is a string
    - If not, respond with a relevant error code and message
- Check the `amount` property is a number
    - If not, respond with a relevant error code and message
- - Try to check if there is already an account with the same owner in your MongoDB collection
    - In case there is a server error, respond with code **500** and a relevant error message
- If you find an account with the same owner, respond with a relevant error code and message  
- If there is no account with the same owner, try to add the new document to your MongoDB collection
    - If the document is added successfully, respond with a relevant success code and message
    - In case there is a server error, respond with code **500** and a relevant error message

---

### Task 8

Implement the `DELETE /accounts/:id` endpoint to delete one account.

- Try to use a Mongoose query to delete an account with the same `id` as the `:id` param
    - In case there is an error, respond with code **500** and a relevant error message
- If the query succeeded, send a response containing a relevant message

### Task 9

Implement the `DELETE /accounts` endpoint to delete all accounts.

- Try to use a Mongoose query to delete all the accounts in the collection
    - In case there is an error, respond with code **500** and a relevant error message
- If the query succeeded, send a response containing a relevant message

---

## Bonus Tasks

- If you haven't done so already, install the `http-errors` package and refactor your code to use it

- See if you can change your Account schema to add one or two more properties. Update your seed script to reflect your changes and run it to re-seed your collection
    - Make sure your current endpoints still work, and fix any bugs you find
    - Can you think of any extra endpoints and/or error handling logic you could implement based on your changes?