/* 
Socket io is a javascript library that enable real-time, bidirectional communication between web clients (browsers) and servers. It simplifies the process of building interactive web applications by allowing data to be transmitted instantly and continuously between the client and server, facilitating features like chat apps, live updates and multiplayer gaming.

* What is Bidirectional Communication
Bidirectional communication means that the information can flow in two directions, both the web client (browser) and the server can send and receive data to and from each other in real time. So if something changes on the server, it can immediately notify the client, and vice versa, without the client needing to constantly ask the server if there's new information available. 

* Documentation
https://socket.io/

* Packages to install
Backend: socket.io
Frontend: socket.io-client

? io.on("connection", callback)
io.on is a method used to register event listeners for different events that occur on the server-side. The io object represents the main socket-io server instance.
When we call io.on("connection", callback), we're telling socket.io to listen for a connection event, which occurs whenever a new client establishes a connection with the server. The callback function will be called/invoked whenever this event occurs, and it will receive a socket object representing the connection to the client.
Similarly, we can use the socket.on on the socket object to listen for event specifics to that individual client connection.

* Emitting Events
Emitting events allows us to send data from one side(client or server) to the other. It's a fundamental feature of real-time communication.
 
? We use socket.emit("nameOfConnectionEvent", dataToSend) to send data either from server or client
? We use socket.on("nameOfConnectionEvent", (dataReceived) => {}) to receive the data. The data is received in a callback function and processed.
*/
