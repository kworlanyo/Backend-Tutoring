//? In mongodb language:
// Collection is like an array
// Documents are like objects in the array

/* 
# Task 1

Please complete the following instructions 1-4:

1. Create a new database called "dci_restaurant"
* use dci_restaurant

2. Create a collection in the new database called "customers"
* db.createCollection("<nameOfCollection>")

3. Insert a document based on the following user into the "customers" collection:
db.customers.insertOne({
  firstName: "Arnold",
  lastName: "Rimmer",
  address: {
    houseNum: 1,
    street: "Hauptstr.",
    city: "Leipzig",
  },
  age: 31,
  phone: "03411234567",
})

Arnold Rimmer lives at 1 Hauptstr. Leipzig. He is 31 years old, and his phone number is 0341 1234567

Note: You do not have to use a schema in MongoDB, but to make sure everyone is working with the same document, please use the following properties and data types when creating your document:

firstName should be a string
lastName (string)
address (object containing fields for houseNum, street and city - all strings)
age (number)
phone (string)

4. Find Arnold Rimmer in the "customers" collection
* db.customers.find()
*/

/* 
# Task 2

1. Insert the following five documents into your "customers" collection using a single MongoDB query. 

db.customers.insertMany([{}, {}, {}, {}])

db.customers.insertMany([
  {
    firstName: "Kris",
    lastName: "Kochanski",
    address: {
      houseNum: 23,
      street: "Bahnstr.",
      city: "Berlin",
    },
    age: 25,
    phone: "0309876543",
  },
  {
    firstName: "David",
    lastName: "Lister",
    address: {
      houseNum: 99,
      street: "Randomstr.",
      city: "Leipzig",
    },
    age: 77,
    phone: "03415555555",
  },
  {
    firstName: "Ace",
    lastName: "Rimmer",
    address: {
      houseNum: 111,
      street: "Weihnachtsstr.",
      city: "Chemnitz",
    },
    age: 18,
    phone: "03717171717",
  },
  {
    firstName: "Holly",
    address: {
      houseNum: 15,
      street: "Gartenstr.",
      city: "Dresden",
    },
    age: 31,
    phone: "03512244668",
  },
  {
    lastName: "Cat",
    age: 51,
    phone: "03417755331",
  },
]);

You do not have to use a schema in MongoDB, but to make sure everyone is working with the same structures, please use the same structure as your existing document:

Kris Kochanski lives at 23 Bahnstr. Berlin. She is 25 years old, and her phone number is 030 9876543
David Lister lives at 99 Randomstr. Leipzig. He is 77 years old, and his phone number is 0341 5555555
Ace Rimmer lives at 111 Weihnachtsstr. Chemnitz. He is 18 years old, and his phone number is 0371 7171717
Holly (first name only) lives at 15 Gartenstr. Dresden. She is 31 years old, and her phone number is 0351 2244668
Cat (last name only) has no address. He is 51 years old, and his phone number is 0341 7755331

Remember: you can write your query in VS Code and copy it into the MongoDB shell if it is easier for you to structure!

Now try to solve the following questions, using the "Read" operations we just discussed.
All results should be displayed in the MongoDB shell. :-)

2. Find all users whose last name === "Rimmer"
* db.customers.find({lastName: "Rimmer"})

3. Find all users whose last name !== "Rimmer" 
* db.customers.find({ lastName: { $ne: "Rimmer" } });

4. Find all users whose first name is "Holly" OR who are 31 years old
* db.customers.find({ $or: [{ firstName: "Holly" }, { age: 31 }] });

5. Find all users whose first name is "Holly" AND who are 31 years old
* db.customers.find({$and: [{ firstName: "Holly" }, { age: 31 }]});

6. Find all users whose last name !== "Rimmer"
* db.customers.find({ lastName: { $ne: "Rimmer" } });

7. Find the users whose city === Leipzig
* db.customers.find({ "address.city": "Leipzig" });

8. Find the users whose city !== Dresden
* db.customers.find({ "address.city": { $ne: "Dresden" } });
*/

//? DELETE
// deleteOne
// deleteMany

// Examples
//* db.customers.deleteOne();
//* db.customers.deleteMany({ "address.city": "Leipzig" });
// *db.customers.deleteMany({});

//? UPDATE
// updateOne
// updateMany

// Examples
//* db.customers.updateOne({ lastName: "Cat" }, { $set: { firstName: "Micheal", age: 52 } });
//* db.customers.updateMany({ age: { $lt: 50 } }, { $set: { isYoung: true } });
