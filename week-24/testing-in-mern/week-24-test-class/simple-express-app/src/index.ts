import express from "express";

export const app = express();
app.use(express.json());

app.post("/sum", (req, res) => {
  const a = req.body.a;
  const b = req.body.b;
  const answer = a + b;

  res.json({
    answer,
  });
});

// we don't have app.listen(3000) -> we don't want the server to run on a port while testing, we just need it to figure out the routes and perform tests.

// so we create a bin.ts file and import app into it and listen on a port.
// so index.ts is used by test.ts files and bin.ts is the file we run after tsc -b => node dist/bin.js

// If we don't want that, whenever the tests import the app from index.ts it will actually start on a port.
// while writing tests we don't want resources of the machine to start. we just want to simulate the behavior.
