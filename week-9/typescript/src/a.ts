/* let x: number = 1;
console.log(x); */

function greet(firstName: string) {
  console.log("Hey there " + firstName);
}

greet("Ankit");

// type inference -> a: number ; b: number => return will also a number
function sum(a: number, b: number): number {
  return a + b;
}

const value = sum(1, 2);
console.log(value);

// type return type
function isLegalAge(age: number): boolean {
  if (age > 18) {
    return true;
  } else {
    return false;
  }
}

let x = isLegalAge(19);
console.log(x);

// assigning type to function
function runAfter1second(fn: () => void) {
  setTimeout(fn, 1000);
}

runAfter1second(function () {
  console.log("Hello");
});

// typescript doesn't run, it always gets compiled to a js file which runs.
// it adds typesafety to javascript

interface User {
  firstName: string;
  lastName: string;
  age: number;
  email?: string; // optional
}

function isLegalUser(user: User) {
  if (user.age > 18) {
    return true;
  } else {
    return false;
  }
}

let legalUser = isLegalUser({
  firstName: "Ankit",
  lastName: "Mohanty",
  age: 23,
});

interface Person {
  name: string;
  age: number;
  greet(phrase: string): void;
}

class Employee implements Person {
  name: string;
  age: number;

  constructor(n: string, a: number) {
    this.name = n;
    this.age = a;
  }

  greet(phrase: string) {
    console.log(`${phrase} ${this.name}`);
  }
}

const e = new Employee("Ankit", 23);
e.greet("Hey There");

// You can use interfaces to implement classes from
// You can use interfaces to aggregate data

type UserType = {
  firstName: string;
  lastName: string;
  age: number;
};

// types don't let us implement classes. let us aggregate data. Let us do a few extra things.

// 1. Unions -- can't be done with interfaces
type greetArg = number | string;

function greetType(id: greetArg) {
  console.log(id);
}

// 2. Intersections
type EmployeeType = {
  name: string;
  startDate: Date;
};

type ManagerType = {
  name: string;
  department: string;
};

type TechLead = EmployeeType & ManagerType;

const teamLead: TechLead = {
  name: "Ankit",
  startDate: new Date(),
  department: "Software developer",
};

// zod runtime type check, ts compile time type check
// tsc -b --> compile
// npm init -y --> package.json
// npx tsc --init --> tsconfig.json
// high level benefit of typescript. It lets you catch type errors at compile time

// Arrays in TS -- it’s as simple as adding a [] annotation next to the type

type NumberArray = number[]; // can't do using interfaces.

