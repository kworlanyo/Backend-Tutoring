"use strict";
// Install ts-node-dev to work with nodemon for Typescript files
//* npm i -g ts-node-dev
// Install nodemon if you have not installed it globally on your machine:
//* npm i -g nodemon
// Run nodemon and the name of the ts file ===> nodemon index.ts
//* Callback and Higher Order Functions
//? Javascript
// function performCalculation(callback, a, b) {
//  return callback(a, b)
//}
function performCalculation(callback, a, b) {
    return callback(a, b);
}
function add(a, b) {
    return a + b;
}
console.log(performCalculation(add, 1, 2));
//* Object Methods
const person = {
    firstName: "Jack",
    lastName: "Wilson",
    age: function (birthYear, currentYear) {
        return `My name is ${this.firstName} ${this.lastName} and I am ${currentYear - birthYear} years old.`;
    },
};
console.log(person.age(1980, 2024));
const employee1 = {
    id: 1,
    email: "alice@gmail.com",
    name: "Alice",
    role: "Engineer",
    phone: "123-456-789",
    printEmployee: function () {
        return `${this.name} (${this.role}): ${this.email}, ${this.phone}`;
    },
};
const employee2 = {
    id: 2,
    name: "Joseph",
    role: "Developer",
    printEmployee: function () {
        return `${this.name} (${this.role}): No contact`;
    },
};
console.log(employee1.printEmployee());
console.log(employee2.printEmployee());
