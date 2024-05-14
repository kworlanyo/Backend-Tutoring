import { useState } from "react";

function AddBook({ user, setLoggedInUser }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  // Function to attempt to add a new book
  async function handleAddBook(e) {
    e.preventDefault();

    // The values for title and author input by the user
    // Plus the id of the current logged in user
    const newBook = {
      title,
      author,
    };

    const settings = {
      method: "PATCH",
      body: JSON.stringify(newBook),
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Try to add a new book
    try {
      const response = await fetch(`http://localhost:5000/users/${user.id}/books`, settings);
      // If the request was successful
      if (response.ok) {
        const data = await response.json();

        setLoggedInUser(data);
        setTitle("");
        setAuthor("");
        // Else
      } else {
        // Destructure error object from the error response from the server and throw error to the catch block
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (err) {
      alert(err.message);
      setTitle("");
      setAuthor("");
    }
  }

  return (
    <>
      <form className="form" onSubmit={handleAddBook}>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Author</label>
        <input value={author} onChange={(e) => setAuthor(e.target.value)} />

        <button>Add Book</button>
      </form>
    </>
  );
}

export default AddBook;
