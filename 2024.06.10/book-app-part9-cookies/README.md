# BE - My Books App + Cookies

Before you start, make sure to create your own `.env` file in the `backend` directory, containing `PORT`, `MONGODB_CONNECTION_STRING` and `SECRET_KEY` variables. For the second one, you should use your own Atlas connection string (+ "/books-app" at the end).

Please also run the `backend` seed script before you start!

## Requirements

Today we will try to use cookies to store our JWTs.

Please try to get as far as you can by the end of the day. If you can complete **Tasks 1 to 7**, that would be awesome!

There is also a Bonus Task, but you should **only** do this if you have extra time at the end. :smile:

**Hint:** Try to code as much as you can by yourself. However, if you get stuck at any stage, there is relevant material in today's "Live Coding" repo...

---

## Part 1 - Backend

**Note:** All the following Tasks should be completed in the **`backend`** directory

First, you should use `npm` to install the `cookie-parser` package. Then `import` and use its `cookieParser()` middleware function in `index.js`.

Now, try to update your project so that:

1. Both an access and a refresh token are sent back to the frontend in their own cookie in the following use cases:
    - After the user logs in successfully
    - After the user registers successfully
    - After the user refreshes their tokens successfully
    - (Make sure to configure each cookie's `options` object correctly!)

2. In `index.js`, `cors()` is configured correctly to work with your cookies
  
3. The authentication middleware can validate a JWT received in a cookie, rather than in an `Authorization` header 

---

## Part 2 - Frontend

**Note:** All the following Tasks should be completed in the **`frontend`** directory.

Try to update the project so that:

4. After the user successfully logs in, registers or refreshes their cookies, their JWTs are no longer stored in local storage

5. The user's "access" cookie is sent with any request which needs to access the authentication middleware: 
    - Getting the user's data
    - Creating a new book
    - Adding the new book's `id` to the user's `books` array
    - Deleting a book
    - Deleting the user's account

6. If the backend authentication fails for any of the above requests with a 401 error, the "refresh" cookie is automatically sent to the `GET /refresh` endpoint to try to get two new cookies

7. If the request in Task 6 succeeds, the original request should be made again with the new "access" cookie

**Hint:** In all the above cases, the token included in the **relevant** cookie should be used to authenticate the user in the `backend` authentication middleware. **Question:** In which case should the authentication middleware use the "refresh" cookie, and in which cases should it use the the "access" cookie?

8. Test your app in the browser, and find and fix any remaining bugs. :smile:

---

## Bonus

Use any spare time to you have to check out this project one more time. Follow the user's journey in the code as they try to do things: for example, log in, create a book or delete their account.

Does everything make sense? Is there anything you need to research or review a little more?

This is the last exercise involving the "books" app, so a great chance to identify and research any remaining uncertainties. :smile: