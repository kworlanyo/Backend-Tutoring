//* LITERAL TYPES
// They are useful if you want to narrow or limit the acceptable type for a variable
// Example 1
type Courses = "Typescript" | "CSS" | "HTML";
let course: Courses = "Typescript";
course = "HTML";

// Example 2
type Direction = "up" | "down";

function getDirectionMessage(direction: Direction): string {
  return direction === "up" ? "You are going up" : "You are going down";
}

console.log(getDirectionMessage("up"));
console.log(getDirectionMessage("down"));

// Example 3
type TrafficLightColor = "Red" | "Yellow" | "Green";

function getTrafficLightAction(color: TrafficLightColor): string {
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

//* MORE ABOUT INTERFACES
// Some people prefer using interfaces more than type aliases, others prefers type aliases more than interfaces.
// We can copy properties from one interface to another interface by using the "extends" keyword.

// type Student = {
//   name: string;
//   age: number
// }

// type Grade = {
//   grade: number
// }

// const student1: Student & Grade = {
//   name: "Jane",
//   age: 19,
//   grade: 89
// }

// Example 1
interface Student {
  name: string;
  age: number;
}

interface Grade extends Student {
  grade: number;
}

const student1: Grade = {
  name: "Jane",
  age: 19,
  grade: 89,
};

console.log(student1);

// Example 2
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
}

const myDog: Dog = {
  name: "Buddy",
  age: 4,
  breed: "Golden Retriever",
};

console.log(`My dog's name is ${myDog.name}, he is ${myDog.age} years old, and his breed is ${myDog.breed}`);

interface Cat extends Animal {
  breed: string;
  color: string;
}

const myCat: Cat = {
  name: "Micky",
  age: 5,
  breed: "Silver Lining",
  color: "grey",
};
console.log(
  `My cat's name is ${myCat.name}, he is ${myCat.age} years old, and his breed is ${myCat.breed}. The color is ${myCat.color}`
);

// Example 3
interface Person {
  name: string;
  age: number;
  address: string;
}

interface Employee extends Person {
  employeeId: number;
  department: string;
  jobTitle: string;
}

interface Manager extends Employee {
  subordinates: Employee[];
}

const manager: Manager = {
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
