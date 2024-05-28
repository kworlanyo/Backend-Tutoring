import { useState } from "react";

function Register({ onClick }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // TO DO: Function to attempt to register a new user
  async function handleRegister(e) {
    // To Do
  }

  return (
    <div className="container">
      <h1>MY BOOKS</h1>
      
      <h2>Register to start your own Library!</h2>

      <form className="form register-form" onSubmit={handleRegister}>
        <label>Username*</label>
        <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
        
        <label>Password*</label>
        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />

        <button type="submit">Register</button>
      </form>

      <button onClick={onClick}>Already registered? Click here to log in!</button>
    </div>
  )
}

export default Register;