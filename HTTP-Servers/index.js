const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();

// middlewares
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hello, world!");
});

app.post("/converse", function (req, res) {
  res.send({
    message: "Hey Sabana!",
  });
});

// try to create a http server from scratch in c, rust - actix-web, go-gorilla framework, springboot-java
// todo-app let user store todos on the server.

app.listen(port, function () {
  console.log(`App listening on port ${port}`);
});
