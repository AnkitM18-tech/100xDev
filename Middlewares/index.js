const express = require("express");
const zod = require("zod");

const app = express();

const schema = zod.array(zod.number());

/* 
  {
    email: string => email,
    password: string => password at least 8 chars
    country: "IN","US"
  }

*/
const schemaObj = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
  country: zod.literal("IN").or(zod.literal("US")), // need to extend object like this. // more on zod.dev
  // kidneys: zod.array(zod.number()),
});

// If you keep on doing this, then there will be a lot of code repeatations for diff routes

// slightly better approach - make validations separate, by wrapper functions

// best approach -- middleware - define and use it elsewhere -- defer some things to other fns to make code clean -- middleware present in between path/route and final handler. There can be multiple middlewares/functions.

/* 
  you can add any number of middlewares inside the route and express lets you to chain through middlewares via next() function.

  app.get("/health-checkup", function(req, res, next) {
    console.log("req1");
    next(); // control will go to next middleware if there are any and in the last middleware you don't need to send next().
  }, function(req, res, next) {
    console.log("req2");
  })

  // Calculate load on server
  let numOfRequests = 0;
  function calculateRequests(req, res, next) {
    numOfRequests++;
    console.log("numOfRequests: " + numOfRequests);
    next(); // without this the control will not be passed down.
  }

  app.use(express.json()); // it is going to be used everywhere, so we don't have to pass it every time to every route.

  for self defined functions we don't need to call it(). express.json() itself returns a function so that's why we call it.

*/

app.use(express.json()); // need for extraction of data from req.body

app.post("/health-checkup", function (req, res) {
  // kidneys = [1,2] we have to take care the input validation, else the end user will see some dirty logs and servers might crash due to some attacks. To prevent this we can have global catches. We can add those after the routes and it will catch if there are any exceptions.
  const kidneys = req.body.kidneys;
  const response = schema.safeParse(kidneys);
  if (!response.success) {
    res.status(411).json({
      msg: "Invalid Input",
    });
  }
  const kidneyLength = kidneys.length;

  res.send("You have " + kidneyLength + " kidneys");
});

// global catches - error handling middlewares -- takes 4 arguments.
app.use(function (err, req, res, next) {
  // we can put loggers here to check for errors or save the files somewhere else to check errors.
  res.json({
    msg: "Sorry something is messed up",
  });
});

/* 
  Input valdation is a common thing in http servers
  to help us out we have input validation libraries, one of such is zod.
*/

/*
app.get("/health-checkup", function (req, res) {
  const username = req.headers.username;
  const password = req.headers.password;
  const kidneyId = parseInt(req.query.kidneyId);

  if (username !== "admin" || password !== "admin") {
    res.status(400).json({
      msg: "User does not exist",
    });
    return;
  }

  if (kidneyId !== 1 && kidneyId !== 2) {
    res.status(400).json({
      msg: "Wrong Input",
    });
    return;
  }

  res.json({ msg: "Funk You!" });
});
*/
app.listen(3000);
