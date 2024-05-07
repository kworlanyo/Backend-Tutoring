import { useState } from "react";
import NavBar from "./components/NavBar";
import Login from "./views/Login";
import MyBooks from "./views/MyBooks";
import Register from "./views/Register";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loginViewActive, setLoginViewActive] = useState(true);

  function handleLogout() {
    setLoggedInUser(null);
  }

  // Function to toggle the loginViewActive state
  function handleToggleLoginView() {
    setLoginViewActive(!loginViewActive);
  }

  return (
    <div>
      {/* If the loggedInUser's value is falsy, we then check if the loginViewActive is true. if loginViewActive is true, the Login component is rendered. If not, then the register component is rendered. */}
      {!loggedInUser ? (
        loginViewActive ? (
          <Login setLoggedInUser={setLoggedInUser} onClick={handleToggleLoginView} />
        ) : (
          <Register setLoggedInUser={setLoggedInUser} onClick={handleToggleLoginView} />
        )
      ) : (
        <div className="profile-container">
          <NavBar username={loggedInUser.username} onLogout={handleLogout} />
          <MyBooks user={loggedInUser} setLoggedInUser={setLoggedInUser} />
        </div>
      )}
    </div>
  );
}

export default App;
