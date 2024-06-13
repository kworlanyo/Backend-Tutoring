import "./App.css";
import { useState, useEffect, useRef } from "react";
import Album from "./Album";
import RECAPTCHA from "react-google-recaptcha";

function App() {
  const [inputs, setInputs] = useState({});
  const [albums, setAlbums] = useState([]);
  const [album, setAlbum] = useState([]);
  const [captchaValue, setCaptchaValue] = useState(null); // State variable for the captcha

  const fileInput = useRef(null); // 1. this will hold a reference to our file input!
  const recaptchaRef = useRef(null); // this will hold the reference for the captcha

  useEffect(() => {
    getAlbums();
  }, [album]);

  async function getAlbums() {
    const response = await fetch(`${import.meta.env.VITE_API}/albums`);
    if (response.ok) {
      const data = await response.json();
      setAlbums(data);
    }
  }

  function handleChange(e) {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function handleCaptchaChange(value) {
    setCaptchaValue(value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Settings object
      const settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ captchaValue: captchaValue }),
      };

      // First send a request to check if the captchaValue is valid
      const response = await fetch(`${import.meta.env.VITE_API}/verify-captcha`, settings);

      if (response.ok) {
        const data = await response.json();

        // If the data.success is true, then go ahead and send the data
        if (data.success) {
          const formData = new FormData();
          formData.append("title", inputs.title);
          formData.append("year", inputs.year);
          formData.append("artist", inputs.artist);
          formData.append("jacket", inputs.jacket);

          setInputs({});
          fileInput.current.value = ""; // 3. this resets the file input value :)

          const response = await fetch(`${import.meta.env.VITE_API}/add`, {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setAlbum(data);
            alert(`added!`);

            recaptchaRef?.current?.reset(); // Reset the captcha
          } else {
            const { error } = await response.json();
            throw new Error(error.message);
          }
        } else {
          const { error } = await response.json();
          throw new Error(error.message);
        }
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }

  return (
    <>
      <h1>My Favorites</h1>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" placeholder="artist" onChange={handleChange} value={inputs.artist || ""} name="artist" />
        <input type="text" placeholder="title" onChange={handleChange} value={inputs.title || ""} name="title" />
        <input type="text" placeholder="year" onChange={handleChange} value={inputs.year || ""} name="year" />
        <input
          type="file"
          ref={fileInput} // 2. this sets the reference to file input
          onChange={(e) => setInputs({ ...inputs, jacket: e.target.files[0] })}
          accept="image/*"
        />
        <RECAPTCHA
          sitekey={import.meta.env.VITE_SITE}
          onChange={handleCaptchaChange}
          theme="dark"
          ref={recaptchaRef}
          className="captcha"
        />
        <button>Add</button>
      </form>
      <div className="albums-container">
        {!!albums.length &&
          albums.map((album) => (
            <Album
              key={album._id}
              album={album}
              getAlbums={getAlbums}
              inputs={inputs}
              setInputs={setInputs}
              setAlbum={setAlbum}
            />
          ))}
      </div>
    </>
  );
}

export default App;
