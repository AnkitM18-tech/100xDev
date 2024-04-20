/* 
http library implementation - natively, without any dependency

express gives us good routing, easy way to write middleware, easy ecosystem of middlewares.otherwise we can use native http library to create http servers.

import WebSocket, { WebSocketServer } from "ws";
import http from "http";

const server = http.createServer(function (request: any, response: any) {
  console.log(new Date() + " Received request for " + request.url);
  response.end("hi there");
});

const wss = new WebSocketServer({ server }); // giving the http server as argument. else we can give "noServer: true" as well, it will create a server on its own, when we want multiple websocketsconnections we can use this as argument.

wss.on("connection", function connection(socket) {
  //<-- // Event Registers
  socket.on("error", console.error); // err => console.error(err)

  socket.on("message", function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
  // Event Registers    ---->

  socket.send("Hello! Message From Server!!");
});

server.listen(8080, function () {
  console.log(new Date() + " Server is listening on port 8080");
});
 */

// using express

import express from "express";
import WebSocket, { WebSocketServer } from "ws";

const app = express();
const httpServer = app.listen(8080);

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.send("Hello! Message From Server!!");
});

// we can use hoppscotch.io to test the websocket connection in realtime section.
