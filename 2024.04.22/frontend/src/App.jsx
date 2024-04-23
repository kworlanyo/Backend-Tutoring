import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./views/Login";
import MyBooks from "./views/MyBooks";
import { useState } from "react";

function App() {
  // create a state to store the data that will obtained from the server
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Login setLoggedInUser={setLoggedInUser} />} />
      {/* If the loggedInUser is a truthy value, we can render the MyBooks component. If the loggedInUser is null, we use the Navigate component from react router dom to send the route back the home page */}
      <Route
        path="/books"
        element={
          loggedInUser ? <MyBooks loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} /> : <Navigate to="/" />
        }
      />
    </Routes>
  );
}

export default App;
