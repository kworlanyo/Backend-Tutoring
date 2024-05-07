import AddBook from "../components/AddBook";
import Book from "../components/Book";

function MyBooks({ user, setLoggedInUser }) {
  return (
    <>
      <h1>MY BOOKS</h1>
      
      <div className="add-container">
        <h2>Add New Book</h2>
        <AddBook user={user} setLoggedInUser={setLoggedInUser} />
      </div>

      <h2>My Library</h2>
      <div className="library-container">
        {user.books.map(book => {
          return <Book key={book.id} title={book.title} author={book.author} />
        })}
      </div>
    </>

  );
}

export default MyBooks;