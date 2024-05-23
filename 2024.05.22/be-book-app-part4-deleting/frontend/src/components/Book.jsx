function Book({ bookId, title, author, getUserData }) {
  //? We receive the bookId and getUserData from the MyBooks Component
  //? We then send a request to the server with the bookID and receive a response with a message that the book has been deleted.
  //? We then call the getUserData function which sends a request and receives a response with updated data about the user and then we update the username and the book array property of the user in the MyBooks Component.
  async function handleSoftDelete(bookId) {
    if (confirm("Are you sure you want to delete the book?")) {
      try {
        const settings = {
          method: "DELETE",
        };

        const response = await fetch(`http://localhost:5000/books/${bookId}`, settings);

        if (response.ok) {
          const { message } = await response.json();
          alert(message);
          await getUserData();
        } else {
          const { error } = await response.json();
          throw new Error(error.message);
        }
      } catch (error) {
        alert(error.message);
      }
    }
  }
  return (
    <>
      <div id={bookId} className="container book-container">
        <h4>Title</h4>
        <p>{title}</p>

        <h4>Author</h4>
        <p>{author}</p>

        <span onClick={() => handleSoftDelete(bookId)} className="delete">
          X
        </span>
      </div>
    </>
  );
}

export default Book;
