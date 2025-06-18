import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav>
        <NavLink to="/">List Products</NavLink>
        <NavLink to="/add_new_product">Add New Product</NavLink>
        <NavLink to="/orders">Orders</NavLink>
    </nav>
  )
}

export default Navigation