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
