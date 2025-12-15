import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isLogin, setIsLogin] = useState(true);
  const value = {
    sidebarOpen,setSidebarOpen,
    isLogin,setIsLogin
  };
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
