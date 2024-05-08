import connect from "./lib/database.js";
import Account from "./models/Account.js";

try {
  console.log("Attempting to seed database");

  connect();

  await Account.deleteMany({});

  await Account.insertMany([
    {
      owner: "Joao",
      amount: 20000,
    },
    {
      owner: "Tomislav",
      amount: 50000,
    },
    {
      owner: "Zhanna",
      amount: 400000,
    },
  ]);

  console.log("DB seeded");

  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
