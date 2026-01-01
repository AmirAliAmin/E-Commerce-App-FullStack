import React, { useContext, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

function Layout() {
  const { sidebarOpen } = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/login");
      }
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <Sidebar />
      <div
        className={`transition-all ${
          sidebarOpen ? "lg:pl-45 xl:pl-55" : "pl-2"
        }`}
      >
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
