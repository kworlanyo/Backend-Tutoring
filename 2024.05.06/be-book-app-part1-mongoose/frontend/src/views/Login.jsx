import { useState } from "react";

function Login({ setLoggedInUser, onClick }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to attempt to log the user in
  async function handleLogin(e) {
    e.preventDefault();

    try {
      // Create Login details object
      const loginDetails = {
        username: username,
        password: password,
      };

      // Create Settings object
      const settings = {
        body: JSON.stringify(loginDetails),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      };

      // Send POST request to /login and await server's response
      const response = await fetch("http://localhost:5000/login", settings);

      // If request succeeded
      if (response.ok) {
        const user = await response.json();
        setLoggedInUser(user);

        // If the request does not succeed
      } else {
        throw new Error("Login unsuccessful");
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="login-container">
      <h1>MY BOOKS</h1>

      <h2>Please log in to see your Library</h2>

      <form className="login-form" onSubmit={handleLogin}>
        <label>Username</label>
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label>Password</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className="login-button">Login</button>
        <button onClick={onClick}>Not yet registered? Register here!</button>
      </form>
    </div>
  );
}

export default Login;
