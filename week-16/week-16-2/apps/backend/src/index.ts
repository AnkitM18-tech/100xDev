import express from "express";
import { BACKEND_URL } from "@repo/common/config";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "hello world",
  });
  console.log(BACKEND_URL);
});

app.listen(3000);
