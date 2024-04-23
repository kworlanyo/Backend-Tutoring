import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setLoggedInUser }) {
  // create state variable to control all inputs in this component
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  // create an error state
  const [error, setError] = useState(false);

  // initialize useNavigate
  const navigate = useNavigate();

  // function to handle the inputs
  function handleChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  // function to run when the form is submitted
  async function handleSubmit(e) {
    e.preventDefault();

    // create a loginData object to send the values of the inputs
    const loginData = {
      username: inputs.username,
      password: inputs.password,
    };

    // create an object to specify to Fetch Api that we are sending a post request.
    //bhm
    const settings = {
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/JSON",
      },
      method: "POST",
    };

    try {
      const response = await fetch("http://localhost:5000/users", settings);

      if (response.ok) {
        const data = await response.json();
        // set the loggedInUser to be the data received from the post request and then navigate to the books view.
        setLoggedInUser(data);
        navigate("/books");
      } else {
        // set error state to be true if there is an error
        setError(true);
        throw new Error("No user found");
      }
    } catch (error) {
      console.log(error.message);
    }

    // reset inputs to default
    setInputs({
      username: "",
      password: "",
    });
  }

  return (
    <div className="container">
      <h1>MY BOOKS</h1>
      <h3>Please log in to see your Library</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input type="text" name="username" value={inputs.username} onChange={handleChange} />
        </label>
        <label>
          Password
          <input type="password" name="password" value={inputs.password} onChange={handleChange} />
        </label>
        <button>Login</button>
      </form>
      {error && <p className="error">Username or password is incorrect. Try again!</p>}
    </div>
  );
}

export default Login;
