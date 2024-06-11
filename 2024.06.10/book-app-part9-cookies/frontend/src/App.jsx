import { useState } from "react";
import Login from "./views/Login";
import Register from "./views/Register";
import MyBooks from "./views/MyBooks";

function App() {
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  // Function to make a HTTP request with an access token
  // The url and settings object should be passed as arguments
  async function handleHTTPRequestWithToken(url, settings) {
    // 1. Make the specified HTTP request with the user's access token (expires after 15 mins)
    const firstAccessResponse = await fetch(url, settings);

    // * If the request succeeded, return the response for further processing :-)
    if (firstAccessResponse.ok) {
      return firstAccessResponse;
      // ! If the request did not succeed...
    } else {
      const { error } = await firstAccessResponse.json();

      // ! If the reason was not an expired access token...
      // ! Return the response for further processing :-(
      if (error.status !== 401) {
        return firstAccessResponse;
      }

      // 2. If the request did not succeed because the access token had expired...
      // Send a request to "GET /refresh" with the user's refresh token...
      console.log("Token expired!");

      const refreshSettings = {
        credentials: "include",
      };

      const refreshResponse = await fetch("http://localhost:5000/refresh", refreshSettings);

      // 3. If the "refresh token" request succeeded, store the new access and refresh tokens in the browser's local storage...
      if (refreshResponse.ok) {
        console.log("New tokens received!");

        const secondAccessResponse = await fetch(url, settings);

        // As we have now tried the original request with an in-date access token...
        // Return the response for further processing, whether it succeeded or not
        return secondAccessResponse;
        // ! If the "refresh token" request did not succeed, the user could not update their tokens
        // ! Return the response for further processing :-(
      } else {
        return refreshResponse;
      }
    }
  }

  // Function to log the current user out
  function handleLogout() {
    // Log out the user
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
          <Login onClick={handleToggleLogin} setUserId={setLoggedInUserId} />
        ) : (
          <Register onClick={handleToggleLogin} setUserId={setLoggedInUserId} />
        )
      ) : (
        <div className="container">
          <MyBooks
            userId={loggedInUserId}
            onLogout={handleLogout}
            onHTTPRequestWithToken={handleHTTPRequestWithToken}
          />
        </div>
      )}
    </div>
  );
}

export default App;
