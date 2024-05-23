# BE - My Books App + Deleting

Before you start, make sure to create your own `.env` file in the `backend` directory, containing `PORT` and `MONGODB_CONNECTION_STRING` variables. For the latter, you should use your own Atlas connection string (+ "/books-app" at the end).

You do not need to run the seed script yet.

## Requirements

Today we will add the ability to "hard" and "soft" delete documents from the "users" and "books" collections.

Please try to complete **Tasks 1-5** by the end of the day. It would be great if you were also able to complete Task 6, but it is ok if you don't get that far. :smile:

**Hint:** Try to code as much as you can by yourself. However, if you get stuck at any stage, there may be relevant material in today's "Live Coding" repo...

---

## Note

Please note that the structure of the frontend app has changed since the previous iteration of this project.

When a user logs in:

- Now only their `id` is stored in the `App.jsx` state (in the `loggedInUserId` state variable)  
- A truthy `loggedInUserId` value still causes the `MyBooks` component to be rendered 
- When the `MyBooks` component renders, the `loggedInUserId` value is used to fetch only relevant data about the logged in user
- These data (`username` and `books`) are stored in the `MyBooks` component's state variable (`user`)

These changes are very similar to this morning's live coded changes to the "To Do" app. :smile:

---

## Tasks 1 - Backend 1: Revision

1. Update the `User` schema so that all "user" documents should have an `email` property (a string, which is required and must be unique). The seed script has already been updated to reflect this change

2. Update the `Book` schema so that all "book" documents should have a `deletedAt` property (a Date, which is set by default to `null`)

3. Update the seed script to ensure that, when it runs, all documents currently in the `books` collection are removed. Currently, this is only the case for the `users` collection
- Once you have completed Tasks 1-3, please run the seed script. Make sure there are 3 documents in the `users` collection, and none in the `books` collection before continuing

---

## Tasks 2 - Backend 2: Deleting

Please note that the Tasks in this section only need to be completed in your **`backend`** directory, and tested using **Thunder Client**. There is no need to do any work in the `frontend` directory (yet!)

4. Create a new `DELETE users/:id` endpoint
- When a HTTP request is sent to this endpoint:
  - The "user" document with the same `_id` as the `:id` param should be **hard deleted** from the `users` collection
  - Think about which Mongoose query you should use to achieve this
  - Make sure to add appropriate error handling, and send back a success or error response, depending on what happened
- When you are done, make sure to test with Thunder Client
- If all is working as expected, re-run the seed script before moving on

5. Create a new `DELETE books/:book_id` endpoint
- When a HTTP request is sent to this endpoint:
  - The "book" document with the same `_id` as the `:book_id` param should be **soft deleted** from the `books` collection
  - This means that the document will still exist in the `books` collection, but with its `deletedAt` field set to the current date/time 
  - Think about which Mongoose query you should use to achieve this
  - Make sure to add appropriate error handling, and send back a success or error response, depending on what happened
- When you are done, make sure to test with Thunder Client 
- If all is working as expected, re-run the seed script before moving on

---

## BONUS - Tasks 3 - Frontend

6. If you have some time, you can now start working in the **`frontend`** directory. See if you can give your end user the ability to:

- Hard delete their account by clicking the "Delete Account" button in the `NavBar` component
  - Also try to give them a chance to change their mind before their account is deleted!
- Soft delete a book in their library by clicking the "X" inside that instance of the `Book` component
  - **Remember:** users should not be able to see soft deleted books in the browser
  - ... but those "book" documents should still exist in the database!

---

## EXTRA BONUS

If you still have some time before the end of class, feel free to examine the app and try to implement any changes you think would be helpful. The app is still far from perfect!

Some suggestions include:

- Implementing the ability to register a new account (perhaps starting with the `Register` component in the `frontend` directory)
- Practicing your React styling
- Any other improvements you can think of :smile: