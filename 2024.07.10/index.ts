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

function performCalculation(callback: (a: number, b: number) => number, a: number, b: number): number {
  return callback(a, b);
}

function add(a: number, b: number): number {
  return a + b;
}

console.log(performCalculation(add, 1, 2));

//* Object Methods
const person: {
  firstName: string;
  lastName: string;
  age: (birthYear: number, currentYear: number) => string;
} = {
  firstName: "Jack",
  lastName: "Wilson",
  age: function (birthYear, currentYear): string {
    return `My name is ${this.firstName} ${this.lastName} and I am ${currentYear - birthYear} years old.`;
  },
};

console.log(person.age(1980, 2024));

//* Intersection Types
// Intersection types in TypeScript are used to combine multiple types into one.
// They allow you to create a new type that has all properties of the intersected types.

// Example
type Employee = {
  id: number;
  name: string;
  role: string;
};

type Contact = {
  email: string;
  phone: string;
};

type Method = {
  printEmployee: () => string;
};

type EmployeeWithContact = Employee & Contact & Method;

const employee1: EmployeeWithContact = {
  id: 1,
  email: "alice@gmail.com",
  name: "Alice",
  role: "Engineer",
  phone: "123-456-789",
  printEmployee: function (): string {
    return `${this.name} (${this.role}): ${this.email}, ${this.phone}`;
  },
};

const employee2: Employee & Method = {
  id: 2,
  name: "Joseph",
  role: "Developer",
  printEmployee: function (): string {
    return `${this.name} (${this.role}): No contact`;
  },
};

console.log(employee1.printEmployee());
console.log(employee2.printEmployee());
