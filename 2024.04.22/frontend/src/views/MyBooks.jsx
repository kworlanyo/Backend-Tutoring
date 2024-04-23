import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MyBooks({ loggedInUser, setLoggedInUser }) {
  // create state variable to control inputs elements
  const [bookInputs, setBookInputs] = useState({
    title: "",
    author: "",
  });

  // initialize useNavigate
  const navigate = useNavigate();

  // function to handle input elements
  function handleChange(e) {
    setBookInputs({ ...bookInputs, [e.target.name]: e.target.value });
  }

  // function to handle the log out button
  function handleLogOut() {
    // we set the loggedInUser state variable back to null and navigate back to the home page.
    setLoggedInUser(null);
    navigate("/");
  }

  // function to run when the form is submitted
  async function handleSubmit(e) {
    e.preventDefault();

    // create a book object that will sent as part of the post request
    const newBook = {
      title: bookInputs.title,
      author: bookInputs.author,
      id: loggedInUser.id,
    };

    // create an object to stringify the book object and also specify other information the fetch Api that we are sending a post request.
    const settings = {
      body: JSON.stringify(newBook),
      headers: {
        "Content-Type": "application/JSON",
      },
      method: "POST",
    };

    try {
      const response = await fetch("http://localhost:5000/books", settings);

      if (response.ok) {
        const data = await response.json();
        // set the loggedInUser with the data received from the post request
        setLoggedInUser(data);
      } else {
        throw new Error("Book could not be added");
      }
    } catch (error) {
      console.log(error.message);
    }

    // reset inputs back to default
    setBookInputs({
      title: "",
      author: "",
    });
  }

  return (
    <>
      <nav>
        <p>Welcome {loggedInUser?.username}</p>
        <button onClick={handleLogOut}>Logout</button>
      </nav>
      <div className="books-page">
        <h2>My Books</h2>
        <form onSubmit={handleSubmit}>
          <h3>Add New Book</h3>
          <label>
            Title
            <input type="text" name="title" value={bookInputs.title} onChange={handleChange} />
          </label>
          <label>
            Author
            <input type="text" name="author" value={bookInputs.author} onChange={handleChange} />
          </label>
          <button>Add book</button>
        </form>
      </div>
      <div>
        <h3 className="title">My Library</h3>
        <div className="books-container">
          {/* Map through the user's book array property */}
          {loggedInUser?.books?.map((book) => {
            return (
              <div key={book.id} className="book">
                <h4>Title</h4>
                <p>{book.title}</p>
                <h4>Author</h4>
                <p>{book.author}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default MyBooks;
