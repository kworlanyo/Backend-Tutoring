import mongoose from "mongoose";

export default async function connect() {
  // Register connection events
  mongoose.connection.on("connected", () => console.log("DB Connected"));
  mongoose.connection.on("error", (error) => console.log("DB error", error));

  // Connect to "books-app" db
  const MONGO_URI = process.env.MONGO_URI;
  mongoose.connect(MONGO_URI);
}

// export default connect
