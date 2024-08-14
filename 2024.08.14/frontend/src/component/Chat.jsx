/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState(""); // State to manage the current message being typed by the user.
  const [messageLists, setMessageLists] = useState([]); // State to manage the list of all messages in the chat.

  async function handleSendMessage(e) {
    e.preventDefault();

    if (currentMessage !== "") {
      // Create a message object containing the room, author, message, and timestamp.
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(), // Format the current time as hours:minutes.
      };

      // Emit the 'send_message' event to the server with the message data.
      await socket.emit("send_message", messageData);

      // Update the message list with the new message and clear the current message input.
      setMessageLists([...messageLists, messageData]);
      setCurrentMessage("");
    }
  }

  useEffect(() => {
    // Listen for the 'receive_message' event from the server, which indicates a new message has been sent by another user.
    socket.on("receive_message", (data) => {
      setMessageLists([...messageLists, data]); // Add the received message to the message list.
    });

    // Clean up the socket listener when the component unmounts or when dependencies change.
    return () => {
      socket.off("receive_message");
    };
  }, [messageLists, socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>

      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageLists.map((messageContent, index) => {
            return (
              <>
                {/* // Assign an id style based on whether the message was sent by the current user or someone else. */}
                <div className="message" key={index} id={username === messageContent.author ? "you" : "other"}>
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{messageContent.time}</p>
                      <p id="author">{messageContent.author}</p>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </ScrollToBottom>
      </div>
      <form className="chat-footer" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Your message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button>&#9658;</button>
      </form>
    </div>
  );
}

export default Chat;
