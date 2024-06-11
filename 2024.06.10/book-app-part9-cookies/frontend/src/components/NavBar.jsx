function NavBar({ username, onLogout, onDelete }) {
  return (
    <>
      {username && 
        <div className="navbar">
          <span className="welcome-msg">{`Welcome ${username}`}</span>
          <button className="logout-button" onClick={onLogout}>Logout</button>
          <button className="delete-button" onClick={onDelete}>Delete Account</button>
        </div>
      }
    </>
  );
}

export default NavBar;