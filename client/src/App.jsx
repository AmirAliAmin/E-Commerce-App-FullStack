import React from "react";
import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Product from "./pages/products/Product";
import Footer from "./components/footer/Footer";
import ProductDetails from "./pages/products/ProductDetails";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Cart from "./pages/cart/Cart";
import Verify from "./pages/auth/Verify";
import toast, { Toaster } from 'react-hot-toast';
import ForgetPassword from "./pages/auth/ForgetPassword";
import Checkout from "./pages/cart/Checkout";
import MyAccount from "./pages/myAccount/MyAccount";

function App() {
  return (
    <div className="">
      <div><Toaster/></div>
      <div className="pb-45.5">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="product/:id" element={<ProductDetails/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/verifyAccount" element={<Verify/>} />
        <Route path="/forgetpassword" element={<ForgetPassword/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/my-account" element={<MyAccount/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
