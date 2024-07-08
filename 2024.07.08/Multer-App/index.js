import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import itemRouter from "./routes/itemRoutes.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import path from "path";
import { fileURLToPath } from "url";

// Connect to database
try {
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
  console.log("Database is connected");
} catch (error) {
  console.log("Error connecting to database", error);
}

const app = express();

app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Since we are uploading the images in the backend, we need to serve the uploads folder.
// This is important whether the app is deployed or not.
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// We need this code when we deploy the app.
app.use(express.static(path.join(__dirname, "frontend/dist")));

app.use("/item", itemRouter);

// We need this code as well when we deploy the app.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
});

const port = process.env.PORT || 5006;
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use(globalErrorHandler);
