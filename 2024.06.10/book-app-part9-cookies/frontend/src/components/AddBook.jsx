import { useState } from "react";

function AddBook({ userId, setUser, onLogout, onHTTPRequestWithToken }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  async function handleAddBook(e) {
    e.preventDefault();

    try {
      const settings = {
        method: "POST",
        body: JSON.stringify({ title, author }),
        headers: {
          "Content-Type": "application/JSON",
        },
        credentials: "include",
      };

      // * Step 1: Try to insert a new "book" document into the "books" collection
      const response = await onHTTPRequestWithToken("http://localhost:5000/books", settings);

      // If the server sent a success response...
      if (response.ok) {
        const newBookId = await response.json();

        const settings2 = {
          method: "PATCH",
          body: JSON.stringify({ bookId: newBookId.id }),
          headers: {
            "Content-Type": "application/JSON",
          },
          credentials: "include",
        };

        // * Step 2: Try to insert the new "book" document's _id into the document for the logged in user
        const response2 = await onHTTPRequestWithToken(`http://localhost:5000/users/${userId}/books`, settings2);

        // If the server sent a success response
        if (response2.ok) {
          // The server will have sent back populated data
          // Use this to update the loggedInUser state variable in App.jsx
          // This will re-render the app to show the latest books
          // Also reset the form inputs
          const updatedUserData = await response2.json();

          setTitle("");
          setAuthor("");
          setUser(updatedUserData);
        } else {
          const { error } = await response2.json();

          throw new Error(error.message);
        }
      } else {
        const { error } = await response.json();

        throw new Error(error.message);
      }
    } catch (err) {
      alert(err.message);

      if (err.status === 401) {
        onLogout();
      } else {
        setTitle("");
        setAuthor("");
      }
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
