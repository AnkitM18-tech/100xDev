const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword = "123456";

mongoose.connect(
  "mongodb+srv://<admin>:<password>@cluster0.vqxaw5t.mongodb.net/users_app"
);

const User = mongoose.model("Users", {
  name: String,
  email: String,
  password: String,
});

const app = express();
app.use(express.json());

/*
const ALL_USERS = [
  {
    username: "harry@gmail.com",
    password: "123",
    name: "Harry",
  },
  {
    username: "parry@gmail.com",
    password: "123456",
    name: "Parry",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Rammy",
  },
];

ALL_USERS.forEach((userObj) => {
  let user = new User({
    username: userObj.username,
    password: userObj.password,
    name: userObj.name,
  });
  user.save();
});
*/

async function userExists(username, password) {
  /*
  let doesUserExist = false;
  //   const usernameToBeChecked = username;
  //   const passwordToBeChecked = password;

  for (let i = 0; i < ALL_USERS.length; i++) {
    if (
      ALL_USERS[i].username === username &&
      ALL_USERS[i].password === password
    ) {
      doesUserExist = true;
      break;
    }
  }
  return doesUserExist;
  */
  /*
  if (
    ALL_USERS.find((user) => {
      return (
        user.username === usernameToBeChecked &&
        user.password === passwordToBeChecked
      );
    }) !== undefined
  ) {
    doesUserExist = true;
  }
  return doesUserExist;
  */

  const existingUser = await User.findOne({
    email: username,
    password: password,
  });

  return existingUser;
}

app.post("/signup", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;

  const existingUser = await User.findOne({ email: username });

  if (existingUser) {
    return res.status(400).send("Username already exists");
  }

  // await User.create({ name: name ,email: username, password: password });

  const user = new User({
    name: name,
    email: username,
    password: password,
  });
  user.save();
  res.status(200).json({ msg: "User created successfully" });
});

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User does not exist in our in memory DB",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({ token });
});

app.get("/users", async function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    // return a list of users other than the username
    const usersList = await User.find({});
    res.json({
      users: usersList.filter((user) => user.email !== username),
    });
  } catch (error) {
    return res.status(403).json({
      msg: "Invalid Token",
    });
  }
});

app.listen(3000);

/* 
    JWT to create tokens
    User gets back a token after the signin request
    User sends back the tokens in all authenticated requests
*/

/* 
    User hits the Backend
    Backend hits the DB
    User doesn't have access to the DB/ can't talk to the DB

    Browser ---> Backend ---> Database

    Various Types of Databases
    1. Graph DBs -- 2. Vector DBs -- 3. SQL DBs -- 4. NoSQL DBs

    MongoDB --> NoSQL -- Let's you create databases. In each database it lets you create tables (collections). In each table it lets you dump JSON data. It is schemaless. It scales well and is a decent choice for most usecases.

    Backend connects to Database
    1. express library -- lets us create an HTTP server.
    2. jsonwebtoken library -- lets us create jwts. -- authentication
    3. mongoose library -- lets us connect to MongoDB database.

    Why not store data in a file rather than DB -->
    1. We don't have a standard way to store data
    2. Hard to distribute
    3. DBs are optimised for reads and writes
    4. DBs have logic for indexing to make some queries faster

    we can store the jwt token in --> 
    1. cookies -- much secure -- harder to pull it out from the browser
    2. localStorage => explicitly send this back as a bearer header in every request
    ex : fetch(".....", {
        headers: { 
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })

    jwt.sign({
        "name": "jwt",
        "expiresAt" : new Date() + 3600,
    })

*/
