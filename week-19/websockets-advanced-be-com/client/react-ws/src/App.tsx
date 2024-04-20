import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [latestMessage, setLatestMessage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");
    newSocket.onopen = () => {
      console.log("Connection established");
      setSocket(newSocket);
      newSocket.send("Hello Server!");
    };
    newSocket.onmessage = (message) => {
      console.log("Message received:", message.data);
      setLatestMessage(message.data);
    };

    return () => newSocket.close();
  }, []);

  if (!socket) return <div>Connecting to Web Socket Server...</div>;

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Message Here"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={() => {
            socket.send(message);
          }}
        >
          Send
        </button>
      </div>
      <div>{latestMessage}</div>
    </>
  );
}

export default App;
