import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food items
const addFood = async (req, res) => {
  // Check if file is present
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  // Check if necessary fields are present in the request body
  const { name, description, price, category } = req.body;
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name,
    description,
    price,
    category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.error("Error while adding food:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while adding food",
    });
  }
};

// List all food items
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    req.json({
      success: false,
      message: "Something went wrong while listing item",
    });
  }
};

// Remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success: true, message: "Food removed!"})
  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Removing food went wrong"})
  }
};

export { addFood, listFood, removeFood };
