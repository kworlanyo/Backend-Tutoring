"use strict";
let course = "Typescript";
course = "HTML";
function getDirectionMessage(direction) {
    return direction === "up" ? "You are going up" : "You are going down";
}
console.log(getDirectionMessage("up"));
console.log(getDirectionMessage("down"));
function getTrafficLightAction(color) {
    switch (color) {
        case "Red":
            return "Stop";
        case "Yellow":
            return "Caution";
        case "Green":
            return "Go";
        default:
            return "Invalid Color";
    }
}
console.log(getTrafficLightAction("Red"));
console.log(getTrafficLightAction("Green"));
const student1 = {
    name: "Jane",
    age: 19,
    grade: 89,
};
console.log(student1);
const myDog = {
    name: "Buddy",
    age: 4,
    breed: "Golden Retriever",
};
console.log(`My dog's name is ${myDog.name}, he is ${myDog.age} years old, and his breed is ${myDog.breed}`);
const myCat = {
    name: "Micky",
    age: 5,
    breed: "Silver Lining",
    color: "grey",
};
console.log(`My cat's name is ${myCat.name}, he is ${myCat.age} years old, and his breed is ${myCat.breed}. The color is ${myCat.color}`);
const manager = {
    name: "Alice Johnson",
    age: 26,
    address: " Main-street 40, Hamburg",
    employeeId: 102,
    department: "Engineering",
    jobTitle: "Engineering Manager",
    subordinates: [
        {
            name: "Bob Smith",
            age: 21,
            address: "Street 11, Leipzig",
            employeeId: 104,
            department: "Engineering",
            jobTitle: "Software Engineer",
        },
        {
            name: "Carol White",
            age: 24,
            address: "Street 13, Berlin",
            employeeId: 109,
            department: "Engineering",
            jobTitle: "Senior Software Engineer",
        },
    ],
};
manager.subordinates.forEach((subordinate) => {
    console.log(`- ${subordinate.name}, ${subordinate.jobTitle}`);
});
