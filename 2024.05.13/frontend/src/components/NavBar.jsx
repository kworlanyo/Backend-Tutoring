function NavBar({ username, onLogout }) {
  return (
    <>
      {username && 
        <div className="navbar">
          <span className="welcome-msg">{`Welcome ${username}`}</span>
          <button className="logout-button" onClick={onLogout}>Logout</button>
        </div>
      }
    </>
  );
}

export default NavBar;