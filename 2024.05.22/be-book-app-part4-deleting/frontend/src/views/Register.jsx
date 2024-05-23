import { useState } from "react";

function Register({ onClick, setUserId }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // TO DO: Function to attempt to register a new user
  async function handleRegister(e) {
    // To Do
    e.preventDefault();

    try {
      const newUser = {
        username: username,
        password: password,
        email: email,
      };

      const settings = {
        body: JSON.stringify(newUser),
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
      };

      const response = await fetch(`http://localhost:5000/register`, settings);

      if (response.ok) {
        const newUserId = await response.json();
        setUserId(newUserId.id);
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="container">
      <h1>MY BOOKS</h1>

      <h2>Register to start your own Library!</h2>

      <form className="form register-form" onSubmit={handleRegister}>
        <label>Email*</label>
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Username*</label>
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label>Password*</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Register</button>
      </form>

      <button onClick={onClick}>Already registered? Click here to log in!</button>
    </div>
  );
}

export default Register;
