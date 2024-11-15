import React, { useState } from "react";
import { assets } from "../../assets/assets";
import "./Add.css";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const initialFormState = {
    name: "",
    description: "",
    price: "",
    category: "Salad",
  };

  const [image, setImage] = useState(null);
  const [data, setData] = useState(initialFormState);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      toast.error("Please upload a valid image file.");
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, key === "price" ? Number(data[key]) : data[key]);
    });
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData(initialFormState);
        setImage(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const categories = [
    "Salad",
    "Rolls",
    "Desert",
    "Sandwich",
    "Cake",
    "Pure Veg",
    "Pasta",
    "Noodles",
    "MainCourse",
  ];

  return (
    <div className="add">
      <form onSubmit={onSubmitHandler} className="flex-col">
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Preview"
              onError={(e) => {
                e.target.src = assets.upload_area;
              }}
            />
          </label>
          <input
            onChange={onFileChange}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <label htmlFor="name">Product Name</label>
          <input
            id="name"
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <label htmlFor="description">Product Description</label>
          <textarea
            id="description"
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <label htmlFor="category">Product Category</label>
            <select
              id="category"
              onChange={onChangeHandler}
              name="category"
              value={data.category}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="add-price flex-col">
            <label htmlFor="price">Product Price</label>
            <input
              id="price"
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
              required
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
