import { useState } from "react";
import Login from "./views/Login";
import Register from "./views/Register";
import MyBooks from "./views/MyBooks";

function App() {
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  //* Function to handle request tokens
  async function handleRequestWithToken(url, settings) {
    //* Send first request
    const firstAccessResponse = await fetch(url, settings);

    //* If the response is okay, return the response
    if (firstAccessResponse.ok) {
      return firstAccessResponse;
    } else {
      //* if the response is not okay, destructure the error object from the response
      const { error } = await firstAccessResponse.json();

      //* if the error message !== "jwt expired", then return the response
      if (error.message !== "jwt expired") {
        return firstAccessResponse;
      }

      //* If the error.message === "jwt expired", do the following
      console.log("Expired token");

      //* Get the refresh token from the local storage
      const refreshToken = localStorage.getItem("refreshToken");

      //* Create settings object and add the refresh token to the headers
      const refreshSettings = {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      };

      //* Send a request to a route that is responsible for creating new access and refresh tokens
      const refreshResponse = await fetch("http://localhost:5000/refresh-token", refreshSettings);

      //* If the response is ok...
      if (refreshResponse.ok) {
        console.log("New tokens received");

        //* convert the response to javascript format
        const newTokens = await refreshResponse.json();

        //* Then save the newly created tokens in the local storage. This will overwrite the previous tokens in the local storage.
        localStorage.setItem("accessToken", newTokens.accessToken);
        localStorage.setItem("refreshToken", newTokens.refreshToken);

        //* After saving the tokens, get the new access token and assign it to a variable
        const newAccessToken = localStorage.getItem("accessToken");

        // const settings = {
        //   headers: {
        //     Authorization: `Bearer ${newAccessToken}`
        //   }
        // }

        //* Add the token to the headers in the settings object
        settings.headers.Authorization = `Bearer ${newAccessToken}`;

        //* Send a new request and return the response
        const secondAccessResponse = await fetch(url, settings);
        return secondAccessResponse;
      } else {
        //* if the response was not okay, return the response and don't handle it in this handler function
        return refreshResponse;
      }
    }
  }

  // Function to log the current user out
  function handleLogout() {
    setLoggedInUserId(null);

    //* Remove tokens from local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
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
          <MyBooks
            userId={loggedInUserId}
            setUserId={setLoggedInUserId}
            onClick={handleLogout}
            onHttpRequest={handleRequestWithToken}
          />
        </div>
      )}
    </div>
  );
}

export default App;
