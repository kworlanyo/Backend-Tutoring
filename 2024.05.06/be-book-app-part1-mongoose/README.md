# BE - My Books App + MongoDB

Remember the "My Books" app from a couple of weeks ago? Let's try and refactor ("rewrite") it to work with a MongoDB database!

## Instructions

Inside this repo, you will find the current version of the "My Books" app. Remember, using this app a user can currently:

- Log in
- Add a new book to their Library
- Log out

**However**, this app currently only has one user - and they are stored in the `backend/data.js` file!

Let's change the app so we can store our users as documents in a MongoDB database. That will mean we can persist the data - even if the server restarts. :smile:

---

## Tasks 1 - Backend

**Hint:** If you have forgotten how to do any of these tasks, today's live coding may help!

1. Log into your MongoDB Atlas cluster in the browser. Create a new database (`books-app`) and collection (`users`).

2. In the **backend** repo, use `npm` to install `mongoose`.

3. In the **backend** repo, create a `.env` file containing variables for (1) the port your server should run on, and (2) a MongoDB connection string (for VS Code). Remember: make sure that this string ends with `/my-books"`. 
- Using these variables, try to connect to your new `books-app` database in `index.js` using `mongoose`. Log a message if this is either successful, or if it fails. Can you connect to your `books-app` database successfully?

4. In the **backend** repo, create a new directory (`models`), and inside this a new file (`User.js`). Inside this file, use `mongoose` to create a `User` model and schema. If needed, you can check out the `data.js` file to see the structure of your current user.
- Once this is done, you should delete `data.js` - you no longer need it!

5. Now that you have deleted `data.js`, you need some documents in your MongoDB `users` collection!
- In your **backend** repo, create a seeding script. When this is run, any existing users in your `users` collection should be deleted, and the following users inserted:

```js
[
  { username: "adam_ant", password: "Th3Ant5", books: [{id: 1, title: "The Waves", author: "Virginia Woolf"}]},
  { username: "ozzy_osborne", password: "1r0nMa1d3n", books: [{id: 2, title: "Dubliners", author: "James Joyce"}]},
  { username: "siouxie_sioux", password: "The3Ban5h335", books: [{id: 3, title: "Wide Sargasso Sea", author: "Jean Rhys"}]}
]
```

When you are done, run the seeding script, and then check your Atlas collection to see if it worked!

---

## Tasks 2 - Frontend + Backend

6. When all the above Tasks are done, try to refactor your code in the frontend and backend to make sure any one of your 3 users can **log in** successfully. By the end of the day, try to make it so that logging in with a correct username and password will render the `<MyBooks />` view with the correct book and welcome message.

**Note: You DO NOT need to be able to add new books at the end of this exercise. That functionality is for a future exercise.** :wink:

---

## Bonus Tasks

7. If you finish early, you are welcome to also try to implement a `Register` view, so a new user can register to use your app.

8. If you have even more time(!) you are welcome to improve the styling of your React app. :smile: