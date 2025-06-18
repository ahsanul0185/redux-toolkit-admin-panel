import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "./productSlice";
import { useNavigate } from "react-router-dom";

const ProductListView = () => {
  const { products, isLoading, error } = useSelector(
    (state) => state.productsR
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);



  if (isLoading) return <div className="loading"><h3>Loading...</h3></div>;

  return (
    <div className="list-page">
      {error && <p>{error}</p>}

      {!isLoading && !error && products && products.length > 0 && (
        <div>
          <h2 className="font-bold text-3xl">List of Products</h2>
        <table className="products">
            <thead>
              <tr>
                <td>
                 Image
                </td>

                <td>
                  Title
                </td>

                <td>
                  Price
                </td>

                <td className="flex justify-end">
                  Actions
                </td>
              </tr>
            </thead>
            <tbody>
              
          {products.map((product) => {
            return (
              <tr key={product.id} className="product">
                <td>
                  <img style={{cursor: "pointer"}} onClick={() => navigate(`/view_product/${product.id}`)} src={product.images?.length > 0 ? product.images[0] : null} loading="lazy" alt="" />
                </td>

                <td>
                  <h3 style={{cursor: "pointer"}} onClick={() => navigate(`/view_product/${product.id}`)}>{product.title}</h3>
                </td>

                <td>
                  <h3>${product.price}</h3>
                </td>

                <td className="text-end">
                  <button className="button" onClick={() => dispatch(deleteProduct(product.id))}>
                    Delete
                  </button>
                  <button className="button" onClick={() => navigate(`/edit_product/${product.id}`)}>
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
            </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default ProductListView;
