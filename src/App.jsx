import React from "react";
import ProductListView from "./features/products/ProductListView";
import { Route, Routes } from "react-router-dom";
import AddNewProduct from "./features/products/AddNewProduct";
import Navigation from "./components/Navigation";
import OrdersView from "./features/orders/OrdersView";
import EditProduct from "./features/products/EditProduct";
import ViewProduct from "./features/products/ViewProduct";

const App = () => {
  return (
    <div className="layout">
      <Navigation />
      <div className="page">
        <Routes>
          <Route path="/" element={<ProductListView />} />
          <Route path="/add_new_product" element={<AddNewProduct />} />
          <Route path="/edit_product/:id" element={<EditProduct />} />
          <Route path="/view_product/:id" element={<ViewProduct />} />
          <Route path="/orders" element={<OrdersView />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
