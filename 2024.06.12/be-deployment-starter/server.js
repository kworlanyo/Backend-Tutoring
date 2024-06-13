import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import albumRouter from "./routes/albumRoutes.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "frontend/dist")));

//* Store your own MongoDB connection string in .env file!
try {
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
  console.log("Database is connected! 🐱");
} catch (error) {
  console.log(error.message);
  console.log("Database connection failed... :(");
}

app.use("/", albumRouter);

app.get("*", (res, req) => {
  res.sendFile(__dirname + "frontend/dist");
});

//* Global Error Handling
app.use(globalErrorHandler);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
