import { nanoid } from "nanoid";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "./productSlice";
import { useNavigate } from "react-router-dom";

const AddNewProduct = () => {

  const [product, setProduct] = useState({title : "", price : "", description : "", category : "", images : []});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    let {name, value} = e.target;
    if (name === "images") {
      value = [value];
    }
    setProduct(prev => ({...prev, [name] : value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {id : nanoid(), ...product};
    dispatch(createProduct(newProduct));
    navigate("/")
    // setProduct({title : "", price : "", description : "", category : "", images : []})
  }

  return (
    <div className="add_product-page">
      <h2 className="text-3xl font-bold">Add New Product</h2>

      <form onSubmit={handleSubmit} className="add_product-form">
        <div>
          <label htmlFor="title">Title :</label>
          <input type="text" value={product.title} onChange={(e) => handleChange(e)} name="title" id="title" />
        </div>
        <div>
          <label htmlFor="price">Price :</label>
          <div className="price_input">
            <span htmlFor="price">$</span>
          <input type="number" value={product.price} onChange={(e) => handleChange(e)} name="price" id="price" min={1} max={2000} />
          </div>
        </div>
        <div>
          <label htmlFor="description">Descripntion :</label>
          <textarea name="description" value={product.description} onChange={(e) => handleChange(e)} id="description"></textarea>
        </div>

        <div>
          <label htmlFor="category">Category : </label>
          <select name="category" value={product.category} onChange={(e) => handleChange(e)} id="category">
            <option value="beauty" selected>beauty</option>
            <option value="fragrances">fragrances</option>
          </select>
        </div>
        <div>
          <label htmlFor="imageUrl">Image Url :</label>
          <input type="text" value={product.images[0]} onChange={(e) => handleChange(e)} name="images" id="imageUrl" />
        </div>

        <div className="submit_button">
          <button type="submit">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewProduct;
