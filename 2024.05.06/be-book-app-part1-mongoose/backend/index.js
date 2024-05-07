import express from "express";
import cors from "cors";
import loginRouter from "./routes/login.js";
import registerRouter from "./routes/register.js";
// ! Do not do this today!
// import booksRouter from "./routes/books.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import connect from "./libs/database.js";

await connect();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/login", loginRouter);

app.use("/register", registerRouter);

// ! Do not do this today!
// app.use("/books", booksRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(globalErrorHandler);
