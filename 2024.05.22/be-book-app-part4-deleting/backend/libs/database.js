import mongoose from "mongoose";

async function connect() {
  // Register connection events
  mongoose.connection.on("connected", () => console.log("DB connected"));
  mongoose.connection.on("error", (error) => console.log("DB error", error))
  
  // Connect to "books-app" db
  mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
}

export default connect;