import Album from "../Model/Album.js";
import createHttpError from "http-errors";

export async function getAllAlbums(req, res, next) {
  const albums = await Album.find();
  res.status(200).json(albums);
}

export async function addAlbum(req, res, next) {
  try {
    let newAlbum = new Album(req.body);
    newAlbum.jacket = req.file.filename;
    await newAlbum.save();
    res.status(200).json(newAlbum);
  } catch (error) {
    next(error);
  }
}

export async function deleteAlbum(req, res, next) {
  const id = req.params.id;
  try {
    const toDelete = await Album.findByIdAndDelete(id);
    res.status(200).json(toDelete);
  } catch (error) {
    next(error);
  }
}

export async function updateAlbum(req, res, next) {
  const id = req.params.id;
  try {
    let toUpdate = await Album.findByIdAndUpdate(id, { jacket: req.file.filename }, { new: true });

    res.status(200).json(toUpdate);
  } catch (error) {
    next(error);
  }
}

// Controller to verify the captcha
export async function verifyCapture(req, res, next) {
  const { captchaValue } = req.body;

  // If the captcha value is falsy, send an error message
  if (!captchaValue) {
    return next(createHttpError(400, "No reCaptcha token provided"));
  }

  try {
    const secretKey = process.env.SECRET;

    // Send a request to google servers to validate the captcha
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaValue}`,
      { method: "POST" }
    );

    // Parse the response of the request to javascript
    const data = await response.json();

    // If the data.success is truthy, send a response with an object have a success property set to true
    if (data.success) {
      res.json({ success: true });

      // Send error if the value is false
    } else {
      return next(createHttpError(400, "Failed reCaptcha Verification"));
    }
  } catch (error) {
    next(createHttpError(500, "reCapture verification failed"));
  }
}
