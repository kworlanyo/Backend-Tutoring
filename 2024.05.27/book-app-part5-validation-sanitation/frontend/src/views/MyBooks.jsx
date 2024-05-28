import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import AddBook from "../components/AddBook";
import Book from "../components/Book";

function MyBooks({ userId, setUserId, onClick }) {
  const [user, setUser] = useState({
    username: "",
    books: []
  });
  
  useEffect(() => {
    handleGetUserData();
  }, [])

  async function handleGetUserData() {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`);

      if (response.ok) {
        const userData = await response.json();

        setUser(userData);
      } else {
        const { error } = await response.json();

        throw new Error(error.message);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  // Function to "hard" delete a user
  async function handleHardDeleteUser() {
    if (confirm("Are you sure you want to delete your account?")) {
      try {
        const settings = {
          method: "DELETE"
        }
  
        const response = await fetch(`http://localhost:5000/users/${userId}`, settings);
  
        if (response.ok) {
          const { message } = await response.json();
          
          // Show alert confirming deletion
          alert(message);
          
          // Log out
          setUserId(null);
        } else {
          const { error } = await response.json();
          throw new Error(error.message);
        }
      } catch (err) {
        alert(err.message);
      }
    }
  }

  // Function to "soft" delete a book
  async function handleSoftDeleteBook(e) {
    try {
      const bookId = e.target.parentElement.id;
      
      const settings = {
        method: "DELETE"
      }

      const response = await fetch(`http://localhost:5000/books/${bookId}`, settings);

      if (response.ok) {
        const { message } = await response.json();
        console.log(message);

        await handleGetUserData();
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <>
      <NavBar username={user.username} onClick={onClick} onDelete={handleHardDeleteUser} />

      <h1>MY BOOKS</h1>

      <div className="container add-container">
        <h2>Add New Book</h2>
        <AddBook userId={userId} setUser={setUser} />
      </div>

      <h2>My Library</h2>
      <div className="library-container">
        {user.books.map(book => {
          return <Book key={book._id} id={book._id} title={book.title} author={book.author} onClick={handleSoftDeleteBook} />
        })}
      </div>
    </>

  );
}

export default MyBooks;