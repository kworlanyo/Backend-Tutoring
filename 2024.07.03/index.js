"use strict";
//* UNIONS
let year = 1999;
year = "1999";
console.log(year);
//? tuple
let array = ["string", 1, "2"];
//? Using unions in an array
let array3 = ["John", "Max"];
let array2 = [1, 2, 3, 4, "string", 5];
array2.push("John");
array2.push(10);
console.log(array2);
//* CUSTOM TYPES
// This is an object and it is different from a custom type declaration.
const animal = {
    name: "Bird",
    color: "orange",
};
let string = "Jane";
let anotherVariable = "Max";
let array4 = [1, 2, 3, 4, 5, 56];
const person1 = {
    name: "Jack",
    age: 20,
};
const person2 = {
    name: "Paul",
    age: 25,
};
const product = {
    productName: "Headset",
    color: "blue",
    features: ["wifi"],
    price: 20,
};
const product2 = {
    productName: "Ipad",
    color: "Red",
    features: ["wifi", "bluetooth"],
    price: 30,
};
//* FUNCTIONS
//? Function that returns a value
// Example 1
function getRandomNumber() {
    const random = Math.floor(Math.random() * 10);
    return random;
}
console.log(getRandomNumber());
// Example 2
function getArrayOfNumbers() {
    const array = ["Word"];
    for (let i = 0; i < 5; i++) {
        let num = Math.floor(Math.random() * 10);
        array.push(num);
    }
    return array;
}
console.log(getArrayOfNumbers());
//? Function that returns nothing
function returnNoValue() {
    console.log("There is no value");
}
returnNoValue();
//? Function with parameters
// Example 1
function joinNames(str1, str2, str3) {
    return `${str1} ${str2}`;
}
console.log(joinNames("John", "Peter"));
// Example 2
function total(numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}
console.log(total([1, 2, 3, 4, 5]));
// Example 3
function greet(firstname, middleName, lastName) {
    let greeting = `Hello, ${firstname}`;
    if (middleName) {
        greeting += ` ${middleName}`;
    }
    if (lastName) {
        greeting += ` ${lastName}`;
    }
    return greeting;
}
console.log(greet("Anna"));
console.log(greet("Anna", "Doe"));
console.log(greet("Anna", "Doe", "Smith"));
