function NavBar({ username, onClick, onDelete }) {
  return (
    <>
      {username && 
        <div className="navbar">
          <span className="welcome-msg">{`Welcome ${username}`}</span>
          <button className="logout-button" onClick={onClick}>Logout</button>
          <button className="delete-button" onClick={onDelete}>Delete Account</button>
        </div>
      }
    </>
  );
}

export default NavBar;