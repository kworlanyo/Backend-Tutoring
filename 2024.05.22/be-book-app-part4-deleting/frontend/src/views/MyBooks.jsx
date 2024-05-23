import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import AddBook from "../components/AddBook";
import Book from "../components/Book";

function MyBooks({ userId, onClick, setUserId }) {
  const [user, setUser] = useState({
    username: "",
    books: [],
  });

  //? When myBooks component is rendered, the useEffect runs and the handleGetUserData function is called
  //? The handleGetUserData function sends a request to server and gets a response containing the username and the books array property of the user and these are stored in the user state variable above.
  useEffect(() => {
    handleGetUserData();
  }, []);

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

  return (
    <>
      <NavBar username={user.username} userId={userId} onClick={onClick} setUserId={setUserId} />

      <h1>MY BOOKS</h1>

      <div className="container add-container">
        <h2>Add New Book</h2>
        <AddBook userId={userId} setUser={setUser} />
      </div>

      <h2>My Library</h2>
      <div className="library-container">
        {user.books.map((book) => {
          return (
            <Book
              key={book._id}
              bookId={book._id}
              title={book.title}
              author={book.author}
              getUserData={handleGetUserData}
            />
          );
        })}
      </div>
    </>
  );
}

export default MyBooks;
