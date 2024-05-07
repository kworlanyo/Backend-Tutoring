import { useState } from "react";

function Register({ setLoggedInUser, onClick }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to attempt to log the user in
  async function handleRegistration(e) {
    e.preventDefault();

    try {
      // Create registration details object
      const registrationDetails = {
        username: username,
        password: password,
      };

      // Create Settings object
      const settings = {
        body: JSON.stringify(registrationDetails),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      };

      // Send POST request to /register and await server's response
      const response = await fetch("http://localhost:5000/register", settings);

      // If request succeeded
      if (response.ok) {
        const newUser = await response.json();
        setLoggedInUser(newUser);

        // If the request does not succeed
      } else {
        throw new Error("Registration unsuccessful");
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="login-container">
      <h1>Register a new Account</h1>

      <form className="login-form" onSubmit={handleRegistration}>
        <label>Username</label>
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label>Password</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className="login-button">Register</button>
        <button onClick={onClick}>Already registered? Login</button>
      </form>
    </div>
  );
}

export default Register;
