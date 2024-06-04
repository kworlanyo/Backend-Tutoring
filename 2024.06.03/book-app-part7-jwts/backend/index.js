import express from "express";
import cors from "cors";
import connect from "./libs/database.js";
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import usersRouter from "./routes/users.js";
import booksRouter from "./routes/books.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";

await connect();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/register", registerRouter);

app.use("/login", loginRouter);

app.use("/users", usersRouter);

app.use("/books", booksRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(globalErrorHandler);