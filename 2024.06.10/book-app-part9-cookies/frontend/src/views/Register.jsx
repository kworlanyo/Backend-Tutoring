import { useState } from "react";

function Register({ onClick, setUserId }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to attempt to register a new user
  async function handleRegister(e) {
    e.preventDefault();

    try {
      const settings = {
        method: "POST",
        body: JSON.stringify({ email, username, password }),
        headers: {
          "Content-Type": "application/JSON",
        },
        credentials: "include",
      };

      const response = await fetch("http://localhost:5000/register", settings);

      // If the user has been successfully registered, log them in
      if (response.ok) {
        alert("Registration successful!");

        const newUserData = await response.json();
        setUserId(newUserData.id);
      } else {
        const { error } = await response.json();

        throw new Error(error.message);
      }
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="container">
      <h1>MY BOOKS</h1>

      <h2>Register to start your own Library!</h2>

      <form className="form register-form" onSubmit={handleRegister}>
        <label htmlFor="email">Email*</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="username">Username*</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password*</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>

      <button onClick={onClick}>Already registered? Click here to log in!</button>
    </div>
  );
}

export default Register;
