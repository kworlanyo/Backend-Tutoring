import { useState } from "react";

function Login({ setUserId, onClick }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to attempt to log the user in
  async function handleLogin(e) {
    e.preventDefault();

    // Settings object
    try {
      const settings = {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/JSON",
        },
      };

      // Send POST request to /login and await server's response
      const response = await fetch("http://localhost:5000/login", settings);

      // If request succeeded
      if (response.ok) {
        const userData = await response.json();

        //* Store the tokens received from the server in local storage
        localStorage.setItem("accessToken", userData.accessToken);
        localStorage.setItem("refreshToken", userData.refreshToken);

        setUserId(userData.id);
        // Else
      } else {
        throw new Error("Login unsuccessful - please try again");
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="container">
      <h1>MY BOOKS</h1>

      <h2>Log in to see your Library!</h2>

      <form className="form login-form" onSubmit={handleLogin}>
        <label>Username</label>
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label>Password</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Login</button>
      </form>

      <button onClick={onClick}>Not yet registered? Register here!</button>
    </div>
  );
}

export default Login;
