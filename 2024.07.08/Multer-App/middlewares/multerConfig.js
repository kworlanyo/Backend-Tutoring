import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    /* `callback(null, "uploads/");` in the `destination` function of `multer.diskStorage` is setting
    the destination folder where the uploaded files will be stored. In this case, it specifies that
    the files should be stored in the "uploads/" directory in the server */
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  },
  limits: { fileSize: 500000 }, //500kb
});

const upload = multer({ storage: storage });
export default upload;
