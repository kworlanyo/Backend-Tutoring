"use strict";
const user1 = {
    id: "1",
    username: "Jack",
    // email: "jack@email.com"
};
const user2 = {
    id: "2",
    username: "Max",
    email: "max@gmail.com",
};
const user3 = {
    email: "robby@gmail.com",
    password: "1234",
};
// console.log(user3);
//* TYPE GENERICS
// They allow the creation of flexible and reusable components(functions, type, classes, interfaces etc) that can work with any data type.
// Using Type Generics with a function
// Example 1
function getRandom(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const randomItem = arr[randomIndex];
    return randomItem;
}
const fruits = ["orange", "pawpaw", "pineapple"];
const numbers = [202, 401, 362, 473];
const booleans = [true, false, false, true];
const randomFruit = getRandom(fruits);
const randomNumber = getRandom(numbers);
const randomBoolean = getRandom(booleans);
// console.log(randomFruit);
// console.log(randomNumber);
// console.log(randomBoolean);
// Example 2
function concatenate(arr1, arr2) {
    return [...arr1, ...arr2];
}
const letters = ["a", "b", "c"];
const moreLetters = ["d", "e", "f"];
const allLetters = concatenate(letters, moreLetters);
// const allLetters = concatenate(letters, moreLetters)
// console.log(allLetters);
const oddNumbers = [1, 3, 5];
const evenNumbers = [2, 4, 6];
const allNumbers = concatenate(oddNumbers, evenNumbers);
// const allNumbers = concatenate(oddNumbers, evenNumbers)
// console.log(allNumbers);
// Example 3
function mergeObjects(obj1, obj2) {
    return Object.assign(Object.assign({}, obj1), obj2);
}
const user = {
    name: "John",
    age: 20,
};
const address = {
    city: "Berlin",
    country: "Germany",
};
const userDetails = mergeObjects(user, address);
const successResponse = {
    data: {
        dataObj: {},
        headers: {
            "Content-Type": "application/json",
        },
    },
    statusCode: 200,
};
const errorResponse = {
    data: null,
    error: "Server error",
    statusCode: 500,
};
console.log(successResponse);
console.log(errorResponse);
