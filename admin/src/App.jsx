import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products/Products";
import AddProduct from "./pages/Products/AddProduct";
import HomeBanner from "./pages/Home/HomeBanner";
import AddCategory from "./pages/Category/AddCategory";
import Category from "./pages/Category/Category";
import SubCategory from "./pages/Category/SubCategory";
import AddSubCategory from "./pages/Category/AddSubCategory";
import Users from "./pages/Users/Users";
import Orders from "./pages/Order/Orders";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import Verify from "./pages/Auth/Verify";
import ChangePassword from "./pages/Auth/ChangePassword";
import AdminProfile from "./pages/Users/AdminProfile";

function App() {
   
  return (
    <div className="relative">
      <Toaster />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/change-password" element={<ChangePassword />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/product/list" element={<Products />} />
          <Route path="/product/add" element={<AddProduct />} />
          <Route path="/home/list" element={<HomeBanner />} />
          <Route path="/category/add" element={<AddCategory />} />
          <Route path="/category/list" element={<Category />} />
          <Route path="/category/subcategory/add" element={<AddSubCategory />} />
          <Route path="/category/subcategory/list" element={<SubCategory />} />
          <Route path="/user" element={<Users />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/admin-profile" element={<AdminProfile/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
