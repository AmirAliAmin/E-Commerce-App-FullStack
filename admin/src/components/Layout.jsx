import React, { useContext, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

function Layout() {
  const { sidebarOpen, isLogin, setIsLogin } = useContext(AdminContext);
  const history = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      history("/login");
    }
  }, []);
  return (
    <>
      <Header />
      <Sidebar />
      <div
        className={`transition-all ${
          sidebarOpen === true ? "lg:pl-45 xl:pl-55" : "pl-2"
        }`}
      >
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
