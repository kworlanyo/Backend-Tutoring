import connect from "./libs/database.js";
import User from "./models/User.js";

try {
  console.log("Attempting to seed db...");
  
  // Connect to "books-app" db
  await connect();

  // Delete existing documents
  await User.deleteMany({});

  const mockUsers = [
    { username: "adam_ant", password: "Th3Ant5", books: [{title: "The Waves", author: "Virginia Woolf"}]},
    { username: "ozzy_osborne", password: "1r0nMa1d3n", books: [{title: "Dubliners", author: "James Joyce"}]},
    { username: "siouxie_sioux", password: "The3Ban5h335", books: [{title: "Wide Sargasso Sea", author: "Jean Rhys"}]}
  ]

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