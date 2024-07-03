//* UNIONS
let year: string | number = 1999;
year = "1999";
console.log(year);

//? tuple
let array: [string, number, string] = ["string", 1, "2"];

//? Using unions in an array
let array3: string[] = ["John", "Max"];
let array2: (string | number)[] = [1, 2, 3, 4, "string", 5];
array2.push("John");
array2.push(10);
console.log(array2);

//* CUSTOM TYPES
// This is an object and it is different from a custom type declaration.
const animal: {
  name: string;
  color: string;
} = {
  name: "Bird",
  color: "orange",
};

//? CUSTOM TYPE FOR STRING
type name = string;
let string: name = "Jane";
let anotherVariable: name = "Max";

//? CUSTOM TYPE FOR ARRAY OF NUMBERS
type WorlaArray = number[];
let array4: WorlaArray = [1, 2, 3, 4, 5, 56];

//? CUSTOM TYPE FOR OBJECT
type student = {
  name: string;
  age: number;
};

const person1: student = {
  name: "Jack",
  age: 20,
};

const person2: student = {
  name: "Paul",
  age: 25,
};

//* INTERFACES
// They are ONLY used for objects
// They don't have ane equal sign when declaring them

interface Props {
  productName: string;
  color: string;
  features: string[];
  price: number;
}

const product: Props = {
  productName: "Headset",
  color: "blue",
  features: ["wifi"],
  price: 20,
};

const product2: Props = {
  productName: "Ipad",
  color: "Red",
  features: ["wifi", "bluetooth"],
  price: 30,
};

//* FUNCTIONS
//? Function that returns a value
// Example 1
function getRandomNumber(): number {
  const random = Math.floor(Math.random() * 10);
  return random;
}
console.log(getRandomNumber());

// Example 2
function getArrayOfNumbers(): (string | number)[] {
  const array: (string | number)[] = ["Word"];
  for (let i = 0; i < 5; i++) {
    let num = Math.floor(Math.random() * 10);
    array.push(num);
  }
  return array;
}
console.log(getArrayOfNumbers());

//? Function that returns nothing
function returnNoValue(): void {
  console.log("There is no value");
}
returnNoValue();

//? Function with parameters
// Example 1
function joinNames(str1: string, str2: string, str3?: string): string {
  return `${str1} ${str2}`;
}
console.log(joinNames("John", "Peter"));

// Example 2
function total(numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}
console.log(total([1, 2, 3, 4, 5]));

// Example 3
function greet(firstname: string, middleName?: string, lastName?: string): string {
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
