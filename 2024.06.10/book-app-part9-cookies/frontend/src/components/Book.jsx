function Book({ id, title, author, onClick }) {
  return (
    <>
      <div id={id} className="container book-container">
        <h4>Title</h4>
        <p>{title}</p>
        
        <h4>Author</h4>
        <p>{author}</p>

        <span className="delete" onClick={onClick}>X</span>
      </div>
    </>
  );
}

export default Book;