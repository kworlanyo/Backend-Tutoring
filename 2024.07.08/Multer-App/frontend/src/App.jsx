import { useEffect, useRef, useState } from "react";

function App() {
  // State variables
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [list, setList] = useState([]);
  const imageInput = useRef(null); // 1. This is used to clear the input file type. First declare the useRef

  async function handleSubmit(e) {
    e.preventDefault();

    // Use FormData anytime you want to add images to the request
    const formData = new FormData();
    formData.append("title", title);
    if (image) {
      formData.append("image", image);
    }

    const settings = {
      body: formData,
      method: "POST",
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API}/item/createItem`, settings);
      if (response.ok) {
        const data = await response.json();
        setList([...list, data]);
      } else {
        const { error } = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      alert(error.message);
    }

    setTitle("");
    setImage("");
    imageInput.current.value = ""; // 3. Then clear the input
  }

  useEffect(() => {
    async function getAllItems() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API}/item/allItems`);
        if (response.ok) {
          const data = await response.json();
          setList(data);
        } else {
          const { error } = await response.json();
          throw new Error(error.message);
        }
      } catch (error) {
        alert(error.message);
      }
    }

    getAllItems();
  }, []);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Image
          {/* 2. Assign the useRef to the ref attribute of the input file type */}
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} ref={imageInput} required />
          {/* This line of code is used if you want to preview the image before sending it. */}
          <img src={image && URL.createObjectURL(image)} alt="" width={100} />
        </label>
        <button>Submit</button>
      </form>
      <div className="list-container">
        {list.length === 0 ? (
          <h3>Your list will be displayed here</h3>
        ) : (
          list?.map((item) => {
            return (
              <div className="item" key={item._id}>
                <p>{item.title}</p>
                <div className="image-container">
                  {/* In order to see the image, we have to reference the server the images are coming. If we are in development environment, the server will be http://localhost:5006 but if we are in production, then the environment will be the url of the deployed site. That is why we write it in the .env file and vite is smart to know which server to use base on whether we are in development or production environment. */}
                  <img src={`${import.meta.env.VITE_API}/${item.image}`} alt="" />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
