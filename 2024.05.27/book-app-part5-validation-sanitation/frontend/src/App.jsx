import { useState } from "react";
import Login from "./views/Login";
import Register from "./views/Register";
import MyBooks from "./views/MyBooks";

function App() {
  const [ loggedInUserId, setLoggedInUserId ] = useState(null);
  const [ showLogin, setShowLogin ] = useState(true);

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
      {!loggedInUserId
        ? showLogin 
          ? <Login setUserId={setLoggedInUserId} onClick={handleToggleLogin} />
          : <Register onClick={handleToggleLogin} />
        : <div className="container"> 
            <MyBooks userId={loggedInUserId} setUserId={setLoggedInUserId} onClick={handleLogout} />
          </div> 
      }
    </div>
  )
}

export default App