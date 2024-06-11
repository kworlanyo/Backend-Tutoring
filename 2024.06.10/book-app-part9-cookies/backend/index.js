import express from "express";
import cors from "cors";
import connect from "./libs/database.js";
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import usersRouter from "./routes/users.js";
import booksRouter from "./routes/books.js";
import refreshRouter from "./routes/refresh.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import cookieParser from "cookie-parser";

await connect();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/register", registerRouter);

app.use("/login", loginRouter);

app.use("/users", usersRouter);

app.use("/books", booksRouter);

app.use("/refresh", refreshRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(globalErrorHandler);
