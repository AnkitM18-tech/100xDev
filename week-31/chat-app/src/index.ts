import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
const subscriptions: { [key: string]: { ws: WebSocket; rooms: string } } = {};

wss.on("connection", function connection(userSocket) {
  userSocket.on("error", console.error);
  userSocket.on("message", function message(data) {
    console.log("received %s", data);
    userSocket.send("Hey You send me : " + data);
  });
});

/* 

import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

const subscriptions: {[key: string]: {
    ws: WebSocket,
    rooms: string[]
}} = {

}

setInterval(() => {
    console.log(subscriptions);
}, 5000);

wss.on('connection', function connection(userSocket) {
    const id = randomId();
    subscriptions[id] = {
        ws: userSocket,
        rooms: []
    }
  
    userSocket.on('message', function message(data) {
        const parsedMessage = JSON.parse(data as unknown as string);
        if (parsedMessage.type === "SUBSCRIBE") {
            subscriptions[id].rooms.push(parsedMessage.room);
        }
        
        if (parsedMessage.type === "sendMessage") {
            const message = parsedMessage.message;
            const roomId = parsedMessage.roomId;
            
            Object.keys(subscriptions).forEach((userId) => {
                const {ws, rooms} = subscriptions[userId];
                if (rooms.includes(roomId)) {
                    ws.send(message)
                }
            })
        }
    });

});

function randomId() {
    return Math.random();
}

*/
