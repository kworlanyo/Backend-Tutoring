import { useEffect, useState } from "react";
import io from "socket.io-client";

// Initialize the socket connection to the server
const socket = io("http://localhost:3006");

function App() {
  // State to handle the user's input message
  const [messageInput, setMessageInput] = useState("");
  // State to store the list of messages received
  const [messages, setMessages] = useState([]);
  // State to store the user's unique ID assigned by the socket server
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // On socket connection, save the unique socket ID as the user's ID
    socket.on("connect", () => {
      setUserId(socket.id);
    });

    // Listen for incoming messages from the server and update the messages state
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
    });

    // Clean up the event listener when the component unmounts or the messages state changes
    return () => {
      socket.off("sendMessage");
    };
  }, [messages]);

  function handleSendMessage(e) {
    e.preventDefault();

    if (messageInput !== "") {
      // Create an object containing the user's ID and the message
      const messageData = {
        id: userId,
        message: messageInput,
      };
      // Emit or send the message to the server
      socket.emit("message", messageData);
    }

    // Clear the message input field after sending the message
    setMessageInput("");
  }

  return (
    <>
      <h1>Simple Chat App</h1>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          name="message"
          value={messageInput}
          placeholder="Type your message here..."
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button>Send</button>
      </form>

      <ul className="messages">
        {messages.map((messageData, index) => {
          return (
            <li key={index}>
              <strong>{messageData.id.slice(0, 5)}:</strong> {messageData.message}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
