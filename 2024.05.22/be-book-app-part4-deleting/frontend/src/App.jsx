import { useState } from "react";
import Login from "./views/Login";
import Register from "./views/Register";
import MyBooks from "./views/MyBooks";

function App() {
  //? when a user registers or logs in, the id of the user is saved in the loggedInUserId state
  //? That makes the loggedInUserId a truthy value, therefore the MyBooks Component will be rendered
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  // Function to log the current user out
  function handleLogout() {
    setLoggedInUserId(null);
  }

  // Function to toggle the Login / Register views
  function handleToggleLogin() {
    setShowLogin(!showLogin);
  }

  return (
    <div>
      {!loggedInUserId ? (
        showLogin ? (
          <Login setUserId={setLoggedInUserId} onClick={handleToggleLogin} />
        ) : (
          <Register onClick={handleToggleLogin} setUserId={setLoggedInUserId} />
        )
      ) : (
        <div className="container">
          <MyBooks userId={loggedInUserId} onClick={handleLogout} setUserId={setLoggedInUserId} />
        </div>
      )}
    </div>
  );
}

export default App;
