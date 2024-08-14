import { useState } from "react";
import io from "socket.io-client";
import Chat from "./component/Chat";
import "./App.css";

// Establish a connection to the backend server on port 3007 using socket.io
const socket = io("http://localhost:3007");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  // This function will send data, which is the value of the room state variable to the socket.io in the backend
  // Function to handle joining a chat room. It emits a 'join_room' event to the backend with the room ID, and then sets the state to show the chat interface.
  function handleJoinRoom(e) {
    e.preventDefault();

    if (username !== "" && room !== "") {
      socket.emit("join_room", room); // Emit the 'join_room' event to the server with the room data.
      setShowChat(true);
    }
  }

  return (
    <>
      <div className="App">
        {!showChat ? (
          <form onSubmit={handleJoinRoom} className="joinChatContainer">
            <h3>Join A Chat</h3>
            <input
              type="text"
              value={username}
              placeholder="Your name..."
              onChange={(e) => setUsername(e.target.value)}
            />
            <input type="text" value={room} placeholder="Room Id..." onChange={(e) => setRoom(e.target.value)} />
            <button>Join A Room</button>
          </form>
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}
      </div>
    </>
  );
}

export default App;
