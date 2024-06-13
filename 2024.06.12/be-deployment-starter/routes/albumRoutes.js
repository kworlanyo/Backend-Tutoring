import express from "express";
import { getAllAlbums, addAlbum, deleteAlbum, updateAlbum, verifyCapture } from "../controllers/albumsController.js";
import upload from "../middleware/multerConfig.js";

const router = express.Router();

router.post("/verify-captcha", verifyCapture);
router.get("/albums", getAllAlbums);
router.post("/add", upload.single("jacket"), addAlbum);
router.delete("/delete/:id", deleteAlbum);
router.patch("/update/:id", upload.single("jacket"), updateAlbum);

export default router;
