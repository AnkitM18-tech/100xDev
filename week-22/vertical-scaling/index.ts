import express from "express";
import cluster from "cluster";
import os from "os";

const totalCPUs = os.cpus().length;

const port = 3000;

if (cluster.isPrimary) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork(); // if any worker crashes, we can fork another one(restart). or we can exit the Primary process, which will kill every other worker process. process.exit()
  });
} else {
  const app = express();
  console.log(`Worker ${process.pid} started`);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("/api/:n", function (req, res) {
    let n = parseInt(req.params.n);
    let count = 0;

    if (n > 5000000000) n = 5000000000;

    for (let i = 0; i <= n; i++) {
      count += i;
    }

    res.send(`Final count is ${count} ${process.pid}`);
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

// if we go to that endpoint it will show us the Final count is ${count} ${process.pid} => and on refreshing we can notice the process id doesn't change for a while and after some tries it will change.

// when we try hitting the endpoint via various methods - different browser, postman, curl etc it will give us different process ids.
// request from the same browser/postman goes to the same pid for some while, and then after some tries it changes. not the case with curl
// the browser keeps a connection to the server for a while, so on refreshing right away the pid doesn't change, but after some time when we try again then the process id changes as the connection goes away and the browser reconnects to another process id.
