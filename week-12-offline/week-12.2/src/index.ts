interface User {
  name: string;
  age: number;
}

function sumOfAge(user1: User, user2: User) {
  return user1.age + user2.age;
}

const age = sumOfAge(
  {
    name: "Tara",
    age: 22,
  },
  { name: "Jara", age: 30 }
);

console.log(age);

/*

Pick allows you to create a new type by selecting a set of properties (Keys) from an existing type (Type) / interface (Interface).
Imagine you have a User model with several properties, but for a user profile display, you only need a subset of these properties.

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

// For a profile display, only pick `name` and `email`
type UserProfile = Pick<User, 'name' | 'email'>;

const displayUserProfile = (user: UserProfile) => {
  console.log(`Name: ${user.name}, Email: ${user.email}`);
};

*/

/* 

Partial makes all properties of a type/interface optional, creating a type/interface with the same properties, but each marked as optional.

Specifically useful when you want to do updates

interface User {
    id: string;
    name: string;
    age: string;
    email: string;
    password: string;
};

type UpdateProps = Pick<User, 'name' | 'age' | 'email'>

type UpdatePropsOptional = Partial<UpdateProps>

function updateUser(updatedProps: UpdatePropsOptional) {
    // hit the database to update the user
}

updateUser({})

*/

/* 

When you have a configuration object that should not be altered after initialization, making it Readonly ensures its properties cannot be changed.

interface Config {
  readonly endpoint: string;
  readonly apiKey: string;
}

const config: Readonly<Config> = {
  endpoint: 'https://api.example.com',
  apiKey: 'abcdef123456',
};

// either of the ways we can make it readonly. either ->

readonly endpoint: ---;
readonly apiKey: ---;

or

Readonly<Config> -> make the entire object readonly

// config.apiKey = 'newkey'; // Error: Cannot assign to 'apiKey' because it is a read-only property.


This is compile time checking, not runtime (unlike const)

with const we can't change the reference of a constant array (re-assigning new values), we can push, pop and change values of its contents though. 

const a = [1,2,3];
a[2] = 6; // won't throw an error
a = [2,3,4]; // throws an error

*/

/* 

-> Record let’s you give a cleaner type to objects
You can type objects like follows - 

interface User {
  id: string;
  name: string;
}

type Users = { [key: string]: User };

const users: Users = {
  'abc123': { id: 'abc123', name: 'John Doe' },
  'xyz789': { id: 'xyz789', name: 'Jane Doe' },
};

-> or use Record - 

interface User {
  id: string;
  name: string;
}

type Users = Record<string, User>;

const users: Users = {
  'abc123': { id: 'abc123', name: 'John Doe' },
  'xyz789': { id: 'xyz789', name: 'Jane Doe' },
};

console.log(users['abc123']); // Output: { id: 'abc123', name: 'John Doe' }

-> maps gives you an even fancier way to deal with objects. Very similar to Maps in C++.

interface User {
  id: string;
  name: string;
}

// Initialize an empty Map
const usersMap = new Map<string, User>();

// Add users to the map using .set
usersMap.set('abc123', { id: 'abc123', name: 'John Doe' });
usersMap.set('xyz789', { id: 'xyz789', name: 'Jane Doe' });

// Accessing a value using .get
console.log(usersMap.get('abc123')); // Output: { id: 'abc123', name: 'John Doe' }

*/

/* 

Exclude -
In a function that can accept several types of inputs but you want to exclude specific types from being passed to it.

type EventType = 'click' | 'scroll' | 'mousemove';
type ExcludeEvent = Exclude<EventType, 'scroll'>; // 'click' | 'mousemove'

const handleEvent = (event: ExcludeEvent) => {
  console.log(`Handling event: ${event}`);
};

handleEvent('click'); // OK

*/

/* 

Type inference in zod
When using zod, we’ve done runtime validation.

For example, the following code makes sure that the user is sending the right inputs to update their profile information

--- 

import { z } from 'zod';
import express from "express";

const app = express();

// Define the schema for profile update
const userProfileSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  email: z.string().email({ message: "Invalid email format" }),
  age: z.number().min(18, { message: "You must be at least 18 years old" }).optional(),
});

type FinalUserSchema = z.infer<typeof userProfileSchema>;

app.put("/user", (req, res) => {
  const { success } = userProfileSchema.safeParse(req.body);
  const updateBody: FinalUserSchema = req.body; // how to assign a type to updateBody?

  if (!success) {
    res.status(411).json({});
    return
  }
  // update database here
  res.json({
    message: "User updated"
  })
});

app.listen(3000);


one way to give type:

const updateBody: {
    name: string;
    email: string;
    age?: number;
}

Type Inference:

const A = z.string(); // run time variable
type A = z.infer<typeof A>; // string - compile time variable

const u:A = 12; // TypeError
const u:A = "akdf"; // Compiles

const userProfileSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  email: z.string().email({ message: "Invalid email format" }),
  age: z.number().min(18, { message: "You must be at least 18 years old" }).optional(),
});

export type FinalUserSchema = z.infer<typeof userProfileSchema>;

So whenever we make any changes to the zod schema it automatically updates in the TS infer type.

More details - https://zod.dev/?id=type-inference


zod library we use in the backend. so type FinalUserSchema is not really important in the backend, but it is important when we import it and check it in the frontend.

*/
