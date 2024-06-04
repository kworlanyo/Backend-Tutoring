import connect from "./libs/database.js";
import User from "./models/User.js";
import Book from "./models/Book.js";

try {
  console.log("Attempting to seed db...");
  
  // Connect to "books-app" db
  await connect();

  // Delete existing "user" documents
  await User.deleteMany({});

  // Delete existing "book" documents
  await Book.deleteMany({});

  const mockUsers = [
    { email: "adam@booksapp.test", username: "adam_ant", password: "Th3Ant5!", books: []},
    { email: "ozzy@booksapp.test", username: "ozzy_osborne", password: "1r0nMa1d3n!", books: []},
    { email: "siouxie@booksapp.test", username: "siouxie_sioux", password: "The3Ban5h335!", books: []}
  ];

  // Insert mock data
  await User.insertMany(mockUsers);

  console.log("DB seeded!");

  // Exit process with "success" code
  process.exit(0);
} catch (error) {
  console.log(error);

  // Exit process with "failure" code
  process.exit(1);
}