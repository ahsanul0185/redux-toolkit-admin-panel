import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProducts, updateProduct } from "./productSlice";

const EditProduct = () => {
  const { id } = useParams();
  const { products } = useSelector((state) => state.productsR);

  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    images: [],
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  useEffect(() => {
  if (products?.length) {
    const productToEdit = products.find((product) => product.id == id);
    if (productToEdit) {
      setProduct(productToEdit);
    }
  }
}, [products, id]);


  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "images") {
      value = [value];
    }
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedProduct = { id, ...product };
    dispatch(updateProduct({id, product : editedProduct}));
    setProduct({title : "", price : "", description : "", category : "", images : []})                     
    navigate("/");
  };

    if (!product) return <div>Loading...</div>;

  return (
    <div className="add_product-page">
      <h2 className="font-bold text-3xl">Edit Product</h2>

      <form onSubmit={handleSubmit} className="add_product-form">
        <div>
          <label htmlFor="title">Title :</label>
          <input
            type="text"
            value={product.title}
            onChange={(e) => handleChange(e)}
            name="title"
            id="title"
          />
        </div>
        <div>
          <label htmlFor="price">Price :</label>
          <div className="price_input">
            <span htmlFor="price">$</span>
            <input
              type="number"
              value={product.price}
              onChange={(e) => handleChange(e)}
              name="price"
              id="price"
              min={1}
              max={2000}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Descripntion :</label>
          <textarea
            name="description"
            value={product.description}
            onChange={(e) => handleChange(e)}
            id="description"
          ></textarea>
        </div>

        <div>
          <label htmlFor="category">Category : </label>
          <select
            name="category"
            value={product.category}
            onChange={(e) => handleChange(e)}
            id="category"
          >
            <option value="beauty">beauty</option>
            <option value="fragrances">fragrances</option>
          </select>
        </div>
        <div>
          <label htmlFor="imageUrl">Image Url :</label>
          <input
            type="text"
            value={product.images[0] || ""}
            onChange={(e) => handleChange(e)}
            name="images"
            id="imageUrl"
          />
        </div>

        <div style={{flexDirection : "row"}} className="justify-end gap-5">
          <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 cursor-pointer" onClick={() => navigate("/")}>Cancel</button>
          <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 cursor-pointer" type="submit">Save Edit</button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
