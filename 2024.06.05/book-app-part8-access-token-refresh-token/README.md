# BE - My Books App + Access/Refresh Tokens

Before you start, make sure to create your own `.env` file in the `backend` directory, containing `PORT`, `MONGODB_CONNECTION_STRING` and `SECRET_KEY` variables. For the second one, you should use your own Atlas connection string (+ "/books-app" at the end).

Please also run the `backend` seed script before you start!

## Requirements

Today we will try to use access tokens and, hopefully, refresh tokens in the project.

Please try to complete **Tasks 1 and 2** by the end of the day. If you can complete **Task 3** as well, that is even better. 

There is also a Bonus Task, but you should **only** do this if you have extra time at the end! :smile:

**Hint:** Try to code as much as you can by yourself. However, if you get stuck at any stage, there is relevant material in today's "Live Coding" repo...

## Note

As per the bonus Task from the last exercise, the project now includes password hashing on registration.

---

## Task 1

You should update the project (frontend and backend) for the following use case:

1. **After the user has successfully logged in**, the user should receive an access token (expires after 15 mins) and a refresh token (expires after 1 day) in the server's response. These tokens should be stored in the browser's local storage
- **Hint:** You do not need to send a token with the login request itself!

---

## Task 2

Next, you should make sure the app is using an **access** token in the following use cases:

2. When the `MyBooks.jsx` React component first renders, and attempts to `GET` the user's data
3. When the user attempts to add a new book to their Library

---

## Task 3

You should now update your code for the use cases in **Task 2 only**. 

- If the user cannot be authenticated because their access token has expired, a **refresh** token should be sent to get 2 new tokens. 
- If this succeeded, another attempt at the original request should automatically be made, using the **new** access token
- You should create a helper function in `App.jsx` to help you with the above logic
  - To test, feel free to change the expiry time of your tokens in the backend :smile:

---

## Task 4 - Bonus

**Note:** You only need to complete this Task if you have some spare time at the end!

You should also use access and refresh tokens for the following use cases:

3. The user attempts to delete a book from their Library
4. The user attempts to delete their account