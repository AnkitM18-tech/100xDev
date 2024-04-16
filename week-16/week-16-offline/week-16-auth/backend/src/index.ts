import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt, { JwtPayload } from "jsonwebtoken";
import path from "path";

const JWT_SECRET = "test123";

const app = express();
app.use(cookieParser()); // parse a very long cookie string and gets you an object - cookie string consists of a bunch of tokens separated by ';'
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
); // since our frontend is in react and backend in express, we need to give credentials and origin in order to set cookies and use credentials from that website cross-origin. if we are serving the FE from express, then we can remove the credentials and origin arguments.If FE and BE are hosted on the same place endpoint/(origin) like NextJs, it is not needed.

app.post("/signin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // do db validations, fetch id of user from db
  const token = jwt.sign(
    {
      id: 1,
    },
    JWT_SECRET
  );
  res.cookie("token", token); // will put the cookie in the set-cookie header
  res.send("Logged in!");
});

app.get("/user", (req, res) => {
  const token = req.cookies.token; // it is possible due to cookie-parser middleware, else we have to fetch it from headers -> req.headers("Cookie") and then parse it to get the token.
  console.log(token);
  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
  // Get email of the user from the database
  res.send({
    userId: decoded.id,
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "");
  //   res.clearCookie("token"); // remove the cookie header by setting it to = "".
  res.json({
    message: "Logged out!",
  });
});

// FE getting served from express server
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

app.listen(3000);
