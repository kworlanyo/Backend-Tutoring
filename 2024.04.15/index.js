import express from "express";
import fs from "fs";
const app = express();

// This is needed to parse the data coming from the user so that the server can read the data in the request body
app.use(express.urlencoded({ extended: true }));

app.get("/users", (req, res) => {
  const users = fs.readFileSync("./users.txt", "utf8");
  res.send(users);
});

app.post("/users", (req, res) => {
  // You can also destructure the properties in the body object.
  const { name, age, city } = req.body;
  const date = new Date().toISOString().slice(0, 10);
  const time = new Date().toLocaleTimeString().slice(0, 5);

  // appendFileSync takes two parameters: the first parameter is the file the data will be sent to, and the second parameter is the data that will be sent.
  fs.appendFileSync(
    "./users.txt",
    `Name - ${name}\nAge - ${age}\nCity - ${city}\nUser added on ${date} at ${time}\n\n`
  );

  res.send("User has been added\n");
});

app.listen(4000, () => {
  console.log(`Server is running at http://localhost:4000`);
});
