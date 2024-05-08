import mongoose from "mongoose";

async function connect() {
  try {
    // connection to database
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");
  } catch (error) {
    // log error if there is a problem with connection
    console.log("There is an error " + error);
  }
}

export default connect;