function maxValue(arr: number[]): number {
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

console.log(maxValue([1, 2, 3]));

/*

interface User {
  firstName: string;
  lastName: string;
  age: number;
}

function filteredUsers(users: User[]) {
  return users.filter((user) => user.age > 18);
}

console.log(
  filteredUsers([
    {
      firstName: "harkirat",
      lastName: "Singh",
      age: 21,
    },
    {
      firstName: "Raman",
      lastName: "Singh",
      age: 16,
    },
  ])
);

// If someone extends User which has age in common and name types are different, we can do like this.

interface User {
  age: number;
}

interface Manager extends User {
  name: number;
}

interface Employee extends User {
  name: string;
}

Use interfaces until you can't use interfaces => where | or & is involved which can only be done using types.

*/

/* 

  function cbVar(cb1: () => void, cb2: (str: string) => number) : string {
    cb1();
    cb2("2");
    return "1";
  }

  function cbVar(cb1: (str: string, num: number) => string) : string {
    const x = cb2("2",2);
    return "1";
  }

  interface Manager {
    name: string;
  }

  type TechLead = {
    time: Date;
  }

  type Both = Manager & TechLead; --> correct
  interface Both = Manager & TechLead; --> incorrect
  // we can do | or & with both interfaces and types, but the assigning thing can't be an interface it has to be a type.

  types and interfaces let us aggregate data.
  interfaces -> can be implemented by classes.
  types -> let us do unions and intersections.

  implements -> implement the entire thing defined where as extends -> have all things defined with some extra properties.

  sites to look out -> totaltypescript.com
*/

// Enums
// Enums (short for enumerations) in TypeScript are a feature that allows you to define a set of named constants.
// The concept behind an enumeration is to create a human-readable way to represent a set of constant values, which might otherwise be represented as numbers or strings.

/*
type KeyInput = "Up" | "Down" | "Left" | "Right";

function doSomethingType(keyPressed: KeyInput) {
  // some operations
}

// Instead of using types, for named constants we can use Enums. When we know there are only a limited number of values that are possible.

// Enums can only be used in ts files, not js specific. Under the hood ts converts the values into 0,1,2,3 like these.

enum Direction {
  Up, // 0
  Down, // 1
  Left, // 2
  Right, // 3
}

function doSomethingEnum(keyPressed: Direction) {
  // do something.
}

doSomethingEnum(Direction.Up);
// This makes code slightly cleaner to read out.
// The final value stored at runtime is still a number (0, 1, 2, 3).

enum Direction {
    Up = 1,
    Down, // becomes 2 by default
    Left, // becomes 3
    Right // becomes 4
} --> can change the values like this.

enum Direction {
    Up = "UP",
    Down = "Down",
    Left = "Left",
    Right = 'Right'
} --> can also be strings


// Common usecase in express

enum ResponseStatus {
    Success = 200,
    NotFound = 404,
    Error = 500
}

app.get("/', (req, res) => {
    if (!req.query.userId) {
			res.status(ResponseStatus.Error).json({})
    }
    // and so on...
		res.status(ResponseStatus.Success).json({});
})
*/

// Generics
// Generics are a language independent concept (exist in C++ as well)
/* 

  Let’s say you have a function that needs to return the first element of an array. Array can be of type either string or integer.

  type Input = number | string;
  function getFirstElement(arr: (string | number)[]) { // arr : Input[]
    return arr[0];
  }

  const el = getFirstElement([1, 2, 3]);

  What is the problem in this approach?
  -> User can send different types of values in inputs, without any type errors

  function getFirstElement(arr: (string | number)[]) {
    return arr[0];
  }

  const el = getFirstElement([1, 2, '3']);


  -> Typescript isn’t able to infer the right type of the return type

  const el = getFirstElement(["harkiratSingh", "ramanSingh"]);
  console.log(el.toLowerCase()) // won't work in case of numbers.

  Solution :- Generics enable you to create components that work with any data type while still providing compile-time type safety.

  function identity<T>(arg: T): T {
    return arg;
  }

  let output1 = identity<string>("myString"); // T set to string here
  let output2 = identity<number>(100); // T set to number here

  // during the definition we don't know the type, it can change while calling it. It has a generic type. that's what T represents.

  function getFirstElement<T>(arr: T[]) : T {
    return arr[0];
  }

  const el = getFirstElement<string>(["harkiratSingh", 2]); // can't send number
  console.log(el.toLowerCase())

  const el = getFirstElement<string>(["harkiratSingh", "ramanSingh"]); // even if you don't give <string> TS will infer. we can even give complex types / interfaces as well
  console.log(el.toLowerCase())

  > TypeScript follows the ES6 module system, using import and export statements to share code between different files.

  1. Constant Exports
  -------------------------------------------
  export function add(x: number, y: number): number {
    return x + y;
  }

  export function subtract(x: number, y: number): number {
      return x - y;
  }

  import { add } from "./math"

  add(1, 2)
  -------------------------------------------

  2. Default Exports
  export default class Calculator {
    add(x: number, y: number): number {
        return x + y;
    }
  }

  import Calculator from './Calculator';

  const calc = new Calculator();
  console.log(calc.add(10, 5));

*/
