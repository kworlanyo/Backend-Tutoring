//* TYPE ANNOTATION
//* More information about types can be found here:
// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html

//* There are two ways to declare types:
// EXPLICIT & IMPLICIT

//? EXPLICIT
// Explicit type assignment are easier to read and more intentional.

//* Strings
let firstName: string = "Maxwell";
firstName = "true";
firstName = "Worlanyo";
console.log(firstName);

//* Numbers
let age: number = 12;
age = 9;
console.log(age);

//* Boolean
let isLoggedIn: boolean = false;
isLoggedIn = true;

//* Null
let isNull: null = null;

//* Undefined
let isUndefined: undefined = undefined;

//? IMPLICIT
let school = "DCI";
// school = 10 //!This will give an error because, typescript has implicitly applied a string type to the school variable

//* OTHER TYPES
//* Any
// We have the "any" keyword to say that the type can be any value
// You have to however be careful using "any" keyword, because if you use it, then you don't need typescript.
let variable: any = "mango";
variable = true;
variable = 9;

//* Tuples
// Tuple can contain two or more values of different data types.
// A tuple is a typed array with a pre-defined length and types for each index.
// Tuples are great because they allow each element in the array to be a known type of value.
let tuple: [string, number, boolean, string, string] = ["hello", 5, true, "world", "name"];

//* Unions
// Union types are used when a value can be more than a single type. Such as when a property would be string or number.
let color: string | number = "red";
color = 123456;
console.log(color);

//* Arrays
const arrayOfNumbers: number[] = [1, 2, 3, 4, 5];
const arrayOfStrings: string[] = ["John", "Jane", "Jim"];
arrayOfStrings.push("Jamie");
// arrayOfStrings.push(4); //! This will not work because you have array of strings
console.log(arrayOfStrings);

//* Objects
const person: {
  name: string;
  age: number;
  isMarried: boolean;
} = {
  name: "John",
  age: 21,
  isMarried: true,
};

//* Using the optional "?" sign in an object
// This means that the property can have a value or not.
const car: {
  brand: string;
  year?: number;
  price: number;
} = {
  brand: "Toyota",
  price: 15000,
};

car.price = 20000;
car.year = 2002;

console.log(car);
