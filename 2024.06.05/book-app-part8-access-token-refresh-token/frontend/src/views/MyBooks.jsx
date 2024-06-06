import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import AddBook from "../components/AddBook";
import Book from "../components/Book";

function MyBooks({ userId, setUserId, onClick, onHttpRequest }) {
  const [user, setUser] = useState({
    username: "",
    books: [],
  });

  useEffect(() => {
    handleGetUserData();
  }, []);

  async function handleGetUserData() {
    try {
      //* Get the access token from local storage
      const accessToken = localStorage.getItem("accessToken");

      // Make a GET request to the "/users/:id" endpoint in our server...
      // ... and then handle the response from the server
      const settings = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      //* Change fetch to onHttpRequest
      const response = await onHttpRequest(`http://localhost:5000/users/${userId}`, settings);

      if (response.ok) {
        const userData = await response.json();

        setUser(userData);
      } else {
        const { error } = await response.json();

        throw new Error(error.message);
      }
    } catch (error) {
      alert(error.message);

      //* Set UserId to null which will log out the user and redirect to the login page
      setUserId(null);
    }
  }

  // Function to "hard" delete a user
  async function handleHardDeleteUser() {
    if (confirm("Are you sure you want to delete your account?")) {
      try {
        //* Get the access token from local storage
        const accessToken = localStorage.getItem("accessToken");

        const settings = {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        };

        //* Change fetch to onHttpRequest
        const response = await onHttpRequest(`http://localhost:5000/users/${userId}`, settings);

        if (response.ok) {
          const { message } = await response.json();

          // Show alert confirming deletion
          alert(message);

          //* Remove tokens from local storage
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

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
      //* Get the access token from local storage
      const accessToken = localStorage.getItem("accessToken");
      const bookId = e.target.parentElement.id;

      const settings = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      //* Change fetch to onHttpRequest
      const response = await onHttpRequest(`http://localhost:5000/books/${bookId}`, settings);

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

      //* Set UserId to null which will log out the user and redirect to the login page
      setUserId(null);
    }
  }

  return (
    <>
      <NavBar username={user.username} onClick={onClick} onDelete={handleHardDeleteUser} />

      <h1>MY BOOKS</h1>

      <div className="container add-container">
        <h2>Add New Book</h2>
        {/* //* Add setUserId as prop to Addbook component */}
        <AddBook userId={userId} setUser={setUser} setUserId={setUserId} onHttpRequest={onHttpRequest} />
      </div>

      <h2>My Library</h2>
      <div className="library-container">
        {user.books.map((book) => {
          return (
            <Book key={book._id} id={book._id} title={book.title} author={book.author} onClick={handleSoftDeleteBook} />
          );
        })}
      </div>
    </>
  );
}

export default MyBooks;
