import React, { useContext, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet} from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

function Layout() {
  const { sidebarOpen,navigate} = useContext(AdminContext);
  
  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <Header />
      <Sidebar />
      <div
        className={`transition-all ${
          sidebarOpen === true  ? "lg:pl-45 xl:pl-55" : "pl-2"
        }`}
      >
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
