function Book({ title, author }) {
  return (
    <>
      <div className="container book-container">
        <h4>Title</h4>
        <p>{title}</p>
        
        <h4>Author</h4>
        <p>{author}</p>
      </div>
    </>
  );
}

export default Book;