import { Router } from "express";
import upload from "../middlewares/multerConfig.js";
import { createItem, getAllItems } from "../controllers/itemController.js";

const router = Router();

/* This line of code is setting up a POST route for creating an item. When a POST request is made to
the "/createItem" endpoint, it will first pass through the `upload.single("image")` middleware
function, which is responsible for handling file uploads (in this case, a single file with the field
name "image"). After the file upload is processed, the request will be passed to the `createItem`
controller function for further processing and handling of the item creation logic. */
router.post("/createItem", upload.single("image"), createItem);
router.get("/allItems", getAllItems);

export default router;
