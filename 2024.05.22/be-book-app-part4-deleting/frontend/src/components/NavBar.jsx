function NavBar({ username, onClick, userId, setUserId }) {
  //? We receive the userId and setUserId from the App.jsx through the MyBooks.jsx
  //? We then send a request to the server with the userId and receive a response with a message that the user has been deleted.
  //? We then set the userId back to null and that will close the MyBooks Component and render the Login Component.
  async function handleHardDelete() {
    if (confirm("Are you sure you want to delete the account?")) {
      try {
        const settings = {
          method: "DELETE",
        };

        const response = await fetch(`http://localhost:5000/users/${userId}`, settings);

        if (response.ok) {
          const { message } = await response.json();
          alert(message);
          setUserId(null);
        } else {
          const { error } = await response.json();
          throw new Error(error.message);
        }
      } catch (error) {
        alert(error.message);
      }
    }
  }
  return (
    <>
      {username && (
        <div className="navbar">
          <span className="welcome-msg">{`Welcome ${username}`}</span>
          <button className="logout-button" onClick={onClick}>
            Logout
          </button>
          <button className="delete-button" onClick={handleHardDelete}>
            Delete Account
          </button>
        </div>
      )}
    </>
  );
}

export default NavBar;
