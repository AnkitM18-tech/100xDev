const express = require("express");
const v1Router = require("./routes/index");
// const userRouter = require("./routes/user");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", v1Router);
// app.use("api/v1/user", userRouter);

app.listen(3000);
