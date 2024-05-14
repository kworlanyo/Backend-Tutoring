import { useState } from "react";
import NavBar from "./components/NavBar";
import Login from "./views/Login";
import Register from "./views/Register";
import MyBooks from "./views/MyBooks";

function App() {
  const [ loggedInUser, setLoggedInUser ] = useState(null);
  const [ showLogin, setShowLogin ] = useState(true);

  // Function to log the current user out
  function handleLogout() {
    setLoggedInUser(null);
  }

  // Function to toggle the Login / Register views
  function handleToggleLogin() {
    setShowLogin(!showLogin);
  }

  return (
    <div>    
      {!loggedInUser
        ? showLogin 
          ? <Login setLoggedInUser={setLoggedInUser} onClick={handleToggleLogin} />
          : <Register onClick={handleToggleLogin} />
        : <div className="container"> 
            <NavBar username={loggedInUser.username} onLogout={handleLogout} />
            <MyBooks user={loggedInUser} setLoggedInUser={setLoggedInUser} />
          </div> 
      }
    </div>
  )
}

export default App