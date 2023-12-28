const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json());

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

function userExists(username, password) {
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
}

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

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    // return a list of users other than the username
    res.json({
      users: ALL_USERS.filter((user) => user.username !== username),
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

*/
