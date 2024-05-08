import express from "express";
import connect from "./lib/database.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import accountRouter from "./routes/accountRoute.js";

// we don't need await here this time because we await in the database.js
connect();

const app = express();

app.use(express.json());

app.use("/accounts", accountRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server is running on port " + port));

app.use(globalErrorHandler);
