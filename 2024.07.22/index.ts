//* UTILITY TYPES
// "OMIT" Utility Type
type User = {
  id: string;
  username: string;
  email: string;
  password: string;
};

// Omit takes two arguments: the first is the type you want to copy and the second is the property you want omit after copying.
type UserWithoutPassword = Omit<User, "password" | "email">;

const user1: UserWithoutPassword = {
  id: "1",
  username: "Jack",
  // email: "jack@email.com"
};
// console.log(user1);

// "PARTIAL" Utility Type
// Partial takes one argument ie the type that is being copied. It makes all the properties optional in the new type that is created.
type UserOptional = Partial<User>;

const user2: UserOptional = {
  id: "2",
  username: "Max",
  email: "max@gmail.com",
};
// console.log(user2);

// "PICK" Utility Type
// Pick takes two arguments: the first is the type you want to copy and the second is the property or properties you want you wan to copy.
type UserWithEmailAndPassword = Pick<User, "email" | "password">;

const user3: UserWithEmailAndPassword = {
  email: "robby@gmail.com",
  password: "1234",
};
// console.log(user3);

//* TYPE GENERICS
// They allow the creation of flexible and reusable components(functions, type, classes, interfaces etc) that can work with any data type.
// Using Type Generics with a function
// Example 1
function getRandom<Type>(arr: Type[]): Type {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const randomItem = arr[randomIndex];
  return randomItem;
}

const fruits = ["orange", "pawpaw", "pineapple"];
const numbers = [202, 401, 362, 473];
const booleans = [true, false, false, true];

const randomFruit = getRandom<string>(fruits);
const randomNumber = getRandom<number>(numbers);
const randomBoolean = getRandom<boolean>(booleans);
// console.log(randomFruit);
// console.log(randomNumber);
// console.log(randomBoolean);

// Example 2
function concatenate<P>(arr1: P[], arr2: P[]): P[] {
  return [...arr1, ...arr2];
}

const letters = ["a", "b", "c"];
const moreLetters = ["d", "e", "f"];
const allLetters = concatenate<string>(letters, moreLetters);
// const allLetters = concatenate(letters, moreLetters)
// console.log(allLetters);

const oddNumbers = [1, 3, 5];
const evenNumbers = [2, 4, 6];
const allNumbers = concatenate<number>(oddNumbers, evenNumbers);
// const allNumbers = concatenate(oddNumbers, evenNumbers)
// console.log(allNumbers);

// Example 3
function mergeObjects<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
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
// console.log(userDetails);

// Using Type Generics with Type Aliases
type ApiResponse<U, N> = {
  data: U;
  error?: string;
  statusCode: N;
};

type ResponseObj = {
  dataObj: {};
  headers: {
    "Content-Type": string;
  };
};

const successResponse: ApiResponse<ResponseObj, number> = {
  data: {
    dataObj: {},
    headers: {
      "Content-Type": "application/json",
    },
  },
  statusCode: 200,
};

const errorResponse: ApiResponse<null, number> = {
  data: null,
  error: "Server error",
  statusCode: 500,
};
console.log(successResponse);
console.log(errorResponse);
