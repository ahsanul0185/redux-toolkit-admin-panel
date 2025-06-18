import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProducts } from "./productSlice";

const ViewProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.productsR);

  const [product, setProduct] = useState({});

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setProduct(products.filter(product => product.id == id)[0]);
  }, [products])
  
  if (!product || products.length < 0) return <div className="loading"><h3>Loading...</h3></div>

  return (
    <div>
      <button className="cursor-pointer bg-gray-200 px-3 py-1" onClick={() => navigate("/")}>Back</button>

    <img className="w-1/2 mx-auto" src={product.images?.length > 0 ? product.images[0] : null} />
      <h2 className="font-bold text-2xl mt-5">{product.title}</h2>
      <h3 className="mt-5 font-semibold text-xl">Price : ${product.price}</h3>
      <p className="mt-5 text-gray-700">{product.description}</p>
        <span className="bg-gray-200 rounded-full px-3 py-1 mt-12 inline-block text-gray-600">{product.category}</span>
    </div>
  );
};

export default ViewProduct;
