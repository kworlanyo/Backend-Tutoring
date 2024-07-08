import Item from "../model/itemModel.js";
import createHttpError from "http-errors";

// Controller to create a new item
export async function createItem(req, res, next) {
  const { title } = req.body;
  console.log(req.file);

  // When we send an image file from the frontend, it will be assigned to req.file
  // The req.file is an object with many properties about the image and one of the properties is called "path"
  // We can assign the value of the req.file.path to the image property in the database.

  try {
    const newItem = await Item.create({ title: title, image: req.file.path });
    res.json(newItem);
  } catch (error) {
    next(createHttpError(500, "Item could not be created"));
  }
}

// Controller to get all items from the database
export async function getAllItems(req, res, next) {
  try {
    const allItems = await Item.find();
    res.json(allItems);
  } catch (error) {
    next(createHttpError(500, "Items could not be found"));
  }
}
