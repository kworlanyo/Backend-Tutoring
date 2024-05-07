import { useState } from "react";

function AddBook({ user, setLoggedInUser }) {
  const [ title, setTitle ] = useState("");
  const [ author, setAuthor ] = useState("");
  
  // Function to attempt to add a new book
  async function handleAddBook(e) {
    e.preventDefault();
    
    // The values for title and author input by the user
    // Plus the id of the current logged in user
    const newBook = {
      title,
      author,
      userId: user.id
    };

    const settings = {
      method: "POST",
      body: JSON.stringify(newBook),
      headers: {
        "Content-Type": "application/json"
      }
    }

    // Try to add a new book
    try {
      const response = await fetch("http://localhost:5000/books", settings);
      // If the request was successful
      if (response.ok) {
        const data = await response.json();
        
        setLoggedInUser(data);
        setTitle("");
        setAuthor("");
      // Else
      } else {
        throw new Error("Book could not be added");
      }
    } catch (err) {
      alert(err.message)
      setTitle("");
      setAuthor("");
    }
  }

  return (
    <>
      <form className="add-form" onSubmit={handleAddBook}>
        <label>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} />

        <label>Author</label>
        <input value={author} onChange={e => setAuthor(e.target.value)} />

        <button>Add Book</button>
      </form>
    </>
  );
}

export default AddBook;