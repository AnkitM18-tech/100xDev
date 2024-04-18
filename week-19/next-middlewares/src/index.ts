import express from "express";
import jwt from "jsonwebtoken";

const app = express();

/*
// Analytics

let requestCount = 0;

app.use(function middleware(req, res, next) {
  if (req.url !== "/favicon.ico") {
    requestCount++;
  }
  next();
});
// midleware is being called twice once for the handler and other one for the favicon.ico request which is being sent by default by the browser. So it is increasing by 2.

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/requestCount", (req, res) => {
  res.json({
    requestCount,
  });
});

*/

/*
// Authentication

//@ts-ignore
async function authMiddleware(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "secret");
  if (decoded) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}

app.get("/", authMiddleware, (req, res) => {
  res.send("You are logged in");
});

*/

app.listen(3000);
